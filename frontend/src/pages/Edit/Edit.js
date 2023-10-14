import React, { useContext, useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner from "../../staffcomponents/Spiner/Spiner"
import { singleUsergetfunc, editfunc } from '../../services/Apis';
import { useNavigate, useParams } from 'react-router-dom';
import { updateData } from '../../staffcomponents/context/ContextProvider';
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from '../../services/helper';
import 'react-toastify/dist/ReactToastify.css';
import "./edit.css";

const Edit = () => {
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    nic: "",
    role: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  });

  const [status, setStatus] = useState("Active");
  const [imgdata, setImgdata] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    location: ""
  });

  const { update, setUpdate } = useContext(updateData);
  const navigate = useNavigate();
  const { id } = useParams();

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });

    const newErrors = { ...errors };

    if (name === "fname" && !/^[A-Za-z]+$/.test(value)) {
      newErrors.fname = "First name should contain only letters!";
    } else if (name === "lname" && !/^[A-Za-z]+$/.test(value)) {
      newErrors.lname = "Last name should contain only letters!";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      newErrors.email = "Enter a valid email address!";

    } else if (name === "nic" && !/^[0-9]{10}$/.test(value)) {
      newErrors.nic = "NIC number should contain 10 digits!";
   

    } else if (name === "mobile" && !/^[0-9]{10}$/.test(value)) {
      newErrors.mobile = "Mobile number should contain 10 digits!";
    } else if (name === "location" && !/^[A-Za-z]+$/.test(value)) {
      newErrors.location = "Location should contain only letters!";
    } else {
      newErrors[name] = "";
    }

    setErrors(newErrors);
  };

  const setStatusValue = (e) => {
    setStatus(e.value);
  };

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);

    if (response.status === 200) {
      setInputData(response.data);
      setStatus(response.data.status);
      setImgdata(response.data.profile);
    } else {
      console.log("error");
    }
  };

  const submitUserData = async (e) => {
    e.preventDefault();

    const { fname, lname, role, nic, email, mobile, gender, location } = inputdata;

    if (!fname) {
      toast.error("First name is Required!");
    } else if (!lname) {
      toast.error("Last name is Required!");
    } else if (!email) {
      toast.error("Email is Required!");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter Valid Email!");
    } else if (!mobile) {
      toast.error("Mobile is Required!");
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      toast.error("Enter Valid Mobile!");
    } else if (!gender) {
      toast.error("Gender is Required!");
    } else if (!status) {
      toast.error("Status is Required!");
    } else if (!location) {
      toast.error("Location is Required!");
    } else {
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("nic", nic);
      data.append("role", role);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image || imgdata);
      data.append("location", location);

      const config = {
        "Content-Type": "multipart/form-data"
      };

      const response = await editfunc(id, data, config);

      if (response.status === 200) {
        setUpdate(response.data);
        navigate("/staff");
      }
    }
  };

  useEffect(() => {
    userProfileGet();
  }, [id]);

  useEffect(() => {
    if (image) {
      setImgdata("");
      setPreview(URL.createObjectURL(image));
    }

    setTimeout(() => {
      setErrors({});
    }, 2000);
  }, [image]);

  return (
    <>
      <div className="container">
        <h2 className='text-center mt-1' style={{}}>Update Staff Member</h2>

        <Card className='shadow mt-3 p-3'>
          <div className="profile_div text-center">
            <img src={image ? preview : `${BASE_URL}/uploads/${imgdata}`} alt="img" />
          </div>

          <Form>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" name='fname' value={inputdata.fname} onChange={setInputValue} placeholder='Enter FirstName' />
                <Form.Text className="text-danger">{errors.fname}</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name='lname' value={inputdata.lname} onChange={setInputValue} placeholder='Enter LastName' />
                <Form.Text className="text-danger">{errors.lname}</Form.Text>
              </Form.Group>

              {/* changes by Z */}
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
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
                  checked={inputdata.gender === "Male"}
                  onChange={setInputValue}
                />
                <Form.Check
                  type={"radio"}
                  label={`Female`}
                  name="gender"
                  value={"Female"}
                  checked={inputdata.gender === "Female"}
                  onChange={setInputValue}
                />
                <Form.Text className="text-danger">{errors.gender}</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Status</Form.Label>
                <Select options={options} defaultValue={{ value: status, label: status }} onChange={setStatusValue} />
                <Form.Text className="text-danger">{errors.status}</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Profile</Form.Label>
                <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder='Select Your Profile' />
                <Form.Text className="text-danger">{errors.user_profile}</Form.Text>
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
    </>
  );
};

export default Edit;
