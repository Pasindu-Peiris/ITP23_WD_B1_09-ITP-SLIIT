import React, { useState } from "react";
import axios from "axios";


import Nav from "./Nav";



export default function ReservationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [noofguests, setNoOfGuests] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCVV] = useState("");

  // Define error states for each input field
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nicError, setNicError] = useState("");
  const [vehicleError, setVehicleError] = useState("");
  const [noofguestsError, setNoOfGuestsError] = useState("");
  const [dateError, setDateError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [expDateError, setExpDateError] = useState("");
  const [cvvError, setCvvError] = useState("");

  function sendData(e) {
    e.preventDefault();

    // Validate email format
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email)) {
    setEmailError("Invalid email format.");
    return;
  }

  // Validate phone number (10 digits)
  if (!/^\d{10}$/.test(phone)) {
    setPhoneError("Invalid phone number. It should be a 10-digit number.");
    return;
  }

  // Validate NIC format
  const nicPattern = /^[0-9]{9}[vVxX]$/;
  if (!nicPattern.test(nic) && !/^[0-9]{12}$/.test(nic)) {
    setNicError("Invalid NIC format. It should be either 123456789v or 200132103866.");
    return;
  }

    // Validate card number (simple validation)
  if (!/^\d{16}$/.test(cardNumber)) {
    setCardNumberError("Invalid card number. It should be a 16-digit number.");
    return;
  }

  // Validate expiration date (MM/YYYY)
  const expDatePattern = /^(0[1-9]|1[0-2])\/20[2-9]\d$/;
  if (!expDatePattern.test(expDate)) {
    setExpDateError("Invalid expiration date. Use MM/YYYY format.");
    return;
  }

  // Validate CVV (3 digits)
  if (!/^\d{3}$/.test(cvv)) {
    setCvvError("Invalid CVV. It should be a 3-digit number.");
    return;
  }

  setPhoneError("");

    // Check if Date is on or after 10/02/2023
    if (new Date(date) >= new Date("2023-10-02")) {
      const newReservation = {
        name,
        email,
        address,
        phone,
        nic,
        vehicle,
        noofguests,
        date,
        amount
      };

      axios
        .post("http://localhost:8090/reservation/addReservations", newReservation)
        .then(() => {
          alert("Reservation Successful");
          window.location = "/AllReservations";
        })
        .catch((err) => {
          alert("Error: " + err);
        });
    } else {
      alert("Please check the date. The date must be on or after 10/02/2023.");
    }
  }

  return (
    <div className=" " style={{backgroundColor:"#f1f1f3"}}>
    <Nav/>    
    <div className="form-container container card w-50" style={{padding:"50px"}}>
      
        
      <h1>Vehicle Reservation Form</h1>
      <p>Please fill out the form below to reserve your vehicle</p>
      <div className="reservation-form-container">
        <h2>Reservation Information</h2>

        <form onSubmit={sendData}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <p className="error-message">{nameError}</p>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              required
              autoComplete="off"
              pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
              title="Please Enter Valid Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
             <p className="error-message">{emailError}</p>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter Address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <p className="error-message">{addressError}</p>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Enter Phone Number"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <p className="error-message">{phoneError}</p>
          </div>
          <div className="form-group">
            <label htmlFor="nic">NIC</label>
            <input
              type="text"
              className="form-control"
              id="nic"
              placeholder="Enter NIC"
              onChange={(e) => {
                setNic(e.target.value);
              }}
            />
            <p className="error-message">{nicError}</p>
          </div>
          
          <div className="form-group">
  <label htmlFor="vehicle">Select Vehicle</label>
  <select
    className="form-control"
    id="vehicle"
    onChange={(e) => {
      setVehicle(e.target.value);
    }}
  >
    <option value="">Select Vehicle Type</option>
    <option value="Van">Van</option>
    <option value="Bus">Bus</option>
  </select>
  <p className="error-message">{vehicleError}</p>
</div>
<div className="form-group">
  <label htmlFor="noofguests">Number of Guests</label>
  <input
    type="number"
    className="form-control"
    id="noofguests"
    placeholder="Enter Number of Guests"
    onChange={(e) => {
      const guestCount = parseInt(e.target.value, 10); // Convert input value to an integer
      setNoOfGuests(guestCount); // Set the number of guests in the state

      // Automatically select "Bus" if the number of guests is greater than 15
      if (guestCount > 15) {
        setVehicle("Bus");
      }
    }}
  />
  <p className="error-message">{noofguestsError}</p>
</div>

          <div className="form-group">
            <label htmlFor="date">Reservation Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <p className="error-message">{dateError}</p>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Total Amount</label>
            <input
              type="text"
              className="form-control"
              id="amount"
              placeholder="Enter Total Amount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <p className="error-message">{amountError}</p>
          </div>

          <h2>Payment Information</h2>
<div className="form-group">
  <label htmlFor="paymentMethod">Choose Payment Method</label>
  <select
    className="form-control"
    id="paymentMethod"
    
  >
    <option value="">Select Payment Method</option>
    <option value="Visa">Visa</option>
    <option value="MasterCard">MasterCard</option>
  </select>
</div>
<div className="form-group">
  <label htmlFor="cardHolderName">Name on Card</label>
  <input
    type="text"
    className="form-control"
    id="cardHolderName"
    placeholder="Enter Name on Card"
    
  />
  
</div>
<div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              placeholder="Enter Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <p className="error-message">{cardNumberError}</p>
          </div>
          <div className="form-group">
            <label htmlFor="expDate">Exp Date</label>
            <input
              type="text"
              className="form-control"
              id="expDate"
              placeholder="(MM/YYYY)"
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
            />
            <p className="error-message">{expDateError}</p>
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              className="form-control"
              id="cvv"
              placeholder="Enter CVV"
              value={cvv}
              onChange={(e) => setCVV(e.target.value)}
            />
            <p className="error-message">{cvvError}</p>
          </div>
      

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        
      </div>
    </div>
    </div>
  );
}
