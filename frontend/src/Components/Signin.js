import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "./logothisal.jpg"

export default function SignIn() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8090/vehicleOwner/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/homeVehicleOwner');
            } else {
                console.error('Failed to sign in');
            }
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <div>
            <div className='container mt-5'>
                <div className='row d-flex justify-content-center align-middle h-100 mt-5'>
                    <div className='col-4 shadow-lg p-3 mb-5 bg-white rounded'>
                    <div className='row'>
                        <img src={Logo} alt="Logo" style={{ height: '100px' }} />
                        </div>
                        <h3>Vehicle Owner</h3>
                        <h4>SignIn</h4>
                        <br />
                        <form className='text-start' onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" name="email" onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" onChange={handleInputChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary col-12">Submit</button>
                            <p>Don't have an Account?<Link to="/vehicleowner/signup"><span className='text-primary'>Register</span></Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

