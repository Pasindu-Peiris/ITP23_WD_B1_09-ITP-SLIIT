const express = require("express");
const  mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8090;

app.use(cors({
    origin: ["http://localhost:3000"],
    methods:["POST","GET","PUT","DELETE"],
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

//upload images
app.use(express.json());
app.use(express.static('public'));
app.use('/Upload/images', express.static('Upload/images'));

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connction = mongoose.connection;

connction.once("open", () => {
    console.log("Mongodb conncted!");
});

//client
const clientRoute = require("./routes/Client");
app.use("/client", clientRoute);

//drop client
const dropc = require("./routes/DropClient");
app.use("/dropclient", dropc)



// vehicle
const ownerRoutes = require('./routes/rownerRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/rowners', ownerRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/bookings', bookingRoutes);

//vehicle owner 

const vehicleOwnerRouter = require("./routes/vehicleOwner.js");
app.use("/vehicleOwner", vehicleOwnerRouter);

//vehicle img
app.use('/VehicleImg', express.static(__dirname + '/VehicleImg'));

//tours
const tourRouter = require("./routes/tourRoutes.js");
app.use("/tour" , tourRouter);

app.listen(PORT, () =>{
    console.log(`Sever is running on ${PORT}`);
});




