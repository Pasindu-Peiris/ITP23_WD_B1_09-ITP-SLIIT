import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Table, Col, Container, Row, Button , Form} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function AllDriverDetails() {
  const [driverDetails, setDriverDetails] = useState([]);
  const [inputState, setInputState] = useState({
    bonus: "",
  });

  // get link parameter details
  const { Id } = useParams();
  const navigate = useNavigate();

  // Function to update driver details based on bonus
  async function updateDriverDetailsWithBonus() {
    try {
      const response = await axios.post(
        "http://localhost:8090/finance/updateDriverDetailsWithBonus",
        { bonus: inputState.bonus }
      );
      setDriverDetails(response.data);
    } catch (error) {
      console.error("Error with updating driver details:", error);
    }
  }

  useEffect(() => {
    // Fetch driver details when the component mounts
    async function getDriverDetails() {
      try {
        const response = await axios.get("http://localhost:8090/driver/");
        setDriverDetails(response.data);
      } catch (error) {
        console.error("Error with GET request:", error);
      }
    }

    getDriverDetails();
  }, []);

  const { bonus } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDriverDetailsWithBonus();
  };

  return (
    <>
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
                      // marginLeft: "80px",
                    }}
                  />
                </Form>
              </Col>
              <Col xs={12} md={2} className="d-flex justify-content-end">
                <Button variant="primary" className="btn-lg" onClick={handleSubmit}>
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
                  <th>NIC</th>
                  <th>Email</th>
                  <th>Mileage</th>
                </tr>
              </thead>
              <tbody>
                {driverDetails.map((driver, index) => {
                  const { driver_id } = driver;
                  if (driver_id) {
                    return (
                      <tr key={driver._id}>
                        <td>{index + 1}</td>
                        <td>{driver_id.name}</td>
                        <td>{driver_id.nic}</td>
                        <td>{driver_id.email}</td>
                        <td>{driver.mileage}</td>
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
