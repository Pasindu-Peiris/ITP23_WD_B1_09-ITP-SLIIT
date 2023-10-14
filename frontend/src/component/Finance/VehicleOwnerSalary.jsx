import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import MainLayout from "./MainLayout";
import {
  Table,
  Col,
  Container,
  Row,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";

function AllVehicleOwnerSal() {
  const [vehicleOwnerSals, setVehicleOwnerSal] = useState([]);
  const [search, setSearch] = useState("");
  const componentRef = useRef(null);

  //get all Vehicle Owner's Salaries
  async function getVehicleOwnerSal() {
    try {
      const response = await axios.get(
        "http://localhost:8090/finance/getVehicleOwnerSal/"
      );
      setVehicleOwnerSal(response.data);
    } catch (error) {
      console.error("Error with GET request:", error);
    }
  }

  useEffect(() => {
    getVehicleOwnerSal();
  }, []);

  return (
    <>
      <MainLayout></MainLayout>
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={8}>
            <h1>Vehicle Owner Salary Details</h1>
          </Col>

          <Col xs={12} md={4} className="mt-md-0 mt-3">
            <Form>
              <InputGroup>
                <Form.Control
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name"
                  value={search}
                  style={{
                    padding: "15px",
                    fontSize: "18px",
                    border: "2px solid black",
                  }}
                />
              </InputGroup>
            </Form>
          </Col>
        </Row>

        <br />

        <Row>
          <Col xs={12}>
            <ReactToPrint
              trigger={() => {
                return (
                  <Button variant="warning" className="btn-lg">
                    Generate Report
                  </Button>
                );
              }}
              content={() => componentRef.current}
              documentTitle="Vehicle Owner Salary Details"
              pageStyle={"print"}
            />

            <div ref={componentRef}>
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
                    <th>Account Number</th>
                    <th>Email</th>
                    <th>Bonus</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleOwnerSals
                    .filter((vehicleOwner) => {
                      return (
                        search.toLowerCase() === "" ||
                        vehicleOwner.vehicleOwner_id?.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      );
                    })
                    .map((vehicleOwner, index) => {
                      const { vehicleOwner_id, bonus, netSal } = vehicleOwner;
                      if (vehicleOwner_id) {
                        return (
                          <tr
                            key={vehicleOwner._id}
                            style={{ backgroundColor: "#6553cfa3" }}
                          >
                            <td>{index + 1}</td>
                            <td>{vehicleOwner_id.name}</td>
                            <td>{vehicleOwner_id.nic}</td>
                            <td>{vehicleOwner_id.accountNumber}</td>
                            <td>{vehicleOwner_id.email}</td>
                            <td>{bonus}%</td>
                            <td>Rs.{netSal}</td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AllVehicleOwnerSal;
