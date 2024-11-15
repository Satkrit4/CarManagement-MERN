# Car Management App (MERN Stack)

[![Netlify Status](https://api.netlify.com/api/v1/badges/<your-badge-id>/deploy-status)](https://car-management-app-mern.netlify.app/)

## Live Demo

Check out the live version of the application: [Car Management App](https://car-management-app-mern.netlify.app/)

## Overview

Car Management App is a full-stack web application built using the MERN stack (MongoDB, Express, React, and Node.js). It allows users to manage a list of cars, including creating, updating, deleting, and viewing car details.

### Key Features:
- User Authentication: Signup and login functionality to manage cars securely.
- Car CRUD Operations: Users can create, view, update, and delete cars.
- Add Multiple Images: Users can upload up to 10 images per car.
- Responsive Design: The app is built to be responsive across all devices.

## Technologies Used

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas

## Installation and Setup

To run the project locally:

### Prerequisites
- Node.js and npm must be installed.
- MongoDB Atlas account or local MongoDB setup.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Satkrit4/CarManagement-MERN.git
   cd CarManagement-MERN
   ```

2. **Install Dependencies**:
   - Backend:
     ```bash
     npm install
     ```
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Add Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     MONGO_URI=<your_mongo_uri>
     JWT_SECRET=<your_jwt_secret>
     ```

4. **Run the Application**:
   - Backend:
     ```bash
     npm run server
     ```
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

5. **Build the Frontend for Production**:
   ```bash
   cd frontend
   npm run build
   ```

## Deployment

The app is deployed using Netlify for the frontend and a cloud service (such as Render) for the backend.

To deploy your own version:

1. **Frontend Deployment**:
   - Create a production build using `npm run build`.
   - Deploy the `build` folder to **Netlify** or **Vercel**.

2. **Backend Deployment**:
   - Deploy the backend to **Heroku**, **AWS**, or another cloud platform.
   - Make sure to set the environment variables on the platform's settings.

## Usage

- Navigate to [Car Management App](https://car-management-app-mern.netlify.app/).
- Sign up or log in to start managing your cars.
- Add, update, view, or delete car information.
