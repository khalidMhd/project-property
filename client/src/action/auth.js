import Axios from "axios";
import Cookie from 'js-cookie'
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
  USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, 
  UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, 
} from "../contant/auth";

const userInfo = Cookie.getJSON("userInfo") || null
if (userInfo) {
  Axios.defaults.headers.common.Authorization = "Bearer "+userInfo?.data?.access_token
}

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })
  try {
    const { data } = await Axios.post('/api/signin', { email, password })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    console.log(data);
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
}

const signup = (name, userName,type, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST, payload: { name, userName,type, password } });
  try {
    const { data } = await Axios.post("/api/signup", { name, userName, type, password });
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_SIGNUP_FAIL, payload: error.message });
  }
}

const editPasswordAction = ( currentPassword, updatePassword) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST,  payload: { currentPassword, updatePassword } })
    const { data } = await Axios.put('/api/update/password', { currentPassword, updatePassword})
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.message })
  }
}

export { signin, signup, editPasswordAction };