import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import backgroundImage from './2446691.jpg';

export default function ViewVehicleOwner() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ownerDetails, setOwnerDetails] = useState({
        name: '',
        email: '',
        location: '',
        contact: ''
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchOwnerDetails() {
            try {
                const response = await fetch(`http://localhost:8090/vehicleOwner/get/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setOwnerDetails(data);
                } else {
                    console.error('Failed to fetch owner details');
                }
            } catch (error) {
                console.error('Error fetching owner details:', error);
            }
        }

        fetchOwnerDetails();
    }, [id]);

    const handleRemoveConfirmation = () => {
        setShowModal(true);
    };

    const handleRemove = async () => {
        try {
            const response = await fetch(`http://localhost:8090/vehicleOwner/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Redirect to the manager page after removal
                navigate('/vehicleownersmanager');
            } else {
                console.error('Failed to remove owner');
            }
        } catch (error) {
            console.error('Error removing owner:', error);
        } finally {
            setShowModal(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
          }}>
            <div className='container mt-5'>
                
                <div className='row d-flex justify-content-center mb-5 align-middle h-100 mt-5'>
                    <div className='col-4 shadow-lg p-3 mb-5 bg-white rounded'>
                        <h3>Vehicle Owner Details</h3>
                        <br />
                        <div className='text-start'>
                            {/* Owner Details */}
                            <div className="form-group">
                                <label>Name: </label>
                                <span>{ownerDetails.name}</span>
                            </div>
                            <div className="form-group">
                                <label>Email address: </label>
                                <span>{ownerDetails.email}</span>
                            </div>
                            <div className="form-group">
                                <label>Location: </label>
                                <span>{ownerDetails.location}</span>
                            </div>
                            <div className="form-group">
                                <label>Contact Number: </label>
                                <span>{ownerDetails.contact}</span>
                            </div>
                            <div className="form-group">
                                <label>NIC: </label>
                                <span>{ownerDetails.nic}</span>
                            </div>

                            {/* Back Button */}
                            <p>Want to go back? <Link to="/vehicleownersmanager"><span className='text-primary'>Back</span></Link></p>
                        </div>

                        {/* Update and Remove Buttons */}
                        <div className='row'>
                            <div className='col-6'>
                                <Link to={`/updatevehicleowner/${id}`}>
                                    <button className='btn btn-dark'>Update</button>
                                </Link>
                            </div>
                            <div className='col-6'>
                                <button className='btn btn-danger' onClick={handleRemoveConfirmation}>Remove</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='row d-flex justify-content-center mt-5 align-middle h-100 mt-5'>
                    <div className='col-3 shadow-lg p-3 mb-5 bg-white rounded'>
                    <Link to={`/IndexPage_Update/${id}`}><button className='btn btn-primary col-12'>Add Vehicles</button></Link>
                    </div>
                </div>
            </div>

            {/* Remove Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Removal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove {`${ownerDetails.name}`}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleRemove}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
