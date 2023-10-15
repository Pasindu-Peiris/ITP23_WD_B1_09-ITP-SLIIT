const router = require('express').Router();
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let admin = require('../models/admin');
const { hash } = require('bcrypt');



//add admin route
router.route('/addAdmin').post((req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const mtype = req.body.mtype;

    bcrypt.hash(password, 10) .then((hash) => {

        const newAdmin = new Admin({
            name,
            email,
            password: hash,
            mtype
        });
        newAdmin.save().then(() => {
            res.json("Admin Added");
        }).catch((err) => {
            console.log(err);
        });

    });
    
});


//login route
router.route('/loginAdmin').post((req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    Admin.findOne({ email: email }).then(Admin => {
        if (Admin) {
            bcrypt.compare(password, Admin.password).then((match) => {
                if (match) {

                    const token2 = jwt.sign({ email }, "jwt_secret_key3", { expiresIn: '10h' });
                    res.json({ status: "Success", token: token2 });

                } else {
                    res.json("password not match");
                }
            })

        } else {
            res.json("User Not Found")
        }
    })


})



//get client one client data 
router.route('/getdataAdmin').post((req, res) => {

    const token2 = req.body.token2;
    
    try{
        const decoded = jwt.verify(token2, "jwt_secret_key3");
        Admin.findOne({ email: decoded.email }).then(Admin => {
            res.json(Admin);
        }).catch((err) => {
            console.log(err);
        });
    }catch(err){
        res.json("Invalid Token");
    }

})


module.exports = router;