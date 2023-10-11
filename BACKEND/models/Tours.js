const mongoose = require('mongoose');

const Schema = mongoose.Schema;

function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');

    //return `${year}/${month}/${day}`;
    return `${day}/${month}/${year}`;

}

const formattedDate = getFormattedDate();

const tourSchema = new Schema({
    tourName : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50,
        match: /^[a-zA-Z.\s]+/

    },

    origin : {
        type : String,
        required : true,
        minlength : 4,
        maxlength : 50,
        match: /^[a-zA-Z.\s]+/

    },

    destination : {
        type : String,
        required : true,
        minlength : 4,
        maxlength : 50,
        match: /^[a-zA-Z.\s]+/

    },

    distance : {
        type : Number,
        required : true,

    },

    cost : {
        type : Number,
        required : true,
        min : 1000,
        minlength : 4,
        maxlength : 10,

    },

    additionalExpenses : {
        type : Number,
        required : false,
        min : 1000,
        minlength : 4,
        maxlength : 10,

    },

    totalCost : {
        type : Number,
        required : true,
        minlength : 4,
        maxlength : 10,

    },

    date : {
        type : String,
        required : true,
        default : formattedDate,
        
    },


    description : {
        type : String,
        required : true,
        maxlength : 500,

    },

    image : {
        type : String,
        required : false,
        
    }

}, {timestamps : true})

const Tour = mongoose.model("Tour" , tourSchema);

module.exports = Tour;


