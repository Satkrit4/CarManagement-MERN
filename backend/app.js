const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Ensure userRoutes path is correct
const carRoutes = require('./routes/carRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Management API',
      version: '1.0.0',
      description: 'API documentation for the Car Management Application',
    },
    servers: [{ url: 'http://localhost:5000' }],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
