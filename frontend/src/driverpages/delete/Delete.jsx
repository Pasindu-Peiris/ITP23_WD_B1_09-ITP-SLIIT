import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./delete.css";
import Message from "../../drivercomponents/message/Message";
import Header from "../../drivercomponents/header/Header";
import Swal from "sweetalert2";

export default function Delete() {
  const navigate = useNavigate();
  const { id } = useParams();
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

  const [message, setMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  useEffect(() => {
    const getDriver = async () => {
      const res = await axios.get("http://localhost:8090/api/drivers/" + id);
      setDriver(res.data);
    };
    getDriver();
  }, []);

  const showMessage = (show = false, type = "", msg = "") => {
    setMessage({ show, type, msg });
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete("http://localhost:8090/api/drivers/" + driver._id);
        showMessage(true, "info", "Successfully deleted driver information");
        clearDriverInfo();
      } catch (error) {
        showMessage(true, "error", error);
      }
    }
  })
};

  const clearDriverInfo = () => {
    setDriver({
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
  };

  return (
    <>
      <Header />
      <div className="dheader">
        <h1>Driver Profile</h1>
      </div>
      <section className="dmanagePage">
        <form className="deditForm" onSubmit={handleSubmit}>
          <div className="dfields">
            <div className="dimgColumn">
              <img
                src={
                  driver.imagePic
                    ? `http://localhost:8090/${driver.imagePic}`
                    : "http://localhost:8090/images/defaultPic.png"
                }
                alt="Profile Pic"
              />
            </div>
            <div className="dfieldsColumn">
              <div className="dfieldRow">
                <label htmlFor="licenseNumber" className="dfieldLabel">
                  License Number
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  id="licenseNumber"
                  value={driver.licenseNumber}
                  readOnly={true}
                  className="ddeleteInputs"
                />
              </div>
              <div className="dfieldRow">
                <label htmlFor="firstName" className="dfieldLabel">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={driver.firstName}
                  readOnly={true}
                  className="ddeleteInputs"
                />
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
                  readOnly={true}
                  className="ddeleteInputs"
                />
              </div>
              <div className="dfieldRow">
                <label htmlFor="email" className="dfieldLabel">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={driver.email}
                  readOnly={true}
                  className="ddeleteInputs"
                />
              </div>
              <div className="dfieldRow">
                <label htmlFor="address" className="dfieldLabel">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={driver.address}
                  readOnly={true}
                  className="ddeleteInputs"
                />
              </div>
              <div className="dfieldRow">
                <label htmlFor="ContactNumber" className="dfieldLabel">
                  CONTACT Badge Number
                </label>
                <input
                  type="text"
                  name="ContactNumber"
                  id="ContactNumber"
                  value={driver.ContactNumber}
                  readOnly={true}
                  className="ddeleteInputs"
                />
              </div>
              <div className="dfieldRow">
                <label htmlFor="vehicle" className="dfieldLabel">
                  Preferred Vehicle
                </label>
                <input
                  type="text"
                  name="vehicle"
                  id="vehicle"
                  value={driver.vehicle}
                  readOnly={true}
                  className="ddeleteInputs"
                />
              </div>
            </div>
          </div>

          <div className="dbtnContainer">
            <button type="submit" className="dbottomButton">
              Delete
            </button>
            <button
              type="button"
              className="dbottomButton"
              onClick={() => navigate("/driver")}
            >
              Back
            </button>
          </div>
          <div>{message.show && <Message {...message} removeMessage={showMessage} />}</div>
        </form>
      </section>
    </>
  );
}
