import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function CarDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cars/${id}`, config);
        setCar(data.car);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/cars/${id}`, config);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCar = () => {
    navigate(`/cars/edit/${id}`);
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8} className="my-5">
          <Card>
            {car.images && car.images.length > 0 && (
            <Card.Img variant="top" src={car.images[0]} alt="Car image" />)}
            <Card.Body>
              <Card.Title>{car.title}</Card.Title>
              <Card.Text>{car.description}</Card.Text>
              <Card.Text><strong>Tags:</strong> {car.tags.join(', ')}</Card.Text>
              <div className="car-images">
                {car.images.map((image, index) => (
                  <img key={index} src={image} alt={`Car image ${index + 1}`} className="img-thumbnail mb-2" />
                ))}
              </div>
              <Button
                variant="secondary"
                onClick={handleEditCar}
                className="button-secondary"
              >
                Update
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                className="ml-2 button-danger"
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CarDetailPage;