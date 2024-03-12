import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
function ProductSummary({ vehicle, isLoggedIn }) {
    const handleClick = () => {
        alert('Login required to view details, add post and chat with our AI-powered chatbot (Mr. Clever). ');
    };
  
    return (
      <Col key={vehicle.id} md={3}>
        <div onClick={handleClick} style={{ cursor: 'pointer', textDecoration: 'none' }}>
          <Card className="mb-4 shadow">
          <Card.Img src={vehicle.image} alt="Vehicle" style={{ height: '200px' }} />
          <Card.Body>
            <Card.Title style={{ color: 'darkblue' }}>{vehicle.make} {vehicle.model} </Card.Title>
            <Card.Title style={{ color: 'green' }}> {vehicle.address} </Card.Title>
            <Card.Title style={{ color: 'red' }}>BDT {vehicle.price} </Card.Title>
          </Card.Body>
          </Card>
        </div>
      </Col>
    );
  }

function Visit() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    document.title = 'Home';
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
  }, [selectedType]);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="http://localhost:3000/s/home">VehicleVerse</Navbar.Brand>
          <Navbar.Toggle aria-controls="vehicleverse" />
          <Navbar.Collapse id="vehicleverse">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
              <Nav.Link href="http://localhost:3000/s/home">Home</Nav.Link>
              <Nav.Link href="http://localhost:3000/s/rental">Rent</Nav.Link>
            </Nav>
            <Button variant="danger" href="http://127.0.0.1:8000/login/">Log in now</Button>
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

export default Visit;
