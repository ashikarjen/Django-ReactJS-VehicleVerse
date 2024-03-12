import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';

function ProductSummary({ vehicle }) {
  return (
    <Col key={vehicle.id} md={3}>
      <Link to={`/details/${vehicle.id}`} style={{ textDecoration: 'none' }}>
        <Card className="mb-4 shadow">
          <Card.Img src={vehicle.image} alt="Vehicle" style={{ height: '200px' }} />
          <Card.Body>
            <Card.Title style={{ color: 'darkblue' }}>{vehicle.make} {vehicle.model} </Card.Title>
            <Card.Title style={{ color: 'green' }}> {vehicle.address} </Card.Title>
            <Card.Title style={{ color: 'red' }}>BDT {vehicle.price} </Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  // Get the username from the URL
  const { username } = useParams();

  useEffect(() => {
    document.title = 'Home';

    if (!document.getElementById('botpress-script')) {
      const botpressScript = document.createElement('script');
      botpressScript.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
      botpressScript.id = 'botpress-script';
      document.head.appendChild(botpressScript);
  
      // Wait for the inject.js script to load before loading config.js
      botpressScript.onload = () => {
        const configScript = document.createElement('script');
        configScript.src = 'https://mediafiles.botpress.cloud/4b02266a-68c1-487c-9f0a-8ecec9060ea9/webchat/config.js';
        document.head.appendChild(configScript);
      };
    }

    let apiUrl = 'http://127.0.0.1:8000/api/vehicles/';

    // If a type is selected, add it to the API URL
    if (selectedType) {
      apiUrl += `?vehicle_type=${selectedType}`;
    }

    Axios.get(apiUrl)
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching vehicle data:', error);
      });

    // Set username cookie with a 7-day expiration
    if (username) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      document.cookie = `username=${username}; expires=${expirationDate.toUTCString()}`;
    }
  }, [selectedType, username]);
  

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="http://localhost:3000">VehicleVerse</Navbar.Brand>
          <Navbar.Toggle aria-controls="vehicleverse" />
          <Navbar.Collapse id="vehicleverse">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
              <Nav.Link href="http://localhost:3000">Home</Nav.Link>
              <Nav.Link href="http://localhost:3000/rental">Rent</Nav.Link>
              <NavDropdown title="POST" id="navbarScrollingDropdown">
                <NavDropdown.Item
                  href="http://localhost:8000/admin/marketplace/vehicle/add/"
                  target="_blank"  // This opens the link in a new window
                >
                  ADD For Sell
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="http://localhost:8000/admin/marketplace/rental/add/"
                  target="_blank"  // This opens the link in a new window
                >
                  ADD For Rent
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Button variant="danger" href="http://localhost:3000/s/home">Log Out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {/* Filter section */}
        <div className="mb-4">
          <h4 className="text-center" style={{ color: 'blue' }}>Choose To See Available Post of Vehicle For Sell</h4>
          <Form.Select onChange={(e) => setSelectedType(e.target.value)} style={{ color: 'purple' }}>
            <option value="" className="text-center">Show All Types of Vehicles</option>
            <option value="Car" className="text-center">Show Only Car</option>
            <option value="Bike" className="text-center">Show Only Bike</option>
          </Form.Select>
        </div>

        <Row>
          {vehicles.map((vehicle) => (
            <ProductSummary key={vehicle.id} vehicle={vehicle} />
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
