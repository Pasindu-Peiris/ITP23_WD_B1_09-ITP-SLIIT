const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleOwnerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    
    nic: {
        type: String, 
        required: true
    },
    isSalaryAdded : {
        type : Boolean,
        default : false
      }
});

const VehicleOwner = mongoose.model("VehicleOwner", vehicleOwnerSchema);
module.exports = VehicleOwner;
