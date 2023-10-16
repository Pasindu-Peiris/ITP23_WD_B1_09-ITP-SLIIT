import React, { useState, useEffect } from "react";
import { Col, Container, Form, Card, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "./MainLayout";

function SalaryForm() {
  const [inputState, setInputState] = useState({
    element_id: "",
    bonus: "",
  });

  const [error, setError] = useState();
  const [validationError, setValidationError] = useState(null);

  // Get link parameter details
  const { id } = useParams();
  const navigate = useNavigate();

  const addStaffSal = async () => {
    if (!validateBonus(inputState.bonus)) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8090/finance/addStaffSal`,
        inputState // Include the bonus value
      );
      console.log(response.data);
      setError(null);
      navigate("/AllStaffSal");
    } catch (err) {
      console.error(err);
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    setInputState({ ...inputState, element_id: id });
  }, [id]);

  const { bonus } = inputState;

  const handleInput = (name) => (e) => {
    const value = e.target.value;
    setInputState({ ...inputState, [name]: value });

    if (name === "bonus") {
      validateBonus(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStaffSal();
  };

  const validateBonus = (bonus) => {
    const bonusNumber = parseFloat(bonus);
    if (isNaN(bonusNumber) || bonusNumber < 0 || bonusNumber > 100) {
      setValidationError("Bonus must be a number between 0 and 100.");
      return false;
    } else {
      setValidationError(null);
      return true;
    }
  };

  return (
    <>
      <MainLayout></MainLayout>
      <Container className="mt-3">
        <h1 style={{ marginBottom: "20px", marginTop: "40px" }}>
          Add Bonus for Staff Members
        </h1>
        <div className="d-flex justify-content-center align-items-center">
          <Col xs={4} style={{ marginTop: "47px" }}>
            <Form onSubmit={handleSubmit}>
              {error && <p className="error">{error}</p>}
              <Card style={{ width: "30rem" }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "30px" }}>
                    Add Bonus Amount
                  </Card.Title>

                  <br />
                  <Form.Control
                    size="lg"
                    type="text" // Use "text" type to allow decimals
                    placeholder="Bonus"
                    value={bonus}
                    onChange={handleInput("bonus")}
                    style={{ height: "58px", fontSize: "20px" }}
                  />
                  <br />

                  {validationError && (
                    <Alert variant="danger">{validationError}</Alert>
                  )}

                  <Button variant="success" className="btn-lg" type="submit">
                    Calculate
                  </Button>
                </Card.Body>
              </Card>
            </Form>
          </Col>
        </div>
      </Container>
    </>
  );
}

export default SalaryForm;
