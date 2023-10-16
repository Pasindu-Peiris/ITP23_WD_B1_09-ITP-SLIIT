import React, { useState, useEffect } from "react";
import QueryFilter from "../../drivercomponents/filter/QueryFilter";
import Pagination from "../../drivercomponents/pagination/Pagination";
import Cards from "../../drivercomponents/cards/Cards";
import axios from "axios";
import "./home.css";
import Header from "../../drivercomponents/header/Header";

export default function Home() {
  // state variables
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(12);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = drivers.slice(indexOfFirstRecord, indexOfLastRecord);
  const ndriverpages = Math.ceil(drivers.length / recordsPerPage);

  // Get Drivers on initial load
  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    const res = await axios.get("http://localhost:8090/api/drivers");
    setDrivers(res.data);
    setLoading(false);
  };

  // function called to search for driver
  const searchDriver = async (licenseNumber, contact) => {
    let url;
    if (licenseNumber && contact) {
      url = `http://localhost:8090/api/drivers?licenseNumber=${licenseNumber}&contact=${contact}`;
    } else if (licenseNumber) {
      url = `http://localhost:8090/api/drivers?licenseNumber=${licenseNumber}`;
    } else if (contact) {
      url = `http://localhost:8090/api/drivers?contact=${contact}`;
    }
    const res = await axios.get(url);
    setDrivers(res.data);
  };

  // the jsx code that contains our drivercomponents
  return (
     <section className="dmain">
      {loading && <div>Loading page....</div>}
      <Header />
      <QueryFilter searchDriver={searchDriver} getDrivers={getDrivers} />
      <Cards drivers={currentRecords} />
      <Pagination
        ndriverpages={ndriverpages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} />
    </section>
  );
}
