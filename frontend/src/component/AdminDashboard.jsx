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



function AdminDashboard() {

    return (
        <div className='container-fluid ' style={{ top: "0px", right: "0px" }} >

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
                            <a href="!#"><i className="fa-solid fa-circle-user fa-2xl" style={{ color: "#000000" }}></i></a>
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
                        <li className="nav-item px-4 fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }}>
                            <a className="nav-link active fw-bold" aria-current="page" href="!#">Booking And Reservation </a>
                        </li>
                        <li className="nav-item px-4 fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }}>
                            <a className="nav-link fw-bold" href="/addTour">Tours And Route Planning</a>
                        </li>
                        <li className="nav-item px-4 fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }}>
                            <a className="nav-link fw-bold" href="/AllClient">Client Management </a>
                        </li>
                        <li className="nav-item px-4 fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }}>
                            <a className="nav-link active fw-bold" aria-current="page" href="/AllClient">Finance Management </a>
                        </li>
                        <li className="nav-item px-4 fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }}>
                            <a className="nav-link active fw-bold" aria-current="page" href="/AllClient">Vehicle Management</a>
                        </li>
                        <li className="nav-item px-4 fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }}>
                            <a className="nav-link active fw-bold" aria-current="page" href="/AllClient">Staff Management </a>
                        </li>
                        <li className="nav-item px-4 fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }}>
                            <a className="nav-link active fw-bold" aria-current="page" href="/AllClient">Vehicle Owner Management </a>
                        </li>
                        <li className="nav-item px-4 fs-5 rounded-2" id="block-scopAdmin" style={{ margin: "10px 0px", border: "0px solid #000" }}>
                            <a className="nav-link active fw-bold" aria-current="page" href="/AllClient">Driver Management</a>
                        </li>

                    </ul>


                    <button id="logout" type="button" class="btn btn-outline-danger" style={{ marginTop: "30px" }}><i class="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp;<b>Log Out</b></button>
                </div>
            </div>


            <div className='row px-5 col-12 ' style={{ height: "auto", width: "100%", top: "0px", right: "0px" }}>


                <div className='container-fluid col-12 mx-auto bg-primary px-5 rounded-3' style={{ width: "100%", height: "35vh" }}>
                    <h1 className="text-center mt-5 fw-bolder">Welcome to Dashboard</h1>
                </div>

                <div className='container-fluid row mx-auto px-5 d-flex align-content-center justify-content-center' style={{ marginTop: "100px" }}>

                    <div class="card mx-3 p-2" style={{ width: "18rem", marginTop: "-180px" }}>
                        <div class="">
                            <div className='d-flex align-items-center justify-content-between px-3'>
                                <h5 class="card-title fs-4">Client</h5>
                                <h6 class="card-subtitle mb-2 mt-2 text-muted"><i class="fa-solid fa-user p-3 rounded-2" style={{ color: "#fff", fontSize: "1.5rem", backgroundColor: "#272727" }}></i></h6>
                            </div>
                            <div className='px-3'>
                                <p class="card-text fs-1 fw-bolder d-block aline-item-center justify-center">10</p>
                            </div>
                        </div>
                    </div>


                    <div class="card mx-3 p-2" style={{ width: "18rem", marginTop: "-180px" }}>
                        <div class="">
                            <div className='d-flex align-items-center justify-content-between px-3'>
                                <h5 class="card-title fs-4">Client</h5>
                                <h6 class="card-subtitle mb-2 mt-2 text-muted"><i class="fa-solid fa-user p-3 rounded-2" style={{ color: "#fff", fontSize: "1.5rem", backgroundColor: "#272727" }}></i></h6>
                            </div>
                            <div className='px-3'>
                                <p class="card-text fs-1 fw-bolder d-block aline-item-center justify-center">10</p>
                            </div>
                        </div>
                    </div>


                    <div class="card mx-3 p-2" style={{ width: "18rem", marginTop: "-180px" }}>
                        <div class="">
                            <div className='d-flex align-items-center justify-content-between px-3'>
                                <h5 class="card-title fs-4">Client</h5>
                                <h6 class="card-subtitle mb-2 mt-2 text-muted"><i class="fa-solid fa-user p-3 rounded-2" style={{ color: "#fff", fontSize: "1.5rem", backgroundColor: "#272727" }}></i></h6>
                            </div>
                            <div className='px-3'>
                                <p class="card-text fs-1 fw-bolder d-block aline-item-center justify-center">10</p>
                            </div>
                        </div>
                    </div>


                    <div class="card mx-3 p-2" style={{ width: "18rem", marginTop: "-180px" }}>
                        <div class="">
                            <div className='d-flex align-items-center justify-content-between px-3'>
                                <h5 class="card-title fs-4">Client</h5>
                                <h6 class="card-subtitle mb-2 mt-2 text-muted"><i class="fa-solid fa-user p-3 rounded-2" style={{ color: "#fff", fontSize: "1.5rem", backgroundColor: "#272727" }}></i></h6>
                            </div>
                            <div className='px-3'>
                                <p class="card-text fs-1 fw-bolder d-block aline-item-center justify-center">10</p>
                            </div>
                        </div>
                    </div>



                </div>





                <div className='container-fluid row mx-auto px-5' style={{ marginTop: "60px" }}>
                    <div className='col-4'>
                        <BookingPieChart />
                    </div >
                    <div className='col-4'>
                        <ClientsPieChart />
                    </div>
                    <div className='col-4'>
                        <DriverPieChart />
                    </div >
                </div>


            </div>



        </div>
    )



}


export default AdminDashboard;