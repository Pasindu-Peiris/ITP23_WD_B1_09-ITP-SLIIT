
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';
import PDFViewer from '../component/tableNewDis.jsx';
import img2 from '../img/RapidTravels.png'
import { useReactToPrint } from 'react-to-print';




function TableNewDis() {

    const [client, setClient] = useState([]);
    const [searchBlock, setSearch] = useState("");

    useEffect(() => {

        function getClients() {
            axios.get("http://localhost:8090/client/").then((res) => {
                setClient(res.data)
                console.log(res)

            }).catch((err) => {
                alert("Can't get Clients");
            })
        }

        getClients();


    }, [])

    console.log(client)

    const search = (data) => {
        return data.filter((item) => item.fname.toLowerCase().includes(searchBlock) ||
            item.lname.toLowerCase().includes(searchBlock) ||
            item.email.toLowerCase().includes(searchBlock) ||
            item.date.toLowerCase().includes(searchBlock));


    }

    const searchData = search(client);



    //PDF Create
    let [isActionColumnVisible, setIsActionColumnVisible] = useState(true);

    const conponebtRef = useRef();

    const handlePrint2 = useReactToPrint({
        onBeforeGetContent: () => setIsActionColumnVisible(false),

        content: () => conponebtRef.current,

        onAfterPrint: () => setIsActionColumnVisible(true),
        fotter: () => {
            return (
                <div>
                    <img src={img2} alt="Profile" />
                    <h1>covnjdnovnjv</h1>
                    {conponebtRef.current}
                </div>
            );
        },

    });

    var count = 0;








    return (


        <>

            <nav className="navbar navbar-expand-lg bg-light" style={{ height: "10px" }}>

                <div className="container-fluid px-5">

                    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i class="fa-solid fa-bars" style={{ fontSize: "1.5rem" }}></i></button>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        </ul>
                        <span className="navbar-text">
                            Navbar text with an inline element
                        </span>
                    </div>
                </div>
            </nav>

            <div className="" ref={conponebtRef} style={{ width: "100%" }}>

                <header class="text-center text-dark">
                    <h1 class="display-4 py-1 " ><img src={img2} alt="Profile" width={250} className="p-2 rounded" style={{ border: "0px solid #000" }} /></h1>

                </header>


                <div className="container-fluid" >


                    <div className="container-box-2" >


                        <h2 className="fs-5 "><b>Client Account Details</b></h2>

                    </div>


                    <div className=" conainer-fluid " style={{ width: "100%" }} >




                        <table className="table table-white table-striped table-hover table-bordered rounded" style={{ padding: "500px" }}>

                            <thead className="table-dark " >
                                <tr>
                                    <th>count</th>
                                    <th scope="col">Profile Images</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Register Date | Time</th>

                                </tr>
                            </thead>
                            <tbody>

                                {searchData.map((item, index) => (

                                    <tr key={index}>

                                        <td className="text-center">{count = index + 1}</td>
                                        <td id="nextbinimg" ><img src={`http://localhost:8090/Upload/images/` + item.images} alt="profile" className="img-fluid rounded" width="40px" /></td>
                                        <td>{item.fname}</td>
                                        <td>{item.lname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.date}</td>


                                    </tr>

                                ))}
                            </tbody>

                        </table>

                        <div className="row d-flex align-items-center justify-content-center" style={{ width: "500px", marginTop: "50PX" }} >


                            <div className="row d-flex align-items-center justify-content-center pt-4" style={{ width: "500px" }} >


                                <div className="">
                                    <p className="">Signature</p>
                                    <p className="fs-6 "  ><b>Client Manager , Manager Of Rapid Travels <br></br>
                                        New Kandy Road, Malabe</b></p>

                                </div>

                            </div>



                        </div>

                    </div>

                </div>


            </div>






            <div className="text-1-bx row" style={{ bottom: "0px" }}>
                <button className="btn btn-warning fs-5" type="button" style={{ padding: "10px" }} onClick={handlePrint2}> Genarate Report </button>
            </div>


            <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Client Manager</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-3">
                    <li className="nav-item px-4 fs-5" style={{ margin: "10px 0px", border: "1px solid #000" }}>
                            <a className="nav-link active" aria-current="page" href="/Dashboard-admin-rapidTravles">Dashboard</a>
                        </li>
                        <li className="nav-item px-4 fs-5" style={{ margin: "10px 0px", border: "1px solid #000" }}>
                            <a className="nav-link active" aria-current="page" href="/AllClient">Client Details</a>
                        </li>
                        <li className="nav-item px-4 fs-5" style={{ margin: "10px 0px", border: "1px solid #000" }}>
                            <a className="nav-link" href="/AllDrop">Delete Client Details</a>
                        </li>
                        <li className="nav-item px-4 fs-5" style={{ margin: "10px 0px", border: "1px solid #000" }}>
                            <a className="nav-link" href="/ClientDisplay">Report Genarate</a>
                        </li>

                    </ul>

                   

                </div>
            </div>








        </>

    )


}

export default TableNewDis; 