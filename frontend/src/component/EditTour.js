import "../App.css";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ToursAndRoutePlanning from "./ToursAndRoutePlanningNav";

function EditTour(){
    const {id} = useParams();
    const [tourName, setTourName] = useState("");
    const [origin, setOrigin] = useState("");
    const [distance, setDistance] = useState("");
    const [destination, setDestination] = useState("");
    const [cost, setCost] = useState("");
    const [additionalExpenses, setAdditionalExpenses] = useState("");
    const [totalCost, setTotalCost] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [fileName, setFileName] = useState("");

    const onChangeFile = e => {
        setFileName(e.target.files[0]);

    }

    useEffect(() => {
        
        axios.get("http://localhost:8090/tour/getTour/"+id).then((res) => {
            console.log(res);
            setTourName(res.data.tourName)
            setOrigin(res.data.origin)
            setDestination(res.data.destination)
            setDistance(res.data.distance)
            setCost(res.data.cost)
            setAdditionalExpenses(res.data.additionalExpenses)
            setTotalCost(res.data.totalCost)
            setDate(res.data.date)
            setDescription(res.data.description)

        }).catch((err) => {
            alert(err.message);
        })

    },[])

    const update = (e) =>{
        e.preventDefault();

        const formData = new FormData();

        formData.append("tourName", tourName);
        formData.append("origin", origin);
        formData.append("destination", destination);
        formData.append("distance", distance);
        formData.append("cost", cost);
        formData.append("additionalExpenses", additionalExpenses);
        formData.append("totalCost", totalCost);
        formData.append("date", date);
        formData.append("description", description);
        formData.append("image", fileName);

        axios.put("http://localhost:8090/tour/updateTour/"+id, formData).then(() => {
            alert("Tour Updated");

            window.location = "/get"

        }).catch((err) => {
            alert(err);

        })

    }

    (() => {
        const forms = document.querySelectorAll('.needs-validation')

        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (
        <>
        <ToursAndRoutePlanning/>
        <form onSubmit={update} style={{fontSize:"18px", display: "flex", alignItems: "center", justifyContent: "space-around"}}>
            <div className="container" style={{ height : "auto",width: "30%", marginLeft: "18%", marginTop: "50px"}}>
            <h4 style={{marginTop: "-40px"}} className="fw-bold"><u>Edit Tour</u></h4>
                <div>
                    <label for="tourName" class="form-label labsh ">Tour Name</label>
                    <input type="text" class="form-control inputSh" id="tourName" placeholder="Enter tour name" value ={tourName} pattern="[A-Za-z._%+\-\s]{5,}"  required onChange={(e) => {
                        setTourName(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="origin" class="form-label labsh">Origin</label>
                    <input type="text" class="form-control inputSh" id="origin" placeholder="Enter origin" value={origin} pattern="[A-Za-z._%+\-\s]{4,}" required onChange={(e) => {
                        setOrigin(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="destination" class="form-label labsh">Destination</label>
                    <input type="text" class="form-control inputSh" id="destination" placeholder="Enter destination" value={destination} pattern="[A-Za-z._%+\-\s]{4,}" required onChange={(e) => {
                        setDestination(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="distance" class="form-label labsh">Distance</label>
                    <input type="text" name="distance" class="form-control inputSh" id="distance" placeholder="Enter distance" value={distance} pattern="^\d+(?:\.\d{1,2})?$" step="0.01" required onChange={(e) => {
                        setDistance(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="cost" class="form-label labsh">Cost (Rs.)</label>
                    <input type="text" name="cost" class="form-control inputSh" value={distance ? distance * 100 : .0} id="cost" disabled placeholder="Enter cost" pattern="^\d+(?:\.\d{1,2})?$" step="0.01" required onMouseOver={(e) => {
                        setCost(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="additionalExpenses" class="form-label labsh">Additional Expenses (Rs.)</label>
                    <input type="text" name="additionalC" class="form-control inputSh" id="additionalC" value={additionalExpenses} placeholder="Enter additional expenses" pattern="^\d+(?:\.\d{1,2})?$" step="0.01" required onChange={(e) => {
                        setAdditionalExpenses(e.target.value);

                    }} />
                </div>
            </div>
            <div className="container" style={{width: "30%", marginRight: "18%", height: "auto"}}>
                <div style={{ marginTop: "30px", marginBottom: "8px" }}>
                    <label for="totalCost" class="form-label labsh">Total Cost (Rs.)</label>
                    <input type="text" class="form-control inputSh" value={cost && additionalExpenses ? parseFloat(cost) + parseFloat(additionalExpenses) : .0} disabled id="result" required onMouseOver={(e) => {
                        setTotalCost(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="date" class="form-label labsh">Tour Date</label>
                    <input name="date" type="date" class="form-control inputSh"  value={date} required onChange={(e) => {
                        setDate(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="description" class="form-label labsh">Description</label>
                    <textarea id="description" class="form-control inputSh"  rows="5" cols="100" pattern="[a-z0-9._%+\-]{,500}" required value={description} placeholder="Enter description here...." onChange={(e) => {
                        setDescription(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="image" class="form-label labsh" >Upload Image</label>
                    <input type="file" filename="file" class="form-control inputSh" id="image" required onChange={onChangeFile} />
                </div>
                <button id="submit" type="submit" class="btn btn-dark"><strong>Edit</strong></button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button id="reset" type="reset" class="btn btn-danger"><strong>Reset</strong></button>
            </div>
        </form>
        </>
    )
   

}

export default EditTour;