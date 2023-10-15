import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";

//import "./AddBooking.css"; // Import your CSS file

export default function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [vehicletype, setVehicleType] = useState("");
  const [pickupdate, setPickupDate] = useState("");
  const [returndate, setReturnDate] = useState("");
  const [driver, setDriver] = useState("");
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

  const [cardNumberError, setCardNumberError] = useState("");
  const [expDateError, setExpDateError] = useState("");
  const [cvvError, setCvvError] = useState("");


   const {vid} = useParams();
   const [model, setModel] = useState()
   const [totalamount, setTotalamount] = useState()

   useEffect(() => {
    axios
      .get("/vehicles/upVehicles/" + vid)
      .then((result) => {
        console.log(result);
        setTotalamount(result.data.totalAmount)
        setModel(result.data.model);
        
      })
      .catch((err) => console.log(err));
      console.log(model);

  }, []);
  



  const Validate = () => {
    const newErrors ={};

    if (!name){
      newErrors.name = "Name if required";

    }

  }


function sendData(e) {
  e.preventDefault();


  if (driver === "Yes") {
    totalamount += 200; // Add 200 for the driver
  }

  setAmount(totalamount); // Update the amount state

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


  


  // Parse dates into JavaScript Date objects
  const pickupDateObj = new Date(pickupdate);
  const returnDateObj = new Date(returndate);

  

  // Check if PickupDate is before ReturnDate and PickupDate is on or after 10/02/2023
  if (pickupDateObj < returnDateObj && pickupDateObj >= new Date('2023-10-02')) {
      

     



    const newBooking = {
      name,
      email,
      address,
      phone,
      nic,
      vehicletype,
      pickupdate,
      returndate,
      driver,
      amount
    };

    axios
      .post("http://localhost:8090/booking/addBookings", newBooking)
      .then(() => {
        alert("Payment Successful");
        window.location = '/AllBookings';
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  } else {
    alert("Please check the dates. Pickup Date must be on or after 10/02/2023, and Return Date must be after Pickup Date.");
  }
}


  return (
    
    <div className=" " style={{backgroundColor:"#f1f1f3"}}>
     <Nav/>
    <div className="form-container container card w-50" style={{padding:"50px"}}>
  
      <div className="header">
      <h1>Vehicle Booking Form</h1>
      <p>Please fill out the form below to book your vehicle</p>
      </div>
    <div className="form-content">
    <div className="booking-form-container" >
      <h2>Booking Information</h2>
     
      <form onSubmit={sendData}>
        <div className="form-group1">
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
          
        
        <div className="form-group1">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            required autoComplete='off' pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" title='Please Enter Valid Email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
           <p className="error-message">{emailError}</p>
        </div>
        <div className="form-group1">
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
        <div className="form-group1">
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
        <div className="form-group1">
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
        <div className="form-group1">
          <label htmlFor="vehicletype">Select Vehicle</label>
          <input
            type="text"
            className="form-control"
            id="nic"
            value = {model}
            placeholder="Enter NIC"
            onChange={(e) => {
              setNic(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pickupdate">Pickup Date</label>
          <input
            type="text"
            className="form-control"
            id="nic"
            value = {model}
            placeholder="Enter NIC"
            onChange={(e) => {
              setNic(e.target.value);
            }}
          />
        </div>
        <div className="form-group1">
          <label htmlFor="returndate">Return Date</label>
          <input
            type="text"
            className="form-control"
            id="nic"
            value = {model}
            placeholder="Enter NIC"
            onChange={(e) => {
              setNic(e.target.value);
            }}
          />
        </div>
        <div className="form-group1">
          <label htmlFor="driver">Do you want a Driver</label>
          
          <select
            className="form-control"
            id="driver"
            onChange={(e) => {
              setDriver(e.target.value);
            }}
          >
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group1">
  <label htmlFor="totalAmount">Total Amount</label>
  <input
    type="text"
    className="form-control"
    id="totalAmount"
    placeholder="Enter Total Amount"
    value={totalamount} // Bind to the amount state
                readOnly // Make it non-editable
   
  />
</div>
<h2>Payment Information</h2>
<div className="form-group1">
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

<div className="form-group1">
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
          <div className="form-group1">
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
          <div className="form-group1">
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
    </div>
    

    
  );
}