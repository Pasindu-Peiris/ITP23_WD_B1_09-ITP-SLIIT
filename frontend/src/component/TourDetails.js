import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./footer";


function TourDetails(){
    const {id} = useParams();
    const [tourName, setTourName] = useState("");
    const [origin, setOrigin] = useState("");
    const [distance, setDistance] = useState("");
    const [destination, setDestination] = useState("");
    const [totalCost, setTotalCost] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [Image , setImage] = useState("");

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    useEffect(() => {
        
        axios.get("http://localhost:8090/tour/getTour/"+id).then((res) => {
            console.log(res);
            setTourName(res.data.tourName)
            setOrigin(res.data.origin)
            setDestination(res.data.destination)
            setDistance(res.data.distance)
            setTotalCost(res.data.totalCost)
            setDate(res.data.date)
            setDescription(res.data.description)
            setImage(res.data.image)

        }).catch((err) => {
            alert(err.message);
        })

    },[])

    useEffect(() => {

        axios.get("http://localhost:8090/tour/getTourImages/"+id).then((res) => {
            
           
        }).catch((err) => {
            console.log(err);

        })
    }, [])

    const tour ={
        width: "100%",
        backgroundColor: isHover ? "white" : "black",
        color: isHover ? "black" : "white",
    
    };



    return(
        <>
        <div className="container-fluid" style={{backgroundColor : "#f1f1f3" , height:"100vh"}}>
            <Nav/>
            <img id="tourImage" src={`http://localhost:8090/images/`+ Image}   height="530px" width="950px" alt="Tour Image" style={{borderRadius: "20px",boxShadow: "0 1px 1px rgba(0, 0, 0, 0.075) inset, 10px 10px 15px #6553cfa3"}}/>
            <div style={{float: "right", fontSize: "20px", width: "22%"}}>
                <h4><strong>{tourName}</strong></h4><br/>
                <p><strong>Origin : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>{origin}</p>
                <p><strong>Destination : &nbsp;&nbsp;&nbsp;&nbsp;</strong>{destination}</p>
                <p><strong>Distance : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>{distance} Km</p>
                <p><strong>Cost : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>Rs. {parseFloat(totalCost)?.toFixed(2)}</p>
                <p><strong>Tour Date : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>{date}</p>  
                <p><strong>Description : </strong><br/>{description}</p> <br/>    
                <button id="bookNow" type="button" class="btn btn-dark" style={tour} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><strong>Book</strong></button>     
            </div>
            <br/><br/><br/>
            <Footer/>
        </div>
        </>
        
    )



}

export default TourDetails;