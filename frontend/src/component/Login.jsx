import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';

function Login() {

    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");

    function Notify() {
        toast.success('Successful Login', {
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


    function Notify3() {
        toast.warning('Password not match', {
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


    var count = 0;  

    axios.defaults.withCredentials = true;
    function loginhadle(e) {

        e.preventDefault();
        axios.post("http://localhost:8090/client/login", { email, password }).then(result => {
            console.log(result.data.status)
            if (result.data.status === "Success") {

                console.log(result.data.token);
                Notify();
                setTimeout(function () {

                    window.localStorage.setItem("token", result.data.token);
                    window.localStorage.setItem("Logedin", true);
                    window.location = '/';

                }, 1500); // 2000 milliseconds (2 seconds)

                console.log(result.data)
            }
            else if (result.data === "password not match") {
                Notify3();
            }
            else if (result.data === "User Not Found") {
                Notify2();

                count = count + 1;

                //if user ender wrong password 3 times then redirect to register page
                if(count === 3){
                    setTimeout(function () {
                        count = 0;
                        window.location = '/Register'
                    }, 1500); // 2000 milliseconds (2 seconds)
                }

               
            }

        }).catch((err) => console.log(err))

    }


    //validation for email and password
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
    
    
      const passwordCheck = (password) => {
    
        if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
          document.getElementById('error4').innerHTML = "Password matched";
          document.getElementById('error4').style.color = "#009150";
          document.getElementById('password').style.border = "2px solid #1a191a00";
    
        }
        else {
          document.getElementById('error4').innerHTML = "Password not matched";
          document.getElementById('error4').style.color = "red";
          document.getElementById('password').style.border = "2px solid red";
    
        }
    
        setTimeout(function () {
          document.getElementById('error4').innerHTML = " ";
        }, 6000); // 2000 milliseconds (2 seconds)
      }

      
    

    return (

        <>

            <Nav />
            <section id='sec-from'>

                <div className="container-2 p-4" >


                    <div className="row justify-content">

                        <div className="my-5" >

                            <div className="card" >

                                <div className="card-header  px-5 pt-3  pb-1">

                                    

                                    <h3 className='text-capitalize fw-bold '>Log In</h3>
                                    <p>Welcome Back! Please enter your details</p>

                                </div>

                                <div className="card-body px-5 py-3  rounded-bottom" >

                                    <form onSubmit={loginhadle}>

                                        <div className="mb-4">
                                            <label for="email" className="form-label px-1 d-flex align-items-center justify-content-between">Email <div className='' style={{ color: "red" }} id='error3'></div></label>
                                            <input type="email" className="form-control" id="email" name="email" placeholder='Email' required autoComplete='off'

                                                onChange={(e) => {

                                                    setEmail(e.target.value);
                                                }}

                                                onKeyUp={(e) => {
                                                    emailCheck(e.target.value)
                                                  }}

                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label for="password" className="form-label px-1 d-flex align-items-center justify-content-between">Password <div className='' style={{ color: "red" }} id='error4'></div></label>
                                            <input type="password" className="form-control" id="password" name="password" placeholder='Password' required autoComplete='off'

                                                onChange={(e) => {

                                                    setPassword(e.target.value);
                                                }}

                                                onKeyUp={(e) => {

                                                    passwordCheck(e.target.value);
                          
                                                  }}


                                            />
                                            <p className='mt-3 atag text-capitalize '><a href='/forget' className='ms-1'>Forget Password?</a></p>
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100 mt-2 but-1">Log In</button>
                                        <p className='mt-3 atag text-capitalize '>Not member yet?  <a href='/Register' className='ms-1'>Create an account</a></p>
                                    </form>
                                </div>

                            </div>
                        </div>
                        <div className='col-6 next-text'></div>

                    </div>
                </div>


                <div className='next-text'>


                </div>

                <ToastContainer />

            </section>


        </>

    )
}

export default Login;