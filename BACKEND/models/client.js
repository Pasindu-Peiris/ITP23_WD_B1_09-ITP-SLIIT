const mongoose = require("mongoose");
const Schema = mongoose.Schema;


function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');

    //return `${year}/${month}/${day}`;
    return `${month}/${day}/${year}`;

}

function getTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
}

const formattedDate = getFormattedDate();
console.log(formattedDate); // Output will be in "YYYY/MM/DD" format

const formattedTime = getTime();
console.log(formattedTime); // Output will be in "HH:MM:SS" format


const clientSchema = new Schema({


    fname: {
        type: String,
        required: true,
        match: /^[a-zA-Z][a-zA-Z0-9]*$/


    },
    lname: {
        type: String,
        required: true,
        match: /^[a-zA-Z][a-zA-Z0-9]*$/


    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/


    },
    password: {
        type: String,
        required: true,

        /*validate: {
            validator: function(value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            },
            message: props => `${props.value} is not a valid password. It must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.`
        }*/

    },
    date: {
        type: String,
        default: formattedDate + " | " +"["+ formattedTime + " ]" // You can set a default value for the date if needed
    },
    images: {
        type: String,
        default: "prof.png"

    },
    lastlogin: {
        type: String,
        default: formattedDate + " | " +"["+ formattedTime + " ]" // You can set a default value for the date if needed
    },
    



})

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;