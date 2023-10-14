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

function AllIncomes() {
  const [incomes, setIncomes] = useState([]);
  const [search, setSearch] = useState("");
  const componentRef = useRef(null);

  //Get all incomes
  async function getIncomes() {
    try {
      const response = await axios.get("http://localhost:8090/client/userdata");
      setIncomes(response.data);
    } catch (error) {
      console.error("Error with GET request:", error);
    }
  }

  useEffect(() => {
    getIncomes();
  }, []);

  //   const totalIncome = incomes.reduce(
  //     (total, income) => total + income.amount,
  //     0,
  //   );

  return (
    <>
      <MainLayout></MainLayout>
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={8}>
            <h1>All Income Details</h1>
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
              documentTitle="All Income Details"
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
                    <th>Email</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {incomes
                    .filter((userData) => {
                      return (
                        search.toLowerCase() === "" ||
                        userData.userData_id?.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      );
                    })
                    .map((userData, index) => {
                      const { userData_id } = userData;
                      if (userData_id) {
                        return (
                          <tr key={userData._id}>
                            <td>{index + 1}</td>
                            <td>{userData_id.name}</td>
                            <td>{userData_id.nic}</td>
                            <td>{userData_id.email}</td>
                            <td>{userData_id.date}</td>
                            <td>Rs.{userData_id.amount}</td>
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

export default AllIncomes;
