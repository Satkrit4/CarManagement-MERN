import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CarListPage from './pages/CarListPage';
import CarDetailPage from './pages/CarDetailPage';
import CarFormPage from './pages/CarFormPage';
import EditCarPage from './pages/EditCarPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cars/new" element={<CarFormPage />} />
        <Route path="/cars/edit/:id" element={<EditCarPage/>} />
        <Route path="/cars/:id" element={<CarDetailPage />} />
        <Route path="/" element={<CarListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
