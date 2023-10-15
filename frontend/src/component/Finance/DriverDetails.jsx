import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Table,
  Col,
  Container,
  Row,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import MainLayout from "./MainLayout";
import { Link } from "react-router-dom";

function AllDriverDetails() {
  const [drivers, setDrivers] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [newBonus, setNewBonus] = useState("");

  // Get Driver Details
  async function getDriverSal() {
    try {
      const response = await axios.get("http://localhost:8090/api/drivers");
      setDrivers(response.data);
    } catch (error) {
      console.error("Error with GET request:", error);
    }
  }

  useEffect(() => {
    getDriverSal();
  }, []);

  // Function to show the update bonus modal
  const handleShowUpdateModal = (driverId) => {
    setSelectedDriverId(driverId);
    setNewBonus("");
    setShowUpdateModal(true);
  };

  // Function to hide the update bonus modal
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  // Function to update bonus
  const updateBonus = async () => {
    try {
      await axios.put(
        `http://localhost:8090/finance/updateDriverSal/${selectedDriverId}`,
        { bonus: newBonus }
      );
      getDriverSal(); // Refresh the driver list after updating
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating bonus:", error);
    }
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
                  <th>Calculate</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver, index) => {
                  const { firstName, lastName, ContactNumber, email, mileage } =
                    driver;
                  if (driver) {
                    return (
                      <tr key={driver._id}>
                        <td>{index + 1}</td>
                        <td>
                          {firstName} {lastName}
                        </td>
                        <td>{ContactNumber}</td>
                        <td>{email}</td>
                        <td>{mileage} Km</td>
                        <td>
                          {driver.isSalaryAdded === true ? (
                            <Button
                              variant="primary"
                              onClick={() => handleShowUpdateModal(driver._id)}
                            >
                              Update Bonus
                            </Button>
                          ) : (
                            <Link
                              to={`/DriverSalForm/${driver._id}`}
                              style={{ width: "80px", height: "30px" }}
                            >
                              <Button variant="success">Calculate</Button>
                            </Link>
                          )}
                        </td>
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

      {/* Update Bonus Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "35px" }}>Update Bonus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label style={{ fontSize: "25px" }}>
                Enter New Bonus Amount:
              </Form.Label>
              <Form.Control
                type="number"
                value={newBonus}
                onChange={(e) => setNewBonus(e.target.value)}
                style={{ fontSize: "20px" }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn-lg" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" className="btn-lg" onClick={updateBonus}>
            Save Changes
          </Button> 
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AllDriverDetails;
