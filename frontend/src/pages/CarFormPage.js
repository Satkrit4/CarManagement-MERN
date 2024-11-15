import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function CarFormPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState(['']); 
  const navigate = useNavigate();

  const handleAddImage = () => {
    if (images.length < 10) {
      setImages([...images, '']);
    }
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cars`, { title, description, tags: tags.split(','), images }, config);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} className="my-5">
          <div className="car-form-container p-4 rounded bg-white">
            <h1 className="text-center mb-4">Add New Car</h1>
            <Form onSubmit={handleSubmit}>
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

              <Form.Label>Images</Form.Label>
              {images.map((image, index) => (
                <Form.Group controlId={`formImage${index}`} key={index} className="d-flex align-items-center mb-2">
                  <Form.Control
                    type="text"
                    placeholder={`Enter image URL ${index + 1}`}
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                  />
                  {index > 0 && (
                    <Button variant="danger" onClick={() => handleRemoveImage(index)} className="ml-2">
                      Remove
                    </Button>
                  )}
                </Form.Group>
              ))}
              {images.length < 10 && (
                <Button variant="secondary" onClick={handleAddImage} className="mb-3">
                  Add Another Image
                </Button>
              )}

              <Button variant="primary" type="submit" className="w-100 button-primary" onClick={handleSubmit}>
                Add Car
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CarFormPage;
