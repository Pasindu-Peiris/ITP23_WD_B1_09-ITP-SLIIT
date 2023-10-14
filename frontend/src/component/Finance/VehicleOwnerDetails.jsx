import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Col, Container, Row, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function AllVehicleOwnerDetails() {
  const [vehicleOwnerDetails, setVehicleOwnerDetails] = useState([]);
  const [inputState, setInputState] = useState({
    bonus: "",
  });

  // get link parameter details
  const { Id } = useParams();
  const navigate = useNavigate();

  //get all Vehicle Owner's List
  async function getVehicleOwnerDetails() {
    try {
      const response = await axios.get("http://localhost:8090/vehicleOwner/");
      setVehicleOwnerDetails(response.data);
    } catch (error) {
      console.error("Error with GET request:", error);
    }
  }

  // Add Vehicle Owner salary
  async function addVehicleOwnerSal() {
    try {
      const response = await axios.post(
        "http://localhost:8090/finance/addVehicleOwnerSal/"
      );
      setVehicleOwnerDetails(response.data);
    } catch (error) {
      console.error("Error with GET request:", error);
    }
  }

  useEffect(() => {
    getVehicleOwnerDetails();
    addVehicleOwnerSal();
  }, []);

  useEffect(() => {
    setInputState({ ...inputState, owner_id: Id });
  }, [Id]);

  const { bonus } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVehicleOwnerSal();
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col xs={6} className="mb-0">
            <h1>Vehicle Owner Details</h1>
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
                <Button variant="primary" className="btn-lg">
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
                  <th>Contact No</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {vehicleOwnerDetails.map((owner, index) => {
                  const { owner_id } = owner;
                  if (owner_id) {
                    return (
                      <tr key={owner._id}>
                        <td>{index + 1}</td>
                        <td>{owner_id.name}</td>
                        <td>{owner_id.nic}</td>
                        <td>{owner_id.contact}</td>
                        <td>{owner_id.email}</td>
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

export default AllVehicleOwnerDetails;
