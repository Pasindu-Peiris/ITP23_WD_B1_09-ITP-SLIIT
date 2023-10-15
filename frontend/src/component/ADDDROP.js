// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';


function Dropadd() {


    const [name, setFname] = useState('');
    const [mtype, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onSubmit = (e) => {

        e.preventDefault();

        const newAdmin = {
            name,
            email,
            password,
            mtype

        }
        axios.post('http://localhost:8090/admin/addAdmin/', newAdmin)
            .then((res) => {
                alert("Done")
            }).catch((err) => {
                alert("jnjin")
            })
    }









    return (
        <>

            <h1>Admin</h1>
            <form className='d-flex align-content-center justify-content-center m-5 '

                onSubmit={onSubmit}
            >

                <div className="" style={{ width: "600px", backgroundColor: "red" }}>

                    <input type="text" placeholder=" name"

                        onChange={(e) => setFname(e.target.value)}

                    /><br></br>

                    <input type="text" placeholder=" email"

                        onChange={(e) => setEmail(e.target.value)}

                    /><br></br>


                    <input type="text" placeholder=" passsword"
                        onChange={(e) => setPassword(e.target.value)}

                    /><br></br>

                    <input type="text" placeholder=" mtype"
                        onChange={(e) => setLname(e.target.value)}
                    /><br></br>
                    <input type='submit' value='Add Course' className='btn btn-primary'

                    /><br></br>

                </div>

            </form>



        </>
    )
}

export default Dropadd;