import { createSlice } from '@reduxjs/toolkit';

// Check localStorage for existing user info
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage, // Initial user info from storage or null
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Reducer for when a login/register request starts
    userAuthRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Reducer for when a login/register request succeeds
    userAuthSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // Reducer for when a login/register request fails
    userAuthFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Reducer for logging out
    userLogout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

// Export the actions so we can use them in our components
export const {
  userAuthRequest,
  userAuthSuccess,
  userAuthFail,
  userLogout,
} = userSlice.actions;

// Export the reducer to be added to our store
export default userSlice.reducer;