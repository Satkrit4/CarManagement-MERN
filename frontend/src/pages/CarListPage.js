import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './carListPage.css';

function CarListPage() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cars`, config);
        setCars(data.cars);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCars();
  }, []);

  const handleEditCar = (carId) => {
    navigate(`/cars/edit/${carId}`);
  };

  const handleDeleteCar = async (carId) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/cars/${carId}`, config);
      setCars(cars.filter((car) => car._id !== carId));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCars = cars.filter((car) =>
    car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1 className="text-center mb-4">My Cars</h1>
          <Form className="mb-4 d-flex">
            <Form.Control
              type="text"
              placeholder="Search cars by title, description, or tags"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
          <Button
            variant="primary"
            className="mb-3 button-primary"
            onClick={() => navigate('/cars/new')}
          >
            Add New Car
          </Button>
        </Col>
      </Row>
      <Row>
        {filteredCars.map((car) => (
          <Col key={car._id} xs={12} md={4} className="mb-4">
            <Card className="car-card">
              {car.images.length > 0 && (
                <div className="car-images">
                  {car.images.slice(0, 10).map((image, index) => (
                    <Card.Img key={index} variant="top" src={image} alt={`Car image ${index + 1}`} className="img-thumbnail mb-2" />
                  ))}
                </div>
              )}
              <Card.Body>
                <Card.Title>{car.title}</Card.Title>
                <Card.Text>{car.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/cars/${car._id}`)}
                  className="button-primary"
                >
                  View Details
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleEditCar(car._id)}
                  className="ml-2 button-secondary"
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteCar(car._id)}
                  className="ml-2 button-danger"
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CarListPage;
