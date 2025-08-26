import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InstructorRoute from './components/InstructorRoute';
import CreateCoursePage from './pages/CreateCoursePage';
import { Container } from '@mui/material';

// Import our components
import Header from './components/Header'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container sx={{ mt: 4 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Instructor-Only Routes */}
            <Route path="" element={<InstructorRoute />}> {/* 3. WRAP in InstructorRoute */}
              <Route path="/courses/create" element={<CreateCoursePage />} />
            </Route>
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;