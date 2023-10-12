const router = require('express').Router();
const Dropclient = require('../models/dropclients');


//add dropclient
router.route('/adddropclient').post((req, res) =>{

    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const deleteddate = req.body.deleteddate;
    const images = req.body.images;
    const lastlogin = req.body.lastlogin;

    const newDropclient = new Dropclient({
        fname,
        lname,
        email,
        password,
        deleteddate,
        images,
        lastlogin
    })


    newDropclient.save().then(() =>{
        res.json("Dropclient Added")
    }).catch((err) =>{
        console.log(err);
    })
})


//get all dropclients
router.route('/getDropclients').get((req, res) =>{
    Dropclient.find().then((dropclients) =>{
        res.json(dropclients)
    }).catch((err) =>{
        console.log(err)
    })
})


//delete dropclient
router.route('/deletedrop/:id').delete(async (req, res) =>{
    const id = req.params.id;

    await Dropclient.findByIdAndDelete(id).then(() =>{
        res.status(200).send({status: "Dropclient deleted"})
    }).catch((err) =>{
        console.log(err.message);
    })
})



module.exports = router;