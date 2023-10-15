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
import { Link } from "react-router-dom";
import MainLayout from "./MainLayout";

function AllStaffDetails() {
  const [users, setUsers] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [newBonus, setNewBonus] = useState("");

  // useEffect(() => {
  //   // Define the URL for your API endpoint
  //   const apiUrl = "http://localhost:8090/finance/users";

  //   // Make a GET request to the API
  //   fetch(apiUrl)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setUsers(data); // Set the fetched data to the state
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data:", error);
  //     });
  // }, []);

  async function getStaffDetails() {
    try {
      const response = await axios.get("http://localhost:8090/finance/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error with GET request:", error);
    }
  }



  useEffect(() => {
    getStaffDetails();
  }, []);


  // Function to show the update bonus modal
  const handleShowUpdateModal = (staffId) => {
    setSelectedStaffId(staffId);
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
        `http://localhost:8090/finance/updateStaffSal/${selectedStaffId}`,
        { bonus: newBonus }
      );
      getStaffDetails();
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating bonus:", error);
    }
  };

  return (
    <>
      <MainLayout />
      <Container className="mt-5">
        <Row>
          <Col xs={6} className="mb-0">
            <h1>Staff Details</h1>
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
                  <th>Job Role</th>
                  <th>Calculate</th>
                </tr>
              </thead>
              <tbody>
                {users.map((element, index) => {
                  const { fname, lname, email, nic, role } = element;
                  if (element) {
                    return (
                      <tr key={element._id}>
                        <td>{index + 1}</td>
                        <td>
                          {fname} {lname}
                        </td>
                        <td>{nic}</td>
                        <td>{email}</td>
                        <td>{role}</td>
                        <td>
                          {element.isSalaryAdded === true ? (
                            <Button
                              variant="primary"
                              onClick={() => handleShowUpdateModal(element._id)}
                            >
                              Update Bonus
                            </Button>
                          ) : (
                            <Link
                              to={`/staffSalForm/${element._id}`}
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

export default AllStaffDetails;
