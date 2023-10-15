import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Table, Col, Container, Row, Button, Form } from "react-bootstrap";
import MainLayout from "./MainLayout";

function AllDriverDetails() {
  const [drivers, setDrivers] = useState([]);
  const [inputState, setInputState] = useState({
    bonus: "",
  });

  const [calculationResults, setCalculationResults] = useState([]); // To store calculated net salaries

  // Function to update driver details based on bonus
  async function addDriverSalary() {
    try {
      const response = await axios.post(
        "http://localhost:8090/finance/addDriverSal",
        { bonus: inputState.bonus }
      );

      // Update the drivers' data with calculated net salaries
      const updatedDrivers = drivers.map((driver) => {
        // Perform your net salary calculation here based on bonus and driver's mileage
        const netSalary = calculateNetSalary(driver.mileage, inputState.bonus);

        // Update the driver's netSalary property
        return { ...driver, netSalary };
      });

      // Set the updated drivers' data
      setDrivers(updatedDrivers);

      // Set the calculation results to display
      setCalculationResults(updatedDrivers.map((driver) => driver.netSalary));
    } catch (error) {
      console.error("Error with updating driver details:", error);
    }
  }

  // Salary Calculations
  function calculateNetSalary(mileage, bonus) {
    const salaryPerKM = 50;
    const netSalary = (salaryPerKM * mileage * bonus) / 100 + salaryPerKM * mileage;
    return netSalary;
  }

  // Get Driver Details
  async function getDriverDetails() {
    try {
      const response = await axios.get("http://localhost:8090/api/drivers");
      setDrivers(response.data);
    } catch (error) {
      console.error("Error with GET request:", error);
    }
  }

  useEffect(() => {
    getDriverDetails();
  }, []);

  const { bonus } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDriverSalary();
  };

  return (
    <>
      <MainLayout></MainLayout>
      <Container className="mt-5">
        <Row>
          <Col xs={6} className="mb-0">
            <h1>Driver Details</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Row className="d-flex justify-content-end">
              <Col xs={4} md={4} className="text-right">
                <Form onSubmit={handleSubmit}>
                  <Form.Control
                    placeholder="Enter Bonus amount"
                    value={bonus}
                    onChange={handleInput("bonus")}
                    style={{
                      padding: "10px",
                      fontSize: "18px",
                      border: "2px solid black",
                    }}
                  />
                </Form>
              </Col>
              <Col xs={12} md={2} className="d-flex justify-content-end">
                <Button
                  variant="primary"
                  className="btn-lg"
                  onClick={handleSubmit}
                >
                  Calculate
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mt-2">
            <Table
              striped
              bordered
              hover
              variant="light"
              style={{
                marginTop: "30px",
                padding: "20px",
                fontSize: "20px",
                width: "100%",
                border: "1px solid black",
              }}
            >
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Contact Number</th>
                  <th>Email</th>
                  <th>Mileage</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver, index) => {
                  const { firstName, lastName, ContactNumber, email, mileage } = driver;
                  if (driver) {
                    return (
                      <tr
                        key={driver._id}
                      >
                        <td>{index + 1}</td>
                        <td>
                          {firstName} {lastName}
                        </td>
                        <td>{ContactNumber}</td>
                        <td>{email}</td>
                        <td>{mileage} Km</td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AllDriverDetails;
