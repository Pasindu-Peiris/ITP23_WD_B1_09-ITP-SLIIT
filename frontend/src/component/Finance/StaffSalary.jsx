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

function AllStaffSal() {
  const [staffSals, setStaffSal] = useState([]);
  const [search, setSearch] = useState("");
  const componentRef = useRef(null);

  //Get staff salary
  async function getStaffSal() {
    try {
      const response = await axios.get(
        "http://localhost:8090/finance/getStaffSal/"
      );
      setStaffSal(response.data);
    } catch (error) {
      console.error("Error with GET request:", error);
    }
  }

  useEffect(() => {
    getStaffSal();
  }, []);

  return (
    <>
      <MainLayout></MainLayout>
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={8}>
            <h1>Staff Salary Details</h1>
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
              documentTitle="Staff_Salary_Details"
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
                    <th>ETF</th>
                    <th>EPF</th>
                    <th>Basic Salary</th>
                    <th>Bonus</th>
                    <th>Net Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {staffSals
                    .filter((element) => {
                      return (
                        search.toLowerCase() === "" ||
                        element.element_id?.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      );
                    })
                    .map((element, index) => {
                      const { element_id, ETF, EPF, basicSal, bonus, netSal } =
                        element;
                      if (element_id) {
                        return (
                          <tr key={element._id}>
                            <td>{index + 1}</td>
                            <td>{element_id.name}</td>
                            <td>{element_id.nic}</td>
                            <td>{element_id.accountNumber}</td>
                            <td>{element_id.email}</td>
                            <td>Rs.{ETF}</td>
                            <td>Rs.{EPF}</td>
                            <td>Rs.{basicSal}</td>
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

export default AllStaffSal;
