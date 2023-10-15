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
import axios from "axios";

function AllIncomes() {
  const [bookings, setBookings] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");
  const componentRef = useRef(null);

  // Get all incomes
  async function getIncomes() {
    try {
      const bookingResponse = await axios.get(
        "http://localhost:8090/booking/AllBookings"
      );
      const reservationResponse = await axios.get(
        "http://localhost:8090/reservation/AllReservations"
      );

      setBookings(bookingResponse.data);
      setReservations(reservationResponse.data);
    } catch (error) {
      console.error("Error with GET request:", error);
    }
  }

  useEffect(() => {
    getIncomes();
  }, []);

  const combinedData = [...bookings, ...reservations];

  return (
    <>
      <MainLayout></MainLayout>
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={8} style={{ marginBottom: "20px" }}>
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
                  {combinedData
                    .filter((data) => {
                      return (
                        search.toLowerCase() === "" ||
                        data.name.toLowerCase().includes(search.toLowerCase())
                      );
                    })
                    .map((data, index) => {
                      const { name, nic, email, pickupdate, date, amount } =
                        data;
                      if (data) {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{nic}</td>
                            <td>{email}</td>
                            <td>{pickupdate || date}</td>
                            <td>Rs. {amount}</td>
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
