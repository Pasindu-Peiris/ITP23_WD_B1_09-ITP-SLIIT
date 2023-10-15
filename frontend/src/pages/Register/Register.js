import React, { useContext, useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spinner from "../../staffcomponents/Spiner/Spiner";
import { registerfunc } from "../../services/Apis";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./register.css";
import { addData } from '../../staffcomponents/context/ContextProvider';

const Register = () => {
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    role: "",
    nic: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  });

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [showspin, setShowSpin] = useState(true);
  const [errors, setErrors] = useState({
    fname: "",
    role: "",
    nic: "",
    lname: "",
    email: "",
    mobile: "",
    location: ""
  });

  const navigate = useNavigate();
  const { useradd, setUseradd } = useContext(addData);

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  const validateInputs = (data) => {
  const { fname, lname, nic, role, email, mobile, location } = inputdata;
  const newErrors = {};

  if (fname && !/^[A-Za-z]+$/.test(fname)) {
    newErrors.fname = "First name should contain only letters!";
  }

  if (lname && !/^[A-Za-z]+$/.test(lname)) {
    newErrors.lname = "Last name should contain only letters!";
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "Enter a valid email address!";
  }

  if (nic && !/^[0-9]{10}$/.test(nic)) {
    newErrors.nic = "NIC number should contain 10 digits!";
  }

  if (mobile && !/^[0-9]{10}$/.test(mobile)) {
    newErrors.mobile = "Mobile number should contain 10 digits!";
  }

  if (location && !/^[A-Za-z]+$/.test(location)) {
    newErrors.location = "Location should contain only letters!";
  }

  return newErrors;
};

const setInputValue = (e) => {
  const { name, value } = e.target;
  const updatedData = { ...inputdata, [name]: value };
  setInputData(updatedData);
  const validationErrors = validateInputs(updatedData);
  setErrors(validationErrors);
};


  const setStatusValue = (e) => {
    setStatus(e.value);
  };

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  const submitUserData = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      const { fname, lname, role, nic, email, mobile, gender, location } = inputdata;

      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("role", role);
      data.append("nic", nic);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image);
      data.append("location", location);

      const config = {
        "Content-Type": "multipart/form-data"
      };

      const response = await registerfunc(data, config);

      if (response.status === 200) {
        setInputData({
          ...inputdata,
          fname: "",
          lname: "",
          role: "",
          nic: "",
          email: "",
          mobile: "",
          gender: "",
          location: ""
        });
        setStatus("");
        setImage("");
        setUseradd(response.data);
        navigate("/staff");
      } else {
        navigate("/staff");
      }
    } else {
      toast.error("Please fix the validation errors before submitting the form.");
    }
  };

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }

    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [image]);

  return (
    <>
      {showspin ? (
        <Spinner />
      ) : (
        <div className="container">
          <h2 className='text-center mt-1'>Register Staff Member</h2>
          <Card className='shadow mt-3 p-3'>
            <div className="profile_div text-center">
              <img src={preview ? preview : "/man.png"} alt="img" />
            </div>
            <Form>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicFirstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control type="text" name='fname' value={inputdata.fname} onChange={setInputValue} placeholder='Enter First Name' />
                  <Form.Text className="text-danger">{errors.fname}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name='lname' value={inputdata.lname} onChange={setInputValue} placeholder='Enter Last Name' />
                  <Form.Text className="text-danger">{errors.lname}</Form.Text>
                </Form.Group>

                {/* new */}
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicLastName">
                  <Form.Label>NIC</Form.Label>
                  <Form.Control type="text" name='nic' value={inputdata.nic} onChange={setInputValue} placeholder='Enter NIC' />
                  <Form.Text className="text-danger">{errors.nic}</Form.Text>
                </Form.Group>







                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name='role' value={inputdata.role} onChange={setInputValue}>
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="user">User</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Seo Specialist">Seo Specialist</option>
                    <option value="Intern">Intern</option>
                    <option value="Database Administrator">Database Administrator</option>
                    <option value="Social Media Manager">Social Media Manager</option>
                    <option value="Graphic Designer">Graphic Designer</option>
                    <option value="Cyber Security Analyst">Cyber Security Analyst</option>
                  </Form.Select>
                  <Form.Text className="text-danger">{errors.role}</Form.Text>
                </Form.Group>



                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name='email' value={inputdata.email} onChange={setInputValue} placeholder='Enter Email' />

                  <Form.Text className="text-danger">{errors.email}</Form.Text>

                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control type="text" name='mobile' value={inputdata.mobile} onChange={setInputValue} placeholder='Enter Mobile' />

                  <Form.Text className="text-danger">{errors.mobile}</Form.Text>

                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    onChange={setInputValue}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Status</Form.Label>
                  <Select options={options} onChange={setStatusValue} />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Profile</Form.Label>
                  <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder='Select Your Profile' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Enter Your Location</Form.Label>
                  <Form.Control type="text" name='location' value={inputdata.location} onChange={setInputValue} placeholder='Enter Your Location' />

                  <Form.Text className="text-danger">{errors.location}</Form.Text>

                </Form.Group>




















                <Button variant="primary" type="submit" onClick={submitUserData}>
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
};

export default Register;
