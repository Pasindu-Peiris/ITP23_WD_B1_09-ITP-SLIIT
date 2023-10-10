import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import { PDFDocument, rgb } from 'pdf-lib';
import Default_Layout from "./Default_Layout";
import { Link } from 'react-router-dom';
import backgroundImage from './1096643.jpg';

export default function VehicleOwnerManagement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [vehicleOwners, setVehicleOwners] = useState([]);

    useEffect(() => {
        async function fetchVehicleOwners() {
            try {
                const response = await fetch('http://localhost:8090/vehicleOwner/');
                if (response.ok) {
                    const data = await response.json();
                    setVehicleOwners(data);
                } else {
                    console.error('Failed to fetch vehicle owners');
                }
            } catch (error) {
                console.error('Error fetching vehicle owners:', error);
            }
        }

        fetchVehicleOwners();
    }, []);

    const filteredOwners = vehicleOwners.filter((owner) =>
        owner.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const createPdf = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([400, 600]);

        

        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        const pdfUrl = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = pdfUrl;
        a.download = 'VehicleOwnersReport.pdf';
        a.click();
    };

    return (
<Default_Layout>
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
            <div className="h-100">
                <div className="container">
                    <div className="row mt-5 py-5">
                        <div className="col-12 mt-3">
                            <div className="row">
                            <div className="col-50">
                                <h1 style={{ fontWeight: 'bold', color: 'black' }}>Vehicle Owner Management</h1>
                                    </div>

                                <div className="col-9">
                                    <div className="input-group">
                                        <input
                                            type="search"
                                            placeholder="Search Name"
                                            className="form-control"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" type="button">
                                                <FontAwesomeIcon icon={faSearch} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-1">
                                    <button className="btn btn-secondary col-12" onClick={createPdf}>
                                        <FontAwesomeIcon icon={faFilePdf} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table className="table table-white">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">NIC</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOwners.map((owner) => (
                                    <tr key={owner._id}>
                                        <td>{owner.name}</td>
                                        <td>{owner.nic}</td>
                                        <td>{owner.location}</td>
                                        <td>{owner.email}</td>
                                        <td>{owner.contact}</td>
                                        <td>
                                            <Link to={`/vehicleowner/${owner._id}`}>
                                                <button className="btn btn-primary">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            <Link to="/vehicleowner/signup"><button className='btn btn-primary'>Add Vehicle Owner </button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Default_Layout>
    );
}
