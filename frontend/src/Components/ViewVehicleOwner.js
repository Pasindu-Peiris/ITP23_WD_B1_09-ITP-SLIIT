import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import backgroundImage from './2446691.jpg';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';


export default function ViewVehicleOwner() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ownerDetails, setOwnerDetails] = useState({
        name: '',
        email: '',
        location: '',
        contact: '',
        nic: ''
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
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
                navigate('/vehicleownersmanager');
            } else {
                console.error('Failed to remove owner');
            }
        } catch (error) {
            console.error('Error removing owner:', error);
            Swal.fire(
                'Error!',
                'An error occurred. Please try again later.',
                'error'
            );
        } finally {
            setShowModal(false);
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
            }}
        >
            <div className="container mt-5">
                <div className="row d-flex justify-content-center mb-5 align-middle h-100 mt-5">
                    <div className="col-6 shadow-lg p-4 mb-5 rounded-xl"
                        style={{
                            border: '1px solid #eaeaea',
                            borderRadius: '25px', // Increased border radius
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            background: '#f8f9fa', // Light color background
                            color: '#000000', // Black text color
                            position: 'relative', // Set the position to relative
                        }}
                    >
                        <div className="text-center">
                            <h3 style={{ fontSize: '30px', fontWeight: 'bold' }}>Vehicle Owner Details</h3>
                        </div>

                        <br />
                        <div className="text-center d-flex flex-column align-items-center justify-content-center">
                            {/* Owner Details */}
                            <div className="form-group mb-4">
                                <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Name:</label>
                                <span style={{ fontSize: '16px' }}>&nbsp;&nbsp;{ownerDetails.name}</span>
                            </div>
                            <div className="form-group mb-4">
                                <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Email Address:</label>
                                <span style={{ fontSize: '16px' }}>&nbsp;&nbsp;{ownerDetails.email}</span>
                            </div>
                            <div className="form-group mb-4">
                                <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Location:</label>
                                <span style={{ fontSize: '16px' }}>&nbsp;&nbsp;{ownerDetails.location}</span>
                            </div>
                            <div className="form-group mb-4">
                                <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Contact Number:</label>
                                <span style={{ fontSize: '16px' }}>&nbsp;&nbsp;{ownerDetails.contact}</span>
                            </div>
                            <div className="form-group mb-4">
                                <label style={{ fontWeight: 'bold', fontSize: '18px' }}>NIC:</label>
                                <span style={{ fontSize: '16px' }}>&nbsp;&nbsp;{ownerDetails.nic}</span>
                            </div>
                            <div className="container mt-2">
                                {/* Back Button */}
                                <p>
                                    Want to go back?{' '}
                                    <Link to="/vehicleownersmanager">
                                        <FontAwesomeIcon icon={faArrowAltCircleLeft} style={{ marginRight: '0.5em' }} />
                                        <span className="text-primary">Back</span>
                                    </Link>
                                </p>
                            </div>
                        </div>


                        {/* Update and Remove Buttons */}
                        <div className="row text-center align-items-center justify-content-center">
                            <div className="col-10">
                                <div className="row">
                                    <div className="col-4 text-center">
                                        <a href={`/IndexPage_Update/${id}`} className="btn btn-primary" style={{ width: '100%' }}>
                                             Vehicles
                                        </a>
                                    </div>
                                    <div className="col-4 text-center">
                                        <Link to={`/updatevehicleowner/${id}`}>
                                            <button className="btn btn-dark" style={{ width: '100%' }}>Update</button>
                                        </Link>
                                    </div>
                                    <div className="col-4 text-center">
                                        <button className="btn btn-danger" style={{ width: '100%' }} onClick={handleRemoveConfirmation}>Remove</button>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Remove Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Removal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove {`${ownerDetails.name}`}?</Modal.Body>
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
