import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Default_Layout from "../Components/Default_Layout";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../index.css'

axios.defaults.baseURL = 'http://localhost:8090';

export default function IndexPage() {
  const { ownerId } = useParams();
  const [Vehicles, setVehicles] = useState([])
  const [records, setrecords] = useState([])
  const [statusFilter, setStatusFilter] = useState("all");

 
  
  function formatPriceWithComma(price) {
    if (typeof price !== 'number') {
      return price;
    }


    const priceString = price.toString();

    if (priceString.length < 4) {
      return priceString;
    }

    const firstPart = priceString.slice(0, priceString.length - 3);
    const lastThreeDigits = priceString.slice(-3);

    return `${firstPart},${lastThreeDigits}`;
  }

  

  const generatePDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const page = document.getElementById('pdf-content');
  
    html2canvas(page).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('vehicle-details.pdf');
    });
  };

  // useEffect(() => {
  //   axios.get('/getVehicles/').then(res => {
  //     {
  //       setVehicles(res.data)
  //       setrecords(res.data)
  //     };
  //   });
  // }, []);
  
  useEffect(() => {
    
    axios.get('/vehicles/getVehicles/' + ownerId )
      .then(res => {
        setVehicles(res.data);
        setrecords(res.data);
      });
  }, [ownerId]); // Add ownerId to the dependency array

  


  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this vehicle!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete('/vehicles/deleteVehicle/' + id)
          .then((res) => {
            console.log(res);
            Swal.fire('Deleted!', 'The vehicle has been deleted.', 'success');
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            Swal.fire('Error', 'An error occurred while deleting the vehicle.', 'error');
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The vehicle was not deleted.', 'info');
      }
    });
  };

 

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    if (status === "all") {
      setrecords(Vehicles);
    } else {
      setrecords(Vehicles.filter((vehicle) => vehicle.status === status));
    }
  };

  const Filter = (e) => {
    const searchText = e.target.value.toLowerCase();

    setrecords(Vehicles.filter(vehicle =>
      (vehicle.type && vehicle.type.toLowerCase().includes(searchText)) ||
      (vehicle.model && vehicle.model.toLowerCase().includes(searchText)) ||
      (vehicle.owner && vehicle.owner.toLowerCase().includes(searchText))
    ));
  }
  return (
    <Default_Layout>
      <div className="flex-1 px-2">
        <label className="relative block py-2">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2 m-2 p-2">
            <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
          </span>
          <input
            className="placeholder-italic placeholder-text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
            onChange={Filter}
          />
        </label>
      </div>

      <div className="flex items-center justify-center">
        <Link to={`/Vehicle_Form/${ownerId}`}>
          <div className="inline-flex items-center m-1 p-2 text-black bg-green-500 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            <span>Add new Vehicle</span>
          </div>

        </Link>




        <div className="flex flex-1">

        <button className=" flex-1 w-32 m-1 p-2 text-black bg-purple-400 border rounded-xl"
        onClick={generatePDF}>Generate Report
        </button>

          <button
            onClick={() => handleStatusFilter("all")}
            className="flex-1 w-32 m-1 p-2 text-black border bg-purple-400  rounded-xl"
          >
            All Vehicles
          </button>
          <button
            onClick={() => handleStatusFilter("Available")}
            className="flex-1 w-32 m-1 p-2 text-black border bg-purple-400  rounded-xl"
          >
            Available
          </button>
          <button
            onClick={() => handleStatusFilter("Unavailable")}
            className="flex-1 w-32 m-1 p-2 text-black border bg-purple-400 rounded-xl"
          >
            Unavailable
          </button>
        </div>


      </div>





      <div className=" grid gap-x-4 gap-y-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 py-2 px-2 mx-auto">

      <div id="pdf-content" className="p-1">
        {records.length > 0 && records.map(Vehicle => (
          <Link to={`/Vehicle_2/${Vehicle._id}`} className="link-wrapper2">
            

<div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="mb-2 rounded-2xl flex flex-col">{Vehicle.photos?.[0] && (
                <img className="rounded-2xl h-32  object-cover" src={'http://localhost:8090/' + Vehicle.photos?.[0]} alt='' />
              )}</div>
                <div>
                <h3 className={`text-xl ${Vehicle.status === 'Available' ? 'text-green-500' : 'text-red-500'} font-semibold`}>
  {Vehicle.status === 'Available' ? 'Available' : (
    <span className="text-md">
      Unavailable <br />{Vehicle.checkIn}  {Vehicle.checkOut}
    </span>
  )}
</h3>

              <h2 className="font-semibold text-base">- {Vehicle.type} : {Vehicle.model} - {Vehicle.year} -</h2>
              
             
                <h3 className="text-sm text-black-500 ">Owner Name :&nbsp; {Vehicle.owner_id.name}</h3>
                <h3 className="text-sm text-black-500 ">Current Mileage : &nbsp; {Vehicle.mileage}</h3>

                {/* <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6.5 6.326a6.52 6.52 0 01-1.5 .174 6.487 6.487 0 01-5.011-2.36l.49-.98a.423.423 0 01.614-.164l.294.196a.992.992 0 001.491-1.139l-.197-.593a.252.252 0 01.126-.304l1.973-.987a.938.938 0 00.361-1.359.375.375 0 01.239-.576l.125-.025A2.421 2.421 0 0012.327 6.6l.05-.149a1 1 0 00-.242-1.023l-1.489-1.489a.5.5 0 01-.146-.353v-.067a6.5 6.5 0 015.392 9.23 1.398 1.398 0 00-.68-.244l-.566-.566a1.5 1.5 0 00-1.06-.439h-.172a1.5 1.5 0 00-1.06.44l-.593.592a.501.501 0 01-.13.093l-1.578.79a1 1 0 00-.553.894v.191a1 1 0 001 1h.5a.5.5 0 01.5.5v.326z" clipRule="evenodd" />
                  </svg>
                  
                  <h3 className="text-sm text-gray-500 ml-2">Location : &nbsp; {Vehicle.location}</h3>
                  
                </div> */}
              

              
              </div>

              <div>
                  
              <div className="grid grid-cols-2">
              {Vehicle.perks.map((perk, index) => (
      <div key={index} className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
        </svg>&nbsp;
        {perk}
      </div>
    ))}
      </div>
             </div>
              
        <div> <div className="flex justify-between">
  <div className="flex items-center">
    
    <h2 className="font-semibold text-sm">Rs.&nbsp;{formatPriceWithComma(Vehicle.price)} / hour</h2>
  </div>

  <div className="flex items-center space-x-2">
  <Link to={`/Vehicle_Update/${Vehicle._id}`}>
    <div className="flex link-wrapper3 rounded-md p-1 border-green-500 shadow px-1"><div>
      
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" className="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      
    </div>
    <div className="font-bold text-green-500">Edit</div></div></Link>
    <Link onClick={(e) => handleDelete(Vehicle._id)}>
    <div className="flex link-wrapper3 shadow px-1 rounded-md p-1 border-red-500"><div>
      
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" className="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      
    </div>
    <div className="font-bold text-red-500 ">Delete</div></div></Link>
  </div>
</div>


</div>  
    </div>



          </Link>
        ))}
         </div>
      </div>
    </Default_Layout>
  );
}



