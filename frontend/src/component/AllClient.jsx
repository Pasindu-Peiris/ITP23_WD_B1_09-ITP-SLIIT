/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReactToPrint } from 'react-to-print';


function AllClient() {
   

    function Notify() {
        toast.success('User Deleted Successful', {
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

    const [client, setClient] = useState([]);
    const [searchBlock, setSearch] = useState("");
    const [dropClient, setDropClient] = useState([]);

    useEffect(() => {
        

        

        //get all users
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

    



    //delete user
    /* const hadelDelete = (id) => {
        axios.delete("http://localhost:8090/client/delete/" + id).then((res) => {

            Notify();
            setTimeout(function () {
                window.location.reload();
            }, 2000); // 2000 milliseconds (2 seconds)


        }).catch((err) => {
            alert("User Not Deleted");
        })
    } */



    //get client data using id
    const hadelDelete = (id) => {
        axios.get("http://localhost:8090/client/deleted/" + id).then((res) => {

            //set data to delete function and drop client
            hadeldropclient(res.data)
            hadelDeleteRow(res.data._id)

        }).catch((err) => {
            alert("User Not Deleted");
        })
    }

    //delete user
    const hadelDeleteRow = (id) => {
        axios.delete("http://localhost:8090/client/delete/" + id).then((res) => {

            Notify();
            setTimeout(function () {
                window.location.reload();
            }, 2000); // 2000 milliseconds (2 seconds)


        }).catch((err) => {
            alert("User Not Deleted");
        })

    }

    //add drop client
    function hadeldropclient(dropClient){


        const newDropclient = {
            fname: dropClient.fname,
            lname: dropClient.lname,
            email: dropClient.email,
            password: dropClient.password,
            date: dropClient.date,
            lastlogin: dropClient.lastlogin,
            images: dropClient.images,

        }


        axios.post('http://localhost:8090/dropclient/adddropclient/', newDropclient)
            .then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
        
    }
    





    //search user
    const search = (data) => {
        return data.filter((item) =>
            item.fname.toLowerCase().includes(searchBlock) ||
            item.lname.toLowerCase().includes(searchBlock) ||
            item.email.toLowerCase().includes(searchBlock) ||
            item.fname.toUpperCase().includes(searchBlock) ||
            item.lname.toUpperCase().includes(searchBlock));
    }
    let searchData = search(client);


    //view All User
    const [displayCount, setDisplayCount] = useState(10);
    const [isViewAll, setIsViewAll] = useState(false);

    const handleViewAllClick = () => {
        setIsViewAll(true);
    };


    //PDF Create
    let [isActionColumnVisible, setIsActionColumnVisible] = useState(true);

    const conponebtRef = useRef();

    const handlePrint = useReactToPrint({
        onBeforeGetContent: () => setIsActionColumnVisible(false),

        content: () => conponebtRef.current,
        
        onAfterPrint: () => setIsActionColumnVisible(true),
        

    });

    var count = 0;

    const  Activity = "true"

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
                            Admin Profile Icon Like Home Page
                        </span>
                    </div>
                </div>
            </nav>

            <div className="admin-all" >


                <div className="container-box-2 container-fluid px-5">

                    <h2 className="bg-dark text-white p-1 rounded">Client Details</h2>

                    <form className="d-flex" >
                        <input onChange={(e) => setSearch(e.target.value)} className="form-control me-2 btn-lg" type="search" placeholder="Search [ Name | Email ]" aria-label="Search" style={{ width: "500px", backgroundColor: "#f1f1f1", height: "50px" }} />

                    </form>

                    <div className="text-1-bx">
                        <button className="btn btn-warning" type="button" style={{ padding: "10px" }} onClick={handlePrint}> Genarate Report </button>
                    </div>

                </div>


                <div className="container-fluid contab-5 px-5 pt-2 " style={{}}>


                    <div ref={conponebtRef} style={{ width: "120%" }}>
                        <table className="table table-light table-striped table-hover table-bordered rounded " style={{}} id="table-visi">

                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center">Count</th>
                                    <th scope="col">Profile Image</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th colSpan="col">Register Date</th>
                                    <th scope="col">Status</th>
                                    <th colSpan="col">Last Login Date | Time</th>
                                    {isActionColumnVisible && <th scope="col" className="mx-auto-1">Action</th>}
                                </tr>
                            </thead>
                            <tbody>


                                {searchData.slice(0, isViewAll ? searchData.length : displayCount).map((item, index) => (

                                    <tr key={index}>

                                        <td className="text-center">{count = index + 1}</td>
                                        <td id="nextbinimg" ><img src={`http://localhost:8090/Upload/images/` + item.images} alt="profile" className="img-fluid rounded" width="35px" /></td>
                                        <td>{item.fname}</td>
                                        <td>{item.lname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.date}</td>
                                        <td>{ item.status === 'true' ? <span className="px-2  text-dark rounded-4 bg-warning p-1">Online</span> : <span className="px-2 text-light rounded-4 bg-danger p-1">Offline</span>  }</td>
                                        <td>{item.lastlogin}</td>



                                        {isActionColumnVisible && (
                                            <td className="mx-auto-1">

                                                <a href={`/get/${item._id}`} className="btn btn-success cix"><i class="fa-solid fa-pen-to-square" style={{color: "#ffffff"}}></i></a>


                                                <button type="button" className="btn btn-danger ms-2" onClick={
                                                    (e) => hadelDelete(item._id)}
                                                >
                                                   <i class="fa-solid fa-trash" style={{color: "#ffffff"}}></i>

                                                </button>


                                            </td>
                                        )}

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>
                
                <div className=" d-flex align-items-center justify-content-center pb-4">
                    <button
                        className="btn  text-dark btn-link"
                        onClick={handleViewAllClick}
                    >
                        View All
                    </button>
                </div>

                <ToastContainer />

            </div>


            <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Client Manager</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-3">
                        <li className="nav-item px-4 fs-5" style={{ margin: "10px 0px", border: "1px solid #000" }}>
                            <a className="nav-link active" aria-current="page" href="/AllClient">Client Details</a>
                        </li>
                        <li className="nav-item px-4 fs-5" style={{ margin: "10px 0px", border: "1px solid #000" }}>
                            <a className="nav-link" href="/ClientDisplay">Report Genarate</a>
                        </li>
                        <li className="nav-item px-4 fs-5" style={{ margin: "10px 0px", border: "1px solid #000" }}>
                            <a className="nav-link" href="/AllDrop">Delete Client Details</a>
                        </li>

                    </ul>

                    <a className="nav-link nav-item px-3 fs-5 pt-5" href="/Dashboard-admin-rapidTravles" style={{ color: "red", paddingTop: "800px" }}>Log Out</a>

                </div>
            </div>





        </>

    )
}

export default AllClient;