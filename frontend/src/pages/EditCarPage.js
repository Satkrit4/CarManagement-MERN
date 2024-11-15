import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function EditCarPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState('');
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
        setTitle(data.car.title);
        setDescription(data.car.description);
        setTags(data.car.tags.join(','));
        setImages(data.car.images.join(','));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCar();
  }, [id]);

  const handleUpdateCar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/cars/${id}`, {
        title,
        description,
        tags: tags.split(','),
        images: images.split(','),
      }, config);
      navigate(`/cars/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} className="my-5">
          <div className="edit-car-container p-4 rounded bg-white">
            <h1 className="text-center mb-4">Edit Car Details</h1>
            <Form onSubmit={handleUpdateCar}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter car title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter car description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formTags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter tags separated by commas"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formImages">
                <Form.Label>Image URLs</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URLs separated by commas"
                  value={images}
                  onChange={(e) => setImages(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 button-primary">
                Update Car
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EditCarPage;
