import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useParams } from 'react-router-dom';

function UpdateReservation() { // Changed the component name

    const { id } = useParams();
    const [reservation, setReservation] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        nic: "",
        vehicle: "", // Changed the field name
        noofguests: "", // Added the field for number of guests
        date: "", // Changed the field name
        amount: "" // Changed the field name
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        nic: ""
    });

    function Notify(message, type) {
        toast[type](message, {
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            position: "top-right",
            draggable: true,
            progress: undefined,
            theme: "dark",
            style: {
                width: '300px',
                height: '100px',
                fontSize: '22px',
                alignItems: 'center',
                fontFamily: "Ropa Sans",
                display: 'flex',
                justifyContent: 'center',
                color: 'white',
            },
            bodyClassName: 'custom-toast-body'
        });
    }    

    // date format
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };


    // Function to validate name (letters only, no numbers or special characters)
const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
};

// Function to validate address (letters and spaces only, no numbers or special characters)
const validateAddress = (address) => {
    const addressRegex = /^[A-Za-z\s.,]+$/;
    return addressRegex.test(address);
};


    // Function to validate email format
    const validateEmail = (email) => {
        // Regular expression for a valid email address
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    // Function to validate phone format (only digits, no spaces, and exactly 9 digits)
    const validatePhone = (phone) => {
        const phoneRegex = /^\d{9}$/;
        return phoneRegex.test(phone);
    };

    // Function to validate NIC format (either 12 digits or 9 digits followed by 'v' or 'V')
    const validateNIC = (nic) => {
        const nicRegex = /^\d{12}$|^\d{9}[vV]$/;
        return nicRegex.test(nic);
    };

    useEffect(() => {

        function updateReservations() { // Changed the function name

            axios.get('http://localhost:8090/reservation/getReservation/' + id) // Changed the API endpoint
                .then((res) => {
                    setReservation({
                        name: res.data.reservation.name, // Changed the field name
                        email: res.data.reservation.email, // Changed the field name
                        address: res.data.reservation.address, // Changed the field name
                        phone: res.data.reservation.phone, // Changed the field name
                        nic: res.data.reservation.nic,
                        vehicle: res.data.reservation.vehicle, // Changed the field name
                        noofguests: res.data.reservation.noofguests, // Added the field for number of guests
                        date: res.data.reservation.date, // Changed the field name
                        amount: res.data.reservation.amount // Changed the field name
                    });
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        updateReservations();

    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservation({ ...reservation, [name]: value });

        // Validate email, phone, and NIC
        const newErrors = { ...errors };
        
        if (name === 'name' && !validateName(value)) {
            newErrors.name = "please Enter valid Name";
        }
        else if (name === 'address' && !validateAddress(value)) {
            newErrors.address = "Please Enter valid Address";
        }
        else if (name === 'email' && !validateEmail(value)) {
            newErrors.email = "Invalid email format";
        } else if (name === 'phone' && !validatePhone(value)) {
            newErrors.phone = "Invalid phone format (9 digits required)";
        } else if (name === 'nic' && !validateNIC(value)) {
            newErrors.nic = "Invalid NIC format (12 digits or 9 digits followed by 'v' or 'V')";
        } else {
            // Clear the error message if input is valid
            newErrors[name] = "";
        }

        setErrors(newErrors);
    }

    const Update = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8090/reservation/update/" + id, reservation) // Changed the API endpoint
            .then(result => {
                Notify('Reservation Updated Successfully', 'success');
                setTimeout(() => {
                window.location = '/AllReservations';
            }, 2000);
            })
            .catch((err) => {
                alert("Reservation Not Updated");
                console.log(err)
            })
    }

    return (
        <div>
            <Nav/>
        <div className="update-form">
            <br></br><br></br><br></br>
            <div className=" container-dotbox-update">
                <br></br><br></br><br></br>
                <h2>Update reservation details</h2>
            </div>
            <div className="con-update" style={{ justifyContent: 'center', width: "100%", margin: "auto 0%" }}>
                <div className="form-center-update">
                    <form onSubmit={Update} className="centered-form">
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label px-1">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder='Name'
                                required
                                autoComplete='off'
                                value={reservation.name} // Changed the field name
                                onChange={handleInputChange}
                            />
                             {errors.name && <div className="error-message" style={{ color: 'red' }}>{errors.name}</div>}
                        </div>
                        <br></br>

                        <div className="mb-4">
                            <label htmlFor="email" className="form-label px-1">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder='Email'
                                required
                                autoComplete='off'
                                value={reservation.email} // Changed the field name
                                onChange={handleInputChange}
                            />
                             {errors.email && <div className="error-message" style={{ color: 'red' }}>{errors.email}</div>}
                        </div>
                        <br></br>
                        <div className="mb-4">
                            <label htmlFor="address" className="form-label px-1">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                placeholder='Address'
                                required
                                autoComplete='off'
                                value={reservation.address} // Changed the field name
                                onChange={handleInputChange}
                            />
                             {errors.address && <div className="error-message" style={{ color: 'red' }}>{errors.address}</div>}
                        </div>
                        <br></br>
                        <div className="mb-4">
                            <label htmlFor="phone" className="form-label px-1">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                placeholder='Phone'
                                required
                                autoComplete='off'
                                value={reservation.phone} // Changed the field name
                                onChange={handleInputChange}
                            />
                             {errors.phone && <div className="error-message" style={{ color: 'red' }}>{errors.phone}</div>}
                        </div>
                        <br></br>
                        <div className="mb-4">
                            <label htmlFor="nic" className="form-label px-1">NIC</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nic"
                                name="nic"
                                placeholder='NIC'
                                required
                                autoComplete='off'
                                value={reservation.nic}
                                onChange={handleInputChange}
                            />
                             {errors.nic && <div className="error-message" style={{ color: 'red' }}>{errors.nic}</div>}
                        </div>
                        <br></br>
                        <div className="mb-4">
                            <label htmlFor="vehicle" className="form-label px-1">Vehicle</label> {/* Changed the field name */}
                            <input
                                type="text"
                                className="form-control"
                                id="vehicle"
                                name="vehicle" // Changed the field name
                                placeholder='Vehicle'
                                required
                                autoComplete='off'
                                value={reservation.vehicle} // Changed the field name
                                onChange={handleInputChange}
                                disabled
                            />
                            
                        </div>
                        <br></br>
                        <div className="mb-4">
                            <label htmlFor="noofguests" className="form-label px-1">Number of Guests</label> {/* Added the field for number of guests */}
                            <input
                                type="text"
                                className="form-control"
                                id="noofguests"
                                name="noofguests" // Added the field for number of guests
                                placeholder='Number of Guests'
                                required
                                autoComplete='off'
                                value={reservation.noofguests} // Added the field for number of guests
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                        <br></br>
                        <div className="mb-4">
                            <label htmlFor="date" className="form-label px-1">Date</label> {/* Changed the field name */}
                            <input
                                type="text"
                                className="form-control"
                                id="date"
                                name="date" // Changed the field name
                                placeholder='Date'
                                required
                                autoComplete='off'
                                value={formatDate(reservation.date)} // Changed the field name
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                        <br></br>
                        <div className="mb-4">
                            <label htmlFor="amount" className="form-label px-1">Amount</label> {/* Changed the field name */}
                            <input
                                type="text"
                                className="form-control"
                                id="amount"
                                name="amount" // Changed the field name
                                placeholder='Amount'
                                required
                                autoComplete='off'
                                value={reservation.amount} // Changed the field name
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                        <br></br>
                        <button type="submit" className="btn btn-primary w-100 mt-2 but-1">Update Reservation</button>
                    </form>
                </div>
            </div>
        </div>
        <ToastContainer/>
        </div>
    )
}

export default UpdateReservation;
