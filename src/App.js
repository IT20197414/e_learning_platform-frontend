import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

// --- Component Imports ---
import Header from './components/Header';
import InstructorRoute from './components/InstructorRoute';

// --- Page Imports ---
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateCoursePage from './pages/CreateCoursePage';
import CourseDetailsPage from './pages/CourseDetailsPage';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container sx={{ mt: 4, mb: 4 }}> {/* Added margin-bottom for spacing */}
          <Routes>
            {/* ======================================== */}
            {/*           PUBLIC ROUTES                  */}
            {/* ======================================== */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* This is a public route for viewing a single course's details */}
            <Route path="/course/:id" element={<CourseDetailsPage />} />


            {/* ======================================== */}
            {/*       INSTRUCTOR-ONLY ROUTES             */}
            {/* ======================================== */}
            {/* The InstructorRoute component acts as a wrapper. Any route nested */}
            {/* inside it will only be accessible to logged-in instructors. */}
            <Route path="" element={<InstructorRoute />}>
              <Route path="/courses/create" element={<CreateCoursePage />} />
              {/* Add other instructor-only routes here in the future */}
            </Route>

          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;