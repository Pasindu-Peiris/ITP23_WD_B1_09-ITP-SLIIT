import '../App.css'
import Logo from "../tourImages/Logo.png";
import SideNavLogo from "../tourImages/sideNavico.png";
import BookingPieChart from "./charts/BookingPieChart";
import ToursBarChart from "./charts/ToursBarChart";
import ClientsPieChart from "./charts/ClientsPieChart";
import FinanceLineChart from "./charts/FinanceLineChart";
import VehiclePieChart from "./charts/VehiclePieChart";
import StaffPieChart from "./charts/StaffPieChart";
import VehicleOwnerPieChart from "./charts/VehicleOwnerPieChart";
import DriverPieChart from "./charts/DriverPieChart";
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import axios from 'axios';



function AdminDashboard() {


    const [admin, setAdmin] = useState('');
    const [adminMess, setAdminMess] = useState('');

    const[tours, setTours] = useState([]);
    const[clients, setClient] = useState([]);
    const[vehicles, setVehicles] = useState([]);
    const[drivers, setDrivers] = useState([]);
    
    let tourCounter = 0;
    const tourCount = tours.map(tour => {
        tourCounter++;

    })


    let clientCounter = 0;
    const clientCount = clients.map(client => {
        clientCounter++;

    })

    let vehicleCounter = 0;
    const vehicleCount = vehicles.map(vehicle => {
        vehicleCounter++;

    })

    let driverCounter = 0;
    const driverCount = drivers.map(driver => {
        driverCounter++;

    })

    useEffect(() => {
        AOS.init({ duration: 1000 });

        axios.get("http://localhost:8090/tour/all").then((res) => {
            //console.log(res);
            setTours(res.data);

        }).catch((err) => {
            alert(err.message);
        })

    }, [])

    useEffect(() => {

        //get all users
        function getClients() {

            axios.get("http://localhost:8090/client/").then((res) => {
                setClient(res.data)
                console.log(res)
            }).catch((err) => {
                alert("Can't get Clients");
            })

        }

        getClients();

    }, [])

    useEffect(() => {
        axios.get('http://localhost:8090/vehicles/getVehicles').then(res => {
          setVehicles(res.data);
    
        });
      }, []);

    useEffect(() => {
        axios.get("http://localhost:8090/api/drivers").then(res =>{
            setDrivers(res.data);
        });
        
    },[]);
    


    useEffect(() => {


        //get admin data
        function getAdmin() {
            const token2 = localStorage.getItem('token2');

            if (!token2) {
                document.getElementById('dis-admin').style.display = "none";
                window.location.href = "/"

            } else {
                document.getElementById('dis-admin').style.display = "block";
            }


            if (token2) {
                fetch("http://localhost:8090/admin/getdataAdmin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token2
                    },
                    body: JSON.stringify({ token2: token2 }),
                }).then((res) => res.json()).then((data) => {
                    setAdmin(data);
                    console.log(data);

                }).catch((err) => {

                    console.log(err);
                })
            }



        }

        getAdmin();


    }, [])


    //logout function
    function logout() {
        localStorage.removeItem("Logedina");
        localStorage.removeItem("token2");   
    
        window.location = '/Admin-login-rapid-travels'
    }






    const hadelAdmin = () => {
        if (admin.mtype === "client") {
            
             document.getElementsByClassName('Admin-hadel-login')[0].style.display="none";
             document.getElementsByClassName('Admin-hadel-login')[1].style.display="none";
             document.getElementsByClassName('Admin-hadel-login')[2].style.display="block";
             document.getElementsByClassName('Admin-hadel-login')[3].style.display="none";
             document.getElementsByClassName('Admin-hadel-login')[4].style.display="none";
             document.getElementsByClassName('Admin-hadel-login')[5].style.display="none";
             document.getElementsByClassName('Admin-hadel-login')[6].style.display="none";
             document.getElementsByClassName('Admin-hadel-login')[7].style.display="none";  
    
        }
     }

    hadelAdmin();


    





    return (
        <div className='container-fluid ' style={{ top: "0px", right: "0px" }} id='dis-admin'>

            <nav className="navbar navbar-expand-lg bg-light" style={{ height: "15px" }}>

                <div className="container-fluid px-5">

                    <button class="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i class="fa-solid fa-bars" style={{ fontSize: "1.5rem" }}></i></button>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarText Logo">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        </ul>
                        <span className="navbar-text">
                            <img src={Logo} width="225" alt="Logo" />
                        </span>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 ">

                        </ul>
                        <span className="navbar-text">
                            <h5>Hello, {admin.name}</h5>
                        </span>
                    </div>
                </div>
            </nav>




            <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div class="offcanvas-header">
                    <img src={SideNavLogo} width="40" height="45" alt="sideNavLogo" /><h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">RapidTravels</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item px-4 Admin-hadel-login fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }} >
                            <a className="nav-link active fw-bold" aria-current="page" href='!#' >Booking And Reservation </a>
                        </li>
                        <li className="nav-item px-4 Admin-hadel-login fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }} >
                            <a className="nav-link fw-bold" href="/addTour">Tours And Route Planning</a>
                        </li>
                        <li className="nav-item px-4 Admin-hadel-login fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }} >
                            <a className="nav-link fw-bold" href='/AllClient' >Client Management </a>
                        </li>
                        <li className="nav-item px-4 Admin-hadel-login fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }} >
                            <a className="nav-link active fw-bold" aria-current="page" href='!#'>Finance Management </a>
                        </li>
                        <li className="nav-item px-4 Admin-hadel-login fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }} >
                            <a className="nav-link active fw-bold" aria-current="page" href="/AllClient">Vehicle Management</a>
                        </li>
                        <li className="nav-item px-4 Admin-hadel-login fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }} >
                            <a className="nav-link active fw-bold" aria-current="page" href="/AllClient">Staff Management </a>
                        </li>
                        <li className="nav-item px-4 Admin-hadel-login fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }} >
                            <a className="nav-link active fw-bold" aria-current="page" href="/AllClient">Vehicle Owner Management </a>
                        </li>
                        <li className="nav-item px-4 Admin-hadel-login fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }} >
                            <a className="nav-link active fw-bold" aria-current="page" href="/AllClient">Driver Management</a>
                        </li>

                    </ul>


                    <button onClick={logout} id="logout" type="button" class="btn btn-outline-danger" style={{ marginTop: "30px" }}><i class="fa-solid fa-right-from-bracket" ></i>&nbsp;&nbsp;<b>Log Out</b></button>
                </div>
            </div>

            <div className='row px-5 col-12 ' style={{ height: "auto", width: "100%", top: "0px", right: "0px" }}>
                <div className='container-fluid col-12 mx-auto px-5 rounded-3' style={{ width: "100%", height: "35vh", backgroundColor: "#6553cfa3"}}>
                    <h1 className="text-center mt-5 fw-bolder">Dashboard</h1>
                </div>
                <div className='container-fluid row mx-auto px-1 d-flex align-content-center justify-content-center' style={{ marginTop: "100px" }}>
                    <div class="card mx-2 p-2" id="dashCard" style={{ width: "18rem", marginTop: "-180px" }}>
                        <div class="">
                            <div className='d-flex align-items-center justify-content-between px-3'>
                                <h5 class="card-title fs-4">Tours</h5>
                                <h6 class="card-subtitle mb-2 mt-2 text-muted"><i class="fa-solid fa-location-dot p-3 rounded-2" style={{ color: "#fff", fontSize: "1.5rem", backgroundColor: "#272727" }}></i></h6>
                            </div>
                            <div className='px-3'>
                                <p class="card-text fs-1 fw-bolder d-block aline-item-center justify-center">{tourCounter}</p>
                            </div>
                        </div>
                    </div>

                    <div class="card mx-2 p-2" id="dashCard" style={{ width: "18rem", marginTop: "-180px" }}>
                        <div class="">
                            <div className='d-flex align-items-center justify-content-between px-3'>
                                <h5 class="card-title fs-4">Clients</h5>
                                <h6 class="card-subtitle mb-2 mt-2 text-muted"><i class="fa-solid fa-users p-3 rounded-2" style={{ color: "#fff", fontSize: "1.5rem", backgroundColor: "#272727" }}></i></h6>
                            </div>
                            <div className='px-3'>
                                <p class="card-text fs-1 fw-bolder d-block aline-item-center justify-center">{clientCounter}</p>
                            </div>
                        </div>
                    </div>


                    <div class="card mx-2 p-2" id="dashCard" style={{ width: "18rem", marginTop: "-180px" }}>
                        <div class="">
                            <div className='d-flex align-items-center justify-content-between px-3'>
                                <h5 class="card-title fs-4">Vehicles</h5>
                                <h6 class="card-subtitle mb-2 mt-2 text-muted"><i class="fa-solid fa-car p-3 rounded-2" style={{ color: "#fff", fontSize: "1.5rem", backgroundColor: "#272727" }}></i></h6>
                            </div>
                            <div className='px-3'>
                                <p class="card-text fs-1 fw-bolder d-block aline-item-center justify-center">{vehicleCounter}</p>
                            </div>
                        </div>
                    </div>


                    <div class="card mx-2 p-2" id="dashCard" style={{ width: "18rem", marginTop: "-180px" }}>
                        <div class="">
                            <div className='d-flex align-items-center justify-content-between px-3'>
                                <h5 class="card-title fs-4">Drivers</h5>
                                <h6 class="card-subtitle mb-2 mt-2 text-muted"><i class="fa-solid fa-user p-3 rounded-2" style={{ color: "#fff", fontSize: "1.5rem", backgroundColor: "#272727" }}></i></h6>
                            </div>
                            <div className='px-3'>
                                <p class="card-text fs-1 fw-bolder d-block aline-item-center justify-center">{driverCounter}</p>
                            </div>
                        </div>
                    </div>



                </div>





                <div className='container-fluid row mx-auto px-6' style={{ marginTop: "60px" }}>
                    <div className='col-4'>
                        <BookingPieChart />
                    </div>
                    <div className='col-4'>
                        <ClientsPieChart/>
                    </div>
                    <div className='col-4'>
                        <ToursBarChart/>
                    </div >
                </div>

                <div className='container-fluid row mx-auto px-6' style={{ marginTop: "-245px" }}>
                    <div className='col-4'>
                        <VehiclePieChart />
                    </div>
                    <div className='col-4'>
                        <StaffPieChart />
                    </div>
                    <div className='col-4'>
                        
                    </div >
                </div>

                <div className='container-fluid row mx-auto px-6 pb-5' style={{ marginTop: "60px"}}>
                    <div className='col-4'>
                        <DriverPieChart />
                    </div>
                    <div className='col-8'>
                        <FinanceLineChart/>
                    </div>
                </div>
            </div>

            <div className='container-fluid rounded-top px-5 text-center bg-dark d-flex aline-item-center justify-content-center' style={{height:"10vh"}}>
                <p className='fw-bold fs-5 mt-4 text-light'>Rapid Travels PVT.(Ltd)</p>
            </div>


        </div>
    )



}


export default AdminDashboard;