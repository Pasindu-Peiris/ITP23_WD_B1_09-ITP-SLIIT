import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import backgroundImage from './1096643.jpg';
import Papa from 'papaparse';

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

  const createCsv = () => {
    const csvData = filteredOwners.map(owner => ({
      Name: owner.name,
      NIC: owner.nic.toString(),
      Location: owner.location,
      Email: owner.email,
      Contact: owner.contact.toString()
    }));

    const csv = Papa.unparse(csvData);
    const csvDataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;

    const link = document.createElement('a');
    link.setAttribute('href', csvDataUri);
    link.setAttribute('download', 'VehicleOwnersReport.csv');
    document.body.appendChild(link);
    link.click();
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
                  <button className="btn btn-primary col-12" onClick={createCsv}>
  <FontAwesomeIcon icon={faFileCsv} /> 
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
