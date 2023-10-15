import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';


function UpdateBooking() {

    const [booking, setBooking] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        nic: "",
        vehicletype: "",
        pickupdate: "",
        returndate: "",
        driver: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        nic: ""
    });

    const { id } = useParams();
    
    

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

    //date format
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

        function updateBookings() {

    
            axios.get('http://localhost:8090/booking/getBooking/' + id).then((res) => {
                setBooking({
                    name: res.data.booking.name,
                    email: res.data.booking.email,
                    address: res.data.booking.address,
                    phone: res.data.booking.phone,
                    nic: res.data.booking.nic,
                    vehicletype: res.data.booking.vehicletype,
                    pickupdate: res.data.booking.pickupdate,
                    returndate: res.data.booking.returndate,
                    driver: res.data.booking.driver
                });
            }).catch((err) => {
                console.log(err)
            })
        }

        updateBookings();

    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });

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

    // Function to validate form data

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        // Check for errors in name, email, address, phone, and nic fields
        if (!booking.name) {
            newErrors.name = "Name is required";
            valid = false;
        }

        if (!booking.email) {
            newErrors.email = "Email is required";
            valid = false;
        }

        if (!booking.address) {
            newErrors.address = "Address is required";
            valid = false;
        }

        if (!booking.phone) {
            newErrors.phone = "Phone is required";
            valid = false;
        }

        if (!booking.nic) {
            newErrors.nic = "NIC is required";
            valid = false;
        }

        // Update the errors state with the new error messages
        setErrors(newErrors);

        return valid;
    }

    

    const Update = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }


        axios.put("http://localhost:8090/booking/update/" + id, booking).then(result => {
            Notify('Booking Updated Successfully', 'success');
            setTimeout(() => {
                window.location = '/AllBookings';
            }, 2000);
            
        
        }).catch((err) => {
            alert("Booking Not Updated");
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
                <h2>Update booking details</h2>
            </div>
            <div className="con-update" style={{justifyContent:'center',  width:"100%", margin:"auto 0%"}}>
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
                                value={booking.name}
                                onChange={handleInputChange}
                            />
                            <br></br>
                             {errors.name && <div className="error-message" style={{color: 'red'}}>{errors.name}</div>}
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
                                value={booking.email}
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
                                value={booking.address}
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
                                value={booking.phone}
                                onChange={handleInputChange}
                            />
                            {errors.phone && <div className="error-message" style={{ color: 'red' }}>{errors.phone}</div>}
                        </div>
                        <br></br>
                        {/* Add fields for NIC, Vehicle Type, Pickup Date, Return Date, and Driver */}
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
                                value={booking.nic}
                                onChange={handleInputChange}
                            />
                            {errors.nic && <div className="error-message" style={{ color: 'red' }} >{errors.nic}</div>}
                        </div>
                        <br></br>
                        <div className="mb-4">
                            <label htmlFor="vehicletype" className="form-label px-1">Vehicle Type</label>
                            <input
                                type="text"
                                className="form-control"
                                id="vehicletype"
                                name="vehicletype"
                                placeholder='Vehicle Type'
                                required
                                autoComplete='off'
                                value={booking.vehicletype}
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                        <br></br>
                        <div className="mb-4">
                            <label htmlFor="pickupdate" className="form-label px-1">Pickup Date</label>
                            <input
                                type="text"
                                className="form-control"
                                id="pickupdate"
                                name="pickupdate"
                                placeholder='Pickup Date'
                                required
                                autoComplete='off'
                                value={formatDate(booking.pickupdate)}
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                        <br></br>
                        <div className="mb-4">
                            <label htmlFor="returndate" className="form-label px-1">Return Date</label>
                            <input
                                type="text"
                                className="form-control"
                                id="returndate"
                                name="returndate"
                                placeholder='Return Date'
                                required
                                autoComplete='off'
                                value={formatDate(booking.returndate)}
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                        <br></br>
                        <div className="mb-4">
                            <label htmlFor="driver" className="form-label px-1">Driver</label>
                            <input
                                type="text"
                                className="form-control"
                                id="driver"
                                name="driver"
                                placeholder='Driver'
                                required
                                autoComplete='off'
                                value={booking.driver}
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                        <br></br>
                        <button type="submit" className="btn btn-primary w-100 mt-2 but-1">Update Booking</button>
                    </form>
                </div>
            </div>
        </div>
        <ToastContainer/>
        </div>
    )
}

export default UpdateBooking;
