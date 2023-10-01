import React, { useEffect, useState } from "react";
import axios from "axios";
import './Vehicle.css';
import { differenceInCalendarDays } from "date-fns";
import { Link, useParams, useNavigate } from "react-router-dom";
import AddressLink from "../Components/AddressLink.jsx";
import Default_Layout from "../Components/Default_Layout.jsx";
import Swal from 'sweetalert2';
import { format } from "date-fns";
import {Navigate} from "react-router-dom";
axios.defaults.baseURL = 'http://localhost:8090';

export default function Vehicles() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [redirect,setRedirect] = useState('');
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [type, setType] = useState();
  const [license, setLicense] = useState();
  const [model, setModel] = useState();
  const [location, setLocation] = useState();
  const [year, setYear] = useState();
  const [seat, setSeat] = useState();
  const [mileage, setMileage] = useState();
  const [transmission, setTransmission] = useState();
  const [fuel, setFuel] = useState();
  const [perks, setPerks] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [price, setPrice] = useState();
  const [owner, setOwner] = useState();
  const currentDate = new Date();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [pickup, setpickup] = useState('');
  const [dropoff, setdropoff] = useState('');
  const [name, setname] = useState();
  const [status, setStatus] = useState("Available");
  const [description, setDescription] = useState();
  const [isInvalidDatePopupVisible, setInvalidDatePopupVisible] = useState(false);
  const currentTime = format(currentDate, "HH:mm");

  useEffect(() => {
    axios
      .get("/vehicles/upVehicles/" + id)
      .then((result) => {
        console.log(result);
        setType(result.data.type);
        setOwner(result.data.owner);
        const ownerId = result.data.owner_id;
      if (ownerId && ownerId.name) {
        setname(ownerId.name);
      }
        setLicense(result.data.license);
        setModel(result.data.model);
        setLocation(result.data.location);
        setYear(result.data.year);
        setSeat(result.data.seat);
        setMileage(result.data.mileage);
        setTransmission(result.data.transmission);
        setFuel(result.data.fuel);
        setPerks(result.data.perks);
        setPhotos(result.data.photos);
        setPrice(result.data.price);
        setDescription(result.data.description);
        setOwner(result.data.owner);
        setCheckIn(result.data.checkIn);
        setCheckOut(result.data.checkOut);
        setpickup(result.data.pickup);
        setdropoff(result.data.dropoff);
        setStatus(result.data.status);
      })
      .catch((err) => console.log(err));
  }, []);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {model}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>
          {photos?.length > 0 &&
            photos.map((link) => (
              <div key={link}>
                <img
                  className="rounded-2xl"
                  src={"http://localhost:8090/" + link}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const totalPrice = numberOfNights > 0 ? numberOfNights * price : 0;

 
  

  return (
    <Default_Layout>
      <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8 py-4 px-4 mx-auto">
        <div className="py-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="text-3xl">{model}&nbsp;- ({year})</h1>
          <div
            
            className="rounded-md px-8 py-2 shadow bg-black text-white"
          >
            {license}
          </div>
        </div>
        <AddressLink>{location}</AddressLink>
        <div className="relative">
          <div class="grid gap-1 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
            <div class="h-full p2">
              {photos?.[0] && (
                <div key={photos[0]}>
                  <img
                    src={"http://localhost:8090/" + photos?.[0]}
                    className="rounded-2xl object-cover w-full h-full cursor-pointer"
                    alt=""
                  />
                </div>
              )}
            </div>
            <div class="grid p1">
              {photos?.[1] && (
                <img
                  src={"http://localhost:8090/" + photos?.[1]}
                  className="rounded-2xl object-cover w-full h-full cursor-pointer"
                  alt=""
                />
              )}
              <div class="overflow-hidden p1">
                {photos?.[2] && (
                  <img
                    src={"http://localhost:8090/" + photos?.[2]}
                    className="rounded-2xl object-cover w-full h-full cursor-pointer"
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
              />
            </svg>
            Show more photos
          </button>
        </div>

        <div >

          <h2 className="font-semibold text-2xl">Owner: {name}</h2>







        </div>

        <div>
          <h2 className="font-semibold text-2xl py-2">Description</h2>
          {description ? (
            description.split('\n').map((line, index) => (
              <div key={index}>
                {line}
                <br />
              </div>
            ))
          ) : (
            <p>No description available</p>
          )}
        </div>
            <br></br>
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 py-4 mx-auto bg-white shadow p-4 rounded-2xl">

          <div>
            <h2 className="font-semibold text-2xl py-1">Extra Details</h2>
            <div class="info-grid">
              <div class="info-box">
                <div class="info-label">Current Mileage</div>
                <div class="info-value">{mileage} km/l</div>
              </div>
              <div class="info-box">
                <div class="info-label">Transmission</div>
                <div class="info-value">{transmission}</div>
              </div>
              <div class="info-box">
                <div class="info-label">Fuel Capacity</div>
                <div class="info-value">{fuel} Litres</div>
              </div>
              <div class="info-box">
                <div class="info-label">Number of Seats</div>
                <div class="info-value">{seat}</div>
              </div>
            </div>
            <div>
          


            </div>


          </div>

          <div>
            <div>
              <div className="p-4">

                     <div>
                <h2 className="font-semibold text-2xl py-1">Additional Features</h2>
              </div>
              <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
  <div className="grid grid-cols-3 gap-4">
    {perks.map((perk, index) => (
      <div key={index} className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
        </svg>
        {perk}
      </div>
    ))}
  </div>
</div>

             
              </div>
            </div>

          </div>

        </div>
      </div>
    </Default_Layout>
  );
}