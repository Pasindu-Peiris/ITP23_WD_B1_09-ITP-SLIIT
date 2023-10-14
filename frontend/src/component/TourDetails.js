import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./footer";
import VSlide2 from './VSSlider2'
import img12 from '../img/appointment.png'
import img13 from '../img/reserve.png'
import img14 from '../img/virus.png'
import img15 from '../img/time-left.png'
import img16 from '../img/group.png'
import AOS from 'aos';
import 'aos/dist/aos.css';


function TourDetails() {
    const { id } = useParams();
    const [tourName, setTourName] = useState("");
    const [origin, setOrigin] = useState("");
    const [distance, setDistance] = useState("");
    const [destination, setDestination] = useState("");
    const [totalCost, setTotalCost] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [Image, setImage] = useState("");




    useEffect(() => {
        AOS.init({ duration: 8000 });

        axios.get("http://localhost:8090/tour/getTour/" + id).then((res) => {
            console.log(res);
            setTourName(res.data.tourName)
            setOrigin(res.data.origin)
            setDestination(res.data.destination)
            setDistance(res.data.distance)
            setTotalCost(res.data.totalCost)
            setDate(res.data.date)
            setDescription(res.data.description)
            setImage(res.data.image)

        }).catch((err) => {
            alert(err.message);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

        axios.get("http://localhost:8090/tour/getTourImages/" + id).then((res) => {


        }).catch((err) => {
            console.log(err);

        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    return (
        <div style={{ backgroundColor: "#f1f1f3", height: "auto", top: "0", bottom: "0", }}>

            <Nav />

            <div className="container mt-5">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item text-dark"><a href="/" className="text-dark fs-6 fw-bold" style={{ textDecoration: "none" }}>Home</a></li>
                        <li class="breadcrumb-item active text-dark fs-6 fw-bold" aria-current="page" >Tours</li>
                        <li class="breadcrumb-item active  fs-6 fw-bold" aria-current="page">{tourName}</li>
                    </ol>
                </nav>
            </div>



            <div className="container d-flex align-content-around justify-content-center mt-5" >


                <div className="col-7" style={{ backgroundColor: "" }}>

                    <img id="tourImage" className=" rounded-2" src={`http://localhost:8090/images/` + Image} style={{ width: "700px" }} alt="" />
                </div>

                <div className="col-5 pe-5 pb-5" style={{ backgroundColor: "" }}>

                    <p className="fs-6 fw-bolder text-secondary">DAY TRIP</p>

                    <h4 className="fs-2 fw-bold mb-5">{tourName}</h4>
                    

                    <div className="d-flex align-content-between justify-content-between" >
                        <div className="d-flex">
                        <p className="fs-6 fw-bold">Origin : </p>
                        <p className="text-justify mx-3">{origin}</p>
                        </div>
                        
                        <div className="d-flex pe-5">
                        <p className="fs-6 fw-bold">Destination :  </p>
                        <p className="text-justify mx-3">{destination}</p>
                        </div>
                    </div>

                    <div className="d-flex">
                        <p className="fs-6 fw-bold">Distance :  </p>
                        <p className="text-justify mx-3">{distance}Km</p>
                    </div>

                    <div className="d-flex">
                        <p className="fs-6 fw-bold">Cost : </p>
                        <p className="text-justify mx-3">{parseFloat(totalCost)?.toFixed(2)} /=</p>
                    </div>

                    <div className="d-flex">
                        <p className="fs-6  fw-bold">Tour Date : </p>
                        <p className="text-justify mx-4">{date}</p>
                    </div>


                    <div className="d-block">
                        <p className="fs-6  fw-bold">Description : </p>
                        <p className="text-justify">{description}</p>
                    </div>

                </div>


            </div>


            <hr className="container my-4" style={{ height: "1px" }}></hr>
            <div className="container mt-5 d-flex aline-item-center justify-content-between"  data-aos="zoom-in-up" >



                <div className="col-6" style={{ backgroundColor: "" }}>
                    <h3 className="fw-bolder ">About this activity</h3>

                    <div className="mt-5 d-flex align-items-start justify-content-start ">

                        <img src={img12} alt="" width={38} className="d-block mb-5" />
                        <div className="d-block ">
                            <p className=" mx-4 fw-bold" style={{ fontSize: "1.1rem" }}>Free cancellation</p>
                            <div>
                                <p className="fs-6 mx-4">Cancel up to 24 hours in advance for a full refund</p>
                            </div>
                        </div>

                    </div>

                    <div className="mt-3 d-flex align-items-start justify-content-start ">
                        <img src={img13} alt="" width={38} className="d-block mb-5" />
                        <div className="d-block ">
                            <p className=" mx-4 fw-bold" style={{ fontSize: "1.1rem" }}>Reserve now & pay later</p>
                            <div>
                                <p className="fs-6 mx-4">Keep your travel plans flexible — book your spot and pay nothing today.</p>
                            </div>
                        </div>

                    </div>

                    <div className="mt-3 d-flex align-items-start justify-content-start ">
                        <img src={img14} alt="" width={38} className="d-block mb-5" />
                        <div className="d-block ">
                            <p className=" mx-4 fw-bold" style={{ fontSize: "1.1rem" }}>Covid-19 precautions</p>
                            <div>
                                <p className="fs-6 mx-4">Special health and safety measures are in place. Check your activity voucher once <br /> you book for full details.</p>
                            </div>
                        </div>

                    </div>

                    <div className="mt-3 d-flex align-items-start justify-content-start ">
                        <img src={img15} alt="" width={38} className="d-block mb-5" />
                        <div className="d-block ">
                            <p className=" mx-4 fw-bold" style={{ fontSize: "1.1rem" }}>Duration 20 - 55 minutes</p>
                            <div>
                                <p className="fs-6 mx-4">Check availability to see starting times.</p>
                            </div>
                        </div>

                    </div>

                    <div className="mt-3 d-flex align-items-start justify-content-start ">
                        <img src={img16} alt="" width={38} className="d-block mb-5" />
                        <div className="d-block " >
                            <p className=" mx-4 fw-bold" style={{ fontSize: "1.1rem" }}>Private group</p>
                            <div>
                                <p className="fs-6 mx-4">Special health and safety measures are in place.</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-5 me-1" style={{ backgroundColor: "" }}>

                    <div class="card w-100">
                        <div class="card-body">
                            <div className="d-flex align-content-between justify-content-between">
                                <h5 class="card-title">Tour Date</h5>
                                <h5 className="card-title bg-danger rounded-1 p-1 text-light">{date}</h5>
                            </div>
                            <h4 className="fw-bold ">RS : {totalCost}</h4>
                            <p class="card-text fs-6 fw-bold text-success">per group up to 54</p>
                            <p class="card-text fs-6 fw-bold">Reserve now & pay later to book your spot and pay nothing today</p>

                            <a href="/addReservations" class="btn btn-primary w-75 p-2 mt-3 ">BOOK NOW</a>
                        </div>
                    </div>
                </div>



            </div>

            <hr className="container my-4" style={{ height: "1px" }}></hr>
            <VSlide2 />
            <Footer />
        </div>


    )



}

export default TourDetails;