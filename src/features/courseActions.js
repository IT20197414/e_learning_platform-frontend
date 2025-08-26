import axios from 'axios';
import {
  courseCreateRequest,
  courseCreateSuccess,
  courseCreateFail,
  courseListRequest,
  courseListSuccess,
  courseListFail,
  courseDetailsRequest,
  courseDetailsSuccess,
  courseDetailsFail,
  
} from './courseSlice';

export const createCourse = (courseData) => async (dispatch) => {
  try {
    dispatch(courseCreateRequest());

    // We don't need to manually send the token.
    // The browser's cookie will be sent automatically with the request.
    const { data } = await axios.post('/api/courses', courseData);

    dispatch(courseCreateSuccess(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(courseCreateFail(errorMessage));
  }

  
};

// ACTION: LIST ALL COURSES
export const listCourses = () => async (dispatch) => {
  try {
    dispatch(courseListRequest());

    const { data } = await axios.get('/api/courses');

    dispatch(courseListSuccess(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(courseListFail(errorMessage));
  }
};


// ACTION: GET DETAILS FOR A SINGLE COURSE
export const getCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch(courseDetailsRequest());

    const { data } = await axios.get(`/api/courses/${id}`);

    dispatch(courseDetailsSuccess(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(courseDetailsFail(errorMessage));
  }
};