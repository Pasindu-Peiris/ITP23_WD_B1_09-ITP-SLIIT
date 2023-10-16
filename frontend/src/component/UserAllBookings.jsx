import axios from "axios";
import React, { useState, useEffect , useRef} from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Nav from "./Nav";
import Footer from "./footer";







function UserAllBookings() {
  const [bookings, setBookings] = useState([]);
  const [searchBlock, setSearch] = useState("");

  useEffect(() => {
    function getBookings() {
      axios.get("http://localhost:8090/booking/userAllBookings").then((res) => {
        setBookings(res.data)
        console.log(res)
      }).catch((err) => {
        alert("Can't get Bookings");
      })
    }

    getBookings();
  }, [])

  


  //search user
  const search = (data) => {
    return data.filter((item) =>
        item.name.toLowerCase().includes(searchBlock) ||  
        item.email.toLowerCase().includes(searchBlock) ||
        item.name.toUpperCase().includes(searchBlock));
}
let searchData = search(bookings);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      axios.delete("http://localhost:8090/booking/delete/" + id)
        .then((res) => {
          alert("Booking Deleted");
          window.location.reload();
        })
        .catch((err) => {
          alert("Booking Not Deleted");
        });
    }
  }

//view All User
const [displayCount, setDisplayCount] = useState(5);
const [isViewAll, setIsViewAll] = useState(false);

const handleViewAllClick = () => {
    setIsViewAll(true);
};

//date format
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

  // Function to generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    const element = document.querySelector(".table"); // Replace with the appropriate selector for your table
    html2canvas(element, { scale: 1 }).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      doc.addImage(imageData, "PNG", 10, 10, 180, 0);
      doc.save("booking_report.pdf");
    });
  };



  return (
    <>
    <Nav/>
    <div className="center-content"> {/* Center the content */}
      
      <div className="admin-all">
        <div className="container-box-2 container">
          <h2>Registered booking details</h2>
          <br></br>
          <div className="text-1-bx">
              <div>
              <input onChange={(e) => setSearch(e.target.value)} className="form-control me-2 btn-lg" type="search" placeholder="Search [ Name | Email ]" aria-label="Search" style={{ width: "500px", backgroundColor: "#f1f1f1", height: "50px" }} />
              </div>
              <br></br>
              <div>
              
              <button className="btn btn-outline-dark" type="button" onClick={generatePDF} >Generate Report</button>
              </div>
                        

                    
                    
                    
          </div>
          

        </div>
        <div className="container contab-5 rounded-3">
          <table className="table rounded-3 table-striped table-hover table-bordered">
            <thead className="table-dark rounded-3">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">NIC</th>
                <th scope="col">Vehicle Type</th>
                <th scope="col">Pickup Date</th>
                <th scope="col">Return Date</th>
                <th scope="col">Driver</th>
                <th scope="col">Amount</th>

                <th scope="col" className="mx-auto-1">Action</th>
              </tr>
            </thead>
            <tbody>
              
              {searchData.slice(0, isViewAll ? searchData.length : displayCount).map((booking, index) => {
                
                return (
                  <tr key={index}>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.address}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.nic}</td>
                    <td>{booking.vehicletype}</td>
                    <td>{formatDate(booking.pickupdate)}</td>
                    <td>{formatDate(booking.returndate)}</td>
                    <td>{booking.driver}</td>
                    <td>{booking.amount}</td>
                    
                    <td className="mx-auto-1">
                      <a href={`/getBooking/${booking._id}`} className="btn btn-success cix">Update</a>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleDelete(booking._id)}
                      >Delete</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <br></br>
        <div className=" btn-btn-btn-viewmore">
                    <button
                        className="btn btn-viewmore"
                        onClick={handleViewAllClick}
                    >
                        View All
                    </button>
                </div>
      </div>
      <Footer/>
    </div>
  </>
  )
  
}

export default UserAllBookings;