import axios from 'axios';
import {
  userAuthRequest,
  userAuthSuccess,
  userAuthFail,
  userLogout,
} from './userSlice';

/**
 * @desc    Register a new user and get user info
 * @param   {string} name - User's full name
 * @param   {string} email - User's email
 * @param   {string} password - User's password
 * @param   {string} role - User's role ('Student' or 'Instructor')
 */
export const register = (name, email, password, role) => async (dispatch) => {
  try {
    // Dispatch request to set loading state
    dispatch(userAuthRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Make API call to the backend
    const { data } = await axios.post(
      '/api/users/register',
      { name, email, password, role },
      config
    );

    // Dispatch success and save user info to state
    dispatch(userAuthSuccess(data));
  } catch (error) {
    // Dispatch failure and save error message to state
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userAuthFail(errorMessage));
  }
};

/**
 * @desc    Authenticate a user and get user info
 * @param   {string} email - User's email
 * @param   {string} password - User's password
 */
export const login = (email, password) => async (dispatch) => {
  try {
    // Dispatch request to set loading state
    dispatch(userAuthRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Make API call to the backend
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    // Dispatch success and save user info to state
    dispatch(userAuthSuccess(data));
  } catch (error)
 {
    // Dispatch failure and save error message to state
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userAuthFail(errorMessage));
  }
};

/**
 * @desc    Log a user out
 */
export const logout = () => async (dispatch) => {
  try {
    // Make API call to backend to clear the server-side cookie
    await axios.post('/api/users/logout');

    // Dispatch logout to clear user info from frontend state
    dispatch(userLogout());
  } catch (error) {
    console.error('Logout API call failed, but logging out on frontend.', error);
    // Still clear the frontend state even if the backend call fails
    dispatch(userLogout());
  }
};