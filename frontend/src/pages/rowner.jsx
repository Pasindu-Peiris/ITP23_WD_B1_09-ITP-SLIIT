import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Owner() {
  const [owners, setOwners] = useState([]);
  const [newOwnerName, setNewOwnerName] = useState('');

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const response = await axios.get('/rowners/getowners/');
      setOwners(response.data);
    } catch (error) {
      console.error('Error fetching owners:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewOwnerName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/rowners/createowners', {
        name: newOwnerName, // Assuming your server expects 'name' for the new owner
      });
      console.log('New owner created:', response.data);
      setNewOwnerName(''); // Clear the input field
      fetchOwners(); // Update the owners list
    } catch (error) {
      console.error('Error creating owner:', error);
    }
  };

  return (
    <div>
      {/* <h1>Add a New Owner</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Owner Name:
          <input
            type="text"
            value={newOwnerName}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Add Owner</button>
      </form> */}

      {/* <h2>Owners List</h2> */}
      <ul>
        {owners.map((owner) => (
          <li key={owner._id}>
            {/* {owner.name} */}
            <Link to={`/IndexPage_Update/${owner._id}`}>
              <div className='p-4'>
              <button className='button-24 p-2'>Manage Company Vehicles</button>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Owner;
