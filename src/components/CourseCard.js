import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const CourseCard = ({ course }) => {

    console.log('CourseCard is rendering for course ID:', course._id); //Added for debuging
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description.substring(0, 100)}...
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">
            Instructor: {course.instructor.name}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            ${course.price}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button 
          component={RouterLink} 
          to={`/course/${course._id}`} // We will build this page later
          variant="contained" 
          fullWidth
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default CourseCard;