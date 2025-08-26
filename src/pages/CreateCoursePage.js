import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Typography, TextField, Button, Box, CircularProgress, Alert
} from '@mui/material';
import { createCourse } from '../features/courseActions';
import { courseCreateReset } from '../features/courseSlice';

const CreateCoursePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courseCreate = useSelector((state) => state.course);
  const { loading, error, courseInfo } = courseCreate;

  useEffect(() => {
    // If courseInfo exists, it means the course was created successfully
    if (courseInfo) {
      // We reset the state so we don't get stuck on this page
      dispatch(courseCreateReset());
      // Redirect to a new page, e.g., the instructor's dashboard (we'll create this later)
      // For now, let's go back to the home page.
      navigate('/'); 
    }
  }, [courseInfo, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const courseData = { title, description, category, price };
    dispatch(createCourse(courseData));
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Create a New Course
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
        {loading && <CircularProgress sx={{ mt: 2 }} />}
        <Box component="form" onSubmit={submitHandler} sx={{ mt: 3 }}>
          <TextField
            variant="outlined" margin="normal" required fullWidth
            label="Course Title" value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            variant="outlined" margin="normal" required fullWidth multiline rows={4}
            label="Course Description" value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            variant="outlined" margin="normal" required fullWidth
            label="Category" value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            variant="outlined" margin="normal" required fullWidth
            label="Price" type="number" value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button
            type="submit" fullWidth variant="contained"
            sx={{ mt: 3, mb: 2 }} disabled={loading}
          >
            Create Course
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateCoursePage;