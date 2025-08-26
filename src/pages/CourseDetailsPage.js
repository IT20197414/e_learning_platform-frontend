import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Typography, Box, Button, CircularProgress, Alert, Paper, Grid
} from '@mui/material';
import { getCourseDetails } from '../features/courseActions';

const CourseDetailsPage = () => {
  const { id: courseId } = useParams(); // Get the course ID from the URL

  console.log('CourseDetailsPage received ID from URL:', courseId);   //Added to debugging

  const dispatch = useDispatch();

  // Get the courseDetails state from Redux
  const { loading, course, error } = useSelector(
    (state) => state.course.courseDetails
  );

  useEffect(() => {
    // Fetch course details when the component loads or the ID changes
    dispatch(getCourseDetails(courseId));
  }, [dispatch, courseId]);

  return (
    <Container maxWidth="lg">
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : course ? (
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* Left side with course details */}
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom>
              {course.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {course.category}
            </Typography>
            <Typography variant="body1" paragraph>
              {course.description}
            </Typography>
          </Grid>

          {/* Right side with enrollment card */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Price: ${course.price}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Instructor: {course.instructor.name}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                // We will add the enrollment logic later
              >
                Enroll Now
              </Button>
            </Paper>
          </Grid>
        </Grid>
      ) : null}
    </Container>
  );
};

export default CourseDetailsPage;