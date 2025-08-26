import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { listCourses } from '../features/courseActions';
import CourseCard from '../components/CourseCard';

const HomePage = () => {
  const dispatch = useDispatch();

  // Get the courseList state from Redux
  const { loading, courses, error } = useSelector((state) => state.course.courseList);

  // Fetch courses when the component loads
  useEffect(() => {
    dispatch(listCourses());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Courses
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item key={course._id} xs={12} sm={6} md={4}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default HomePage;