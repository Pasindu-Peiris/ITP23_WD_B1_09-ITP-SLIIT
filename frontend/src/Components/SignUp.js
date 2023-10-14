import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "./logothisal.jpg";
import backgroundImage from './1587206.jpg';

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: '',
        contact: '',
        nic: '',
    });

    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8090/vehicleOwner/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setRegistrationSuccess(true); // Set the success status to true
                // Assuming successful form submission, navigate to "/vehicleownersmanager"
                navigate('/vehicleownersmanager');
                alert('Registration successful.'); 
            } else {
                console.error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
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
          contactError.style.color = 'red';
        }
      }

      return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover', overflow: 'auto' }}>
            <div>
              {registrationSuccess && (
                <div className="alert alert-success" role="alert">
                  Registration successful.
                </div>
              )}
              <div className='container mt-5'>
                <div className='row d-flex justify-content-center align-middle h-100 mt-5'>
                  <div className='col-4 shadow-lg p-3 mb-5 bg-white rounded'>
                    <div className='row'>
                      <img src={Logo} alt="Logo" style={{ height: '100px' }} />
                    </div>
                    <h3>Vehicle Owner</h3>
                    <h4>Register</h4>
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
                        <label>Location</label>
                        <input
                          type="text"
                          className="form-control"
                          name="location"
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
                      <div className="mb-3" />
                      <button type="submit" className="btn btn-primary col-12">Submit</button>
                      <div className="mb-3" />
                      <Link to="/vehicleownersmanager">
                        <button className="btn btn-secondary col-12">Back</button>
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };