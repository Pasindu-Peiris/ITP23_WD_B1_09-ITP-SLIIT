import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav'



function Register() {

  function Notify() {
    toast.success('Successful Login', {
      autoClose: 2000,
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


  function Notify3() {
    toast.warning('Some error with input', {
      autoClose: 2000,
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



  const [fname, setFname] = useState("");
  const [lname, setLname] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

  function setData(e) {
    e.preventDefault();

    const newClient = {

      fname,
      lname,
      email,
      password

    }

    axios.post("http://localhost:8090/client/add", newClient).then(() => {

      Notify();
      setTimeout(function () {
        window.location = '/Login';
      }, 2000); // 2000 milliseconds (2 seconds)


    }).catch((err) => {
      Notify3();
    })

  }



  return (


    <>

      <Nav />

      <section id='sec-from'>

        <div className="container-2 p-4">


          <div className="row justify-content">

            <div className="my-5">

              <div className="card">

                <div className="card-header  px-5 pt-3  pb-1">

                  <h3 className='text-capitalize'>Register</h3>
                  <p>Welcome Back! Please enter your details</p>

                </div>
                <div className="card-body px-5 py-3  rounded-bottom">

                  <form onSubmit={setData}>

                    <div className="mb-4">
                      <label for="fname" className="form-label px-1">First Name</label>
                      <input type="text" className="form-control" id="fname" name="fname" placeholder='First Name' required autoComplete='off' pattern="^[a-zA-Z][a-zA-Z0-9]*$" title='Please Enter Valid Name'

                        onChange={(e) => {

                          setFname(e.target.value);
                        }}

                      />
                    </div>
                    <div className="mb-4">
                      <label for="lname" className="form-label px-1">Last Name</label>
                      <input type="text" className="form-control" id="lname" name="lname" placeholder='Last Name' required autoComplete='off' pattern="^[a-zA-Z][a-zA-Z0-9]*$" title='Please Enter Valid Name'

                        onChange={(e) => {

                          setLname(e.target.value);
                        }}

                      />
                    </div>
                    <div className="mb-4">
                      <label for="email" className="form-label px-1">Email</label>
                      <input type="email" className="form-control" id="email" name="email" placeholder='Email' required autoComplete='off' pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" title='Please Enter Valid Email'

                        onChange={(e) => {

                          setEmail(e.target.value);
                        }}



                      />
                    </div>
                    <div className="mb-4">
                      <label for="password" className="form-label px-1">Password</label>
                      <input type="password" className="form-control" id="password" name="password" placeholder='Password' required autoComplete='off' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"

                        onChange={(e) => {

                          setPassword(e.target.value);


                        }}

                      />

                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-2 but-1">Register</button>
                    <p className='mt-3 atag text-capitalize '>already have account? <a href='/Login' className='ms-1'>Log in</a></p>
                  </form>
                </div>
              </div>
            </div>
            <div className='col-6 next-text'></div>
          </div>
          
        </div>


        <div className='next-text'></div>


      </section>

      <ToastContainer />


    </>
  )

}

export default Register;