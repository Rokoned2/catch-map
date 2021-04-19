import AsyncStorage from '@react-native-async-storage/async-storage';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';
import {
  SIGN_IN,
  SIGN_OUT,
  ADD_ERROR,
} from "./types";


export const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: SIGN_IN, payload: token });
    navigate('TrackList');
  } else {
    navigate('Signup');
  }
};


export const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};


export const signup = (email, password) => async dispatch => {
  try {
    const response = await trackerApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: SIGN_IN, payload: response.data.token });
    navigate('TrackList');

  } catch (err) {
    dispatch({
      type: ADD_ERROR,
      payload: 'Something went wrong with sign up'
    });
  }
};


export const signin = (email, password) => async dispatch => {
  try {
    const response = await trackerApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: SIGN_IN, payload: response.data.token });
    navigate('TrackList');
  } catch (err) {
    dispatch({
      type: ADD_ERROR,
      payload: 'Something went wrong with sign in'
    });
  }
};


export const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: SIGN_OUT });
  navigate('loginFlow');
};
