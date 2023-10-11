import Nav from './Nav'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';


function Booking() {





    const [userData, setuserData] = useState("");
    //const [file, setFile] = useState(null);
    //const [image, setImage] = useState(null);

    useEffect(() => {


        function getUser() {
            const token = localStorage.getItem("token");

            if (!token) window.location = '/login'



            if (token) {
                fetch("http://localhost:8090/client/userdata", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token
                    },
                    body: JSON.stringify({ token: token }),
                }).then((res) => res.json()).then((data) => {
                    setuserData(data);
                    console.log(data);

                }).catch((err) => {

                    console.log(err);
                })
            }
        }
        getUser();


       


    });




    return (
        <>
            <Nav />

            <div className='Main-pro'>

                <section id='pro'>
                    <div class="container">

                        <div class="row">

                            <div class="col-lg-5">

                               
                                <div class="card mb-4 " id='card1'>
                                    <div class="card-body text-center" id='pimage-up'>

                                        <img src={`http://localhost:8090/Upload/images/` + userData.images} alt=''
                                            class="rounded img-fluid" />

                                        <h5 class="my-2">Hi, {userData._id}</h5>
                                        
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-7" id='col-new'>

                                <div class="card" id='card'>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0" style={{ fontSize: "1.1rem", textAlign: "left" }} id='new-twxt'><b>First Name</b></p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0" style={{ fontSize: "1.1rem", textAlign: "left" }} id='new-twxt'>{userData._id}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card my-2" id='card'>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0" style={{ fontSize: "1.1rem", textAlign: "left" }} id='new-twxt'><b>Last Name</b></p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0" style={{ fontSize: "1.1rem", textAlign: "left" }} id='new-twxt'>{userData.lname}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card my-2" id='card'>
                                    <div class="card-body">
                                        <div class="row " id='venu'>
                                            <div class="col-sm-3">
                                                <p class="mb-0" style={{ fontSize: "1.1rem", textAlign: "left" }} id='new-twxt'><b>Email</b> </p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0" style={{ fontSize: "1.1rem", textAlign: "left" }} id='new-twxt'>{userData.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                

                            </div>



                        </div>
                    </div>
                </section>

            </div>


            


            <ToastContainer />


        </>

    )
}


export default Booking;