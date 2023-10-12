// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';


function Dropadd() {


    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [deleteddate, setDeleteddate] = useState('');
    const [images, setImages] = useState('');
    const [lastlogin, setLastlogin] = useState('');


    const onSubmit = (e) => {

        e.preventDefault();

        const newDropclient = {
            fname,
            lname,
            email,
            password,
            deleteddate,
            images,
            lastlogin

        }

        axios.post('http://localhost:8090/dropclient/adddropclient', newDropclient)
            .then((res) => {
                alert("Done")
            }).catch((err) => {
                alert("jnjin")
        })
    }









    return (
        <>

            <form className='d-flex align-content-center justify-content-center m-5 '

                onSubmit={onSubmit}
            >

                <div className="" style={{ width: "600px", backgroundColor: "red" }}>

                    <input type="text" placeholder="Enter Course ID"

                        onChange={(e) => setFname(e.target.value)}

                    /><br></br>
                    <input type="text" placeholder="Enter Course Name"
                        onChange={(e) => setLname(e.target.value)}
                    /><br></br>
                    <input type="text" placeholder="Enter Course Description"

                        onChange={(e) => setEmail(e.target.value)}

                    /><br></br>
                    <input type="text" placeholder="Enter Course Instructor"
                        onChange={(e) => setPassword(e.target.value)}

                    /><br></br>
                    <input type="text" placeholder="Enter Course Credits"
                        onChange={(e) => setDeleteddate(e.target.value)}

                    /><br></br>
                    <input type="text" placeholder="Enter Course Time"
                        onChange={(e) => setImages(e.target.value)}

                    /><br></br>

                    <input type="text" placeholder="Enter Course Time"
                        onChange={(e) => setLastlogin(e.target.value)}

                    /><br></br>
                    <input type='submit' value='Add Course' className='btn btn-primary'

                    /><br></br>

                </div>

            </form>












        </>
    )
}

export default Dropadd;