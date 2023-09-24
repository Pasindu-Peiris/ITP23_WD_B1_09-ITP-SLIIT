import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { useParams } from 'react-router-dom';

function UpadateUser() {

    const { id } = useParams();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState(" ");
    const [email, setEmail] = useState(" ");



    useEffect(() => {

        function updateClients() {

            axios.get('http://localhost:8090/client/get/' + id).then((res) => {


                setFname(res.data.fname);
                setLname(res.data.lname);
                setEmail(res.data.email);
                console.log(res)

            }).catch((err) => {
                console.log(err)
            })

        }

        updateClients();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const Update = (e) => {

        e.preventDefault();
        axios.put("http://localhost:8090/client/updated/" + id, { fname, lname, email }).then(result => {
            alert("User Updated")
            window.location = '/AllClient';


        }).catch((err) => {
            alert("User Not Updated");
            console.log(err)
        })

    }



    return (
        <div className="admin-all admin-next">


            <div className=" container dotbox">
                
                <h2>Update client account details</h2>

            </div>


            <div className="container contab-5 rounded-3 adminnext">


                <div className="card-body px-5 py-3  rounded-bottom">

                    <form onSubmit={Update}>

                        <div className="mb-4">
                            <label for="fname" className="form-label px-1">First Name</label>
                            <input type="text" className="form-control" id="fname" name="fname" placeholder='First Name' required autoComplete='off' value={fname}
                                pattern="^[a-zA-Z][a-zA-Z0-9]{2,}$" title='Please Enter Valid Name'
                                onChange={(e) => {

                                    setFname(e.target.value);
                                }}

                            />
                        </div>
                        <div className="mb-4">
                            <label for="lname" className="form-label px-1">Last Name</label>
                            <input type="text" className="form-control" id="lname" name="lname" placeholder='Last Name' required autoComplete='off' value={lname}
                                pattern="^[a-zA-Z][a-zA-Z0-9]{2,}$" title='Please Enter Valid Name'
                                onChange={(e) => {

                                    setLname(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label for="email" className="form-label px-1">Email</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder='Email' required autoComplete='off' value={email}
                                pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" title='Please Enter Valid Email'
                                onChange={(e) => {

                                    setEmail(e.target.value);
                                }}

                            />

                        </div>

                        <button type="submit" className="btn btn-primary w-100 mt-2 but-1">Update User</button>

                    </form>
                </div>
            </div>

        </div>


    )
}






export default UpadateUser;