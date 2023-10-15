import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import logo from './Screenshot (46).png';  // Import your logo image file

const Headers = () => {
  const linkStyles = {
    textDecoration: 'none',
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'FuturisticFont, sans-serif',
    fontSize: '24px',
    transition: 'all 0.3s ease',
    padding: '10px 20px',
  };

  const logoStyles = {
    height: '40px', // Set the height of your logo
    marginRight: '10px', // Add some spacing between logo and text
  };

  const navbarStyles = {
    background: '#BE75F0',
    height: '60px',
    borderBottom: '2px solid #BE75F0',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const activeLinkStyles = {
    color: '#BE75F0',
  };

  return (
    <>
      <Navbar style={navbarStyles} variant="dark">
        <Container>
          <NavLink to="/" style={linkStyles}>
            <img src={logo} alt="Logo" style={logoStyles} />
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" style={linkStyles} activeStyle={activeLinkStyles}>Staff List</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Headers;
