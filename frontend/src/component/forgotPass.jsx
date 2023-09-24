import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';



function Login() {


    function Notify2() {
        toast.error('User Not Found', {
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

    function Notify() {
        toast.success('Password reset link sent to your email', {
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


    const [email, setEmail] = useState(" ");


    function fogetpasshadle(e) {

        e.preventDefault();
        axios.post("http://localhost:8090/client/forget/", { email }).then(result => {
            console.log(result)
            if (result.data.msg === "Success") {

                Notify();

                setTimeout(function () {
                    window.location = '/'
                }, 1500); // 2000 milliseconds (2 seconds)

                //console.log(result.data)
            }
            else {
                Notify2();
            }


        }).catch((err) => console.log(err))

    }

    return (

        <>
            <Nav />

            <section id='sec-from'>

                <div className="container-2 p-5 ">

                    <div className="row justify-content">

                        <div className="my-5">

                            <div className="card">

                                <div className="card-header  px-5 pt-3  pb-1">

                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item active" aria-current="page" style={{ fontSize: "1.1rem" }}><i class="fa-solid fa-caret-left" style={{ fontSize: "1.1rem" }}></i><a href="/" className='text-dark' style={{ fontSize: "1.1rem", textDecoration: "none" }}>HOME</a></li>
                                        </ol>
                                    </nav>

                                    <h3 className='text-capitalize py-2'>Forget Password</h3>
                                    <p>Lost your password? <br></br> Please enter your email address. You will receive a link to create a new password via email.</p>

                                </div>
                                <div className="card-body px-5 py-3  rounded-bottom">

                                    <form onSubmit={fogetpasshadle}>

                                        <div className="mb-4">
                                            <label for="email" className="form-label px-1">Email</label>
                                            <input type="email" className="form-control" id="email" name="email" placeholder='Email' required autoComplete='off' pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" title='Please Enter Valid Email'

                                                onChange={(e) => {

                                                    setEmail(e.target.value);
                                                }}

                                            />
                                        </div>

                                        <button type="submit" className="btn btn-primary w-100 my-2 but-1">Send</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>


                <div className='col-6 next-text'></div>



            </section>

        </>


    )
}

export default Login;