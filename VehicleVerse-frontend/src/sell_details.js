import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';

function DetailsPage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(vehicle?.extra_data || {});
  const [username, setUsername] = useState('');

  useEffect(() => {
    document.title = 'Vehicle Details';

    // Fetch vehicle details
    fetch(`http://127.0.0.1:8000/api/vehicles/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setVehicle(data);
        setComments(data.extra_data || {});
      })
      .catch((error) => {
        console.error('Error fetching vehicle details:', error);
      });

    // Retrieve username from cookies
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'username') {
        setUsername(value);
        break;
      }
    }
  }, [id]);

  const handleCommentSubmit = () => {
    const timestamp = new Date().toISOString();
    const commentData = {
      extra_data: {
        ...comments,
        [timestamp]: {
          username: username, // Assuming username is set in the state
          comment: comment,
        },
      },
    };

    fetch(`http://127.0.0.1:8000/api/vehicles/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => response.json())
      .then((data) => {
        setVehicle(data);
        setComments(data.extra_data || {});
        setComment('');
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  if (!vehicle) {
    return <div>Loading...</div>;
  }

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
                  target="_blank"
                >
                  ADD For Sell
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="http://localhost:8000/admin/marketplace/rental/add/"
                  target="_blank"
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
        <Row className="justify-content-md-center">
          <Col lg={12}>
            <Card className="shadow" style={{ width: '125%', marginLeft: '-10%', marginRight: '-10%' }}>
              <Row>
                <Col md={6}>
                  <Card.Img src={vehicle.image} alt="Vehicle" />
                </Col>
                <Col md={6}>
                  <Card.Body>
                    <div className="mb-3" style={{ fontSize: '1.4em', color: 'blue'  }}>
                      <strong style={{ color: 'purple' }}>Seller:</strong> {vehicle.seller}
                    </div>
                    <div className="mb-3" style={{ fontSize: '1.4em' }}>
                      <strong style={{ color: 'purple' }}>Model:</strong> {vehicle.make} {vehicle.model}
                    </div>
                    <div className="mb-3" style={{ fontSize: '1.4em' }}>
                      <strong style={{ color: 'purple' }}>Year:</strong> {vehicle.year}
                    </div>
                    <div className="mb-3" style={{ fontSize: '1.4em', color: 'red' }}>
                      <strong style={{ color: 'purple' }}>Price:</strong> {vehicle.price} BDT
                    </div>
                    <div className="mb-3" style={{ fontSize: '1.4em' }}>
                      <strong style={{ color: 'purple' }}>Call:</strong> {vehicle.phone_number}
                    </div>
                    <div className="mb-3" style={{ fontSize: '1.4em' }}>
                      <strong style={{ color: 'purple' }}>Whatsapp:</strong> {vehicle.whatsapp}
                    </div>
                    <div className="mb-3" style={{ fontSize: '1.4em' }}>
                      <strong style={{ color: 'purple' }}>Address:</strong> {vehicle.address}
                    </div>
                    <div className="mb-3" style={{ fontSize: '1.4em' }}>
                      <strong style={{ color: 'purple' }}>Description:</strong> {vehicle.description}
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>

            {/* New comment section */}
            <Card className="mt-4 shadow" style={{ width: '125%', marginLeft: '-10%', marginRight: '-10%' }}>
  <Card.Body>
    <Card.Title>
      <h1 style={{ color: 'darkblue' }}>Available Comments:</h1>
    </Card.Title>
    {Object.keys(comments).length === 0 ? (
      <div style={{ color: 'red' }}>No comments available</div>
    ) : (
      Object.entries(comments).map(([timestamp, commentData]) => (
        <div key={timestamp} className="mb-3" style={{ fontSize: '1.5em' }}>
          <strong style={{ color: 'green' }}>{new Date(timestamp).toLocaleString()}, {commentData.username}:</strong> {commentData.comment}
        </div>
      ))
    )}
    {/* Comment form */}
    <Form className="mt-3">
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleCommentSubmit}>
        Add Comment
      </Button>
    </Form>
  </Card.Body>
</Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DetailsPage;
