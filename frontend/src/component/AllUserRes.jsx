import React from 'react';
import Nav from './Nav';
import axios from 'axios';
import { useState, useEffect } from 'react';






function AllUserRes() {

    const [res, setRes] = useState('');
    const [uid, setuid] = useState("");
    const [res2, setRes2] = useState('');
    const [res3, setRes3] = useState('');


    //get data user id to From
    function getUser2() {
        const token = localStorage.getItem("token");





        if (token) {
            fetch("http://localhost:8090/client/userdata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                },
                body: JSON.stringify({ token: token }),
            }).then((res) => res.json()).then((data) => {

                console.log(data);
                setuid(data._id);


            }).catch((err) => {

                console.log(err);
            })
        }
    }
    getUser2();






    useEffect(() => {

        function updateReservations() { // Changed the function name

            axios.get('http://localhost:8090/reservation/AllReservations/') // Changed the API endpoint
                .then((res) => {
                    setRes(res.data);
                    console.log(res.data);
                    
                })
                .catch((err) => {
                    console.log(err)
                    
                })
        }

        updateReservations();

        
        res.length > 0 && res.map((book, index2) => {
            if(book.uid === uid){
                setRes3(book);
                return null;
            }
            return null;
        })
        


    })













    return (
        <div style={{ backgroundColor: "#f1f1f1", width: "100%", height: "auto" }}>
            <Nav />

            <div className='d-flex aline-item-center justify-content-center mt-5'>



                <div className=' w-50 h-75'>
                    <h3 className='text-center'>Booking Details</h3>
                    <p className='fs-6 text-center pt-2'>Fill up the following form for your reservation</p>

                   
                    <table className="table  bg-light mt-5" >

                      


                        <thead >
                            <tr className='table-secondary rounded-2'>
                                <th scope="col">PRODUCT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <p className='p-2'>Name : {res3.name} </p>
                                    <p className='p-2'>email : {res3.email} </p>
                                    <p className='p-2'>address : {res3.address} </p>
                                    <p className='p-2'>phone : {res3.phone} </p>
                                    <p className='p-2'>Nic : {res3.nic} </p>
                                    <p className='p-2'> Vehicle : {res3.vehicle}</p>
                                    <p className='p-2'> No Of Guests : {res3.noofguests}</p>
                                    <p className='p-2'> date : {res3.date}</p>
                                    <p className='p-2'> Amount : {res3.amount}</p>

                          
                                </th>


                            </tr>

                        </tbody>
                    </table>
                    
                </div>



            </div>



        </div>
    )
}

export default AllUserRes;