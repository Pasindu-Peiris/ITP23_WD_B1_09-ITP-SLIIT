import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "./logothisal.jpg"
import backgroundImage from './123.jpg';

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: '',
        contact: '',
        nic: '', // New field for NIC
        password: '',
        confirmPassword: '',
    });

    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const checkPasswordConfirmation = () => {
        setPasswordMatch(formData.password === formData.confirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatch(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8090/vehicleOwner/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Assuming successful form submission, navigate to "/homeVehicleOwner"
                navigate('/vehicleownersmanager');
            } else {
                console.error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        
             <div style={{
            backgroundImage: `url(${backgroundImage})`, 
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            height: '100%', 
        }}>
            <div className='container mt-5'>
                <div className='row d-flex justify-content-center align-middle h-100 mt-5'>
                    <div className='col-4 shadow-lg p-3 mb-5 bg-white rounded'>
                        <div className='row'>
                            <img src={Logo} alt="Logo" style={{ height: '100px' }} />
                        </div>
                        <h3>Vehicle Owner</h3>
                        <h4>SignUp</h4>
                        <br />
                        <form className='text-start' onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" name="name" onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" name="email" onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input type="text" className="form-control" name="location" onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Contact Number</label>
                                <input type="tel" className="form-control" name="contact" onChange={handleInputChange} required
                                 pattern="^[0-9]{10}?$"
                                 title="Please enter exactly 10 digits as in Contact Number" />
                            </div>
                            <div className="form-group">
                                <label>NIC</label>
                                <input type="text" className="form-control" name="nic" onChange={handleInputChange} required 
                                pattern="^[0-9]{10}?$"
                                title="Please enter exactly 10 digits as in NIC"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" onChange={(e) => { handleInputChange(e); checkPasswordConfirmation(); }} required />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" className="form-control" name="confirmPassword" onChange={(e) => { handleInputChange(e); checkPasswordConfirmation(); }} required />
                                {!passwordMatch && <small className="text-danger">Passwords do not match.</small>}
                            </div>
                            <button type="submit" className="btn btn-primary col-12">Submit</button>
                            <p>Want to go back? <Link to="/vehicleownersmanager"><span className='text-primary'>Back</span></Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
