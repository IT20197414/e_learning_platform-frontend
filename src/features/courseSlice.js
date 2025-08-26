import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // State for creating a single course
  loading: false,
  error: null,
  courseInfo: null, 

  // State for the list of all courses
  courseList: {
    loading: false,
    courses: [],
    error: null,
  },
  
  // State for a single course's details
  courseDetails: {
    loading: true, // Start loading on initial mount
    course: null,
    error: null,
  },
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    // --- Single Course Creation Reducers ---
    courseCreateRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    courseCreateSuccess: (state, action) => {
      state.loading = false;
      state.courseInfo = action.payload;
    },
    courseCreateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    courseCreateReset: (state) => {
      state.loading = false;
      state.error = null;
      state.courseInfo = null;
    },

    // --- Course List Fetching Reducers ---
    courseListRequest: (state) => {
      state.courseList.loading = true;
      state.courseList.error = null;
    },
    courseListSuccess: (state, action) => {
      state.courseList.loading = false;
      state.courseList.courses = action.payload;
    },
    courseListFail: (state, action) => {
      state.courseList.loading = false;
      state.courseList.error = action.payload;
    },

    // --- Course Details Fetching Reducers (Verified) ---
    courseDetailsRequest: (state) => {
      // When a new request starts, set loading true and clear old data.
      state.courseDetails = { ...state.courseDetails, loading: true };
    },
    courseDetailsSuccess: (state, action) => {
      state.courseDetails.loading = false;
      state.courseDetails.course = action.payload;
      state.courseDetails.error = null; // Clear any previous error
    },
    courseDetailsFail: (state, action) => {
      state.courseDetails.loading = false;
      state.courseDetails.error = action.payload;
    },
  },
});

export const {
  courseCreateRequest,
  courseCreateSuccess,
  courseCreateFail,
  courseCreateReset,
  courseListRequest,
  courseListSuccess,
  courseListFail,
  courseDetailsRequest,
  courseDetailsSuccess,
  courseDetailsFail,
} = courseSlice.actions;

export default courseSlice.reducer;