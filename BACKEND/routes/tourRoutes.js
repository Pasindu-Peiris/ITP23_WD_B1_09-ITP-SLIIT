const multer = require("multer");
const path = require("path");
const router = require("express").Router();
let Tour = require("../models/Tours");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/images')

    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage

})


router.route("/addTours").post(upload.single("image"), (req,res)=>{
    const tourName = req.body.tourName;
    const origin = req.body.origin;
    const destination = req.body.destination;
    const distance = Number(req.body.distance);
    const cost = Number(req.body.cost);
    const additionalExpenses = Number(req.body.additionalExpenses);
    const totalCost = Number(req.body.totalCost);
    const date = req.body.date;
    const description = req.body.description;
    const image = req.file.filename;

    const newTour = new Tour({
        tourName,
        origin,
        destination,
        distance,
        cost,
        additionalExpenses,
        totalCost,
        date,
        description,
        image

    })

    newTour.save().then(()=>{
        res.json("Tour Added");    
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/all").get((req,res)=>{
    Tour.find().then((tour)=>{
        res.json(tour);
        console.log(tour.image)
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/updateTour/:id").put(upload.single("image"), async(req,res)=>{
    let tourId = req.params.id;
    const {tourName, origin, destination, distance, cost, additionalExpenses, totalCost, date, description} = req.body;
    const image = req.file.filename;
    
    const updateTour = {
        tourName,
        origin,
        destination,
        distance,
        cost,
        additionalExpenses,
        totalCost,
        date,
        description,
        image
        
    }

    const update = await Tour.findByIdAndUpdate(tourId, updateTour).then(()=>{
        res.status(200).send({status: "Tour Updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Update Tour Error", error: err.message});
    })
    
})

router.route("/deleteTour/:id").delete(async(req,res)=>{
    let tourId = req.params.id;

    await Tour.findByIdAndDelete(tourId).then(()=>{
        res.status(200).send({status: "Tour Deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Delete Tour Error", error: err.message});
    })

})

router.route("/getTour/:id").get(async(req,res)=>{
    let tourId = req.params.id;
    
    const tour = await Tour.findById(tourId).then((tour)=>{
        res.json(tour);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Fetch Tour Error", error: err.message});
    })

})

router.route("/getTourImage", (req, res) => {{
    Tour.find().then(tour => res.json(tour))
    .catch(err => res.json(err))

}})

router.route("/getTourImages/:id", (req, res) => {{
    let tourId = req.params.id;

    const tour = Tour.findById(tourId).then(tour => res.json(tour))
    .catch(err => res.json(err))

}})


module.exports = router;

