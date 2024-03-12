import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';

function RentalItem({ rental }) {
  return (
    <Col key={rental.id} md={3}>
      <Link to={`/rental/${rental.id}`} style={{ textDecoration: 'none' }}>
        <Card className="mb-4 shadow">
          <Card.Img src={rental.image} alt="Rental" style={{ height: '180px' }} />
          <Card.Body>
            <Card.Title style={{ color: 'darkblue' }} > {rental.model} </Card.Title>
            <Card.Text style={{ color: 'purple' }} > {rental.address} </Card.Text>
            <Card.Title style={{ color: 'brown' }}>
              BDT {rental.price}  (
              <span style={{ color: rental.is_available ? 'green' : 'red' }}>
                {rental.is_available ? 'Available' : 'Not Available'}
              </span>)
            </Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

function Rental() {
  const [rentals, setRentals] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    document.title = 'Rent';

    let apiUrl = 'http://127.0.0.1:8000/api/rentals/';

    // If a type is selected, add it to the API URL
    if (selectedType) {
      apiUrl += `?vehicle_type=${selectedType}`;
    }

    Axios.get(apiUrl)
      .then((response) => {
        setRentals(response.data);
      })
      .catch((error) => {
        console.error('Error fetching rental data:', error);
      });
  }, [selectedType]);

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
            <Button variant="danger" href="http://localhost:3000/s/home">
              Log Out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {/* Filter section */}
        <div className="mb-4">
          <h4 className="text-center" style={{ color: 'blue' }}>Choose To See Available Post of Vehicle For Rent</h4>
          <Form.Select onChange={(e) => setSelectedType(e.target.value)} style={{ color: 'purple' }}>
            <option value="" className="text-center">Show All Types of Vehicles</option>
            <option value="Car" className="text-center">Show Only Car</option>
            <option value="Bike" className="text-center">Show Only Bike</option>
          </Form.Select>
        </div>

        <Row>
          {rentals.map((rental) => (
            <RentalItem key={rental.id} rental={rental} />
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Rental;
