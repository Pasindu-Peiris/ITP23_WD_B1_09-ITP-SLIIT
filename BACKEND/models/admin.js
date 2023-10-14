const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const adminSchema = new Schema({

    name: {
        type: String,
        
    },
    email: {
        type: String, 

    },
    password: {
        type: String,
        
    },
    mtype:{
        type: String,
       
    },
    
    

});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;