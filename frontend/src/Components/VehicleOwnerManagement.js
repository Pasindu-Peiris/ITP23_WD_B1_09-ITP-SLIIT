import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import backgroundImage from './1096643.jpg';
import { PDFDocument, rgb } from 'pdf-lib';
import Swal from 'sweetalert2';


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

  const filteredOwners = vehicleOwners.filter(owner =>
    owner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const createPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
  
    const { width, height } = page.getSize();
  
    const title = 'Vehicle Owners Detail'; // Add your title here
  
    const titleSize = 20;
    const textSize = 11;
    const titleColor = rgb(0, 0, 0);
    const textColor = rgb(0, 0, 0);
    const spacing = 20;
  
    let y = height - 50;
  
    const titleWidth = titleSize * title.length / 1.5; // Adjust the factor to position the title correctly
    const titleX = (width - titleWidth) / 2;
  
    page.drawText(title, {
      x: titleX,
      y,
      size: titleSize,
      color: titleColor,
    });
    y -= spacing * 2; // Increase the spacing after the title
  
    filteredOwners.forEach((owner) => {
      const { name, location, nic, email, contact } = owner;
  
      page.drawText(`Name: ${name}`, {
        x: 50,
        y,
        size: textSize,
        color: textColor,
      });
      y -= spacing;
  
      page.drawText(`NIC: ${nic}`, {
        x: 50,
        y,
        size: textSize,
        color: textColor,
      });
      y -= spacing;
  
      page.drawText(`Location: ${location}`, {
        x: 50,
        y,
        size: textSize,
        color: textColor,
      });
      y -= spacing;
  
      page.drawText(`Email: ${email}`, {
        x: 50,
        y,
        size: textSize,
        color: textColor,
      });
      y -= spacing;
  
      page.drawText(`Contact: ${contact}`, {
        x: 50,
        y,
        size: textSize,
        color: textColor,
      });
      y -= spacing;
  
      y -= spacing;
    });
  
    const pdfBytes = await pdfDoc.save();
  
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'VehicleOwnersReport.pdf';
    link.click();
  
    Swal.fire({
      icon: 'success',
      title: 'PDF file generated!',
      text: 'The PDF file has been successfully generated and downloaded.',
    });
  };

 
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover', overflow: 'auto' }}>
        <div className="h-100">
          <div className="container">
            <div className="row mt-5 py-5">
              <div className="col-12 mt-3">
                <div className="row">
                  <div className="col-8">
                    <h1 style={{ fontWeight: 'bold', color: 'black', align: 'center' }}>Vehicle Owner Management</h1>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <input
                        type="search"
                        placeholder="Search Name"
                        className="form-control"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
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
                  <div className="col-1">
                    <Link to="/vehicleowner/signup">
                      <button
                        className="btn btn-primary rounded-2xl bg-slate-500 button-25"
                      >
                        Add Vehicle Owner
                      </button>

                    </Link>
                    <div className="mb-3" />
                  </div>
                </div>
              </div>
              <table className="table table-white">
                <thead style={{ backgroundColor: 'black', color: 'black' }}>
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
                  {filteredOwners.map(owner => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
