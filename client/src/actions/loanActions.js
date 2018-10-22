import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/loans/current')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const approveLoan = (approveData) => dispatch => {
  console.log("approveData",approveData);
  axios.post('/api/loans/approve', approveData)
    .then(res => 'hi')
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const raiseLoan = (raiseData) => dispatch => {
  console.log("raiseData",raiseData);
  axios.post('/api/loans/raised', raiseData)
    .then(res => 'hi')
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const fixRole = (raiseData) => dispatch => {
  console.log("fixedrole",raiseData);
  // console.log("localStorage--->",localStorage.getItem('jwtToken'));

  axios.post('/api/users/profile', raiseData)
    .then(res => 'hi')
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};



// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
