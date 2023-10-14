import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../drivercomponents/header/Header";
import Message from "../../drivercomponents/message/Message";
import "./add.css";

export default function Add() {
  // For navigation during button click
  const navigate = useNavigate();
  // State object of our driver
  const [driver, setDriver] = useState({
    licenseNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    mileage: "",
    vehicle: "",
    address: "",
    ContactNumber: "",
    imagePic: "",
  });

  // represents the profile picture uploaded
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  // Used for updating our state object
  const updateDriver = (e) => {
    const fieldName = e.target.name;
    setDriver((currentDriver) => ({
      ...currentDriver,
      [fieldName]: e.target.value,
    }));
  };

  // Show info or error message during calling of the Axios REST API
  const showMessage = (show = false, type = "", msg = "") => {
    setMessage({ show, type, msg });
  };

  // Handle form submit and using FormData API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const driverData = new FormData();
    driverData.append("licenseNumber", driver.licenseNumber);
    driverData.append("firstName", driver.firstName);
    driverData.append("lastName", driver.lastName);
    driverData.append("email", driver.email);
    driverData.append("mileage", driver.mileage);
    driverData.append("vehicle", driver.vehicle);
    driverData.append("address", driver.address);
    driverData.append("ContactNumber", driver.ContactNumber);
    if (file) {
      driverData.append("file", file);
    }
    try {
      await axios.post("http://localhost:8090/api/drivers", driverData);
      showMessage(true, "info", "Successfully added driver information");
    } catch (error) {
      showMessage(true, "error", error);
    }
  };

  // Displays the form for Adding
  return (
    <>
      <Header />
      <div className="dheader">
        <h1>Add Driver</h1>
      </div>
      <section className="dmanagePage">
        <form className="deditForm" onSubmit={handleSubmit}>
          <div className="dfields">
            <div className="dimgColumn">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "http://localhost:8090/images/defaultPic.png"
                }
                alt="Profile Pic"
              />
              <label htmlFor="fileInput" className="fileUploadLabel">
                <i className="fa-solid fa-circle-plus addProfileIcon">
                  Add Profile Pic
                </i>
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="dfieldsColumn">
              {/* <div className="fieldRow">
                <label htmlFor="licenseNumber" className="fieldLabel">
                  License Number
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  id="licenseNumber"
                  value={driver.licenseNumber}
                  onChange={updateDriver}
                  pattern="[A-Za-z][0-9]{0,9}" 
                  title="Enter a valid License Number (1 letter followed by up to 9 digits)." 
                  required
                  className="addInputs"
                />
              </div> */}
              <div className="dfieldRow">
  <label htmlFor="licenseNumber" className="dfieldLabel">
    License Number
  </label>
  <input
    type="text"
    name="licenseNumber"
    id="licenseNumber"
    value={driver.licenseNumber}
    onChange={updateDriver}
    pattern="[A-Za-z][0-9]{0,9}"
    title="Enter a valid License Number (1 letter followed by up to 9 digits)." 
    required
    className={`daddInputs ${driver.licenseNumber.match(/^[A-Za-z][0-9]{0,9}$/) ? '' : 'error'}`}
  />
  {driver.licenseNumber && !driver.licenseNumber.match(/^[A-Za-z][0-9]{0,9}$/) && (
    <div className="errorMessage" style={{ color: 'red' }}>Enter a valid License Number (1 letter followed by up to 9 digits)</div>
  )}
</div>
              {/* <div className="fieldRow">
                <label htmlFor="firstName" className="fieldLabel">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={driver.firstName}
                  onChange={updateDriver}
                  pattern="[A-Za-z]{1,50}"
                  title="Enter a valid First Name with a maximum of 50 characters."
                  required
                  className="addInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="lastName" className="fieldLabel">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={driver.lastName}
                  onChange={updateDriver}
                  pattern="[A-Za-z]{1,50}"
                  title="Enter a valid First Name with a maximum of 50 characters."
                  required
                  className="addInputs"
                />
              </div> */}
              <div className="dfieldRow">
  <label htmlFor="firstName" className="dfieldLabel">
    First Name
  </label>
  <input
    type="text"
    name="firstName"
    id="firstName"
    value={driver.firstName}
    onChange={updateDriver}
    pattern="[A-Za-z]{1,50}"
    required
    className={`daddInputs ${driver.firstName.match(/^[A-Za-z]{1,50}$/) ? '' : 'error'}`}
    title="Enter a valid First Name with a maximum of 50 characters."
  />
  {driver.firstName && !driver.firstName.match(/^[A-Za-z]{1,50}$/) && (
    <div className="errorMessage" style={{ color: 'red' }}>Enter First Name with a maximum of 50 characters.</div>
  )}
</div>

<div className="dfieldRow">
  <label htmlFor="lastName" className="dfieldLabel">
    Last Name
  </label>
  <input
    type="text"
    name="lastName"
    id="lastName"
    value={driver.lastName}
    onChange={updateDriver}
    pattern="[A-Za-z]{1,50}"
    required
    className={`daddInputs ${driver.lastName.match(/^[A-Za-z]{1,50}$/) ? '' : 'error'}`}
    title="Enter a valid Last Name with a maximum of 50 characters."
  />
  {driver.lastName && !driver.lastName.match(/^[A-Za-z]{1,50}$/) && (
    <div className="errorMessage" style={{ color: 'red' }}>Enter Last Name with a maximum of 50 characters.</div>
  )}
</div>
              {/* <div className="fieldRow">
                <label htmlFor="email" className="fieldLabel">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={driver.email}
                  onChange={updateDriver}
                  className="addInputs"
                />
              </div> */}
              <div className="dfieldRow">
  <label htmlFor="email" className="dfieldLabel">
    Email
  </label>
  <input
    type="email"
    name="email"
    id="email"
    value={driver.email}
    onChange={updateDriver}
    className={`daddInputs ${/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(driver.email) ? '' : 'error'}`}
    title="Enter a valid email with @ sign."
  />
  {driver.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(driver.email) && (
    <div className="errorMessage" style={{ color: 'red' }}>Enter a valid email with @ sign.</div>
  )}
</div>
              {/* <div className="fieldRow">
                <label htmlFor="address" className="fieldLabel">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={driver.address}
                  onChange={updateDriver}
                  maxlength="100" // Add the maxlength attribute here
                  required
                  className="addInputs"
                />
              </div> */}
              <div className="dfieldRow">
  <label htmlFor="address" className="dfieldLabel">
    Address
  </label>
  <input
    type="text"
    name="address"
    id="address"
    value={driver.address}
    onChange={updateDriver}
    maxLength="100"
    required
    className={`daddInputs ${driver.address.length <= 100 ? '' : 'error'}`}
    title="Maximum is 100 characters."
  />
  {driver.address.length > 100 && (
    <div className="errorMessage" style={{ color: 'red' }}>Maximum is 100 characters.</div>
  )}
</div>
              {/* <div className="fieldRow">
                <label htmlFor="ContactNumber" className="fieldLabel">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="ContactNumber"
                  id="ContactNumber"
                  value={driver.ContactNumber}
                  onChange={updateDriver}
                  pattern="[0-9]{10}"
                  required
                  title="Please enter a 10-digit phone number."
                  className="addInputs"
                />
              </div> */}
              <div className="dfieldRow">
  <label htmlFor="ContactNumber" className="dfieldLabel">
    Contact Number
  </label>
  <input
    type="text"
    name="ContactNumber"
    id="ContactNumber"
    value={driver.ContactNumber}
    onChange={updateDriver}
    pattern="[0-9]{10}"
    required
    className={`daddInputs ${driver.ContactNumber && driver.ContactNumber.length === 10 ? '' : 'error'}`}
    title="Please enter a 10-digit phone number."
  />
  {driver.ContactNumber && driver.ContactNumber.length !== 10 && (
    <div className="errorMessage" style={{ color: 'red' }}>Please enter a 10-digit phone number.</div>
  )}
</div>

            
              {/* <div><label htmlFor="vehicle" className="fieldLabel">
                  Preferred vehicles
                </label></div><div>
              <select
                name="vehicle"
                id="vehicle"
                value={driver.vehicle}
                onChange={updateDriver}
                className="addInputs select-large-font" 
              >
                <option value="All">All</option>
                <option value="Cars">Cars</option>
                <option value="Van">Van</option>
                <option value="Truck">Truck</option>
                <option value="Bus">Bus</option>
                <option value="Threewheel">Threewheel</option>
              </select></div> */}

<div style={{ display: 'flex', flexDirection: 'column' }}>
  <label htmlFor="anyVehicle" className="dfieldLabel" style={{ marginBottom: '10px', fontSize: '18px' }}>
    Preferred vehicles
  </label>
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <label htmlFor="anyVehicle" style={{ marginRight: '15px', fontSize: '18px' }}>
      <input
        type="checkbox"
        name="vehicle"
        id="anyVehicle"
        value="All"
        checked={driver.vehicle.includes("All")}
        onChange={updateDriver}
        style={{ marginRight: '10px' }}
      />
      All
    </label>

    <label htmlFor="carsVehicle" style={{ marginRight: '15px', fontSize: '18px' }}>
      <input
        type="checkbox"
        name="vehicle"
        id="carsVehicle"
        value="Cars"
        checked={driver.vehicle.includes("Cars")}
        onChange={updateDriver}
        style={{ marginRight: '10px' }}
      />
      Cars
    </label>

    <label htmlFor="vanVehicle" style={{ marginRight: '15px', fontSize: '18px' }}>
      <input
        type="checkbox"
        name="vehicle"
        id="vanVehicle"
        value="Van"
        checked={driver.vehicle.includes("Van")}
        onChange={updateDriver}
        style={{ marginRight: '10px' }}
      />
      Van
    </label>

    <label htmlFor="truckVehicle" style={{ marginRight: '10px', fontSize: '18px' }}>
      <input
        type="checkbox"
        name="vehicle"
        id="truckVehicle"
        value="Truck"
        checked={driver.vehicle.includes("Truck")}
        onChange={updateDriver}
        style={{ marginRight: '10px' }}
      />
      Truck
    </label>

    <label htmlFor="busVehicle" style={{ marginRight: '15px', fontSize: '18px' }}>
      <input
        type="checkbox"
        name="vehicle"
        id="busVehicle"
        value="Bus"
        checked={driver.vehicle.includes("Bus")}
        onChange={updateDriver}
        style={{ marginRight: '10px' }}
      />
      Bus
    </label>

    <label htmlFor="threewheelVehicle" style={{marginRight: '15px', fontSize: '18px' }}>
      <input
        type="checkbox"
        name="vehicle"
        id="threewheelVehicle"
        value="Threewheel"
        checked={driver.vehicle.includes("Threewheel")}
        onChange={updateDriver}
        style={{ marginRight: '10px' }}
      />
      Threewheel
    </label>

    <label htmlFor="motorcycleVehicle" style={{ fontSize: '18px' }}>
      <input
        type="checkbox"
        name="vehicle"
        id="motorcycleVehicle"
        value="Motorcycle"
        checked={driver.vehicle.includes("Motorcycle")}
        onChange={updateDriver}
        style={{ marginRight: '10px' }}
      />
      Motorcycle
    </label>



  </div>
</div>


















            </div>
          </div>

          <div className="dbtnContainer">
            <button type="submit" className="dbottomButton">
              Add
            </button>
            <button
              type="button"
              className="dbottomButton"
              onClick={() => navigate("/driver")}
            >
              Back
            </button>
          </div>
          <div>
            {message.show && (
              <Message {...message} removeMessage={showMessage} />
            )}
          </div>
        </form>
      </section>
    </>
  );
}
