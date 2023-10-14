import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import backgroundImage from './1096642.jpg';
import Swal from 'sweetalert2';


export default function UpdateVehicleOwner() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: '',
        contact: '',
        nic: '',
    });

    useEffect(() => {
        async function fetchOwnerDetails() {
            try {
                const response = await fetch(`http://localhost:8090/vehicleOwner/get/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    console.error('Failed to fetch owner details');
                }
            } catch (error) {
                console.error('Error fetching owner details:', error);
            }
        }

        fetchOwnerDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8090/vehicleOwner/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Owner updated successfully!',
                }).then(() => {
                    navigate(`/vehicleowner/${id}`);
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to update owner!',
                });
            }
        } catch (error) {
            console.error('Error updating owner:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred. Please try again later!',
            });
        }
    };

    function validateName() {
        const nameInput = document.querySelector('[name="name"]');
        const nameError = document.getElementById('name-error');
        const name = nameInput.value.trim();
      
        if (name === '') {
            if (nameError) {
                nameInput.setCustomValidity('Name is required.');
                nameError.textContent = 'Name is required.';
                nameError.style.color = 'red';
            }
        } else if (!/^[a-zA-Z\s]*$/.test(name)) {
            if (nameError) {
                nameInput.setCustomValidity('Name can only contain letters and spaces.');
                nameError.textContent = 'Name can only contain letters and spaces.';
                nameError.style.color = 'red';
            }
        } else {
            if (nameError) {
                nameInput.setCustomValidity('');
                nameError.textContent = '';
                nameError.style.color = 'red';
            }
        }
    }
    
      
      function validateEmail() {
        const emailInput = document.querySelector('[name="email"]');
        const emailError = document.getElementById('email-error');
        const email = emailInput.value.trim();
      
        
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      
        if (email === '') {
          emailInput.setCustomValidity('Email address is required.');
          emailError.textContent = 'Email address is required.';
          emailError.style.color = 'red';
        } else if (!emailRegex.test(email)) {
          emailInput.setCustomValidity('Enter a valid email address.');
          emailError.textContent = 'Enter a valid email address.';
          emailError.style.color = 'red';
        } else {
          emailInput.setCustomValidity('');
          emailError.textContent = '';
          emailError.style.color = 'red';
        }
      }
      function validateNIC() {
        const nicInput = document.querySelector('[name="nic"]');
        const nicError = document.getElementById('nic-error');
        const nic = nicInput.value.trim();
        
        const nicRegex = /^\d{10}$/; // Corrected variable name
        
        if (nic === '') {
          nicInput.setCustomValidity('NIC is required.');
          nicError.textContent = 'NIC is required.';
          nicError.style.color = 'red';
        } else if (!nicRegex.test(nic)) {
          nicInput.setCustomValidity('Enter a valid NIC.');
          nicError.textContent = 'Enter a valid NIC.';
          nicError.style.color = 'red';
        } else {
          nicInput.setCustomValidity('');
          nicError.textContent = '';
          
        }
      }
      
      
      function validateContactNumber() {
        const contactInput = document.querySelector('[name="contact"]');
        const contactError = document.getElementById('contact-error');
        const contact = contactInput.value.trim();
      
       
        const contactRegex = /^\d{10}$/; 
      
        if (contact === '') {
          contactInput.setCustomValidity('Contact number is required.');
          contactError.textContent = 'Contact number is required.';
          contactError.style.color = 'red';
        } else if (!contactRegex.test(contact)) {
          contactInput.setCustomValidity('Enter a valid contact number.');
          contactError.textContent = 'Enter a valid contact number.';
          contactError.style.color = 'red';
        } else {
          contactInput.setCustomValidity('');
          contactError.textContent = '';
        }
      }

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, height: '100vh', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
            <div className='container mt-5'>
                <div className='row d-flex justify-content-center align-middle h-100 mt-5'>
                    <div className='col-15 shadow-lg p-3 mb-5 bg-white rounded'>
                        <h3>Update Vehicle Owner</h3>
                        <br />
                        <form className='text-start' onSubmit={handleSubmit}>
                            <div className="">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    onInput={validateName}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onInput={validateEmail} 
                                    required
                                />
                                <span id="email-error" className="error"></span>
                            </div>

                            <div className="form-group">
                                <label>NIC</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nic"
                                    value={formData.nic}
                                    onChange={handleInputChange}
                                    onInput={validateNIC}
                                    required
                                />
                                <span id="nic-error" className="error"></span>
                            </div>

                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Contact Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                    onInput={validateContactNumber}
                                    required
                                />
                                <span id="contact-error" className="error"></span>
                            </div>
                            <div className="mb-3" />
                            <button type="submit" className="btn btn-primary col-12">Update</button>
                            {/*<p>Want to go back? <Link to="/vehicleownersmanager"><span className='text-primary'>Back</span></Link></p>*/}
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
