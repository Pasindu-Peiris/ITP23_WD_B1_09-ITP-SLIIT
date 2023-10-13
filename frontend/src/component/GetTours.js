import "../App.css";
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import ToursAndRoutePlanning from "./ToursAndRoutePlanningNav";

function GetTours(){

    const [tours, setTours] = useState([]);
    const [records, setRecords] = useState([tours]);

    useEffect(() => {
        
            axios.get("http://localhost:8090/tour/all").then((res) => {
                console.log(res);
                setTours(res.data);
                setRecords(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        },[])

    const handleDelete = (id) =>{
        axios.delete("http://localhost:8090/tour/deleteTour/"+id).then(res => {console.log(res)
        window.location.reload()

    }).catch(err => console.log(err))
    
    }

    const filter = (event) =>{
        setRecords(tours.filter(f => f.tourName.toLowerCase().includes(event.target.value)))

    }

    return (
        <><ToursAndRoutePlanning/>
        <div className="container" style={{fontSize:"18px"}}>
            <br/><br/>
            <div >
                <input type="search" id="search" className="form-control" placeholder="Search" onChange={filter} />
                <button id="report" class="btn btn-outline-dark"><strong>Generate Report</strong></button>
            </div>
            <br/>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Tour Name</th>
                        <th scope="col">Origin</th>
                        <th scope="col">Destination</th>
                        <th scope="col">Distance</th>
                        <th scope="col" class = "text-center">Cost</th>
                        <th scope="col" class = "text-center">Add.Expenses</th>
                        <th scope="col" class = "text-center">Total Cost</th> 
                        <th scope="col" class = "text-center">Date</th> 
                        <th>&nbsp;&nbsp;&nbsp;&nbsp;</th>                    
                    </tr>
                </thead>
                <tbody>
                    {records && records.map((tour) => {
                        return (
                            <tr>
                                <td>{tour.tourName}</td>
                                <td>{tour.origin}</td>
                                <td>{tour.destination}</td>
                                <td class = "text-center">{tour.distance?.toFixed(2)} km</td>
                                <td class = "text-center">Rs.{tour.cost?.toFixed(2)}</td>
                                <td class = "text-center">Rs.{tour.additionalExpenses?.toFixed(2)}</td>
                                <td class = "text-center">Rs.{tour.totalCost?.toFixed(2)}</td>
                                <td class = "text-center">{tour.date}</td>
                                <td><Link to={`/editTours/${tour._id}`}><button id = "btn" type="button" class="btn btn-outline-dark"><i class="fa fa-pen-to-square"></i></button></Link>&nbsp;&nbsp;
                                <button id = "btn" type="button" class="btn btn-outline-danger" onClick={(e) => handleDelete(tour._id)}><i class="fa fa-trash "></i></button> </td>
                                             
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
        </>
    );
}

    



export default GetTours;