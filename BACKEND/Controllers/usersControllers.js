const users = require("../models/usersSchema");
const moment = require("moment");
const csv = require("fast-csv");
const fs = require("fs");
const BASE_URL = process.env.BASE_URL



exports.userpost = async (req, res) => {
  const file = req.file ? req.file.filename : '';
  const { fname, lname, role, nic, email, mobile, gender, location, status } = req.body;

  try {
    // Check if any of the required fields is missing
    if (!fname || !lname || !role || !nic || !email || !mobile || !gender || !location || !status || !file) {
      return res.status(400).json({ error: 'All inputs are required' });
    }

    // Check if the user already exists in the database
    const preuser = await users.findOne({ email });
    if (preuser) {
      return res.status(400).json({ error: 'This user already exists in our database' });
    }

    // Create a new user object with the provided data
    const datecreated = new Date();
    const userData = new users({
      fname,
      lname,
      role,
      nic,
      email,
      mobile,
      gender,
      location,
      status,
      profile: file,
      datecreated,
    });

    // Save the user to the database
    await userData.save();

    return res.status(201).json({ message: 'User registered successfully', user: userData });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// usersget
exports.userget = async (req, res) => {

    const search = req.query.search || ""
    const gender = req.query.gender || ""
    const status = req.query.status || ""
    const sort = req.query.sort || ""
    const page = req.query.page || 1
    const ITEM_PER_PAGE = 4;


    const query = {
        fname: { $regex: search, $options: "i" }
    }

    if (gender !== "All") {
        query.gender = gender
    }

    if (status !== "All") {
        query.status = status
    }

    try {

        const skip = (page - 1) * ITEM_PER_PAGE  // 1 * 4 = 4

        const count = await users.countDocuments(query);

        const usersdata = await users.find(query)
            .sort({ datecreated: sort == "new" ? -1 : 1 })
            .limit(ITEM_PER_PAGE)
            .skip(skip);

        const pageCount = Math.ceil(count/ITEM_PER_PAGE);  // 8 /4 = 2

        res.status(200).json({
            Pagination:{
                count,pageCount
            },
            usersdata
        })
    } catch (error) {
        res.status(401).json(error)
    }
}

// single user get
exports.singleuserget = async (req, res) => {

    const { id } = req.params;

    try {
        const userdata = await users.findOne({ _id: id });
        res.status(200).json(userdata)
    } catch (error) {
        res.status(401).json(error)
    }
}

// user edit
exports.useredit = async (req, res) => {
    const { id } = req.params;
    const { fname, lname, email, role, nic, mobile, gender, location, status, user_profile } = req.body;
    const file = req.file ? req.file.filename : user_profile

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try {
        const updateuser = await users.findByIdAndUpdate({ _id: id }, {
            fname, role, nic, lname, email, mobile, gender, location, status, profile: file, dateUpdated
        }, {
            new: true
        });

        await updateuser.save();
        res.status(200).json(updateuser);
    } catch (error) {
        res.status(401).json(error)
    }
}

// delete user
exports.userdelete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletuser = await users.findByIdAndDelete({ _id: id });
        res.status(200).json(deletuser);
    } catch (error) {
        res.status(401).json(error)
    }
}

// chnage status
exports.userstatus = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
        const userstatusupdate = await users.findByIdAndUpdate({ _id: id }, { status: data }, { new: true });
        res.status(200).json(userstatusupdate)
    } catch (error) {
        res.status(401).json(error)
    }
}

// export user
exports.userExport = async (req, res) => {
    try {
        const usersdata = await users.find();

        const csvStream = csv.format({ headers: true });

        if (!fs.existsSync("public/files/export/")) {
            if (!fs.existsSync("public/files")) {
                fs.mkdirSync("public/files/");
            }
            if (!fs.existsSync("public/files/export")) {
                fs.mkdirSync("./public/files/export/");
            }
        }

        const writablestream = fs.createWriteStream(
            "public/files/export/users.csv"
        );

        csvStream.pipe(writablestream);

        writablestream.on("finish", function () {
            res.json({
                downloadUrl: `${BASE_URL}/files/export/users.csv`,
            });
        });
        if (usersdata.length > 0) {
            usersdata.map((user) => {
                csvStream.write({
                    FirstName: user.fname ? user.fname : "-",
                    LastName: user.lname ? user.lname : "-",
                    Role: user.role ? user.role : "-",
                    Nic: user.nic ? user.nic : "-",
                    Email: user.email ? user.email : "-",
                    Phone: user.mobile ? user.mobile : "-",
                    Gender: user.gender ? user.gender : "-",
                    Status: user.status ? user.status : "-",
                    Profile: user.profile ? user.profile : "-",
                    Location: user.location ? user.location : "-",
                    DateCreated: user.datecreated ? user.datecreated : "-",
                    DateUpdated: user.dateUpdated ? user.dateUpdated : "-",
                })
            })
        }
        csvStream.end();
        writablestream.end();

    } catch (error) {
        res.status(401).json(error)
    }
}