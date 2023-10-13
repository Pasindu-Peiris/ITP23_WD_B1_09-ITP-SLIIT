import "../App.css";
import React, { useState } from "react";
import axios from "axios";
import ToursAndRoutePlanning from "./ToursAndRoutePlanningNav";


function AddTour() {
    const [tourName, setTourName] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [distance, setDistance] =useState("");
    const [cost, setCost] = useState("");
    const [additionalExpenses, setAdditionalExpenses] = useState("");
    const [totalCost, setTotalCost] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [fileName, setFileName] = useState("");

    window.onload = function () {                                   //from www.java2s.com
        var today = new Date().toISOString().split('T')[0];
        document.getElementsByName("date")[0].setAttribute('min', today);

    }


    const onChangeFile = e => {
        setFileName(e.target.files[0]);

    }


    function sendData(e) {
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

        axios.post("http://localhost:8090/tour/addTours", formData).then(() => {
            alert("Tour Added");

            setTimeout(function () {

                window.location.reload();

            }, 100);

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
        <form onSubmit={sendData} style={{fontSize:"18px", display: "flex", alignItems: "center", justifyContent: "space-around"}}>
            <div className="container" style={{ height : "auto",width: "30%", marginLeft: "18%", marginTop: "50px"}}>
            <h4 style={{marginTop: "-40px"}} className="fw-bold"><u>Add Tour</u></h4>
                <div>
                    <label for="tourName" class="form-label">Tour Name</label>
                    <input type="text" class="form-control" id="tourName" placeholder="Enter tour name" pattern="[A-Za-z._%+\-\s]{5,}"  required onChange={(e) => {
                        setTourName(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="origin" class="form-label">Origin</label>
                    <input type="text" class="form-control" id="origin" placeholder="Enter origin" pattern="[A-Za-z._%+\-\s]{4,}" required onChange={(e) => {
                        setOrigin(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="destination" class="form-label">Destination</label>
                    <input type="text" class="form-control" id="destination" placeholder="Enter destination" pattern="[A-Za-z._%+\-\s]{4,}" required onChange={(e) => {
                        setDestination(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="distance" class="form-label">Distance</label>
                    <input type="text" name="distance" class="form-control" id="distance" placeholder="Enter distance" pattern="^\d+(?:\.\d{1,2})?$" step="0.01" required onChange={(e) => {
                        setDistance(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="cost" class="form-label">Cost (Rs.)</label>
                    <input type="text" name="cost" class="form-control" value={distance ? parseFloat(distance) * 100 : .0} id="cost" disabled placeholder="Enter cost" pattern="^\d+(?:\.\d{1,2})?$" step="0.01" required onMouseOver={(e) => {
                        setCost(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="additionalExpenses" class="form-label">Additional Expenses (Rs.)</label>
                    <input type="text" name="additionalC" class="form-control" id="additionalC" placeholder="Enter additional expenses" pattern="^\d+(?:\.\d{1,2})?$" step="0.01" required onChange={(e) => {
                        setAdditionalExpenses(e.target.value);

                    }} />
                </div>
            </div>
            <div className="container" style={{width: "30%", marginRight: "18%", height: "auto"}}>
                <div style={{ marginTop: "30px", marginBottom: "8px" }}>
                    <label for="totalCost" class="form-label">Total Cost (Rs.)</label>
                    <input type="text" class="form-control" value={cost && additionalExpenses ? parseFloat(cost) + parseFloat(additionalExpenses) : .0} disabled id="result" required onMouseOver={(e) => {
                        setTotalCost(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="date" class="form-label">Tour Date</label>
                    <input name="date" type="date" class="form-control"  required onChange={(e) => {
                        setDate(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="description" class="form-label">Description</label>
                    <textarea id="description" class="form-control"  rows="5" cols="100" pattern="[a-z0-9._%+\-]{,500}" required placeholder="Enter description here...." onChange={(e) => {
                        setDescription(e.target.value);

                    }} />
                </div>
                <div>
                    <label for="image" class="form-label" style={{marginTop: "15px"}}>Upload Image</label>
                    <input type="file" filename="file" class="form-control" id="image" required onChange={onChangeFile} />
                </div>
                <button id="submit" type="submit" class="btn btn-dark"><strong>Add</strong></button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button id="reset" type="reset" class="btn btn-danger"><strong>Reset</strong></button>
            </div>
        </form>
        </>
    )
}

export default AddTour;