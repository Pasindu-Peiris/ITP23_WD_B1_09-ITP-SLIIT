const router = require("express").Router();
const Client = require("../models/client");
let client = require("../models/client");
const bcrypt = require('bcrypt');


router.route("/add").post((req, res) => {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 10).then((hash) => {

        const newClinet = new client({

            fname,
            lname,
            email,
            password: hash

        })

        newClinet.save().then(() => {
            res.json("Client add")
        }).catch((err) => {
            console.log("Client not add")
            res.status(500).send({ status: "Error With adding" })
        })


    })



});

//get Clients
router.route("/").get((req, res) => {

    Client.find().then((clients) => {
        res.json(clients)
    }).catch((err) => {
        console.log(err);
    })

})


//update
router.route("/updated/:cid").put(async (req, res) => {

    let userid = req.params.cid;
    const { fname, lname, email } = req.body;

    const updateClient = {

        fname,
        lname,
        email,

    }
    const update = await Client.findByIdAndUpdate(userid, updateClient).then((client) => {
        console.log("updated")
        res.status(200).send({ status: "User Updated", user: client })
    }).catch((err) => {
        console.log("err")
        res.status(500).send({ status: "Error With Updating" })
        console.log("not updated")
    })



})


//delete
router.route("/delete/:id").delete(async (req, res) => {
    let userid = req.params.id;

    await Client.findByIdAndDelete(userid).then(() => {
        console.log("Deleted")
        res.status(200).send({ status: "User Deleted" })
    }).catch((err) => {
        console.log("err")
        res.status(500).send({ status: "Error With Deleted" })
    })
})



//get one client in admin
router.route("/get/:id").get(async (req, res) => {

    let cid = req.params.id;

    const user = await Client.findById(cid).then((client) => {
        res.json(client)
    }).catch((err) => {
        console.log("err")
        res.status(500).send({ status: "Error With get One" })
    })
})


//get one client in client
router.route("/gets/:id").get(async (req, res) => {

    let cid = req.params.id;

    const user = await Client.findById(cid).then((client) => {
        res.json(client)
    }).catch((err) => {
        console.log("err")
        res.status(500).send({ status: "Error With get One" })
    })
})


//forget password
const jwt = require('jsonwebtoken');

//Login
router.route("/login").post((req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    Client.findOne({ email: email }).then(client => {
        if (client) {
            bcrypt.compare(password, client.password).then((match) => {
                if (match) {

                    const token2 = jwt.sign({ email }, "jwt_secret_key2", { expiresIn: '1d' });
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



router.route("/forget").post((req, res) => {

    const email = req.body.email;

    Client.findOne({ email: email }).then(client => {
        if (!client) {
            return res.send({ msg: "Not Success" })
        }

        const token = jwt.sign({ id: client._id }, "jwt_secret_key", { expiresIn: '1h' });

        //NodeMailer
        var nodemailer = require('nodemailer');


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'randyruch5@gmail.com',
                pass: 'luxlrqakfenxkyzi'
            }
        });

        var mailOptions = {
            from: 'randyruch5@gmail.com',
            to: email,
            subject: 'Requested to reset your password',
            html: `<p>Hello,</p>
            <p>You have requested to reset your password. Please follow the link below:</p>
            <a href="http://localhost:3000/resetpassword/${client._id}/${token}" style='background-color: #00FA9A;
            border: none;
            color: #000;
            padding: 10px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 6px; '>Reset Password</a>
            <p>If you are unable to reset your password, please contact us. <br> RAPID TRAVELS : (94) 77 99 74368 </p>
            <p>Best regards,<br>RAPID TRAVELS</p>
            <p>© 2021 RAPID TRAVELS. All rights reserved.</p>`

        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return res.send({ msg: "Success" })
            }
        });



    })


})

//reset password
router.route("/resetpassword/:id/:token").post((req, res) => {
    const { password } = req.body;
    const { id, token } = req.params;

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {

        if (err) {
            return res.json({ msg: "Token Expired" })

        } else {

            bcrypt.hash(password, 10).then((hash) => {
                Client.findByIdAndUpdate(id, { password: hash }).then(() => {
                    return res.json({ msg: "Success" })
                }).catch((err) => {
                    return res.json({ msg: "Error" })
                }).catch((err) => {
                    return res.json({ msg: "Error" })
                })
            })


        }


    })
})


//get user data profile
router.route("/userdata").post((req, res) => {

    const token = req.body.token;

    try {
        const decoded = jwt.verify(token, "jwt_secret_key2");
        const email = decoded.email;
        Client.findOne({ email: email }).then(client => {
            if (client) {
                res.json(client)
            } else {
                res.json("User Not Found")
            }
        })
    } catch (err) {
        res.json("Error")
    }

})


//strat profile Upload
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Upload/images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

//Upload profile picture
router.route("/uploadprofile/:id").post(upload.single('file'), (req, res) => {

    let uid = req.params.id;


   /* const UpdatedClient = {
            
        images: req.file.filename
    }*/

    const updatep = Client.findByIdAndUpdate(uid, {images: req.file.filename} ).then((client) => {
        console.log("updated profile")
        console.log(req.file);
        res.status(200).send({ status: "User Updated", user: client })

    }).catch((err) => {
        console.log("err")
        res.status(500).send({ status: "Error With Updating" })
        console.log("not updated profile")
    })


});


//get user profile picture
router.route("/getprofile/:cid").get((req, res) => {

    let cid = req.params.cid;

    const profile = Client.findById(cid).then((client) => {
        res.json(client)
    }).catch((err) => {
        console.log("err in get profile")
        res.status(500).send({ status: "Error With get One profile" })
    })



});

//delete profile picture
router.route("/deleteprofile/:id").post((req, res) => {

    let uid = req.params.id;


    const updatep = Client.findByIdAndUpdate(uid, {images : "prof.png"}).then((client) => {
        console.log("Remove profile")
        console.log("rome profile client.js side");
        res.status(200).send({ status: "User Updated", user: client })

    }).catch((err) => {
        console.log("err")
        res.status(500).send({ status: "Error With Updating" })
        console.log("not updated profile")
    })


});








module.exports = router;