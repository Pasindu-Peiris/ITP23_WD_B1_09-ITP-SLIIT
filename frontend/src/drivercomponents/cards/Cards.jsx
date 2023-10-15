import React from "react";
import "./cards.css";
import { Link } from "react-router-dom";

export default function Cards({ drivers }) {
  return (
    <div className="dcardsWrapper">
      <div className="dcards">
        {drivers.length === 0 && <p>No driver(s) found</p>}
        {drivers.map((driver) => {
          return (
            <div key={driver._id} className="dcard">
              <img
                src={
                  driver.imagePic
                    ? "http://localhost:8090/" + driver.imagePic
                    : "http://localhost:8090/images/defaultPic.png"
                }
                alt="profile pic"
              />
              {/* {`${driver.firstName} ${driver.lastName}`} */}
              <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>{`${driver.firstName} ${driver.lastName}`}</div>

              <div className="text">
                <p>
                  <span className="dlabel">License Number:</span>
                </p>
                <p>
                  <span className="info">{driver.licenseNumber}</span>
                </p>
                <p>
                  <span className="dlabel">Preferred Vehicle:</span>
                </p>
                <p>
                  <span className="info">{driver.vehicle}</span>
                </p>
                <p>
                  <span className="dlabel">Contact Number:</span>
                </p>
                <p>
                  <span className="info">{driver.ContactNumber}</span>
                </p>
              </div>
              <div className="dbtnContainer">
                <Link to={`/driver/edit/${driver._id}`} className="dcardBtn m-top">
                  Edit
                </Link>
                <Link to={`delete/${driver._id}`} className="dcardBtn m-top">
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
