import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Default_Layout from "../Components/Default_Layout";
import { DatePicker, Modal, Button } from "antd";
// import 'antd/dist/antd.css';
import moment from 'moment'
import { debounce } from 'lodash';
axios.defaults.baseURL = 'http://localhost:8090';


function formatPriceWithComma(price) {
  if (typeof price !== 'number') {
    return price;
  }

  window.onerror = function (message, source, lineno, colno, error) {
    if (message.includes("ResizeObserver loop completed with undelivered notifications")) {
      // This is the specific error message we want to ignore.
      return true; // Returning true suppresses the error message.
    }
    // Handle other errors as needed or leave them unhandled.
  };
  

  const priceString = price.toString();

  if (priceString.length < 4) {
    return priceString;
  }

  const firstPart = priceString.slice(0, priceString.length - 3);
  const lastThreeDigits = priceString.slice(-3);

  return `${firstPart},${lastThreeDigits}`;
}

export default function IndexPage() {
  const [Vehicles, setVehicles] = useState([]);
  const [records, setrecords] = useState([]);
  const [minDate, setMinDate] = useState(moment());
  const [sortTypeAscending, setSortTypeAscending] = useState(true);
  const [sortModelAscending, setSortModelAscending] = useState(true);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("");
  const [sortPriceAscending, setSortPriceAscending] = useState(true);
  const [totalVehicals, setTotalVehicals] = useState([])
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [isRangePickerOpen, setIsRangePickerOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const { RangePicker } = DatePicker;
  



  function handleRangeChange(values) {
    if (!values || values.length !== 2) {
      // Handle the case when values is null or not a valid range
      setrecords(Vehicles);
      setSelectedDateRange(null);
      return;
    }

    const selectedFrom = moment(values[0], 'MMM DD YYYY HH:mm');
    const selectedTo = moment(values[1], 'MMM DD YYYY HH:mm');

    if (selectedFrom.isValid() && selectedTo.isValid()) {
      const filteredVehicles = Vehicles.filter((Vehicle) => {
        for (const booking of Vehicle.bookedTimeSlots) {
          const bookingFrom = moment(booking.from);
          const bookingTo = moment(booking.to);

          if (
            selectedFrom.isBetween(bookingFrom, bookingTo) ||
            selectedTo.isBetween(bookingFrom, bookingTo) ||
            bookingFrom.isBetween(selectedFrom, selectedTo) ||
            bookingTo.isBetween(selectedFrom, selectedTo)
          ) {
            return false;
          }
        }

        return true;
      });

      setrecords(filteredVehicles);
      setSelectedDateRange(values);
    } else {
      setrecords(Vehicles);
      setSelectedDateRange(null);
    }
  }

  const debouncedHandleRangeChange = debounce(handleRangeChange, 100);


  
  const disabledDate = (current) => {
    // Get the current date
    const currentDate = moment();
  
    // Calculate the date one month from now
    const oneMonthFromNow = currentDate.clone().add(1, 'month').startOf('day');
  
    // Disable dates before the current date and after one month from now
    return current && (current < currentDate.startOf('day') || current > oneMonthFromNow);
  };
  

  const disabledTime = (current, type) => {
    if (type === 'start') {
      // Disable times before the current time for the start date
      return current && current < moment().startOf('hour');
    } else {
      // Disable times before the current time for the end date
      return current && current < moment().startOf('hour');
    }
  };






  useEffect(() => {
    axios.get('/vehicles/getVehicles').then(res => {

      setVehicles(res.data);
      setrecords(res.data);
      setIsRangePickerOpen(true);
      setIsModalVisible(true);




    });
  }, []);

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };




  useEffect(() => {

    if (selectedTypeFilter) {
      setrecords(Vehicles.filter((Vehicle) => {
        const typeMatch = Vehicle.type?.toLowerCase() === selectedTypeFilter.toLowerCase();
        return typeMatch;
      }));
    } else {

      setrecords(Vehicles);
    }
  }, [selectedTypeFilter, Vehicles]);

  const Filter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setrecords(Vehicles.filter((Vehicle) => {
      const typeMatch = Vehicle.type?.toLowerCase()?.includes(searchTerm);
      const ownerMatch = Vehicle.owner?.toLowerCase()?.includes(searchTerm);
      const modelMatch = Vehicle.model?.toLowerCase()?.includes(searchTerm);
      return typeMatch || ownerMatch || modelMatch;
    }));
  };

  const handleSortType = () => {
    const sortedRecords = [...records];
    sortedRecords.sort((a, b) => {
      const typeA = a.type || '';
      const typeB = b.type || '';

      if (sortTypeAscending) {
        return typeA.localeCompare(typeB);
      } else {
        return typeB.localeCompare(typeA);
      }
    });
    setrecords(sortedRecords);
    setSortTypeAscending(!sortTypeAscending);
  };


  const handleSortPrice = () => {
    const sortedRecords = [...records];
    sortedRecords.sort((a, b) => {
      if (sortPriceAscending) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setrecords(sortedRecords);
    setSortPriceAscending(!sortPriceAscending);
  };

  const handleSortModel = () => {
    const sortedRecords = [...records];
    sortedRecords.sort((a, b) => {
      const modelA = a.model || '';
      const modelB = b.model || '';

      if (sortModelAscending) {
        return modelA.localeCompare(modelB);
      } else {
        return modelB.localeCompare(modelA);
      }
    });
    setrecords(sortedRecords);
    setSortModelAscending(!sortModelAscending);
  };


  const uniqueVehicleTypes = [...new Set(Vehicles.map((Vehicle) => Vehicle.type))];



  return (
    <Default_Layout>


      <div className="py-2 px-2 mx-auto flex items-center">
        <input
          className="placeholder-italic placeholder-text-slate-400 block bg-white w-full border border-black-300 rounded-lg h-10 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Search for anything..."
          type="text"
          name="search"
          onChange={Filter}
        />



        <select
          className="ml-2 bg-purple-400 hover:bg-purple-500 py-2 px-2 border rounded h-10 text-l"
          onChange={(e) => setSelectedTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          {uniqueVehicleTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button
          className="ml-2 bg-purple-400 hover:bg-purple-500 text-black py-2 px-2 rounded border h-10 text-l"
          onClick={handleSortModel}
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="black"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
            <span className="text-sm">
              <div className="flex"> <div>Model:&nbsp;</div> <div> {sortModelAscending ? "Ascending" : "Descending"}</div> </div>
            </span>
          </div>
        </button>
        <button
          className="ml-2 bg-purple-400 hover:bg-purple-500 text-black py-2 px-2 rounded border h-10 text-l"
          onClick={handleSortPrice}
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="black"
              className="w-4 h-4 mr-1"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={sortPriceAscending ? "M5 15l7-7 7 7" : "M5 9l7 7 7-7"}
              />
            </svg>
            <span className="text-sm">
              <div className="flex"> <div>Price:&nbsp;</div> <div> {sortPriceAscending ? "Ascending" : "Descending"}</div> </div>
            </span>
          </div>
        </button>

      </div>
    
      <div className="text-center">
        <Modal
          title=" --- Select Date Range to Check Availability ---"
          visible={isModalVisible}
          onOk={handleModalCancel}
          onCancel={handleModalCancel}
        >
          <div className="text-center">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD YYYY HH:mm"
            onChange={debouncedHandleRangeChange}
            disabledDate={disabledDate}
            disabledTime={disabledTime}
            defaultValue={[moment(), moment()]}
            required
          />
          </div>
          <div className="text-center">
          {!selectedDateRange && (
            <div style={{ color: "red" }}>Please select a valid date range</div>
          )}</div>
        </Modal>
      </div>




      <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 mx-auto container">
        {records.length > 0 &&
          records
            .filter((Vehicle) => Vehicle.status === 'Available')
            .map((Vehicle) => (
              <Link to={`/Vehicle/${Vehicle._id}`} key={Vehicle._id} className="link-wrapper">
                <div className="bg-gray-500 mb-2 rounded-2xl flex ">
                  {Vehicle.photos?.[0] && (
                    <img
                      className="rounded-2xl h-64 w-full object-cover"
                      src={`http://localhost:8090/${Vehicle.photos?.[0]}`}
                      alt=""
                    />
                  )}
                </div>
                <div className="flex">
                  <div>
                    <h2 className="font-bold text-lg text-center">{Vehicle.type} : {Vehicle.model}</h2>
                  </div>
                  <div className="ml-auto">
                    <div className="black-box shadow">
                      <h2 className="font-bold white-text text-sm text-justify">Rs.&nbsp;{formatPriceWithComma(Vehicle.price)} / hour</h2>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-sm text-black-500 ">Owner: {Vehicle.owner_id.name}</h2>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6.5 6.326a6.52 6.52 0 01-1.5 .174 6.487 6.487 0 01-5.011-2.36l.49-.98a.423.423 0 01.614-.164l.294.196a.992.992 0 001.491-1.139l-.197-.593a.252.252 0 01.126-.304l1.973-.987a.938.938 0 00.361-1.359.375.375 0 01.239-.576l.125-.025A2.421 2.421 0 0012.327 6.6l.05-.149a1 1 0 00-.242-1.023l-1.489-1.489a.5.5 0 01-.146-.353v-.067a6.5 6.5 0 015.392 9.23 1.398 1.398 0 00-.68-.244l-.566-.566a1.5 1.5 0 00-1.06-.439h-.172a1.5 1.5 0 00-1.06.44l-.593.592a.501.501 0 01-.13.093l-1.578.79a1 1 0 00-.553.894v.191a1 1 0 001 1h.5a.5.5 0 01.5.5v.326z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-sm text-black ml-2">Location: {Vehicle.location}</h3>
                </div>
              </Link>
            ))}
      </div>
    </Default_Layout>
  );
}
