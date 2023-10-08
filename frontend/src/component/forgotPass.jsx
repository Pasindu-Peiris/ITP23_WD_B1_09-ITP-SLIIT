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

    //validation
    const isEmailValid = (email) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
      }
    
      const emailCheck = (email) => {
    
        if (isEmailValid(email)) {
          document.getElementById('error3').innerHTML = "Success";
          document.getElementById('error3').style.color = "#009150";
          document.getElementById('email').style.border = "2px solid #1a191a00";
        }
        else {
          document.getElementById('error3').innerHTML = "Enter Invalid Email";
          document.getElementById('error3').style.color = "red";
          document.getElementById('email').style.border = "2px solid red";
    
        }
        setTimeout(function () {
          document.getElementById('error3').innerHTML = " ";
        }, 6000); // 2000 milliseconds (2 seconds)
    
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

                                    <h3 className='text-capitalize py-2'>Forget Password</h3>
                                    <p>Lost your password? <br></br> Please enter your email address. You will receive a link to create a new password via email.</p>

                                </div>
                                <div className="card-body px-5 py-3  rounded-bottom">

                                    <form onSubmit={fogetpasshadle}>

                                        <div className="mb-4">
                                            <label for="email" className="form-label px-1 d-flex align-items-center justify-content-between ">Email <div className='' style={{ color: "red" }} id='error3'></div></label>
                                            <input type="email" className="form-control" id="email" name="email" placeholder='Email' required autoComplete='off' pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" title='Please Enter Valid Email'

                                                onChange={(e) => {

                                                    setEmail(e.target.value);
                                                }}

                                                onKeyUp={(e) => {
                                                    emailCheck(e.target.value)
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