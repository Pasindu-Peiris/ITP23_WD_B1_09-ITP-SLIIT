import React from "react";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import "./queryfilter.css";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';


export default function QueryFilter({ searchDriver, getDrivers }) {
  // State information for the filter by LicenseNumber or CONTACT or both
  const [licenseNumber, setDriverId] = useState("");
  const [contact, setContact] = useState("");
  // For page navigation during button click
  const navigate = useNavigate();

  // Clear the input text
  const clearSearch = () => {
    setDriverId("");
    setContact("");
    getDrivers();
  };

//   function generateCsv() {
//     // Fetch vehicle data
//     const getDrivers = async () => {
//       try {
//         const res = await axios.get("http://localhost:8090/api/drivers");
//         const driversData = res.data; // Assuming this is the correct variable for drivers data
  
//         // Convert the data to CSV format
//         const csvContent =
//           "data:text/csv;charset=utf-8," +
//           "First Name,Last Name,License Number,Email,Vehicle,ContactNumber,Mileage,Address\n" +
//           driversData
//             .map((driver) => {
//               return [

//                 driver.firstName,
//                 driver.lastName,
//                 driver.licenseNumber,
//                 driver.email,               
//                 driver.vehicle,
//                 driver.ContactNumber,
//                 driver.mileage,
//                 driver.address,


//                 ].join(",");
//             })
//             .join("\n");
  
//         // Create a data URI for the CSV file
//         const encodedUri = encodeURI(csvContent);
  
//         // Create a hidden anchor element to trigger the download
//         const link = document.createElement("a");
//         link.setAttribute("href", encodedUri);
//         link.setAttribute("download", "drivers.csv");
//         document.body.appendChild(link);
  
//         // Trigger the download
//         link.click();
//       } catch (err) {
//         console.log(err);
//       }
//     };
  
//     getDrivers();
// //     Swal.fire({
// //       icon: 'success',
// //       title: 'CSV file generated!',
// //       text: 'The CSV file has been successfully generated and downloaded.',
// //     });
// Swal.fire({
//   icon: 'success',
//   title: '<span style="color: white; font-family: Arial, sans-serif; font-size: 24px;">CSV file generated!</span>',
//   html: '<span style="color: #a8a8a8; font-family: Arial, sans-serif; font-size: 16px;">The CSV file has been successfully generated and downloaded.</span>',
//   showConfirmButton: false,
//   background: '#420c36',
//   timer: 3000,
//   customClass: {
//     title: 'my-title-class',
//     popup: 'my-popup-class'
//   }
// });

//   }


function generatePdf() {
  // Fetch vehicle data
  const getDrivers = async () => {
    try {
      const res = await axios.get("http://localhost:8090/api/drivers");
      const driversData = res.data; // Assuming this is the correct variable for drivers data

      // Create a new jsPDF instance
      const doc = new jsPDF();

      // Set text alignment to center
      doc.setFontSize(20);
      doc.text("Driver Management", doc.internal.pageSize.getWidth() / 2, 10, null, null, 'center');

      // Convert the data to PDF format in a grid
      let yOffset = 30;
      const smallFontSize = 10;
      const xGap = 70;
      driversData.forEach((driver, index) => {
        if (index % 3 === 0 && index !== 0) {
          yOffset += 70; // Adjust the vertical gap between rows
        }
        const colPosition = index % 3 * xGap;
        doc.setFontSize(smallFontSize);
        doc.text(`First Name: ${driver.firstName}`, 10 + colPosition, yOffset);
        doc.text(`Last Name: ${driver.lastName}`, 10 + colPosition, yOffset + 8);
        doc.text(`License Number: ${driver.licenseNumber}`, 10 + colPosition, yOffset + 16);
        doc.text(`Email: ${driver.email}`, 10 + colPosition, yOffset + 24);
        doc.text(`Vehicle: ${driver.vehicle}`, 10 + colPosition, yOffset + 32);
        doc.text(`Contact Number: ${driver.ContactNumber}`, 10 + colPosition, yOffset + 40);
        doc.text(`Mileage: ${driver.mileage}`, 10 + colPosition, yOffset + 48);
        doc.text(`Address: ${driver.address}`, 10 + colPosition, yOffset + 56);
      });

      // Save the PDF file
      doc.save("drivers.pdf");

      // Show success message
      Swal.fire({
        icon: 'success',
        title: '<span style="color: white; font-family: Arial, sans-serif; font-size: 24px;">PDF file generated!</span>',
        html: '<span style="color: #a8a8a8; font-family: Arial, sans-serif; font-size: 16px;">The PDF file has been successfully generated and downloaded.</span>',
        showConfirmButton: false,
        background: '#420c36',
        timer: 3000,
        customClass: {
          title: 'my-title-class',
          popup: 'my-popup-class'
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  getDrivers();
}





  // Display the filter jsx
  return (
    <div className="dfilter">
      <div className="dfilterFields">
        <label htmlFor="licenseNumber" className="dfilterLabel">
          License Number
        </label>
        <input
          name="licenseNumber"
          className="dfilterInputs"
          type="text"
          placeholder="Enter License Number"
          value={licenseNumber}
          onChange={(e) => setDriverId(e.target.value)}
        />
      </div>
      <div className="dfilterFields">
        <label htmlFor="contact" className="dfilterLabel">
           Contact Number
        </label>
        <input
          name="contact"
          className="dfilterInputs"
          type="text"
          placeholder="Enter Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <div className="dfilterFields">
        <div className="dbtn-container">

          <button 
          type="dbutton"
            className="dqueryBtn"
            onClick={() => searchDriver(licenseNumber, contact)}>
            Search
          </button>

          <button 
          type="button" className="dqueryBtn" onClick={clearSearch}>
            Clear
          </button>

          <button
            type="button"
            className="dqueryBtn"
            onClick={() => navigate("/add_driver")}>
            Add Driver
          </button>

          <button
            type="button"
            className="dqueryBtn"
            onClick={generatePdf}>
            Report
          </button>
        </div>
      </div>
    </div>
  );
}
