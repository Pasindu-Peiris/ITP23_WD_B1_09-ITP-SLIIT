import React from 'react'
import { Link } from 'react-router-dom';


export default function HomeVehicleOwner() {
  return (
    <div>
       <Link to="/vehicleownersmanager"><button className='btn btn-primary'>Vehicle Owner Manager</button></Link> 
    </div>
  )
}
