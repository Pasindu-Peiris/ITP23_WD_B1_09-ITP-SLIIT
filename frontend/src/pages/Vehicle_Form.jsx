import react from 'react'
import { useState } from 'react'
import axios from 'axios'
import './Vehicle.css';
import { useNavigate, useParams } from 'react-router-dom'
import Perks from "../Components/Perks.jsx";
import Photos from "../Components/Photos.jsx";
import Default_Layout from '../Components/Default_Layout.jsx';
import StatusToggle from '../Components/StatusToggle.jsx';
import { Form_Validation } from '../Components/Form_Validation.jsx';
import Swal from 'sweetalert2';
axios.defaults.baseURL = 'http://localhost:8090';


function Vehicle_Form() {
  
  
  const { ownerId } = useParams();
  const [validationErrors, setValidationErrors] = useState({});
  const [type, settype] = useState()
  const [license, setlicense] = useState()
  const [model, setmodel] = useState()
  const [location, setlocation] = useState()
  const [year, setyear] = useState()
  const [seat, setseat] = useState()
  const [mileage, setmileage] = useState()
  const [transmission, settransmission] = useState()
  const [fuel, setfuel] = useState()
  const [perks, setperks] = useState([])
  const [photos, setphotos] = useState([])
  const [price, setprice] = useState()
  const [description, setdescription] = useState()
  const [status, setStatus] = useState('Available');


  const handleStatusToggle = (newStatus) => {
    setStatus(newStatus);
  };

  const clearPhotoValidationError = () => {
    setValidationErrors({ ...validationErrors, photos: '' });
  };

  const navigateBack = () => {
    window.history.back();}
  const navigate = useNavigate()

  
  const Submit = (e) => {
    e.preventDefault();


    Form_Validation
      .validate(
        {
          type,
          license,
          model,
          location,
          year,
          seat,
          mileage,
          transmission,
          fuel,
          perks,
          photos,
          price,
          description,
          status,
        },
        { abortEarly: false }
      )
      .then(() => {

        Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to submit the form. Confirm?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, submit it!',
          cancelButtonText: 'No, cancel',
        }).then((result) => {
          if (result.isConfirmed) {

            

            axios.post('/vehicles/createVehicles/', {
              owner_id: ownerId,
              type,
              license,
              model,
              location,
              year,
              seat,
              mileage,
              transmission,
              fuel,
              perks,
              photos,
              price,
              description,
              status,
              
            }).then((response) => {
              console.log(response);

              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Form submitted successfully!',
              }).then(() => {

                navigateBack();
              });
            }).catch((error) => {
              console.error(error);
            });
          }
        });
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          const errors = {};
          error.inner.forEach((err) => {
            errors[err.path] = err.message;
          });
          setValidationErrors(errors);
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Please check the following fields:',
            html: `<ul>${Object.values(errors).map((err) => `<li>${err}</li>`).join('')}</ul>`,
          });
        } else {

          console.error(error);
        }
      });
  };

  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }


  return (
    <Default_Layout>
      <div className="px-4 mx-auto">
        <form onSubmit={Submit}>
        
        <div className="flex justify-between items-center py-4">
            
            <div className="flex items-center ">
            {preInput('--- Add new Vehicle ---')}
            </div>
            <StatusToggle status={status} onToggle={handleStatusToggle} />
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

            <div>
              {preInput('Vehicle Type', 'Select the type of Vehicle.')}
              <select value={type} onChange={(e) => {
                settype(e.target.value);
                setValidationErrors({ ...validationErrors, type: '' });
              }}>
                <option></option>
                <option>Car</option>
                <option>Motorcycle</option>
                <option>Bus</option>
                <option>Van</option>
                <option>Truck</option>
                <option>Three-Wheeler</option>
              </select
              >
              {validationErrors.type && (
                <p className="text-red-500 italic">* {validationErrors.type}</p>
              )}
            </div>


            <div>
              {preInput('Number Plate', 'Enter Characters in the Registration Plate. ')}

              <input
                type="text"
                placeholder="e.g:-AB-2020"
                value={license}
                onChange={(e) => {
                  setlicense(e.target.value);
                  setValidationErrors({ ...validationErrors, license: '' });
                }}
              />
              {validationErrors.license && (
                <p className="text-red-500 italic">* {validationErrors.license}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div>
              {preInput('Make & Model', 'Enter Make & Model of the Vehicle.')}
              <input
                type="text"
                placeholder=""
                value={model}
                onChange={(e) => {
                  setmodel(e.target.value);
                  setValidationErrors({ ...validationErrors, model: '' }); // Clear validation error
                }}
              />
              {validationErrors.model && (
                <p className="text-red-500 italic">* {validationErrors.model}</p>
              )}
            </div>

            <div>
              {preInput('Year', 'Vehicle Manufactured Year.')}
              <input
                type="number"
                placeholder=""
                value={year}
                onChange={(e) => {
                  setyear(e.target.value);
                  setValidationErrors({ ...validationErrors, year: '' });
                }}
              />
              {validationErrors.year && (
                <p className="text-red-500 italic">* {validationErrors.year}</p>
              )}
            </div>



            <div>

              {preInput('Fuel Capacity', 'Enter Fuel Capacity in Litres.')}
              <input
                type="number"
                placeholder="e.g:-50"
                value={fuel}
                onChange={(e) => {
                  setfuel(e.target.value);
                  setValidationErrors({ ...validationErrors, fuel: '' }); // Clear validation error
                }}
              />
              {validationErrors.fuel && (
                <p className="text-red-500 italic">* {validationErrors.fuel}</p>
              )}
            </div>


            <div>
              {preInput('Mileage', 'Enter Current Mileage of the Vehicle km/l.')}
              <input
                type="number"
                placeholder="e.g:-20000"
                value={mileage}
                onChange={(e) => {
                  setmileage(e.target.value);
                  setValidationErrors({ ...validationErrors, mileage: '' }); // Clear validation error
                }}
              />
              {validationErrors.mileage && (
                <p className="text-red-500 italic">* {validationErrors.mileage}</p>
              )}
            </div>

          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

            <div>
              {preInput('Transmission Type', '')}
              <div>
                <input
                  type="radio"
                  name="transmission"
                  value="Auto"
                  checked={transmission === "Auto"} // Check if "Auto" is selected
                  onChange={(e) => {
                    settransmission("Auto");
                    setValidationErrors({ ...validationErrors, transmission: '' });
                  }}
                />
                &nbsp;Auto
              </div>
              <div>
                <input
                  type="radio"
                  name="transmission"
                  value="Manual"
                  checked={transmission === "Manual"}
                  onChange={(e) => {
                    settransmission("Manual");
                    setValidationErrors({ ...validationErrors, transmission: '' });
                  }}
                />
                &nbsp;Manual
              </div>
              {validationErrors.transmission && (
                <p className="text-red-500 italic">* {validationErrors.transmission}</p>
              )}
            </div>

            <div>
              {preInput('Location', 'Pickup & Dropoff location of the Vehicle.')}
              <input
                type="text"
                placeholder=""
                value={location}
                onChange={(e) => {
                  setlocation(e.target.value);
                  setValidationErrors({ ...validationErrors, location: '' }); // Clear validation error
                }}
              />
              {validationErrors.location && (
                <p className="text-red-500 italic">* {validationErrors.location}</p>
              )}
            </div>







            <div></div>
          </div>
          {preInput('Additional Features', 'Select additional features if available.')}
          <div className="grid mt-2 gap-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
            <Perks selected={perks} onChange={setperks} />
          </div>

          <div>
            {preInput('Photos', 'Upload full size images of the vehicle both Interior and Exterior.')}

            
            <Photos addedPhotos={photos} onChange={setphotos} clearPhotoValidationError={clearPhotoValidationError} />
            {validationErrors.photos && (
              <p className="text-red-500 italic">* {validationErrors.photos}</p>
            )}
          </div>

          {preInput('Description', 'Enter some description of the Vehicle')}
          <textarea placeholder='Write Here' className='h-25'
            value={description} onChange={(e) => setdescription(e.target.value)} />


          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
            
            
            <div>
              
              <h3 className="mt-2 -mb-1 py-2">Number of Seats</h3>
              <input
                type="number"
                value={seat}
                onChange={(e) => {
                  setseat(e.target.value);
                  setValidationErrors({ ...validationErrors, seat: '' }); 
                }}
              />
              {validationErrors.seat && (
                <p className="text-red-500 italic">* {validationErrors.seat}</p>
              )}
            </div>
            <div>
              
              <h3 className="mt-2 -mb-1 py-2">Price per hour</h3>
              <input
                type="number"
                value={price}
                placeholder='e.g:-20000'
                onChange={(e) => {
                  setprice(e.target.value);
                  setValidationErrors({ ...validationErrors, price: '' }); 
                }}
              />
              {validationErrors.price && (
                <p className="text-red-500 italic">* {validationErrors.price}</p>
              )}
            </div>
          </div>





          <div className="text-left">
            <div className='py-4 mx-auto'>
              <button class="button-24  py-1 px-4" role="button">Submit</button>
            </div>
          </div>

        </form>
      </div>
    </Default_Layout>
  )
}

export default Vehicle_Form