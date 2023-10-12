import Nav from './Nav'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';


function Profile() {


    function Notify(msg) {
        toast.success(msg, {
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            position: "top-right",
            draggable: true,
            progress: undefined,
            theme: "dark",
            style: {
                width: '300px',         // Set the width
                height: '100px',        // Set the height
                fontSize: '22px',       // Set the font size
                alignItems: 'center',   // Center align items vertically
                fontFamily: "Ropa Sans",
                display: 'flex',        // Use flexbox to align items
                justifyContent: 'center', // Center align items horizontally
                color: 'white',          // White text color
            },
            bodyClassName: 'custom-toast-body'

        });
    }

    function Notify2() {
        toast.error('Please Selete Image', {
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            position: "top-right",
            draggable: true,
            progress: undefined,
            theme: "dark",
            style: {
                width: '300px',         // Set the width
                height: '100px',        // Set the height
                fontSize: '22px',       // Set the font size
                alignItems: 'center',   // Center align items vertically
                fontFamily: "Ropa Sans",
                display: 'flex',        // Use flexbox to align items
                justifyContent: 'center', // Center align items horizontally
                color: 'white',          // White text color
                borderRadius: '8px'
            },
            bodyClassName: 'custom-toast-body'

        });
    }



    const [userData, setuserData] = useState("");
    const [file, setFile] = useState(null);
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


        /*let id = userData._id;

        axios.get("http://localhost:8090/client/getprofile/" + id).then((res) => {
            setImage(res.data.images);
            //alert(res.data.images);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })*/



    });

    //logout function
    function logout() {

        let id = userData._id;

        localStorage.removeItem("token");
        window.localStorage.clear();

        axios.post("http://localhost:8090/client/logout/" + id ).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });

        window.location = '/'
    }

    //upload image
    const uploadImage = (e) => {

        const formdata = new FormData();
        formdata.append("file", file);

        const id = userData._id;


        //upload image
        axios.post("http://localhost:8090/client/uploadprofile/" + id, formdata)
            .then(res => {
                Notify('Successful Profile Uploaded');
                console.log(res);
                setTimeout(function () {
                    window.location.reload()
                }, 1500); // 2000 milliseconds (2 seconds)

            }).catch(err => {
                Notify2();
                console.log(err);
            })
    }




    //delete profie image
    function DeleteImage() {


        //setImage("pro.png");

        const id = userData._id;

        // delete user profile image
        axios.post("http://localhost:8090/client/deleteprofile/" + id)
            .then(res => {

                Notify("Image Delete Successfull")
                console.log(res);
                setTimeout(function () {
                    window.location.reload()
                }, 1500); // 2000 milliseconds (2 seconds)
            })
            .catch(err => {
                alert("erro in delete image");

                console.log("error delete image");
            });
    }



    return (
        <>
            <Nav />

            <div className='Main-pro'>

                <section id='pro'>
                    <div class="container">

                        <div class="row">

                            <div class="col-lg-5">

                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item "><a href="/" className='text-dark' style={{ fontSize: "1.1rem" }}>Home</a></li>
                                        <li class="breadcrumb-item active" aria-current="page" style={{ fontSize: "1.1rem" }}>Account Details</li>
                                    </ol>
                                </nav>

                                <div class="card mb-4 " id='card1'>
                                    <div class="card-body text-center" id='pimage-up'>

                                        <img src={`http://localhost:8090/Upload/images/` + userData.images} alt=''
                                            class="rounded img-fluid" />

                                        <h5 class="my-2">Hi, {userData.fname}</h5>

                                        <div class="d-block justify-content-center mb-2">


                                            <div className="file2 btn btn-lg mx-auto">
                                                <p className=''><ins>Select Profile Image</ins></p>
                                                <button type="button" class="btn " style={{ padding: "10px" }}><input type='file' class="form-control p-2" id="formFileMultiple" onChange={e => setFile(e.target.files[0])} accept=".jpg, .jpeg, .png" /></button>
                                            </div>

                                            <div class="container-flude">
                                                <button onClick={uploadImage} type='button' className='btn btn-dark mt-1 me-3' style={{ padding: "12px" }}>Upload Profile</button>
                                                
                                                <button type="button" className="btn btn-danger mt-1 ms-5" data-bs-toggle="modal" style={{ padding: "12px" }} data-bs-target="#staticBackdrop"> Remove Profile</button>

                                            </div>

                                        </div>
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
                                                <p class="text-muted mb-0" style={{ fontSize: "1.1rem", textAlign: "left" }} id='new-twxt'>{userData.fname}</p>
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

                                <div class="card my-2" id='card' >
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-9">
                                                <button className='btn btn-success' style={{ padding: "4px" }}><a href={`/gets/${userData._id}`} className="btn btn-success cix">Update</a></button>

                                            </div>
                                            <div class="col-sm-3">

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card my-2" id='card' >
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-9">

                                            </div>
                                            <div class="col-sm-3">
                                                <button className='btn btn-danger' onClick={logout} style={{ padding: "12px" }}>Log Out </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>
                </section>

            </div>


            <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered ">
                    <div class="modal-content ">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Are You sure, removing the profile picture ?</h1>
                            <button type="button " class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-danger"

                                onClick={DeleteImage}

                            >Delete</button>
                        </div>
                    </div>
                </div>
            </div>



            <ToastContainer />


        </>

    )
}


export default Profile;