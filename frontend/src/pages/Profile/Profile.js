import React,{useState,useEffect} from 'react'
import Card from "react-bootstrap/Card"
import Row from 'react-bootstrap/esm/Row'
import { useParams } from 'react-router-dom'
import Spiner from "../../staffcomponents/Spiner/Spiner"
import {singleUsergetfunc} from "../../services/Apis"
import { BASE_URL } from '../../services/helper'
import moment from "moment"
import "./profile.css"

const Profile = () => {

  const [userprofile,setUserProfile] = useState({});
  const [showspin, setShowSpin] = useState(true);

  const {id} = useParams();

  const userProfileGet = async()=>{
    const response = await singleUsergetfunc(id);
    
    if(response.status === 200){
      setUserProfile(response.data)
    }else{
      console.log("error");
    }
  }


  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [id])
  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">
      <Card className="custom-card-profile futuristic-card shadow-lg col-lg-8 mx-auto mt-5">

            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <img src={`${BASE_URL}/uploads/${userprofile.profile}`} alt="" />
                  </div>
                </div>
              </Row>
              <div className='text-center'>
                <h2>{userprofile.fname}&nbsp; {userprofile.lname}</h2>
                <h5><i class="fa-solid fa-address-book"></i>&nbsp;NIC:- <span>{userprofile.nic}</span> </h5>
                <h5><i class="fa-solid fa-users"></i>&nbsp;Role:- <span>{userprofile.role}</span> </h5>
                
                <h5><i class="fa-solid fa-envelope email"></i>&nbsp;Email:- <span>{userprofile.email}</span> </h5>
                <h5><i class="fa-solid fa-mobile"></i>&nbsp;Mobile:- <span>{userprofile.mobile}</span> </h5>
                <h5><i class="fa-solid fa-person-half-dress"></i>&nbsp;Gender:- <span>{userprofile.gender}</span> </h5>
                <h5><i class="fa-solid fa-location-pin location"></i>&nbsp;Location:- <span>{userprofile.location}</span> </h5>
                <h5>Status&nbsp;:- <span>{userprofile.status}</span> </h5>
                <h5><i class="fa-solid fa-calendar-days calendar"></i>&nbsp;Date Created&nbsp;:- <span>{moment(userprofile.datecreated).format("DD-MM-YYYY")}</span> </h5>
                <h5> <i class="fa-solid fa-calendar-days calendar"></i>&nbsp;Date Updated&nbsp;:- <span>{userprofile.dateUpdated}</span> </h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      }

    </>
  )
}

export default Profile