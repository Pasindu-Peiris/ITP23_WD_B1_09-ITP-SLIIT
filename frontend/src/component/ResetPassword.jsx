import React, { useState, } from 'react';
import axios from 'axios';
import '../App.css';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {

    const [password, setPassword] = useState(" ");
    const { id, token } = useParams();

    function Notify() {
        toast.success('Password successfully Reset', {
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
        toast.error('The token has expired, try again ', {
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

    function fogetpasshadle(e) {

        e.preventDefault();
        axios.post(`http://localhost:8090/client/resetpassword/${id}/${token}`, { password }).then(result => {
            console.log(result)
            if (result.data.msg === "Success") {
                Notify();

                setTimeout(function () {
                    window.location = '/Login'
                }, 1500); // 2000 milliseconds (2 seconds)

                //console.log(result.data)
            }
            else {
                Notify2();
                setTimeout(function () {
                    window.location = '/forget'
                }, 2500); // 2000 milliseconds (2 seconds)

               
            }


        }).catch((err) => console.log(err))

    }

    return (

        <section id='sec-from'>

            <div className="container-2 p-5 ">

                <div className="row justify-content">

                    <div className="my-5">

                        <div className="card">

                            <div className="card-header  px-5 pt-3  pb-1">

                                <h3 className='text-capitalize py-2'>Reset Password</h3>
                                <p>Lost your password? <br></br> Please enter your email address. You will receive a link to create a new password via email.</p>

                            </div>
                            <div className="card-body px-5 py-3  rounded-bottom">

                                <form onSubmit={fogetpasshadle}>

                                    <div className="mb-4">
                                        <label for="password" className="form-label px-1">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" placeholder='Password' required autoComplete='off' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"

                                            onChange={(e) => {

                                                setPassword(e.target.value);
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


            <div className='next-text'>


            </div>


        </section>


    )
}

export default Login;