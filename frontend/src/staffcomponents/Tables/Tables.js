import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';

import Paginations from '../pagination/Paginations';
import { BASE_URL } from '../../services/helper';
import { NavLink } from 'react-router-dom';
import { statuschangefunc } from "../../services/Apis";
import { ToastContainer, toast } from "react-toastify";
import './table.css';

const Tables = ({ userdata, deleteUser, userGet, handlePrevious, handleNext, page, pageCount, setPage }) => {

  const handleChange = async (id, status) => {
    const response = await statuschangefunc(id, status);
    if (response.status === 200) {
      userGet();
      toast.success("Status Updated");
    } else {
      toast.error("Error");
    }
  };

  const exportToCSV = () => {
    const header = 'ID,FullName,Email,nic,role,Gender,Status\n';
    const csv = userdata.map((element, index) => {
      return `${index + 1 + (page - 1) * 4},${element.fname} ${element.lname},${element.email},${element.nic},${element.role},${element.gender === "Male" ? "M" : "F"},${element.status}\n`;
    }).join('');
    const csvData = new Blob([header, csv], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvData);
    const tempLink = document.createElement('a');
    tempLink.href = csvUrl;
    tempLink.setAttribute('download', 'users.csv');
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  return (
    <>
      <div className="container" style={{ backgroundColor: '#ffcccb' }}>
        <Row>
          <div className="col mt-0">
            <Card className='shadow'>
              <div>
                <button
                  onClick={exportToCSV}
                  className='generate-pdf-button'
                >
                  Export to CSV
                </button>
              </div>
              <Table className='align-items-center' responsive="sm">

                   <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>NIC</th>
                    <th>Role</th>
                    <th>Gender</th>

          
              
                    
                    <th>Profile</th>
                    <th>&nbsp;&nbsp;&nbsp;Status</th>
                    <th>Action</th>
                  </tr>
                </thead>



                <tbody>
                  {
                    userdata.length > 0 ? userdata.map((element, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1 + (page - 1) * 4}</td> 
                          <td>{element.fname}&nbsp; {element.lname}</td>
                          <td>{element.email}</td>
                          <td>{element.nic}</td>
                          <td>{element.role}</td>
                          <td>{element.gender === "Male" ? "M" : "F"}</td>

                        
                          <td className='img_parent'>
                            <img src={`${BASE_URL}/uploads/${element.profile}`} alt="img" />
                          </td>
                          <td className='d-flex align-items-center'>
                            <Dropdown className='text-center'>
                              <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                <Badge bg={element.status === "Active" ? "primary" : "danger"}>
                                  {element.status} <i className="fa-solid fa-angle-down"></i>
                                </Badge>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleChange(element._id, "Active")}>Active</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleChange(element._id, "InActive")}>InActive</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <NavLink to={`/userprofile/${element._id}`} className="text-decoration-none">
                                    <i className="fa-solid fa-eye" style={{ color: "green" }}></i> <span>View</span>
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <NavLink to={`/edit/${element._id}`} className="text-decoration-none">
                                    <i className="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i> <span>Edit</span>
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <div onClick={() => deleteUser(element._id)}>
                                    <i className="fa-solid fa-trash" style={{ color: "red" }}></i> <span>Delete</span>
                                  </div>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    }) : <div className='no_data text-center'>NO Data Found</div>
                  }
                </tbody>
              </Table>
              
              <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />




            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  );
};

export default Tables;
