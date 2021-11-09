import Axios from "axios";
import Cookie from 'js-cookie'
import { COMPLAINT_LIST_FAIL, COMPLAINT_LIST_REQUEST, COMPLAINT_LIST_SUCCESS } from "../contant/complaint";

const userInfo = Cookie.getJSON("userInfo") || null
if (userInfo) {
  Axios.defaults.headers.common.Authorization ="Bearer "+userInfo?.data?.access_token
}

const listComplaintAction = () => async (dispatch) => {
  try {
    dispatch({ type: COMPLAINT_LIST_REQUEST })
    const { data } = await Axios.get('/api/complaint')
    dispatch({ type: COMPLAINT_LIST_SUCCESS, payload: data?.complaint })
  } catch (error) {
    dispatch({ type: COMPLAINT_LIST_FAIL, payload: error.message })
  }
}


export {listComplaintAction };