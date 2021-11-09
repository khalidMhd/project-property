import Axios from "axios";
import Cookie from 'js-cookie'
import { AREA_ADD_FAIL, AREA_ADD_REQUEST, AREA_ADD_SUCCESS, AREA_DELETE_FAIL, AREA_DELETE_REQUEST, AREA_DELETE_SUCCESS, AREA_EDIT_FAIL, AREA_EDIT_REQUEST, AREA_EDIT_SUCCESS, AREA_LIST_FAIL, AREA_LIST_REQUEST, AREA_LIST_SUCCESS } from "../contant/area";

const userInfo = Cookie.getJSON("userInfo") || null
if (userInfo) {
  Axios.defaults.headers.common.Authorization ="Bearer "+userInfo?.data?.access_token
}

const listAreaAction = () => async (dispatch) => {
  try {
    dispatch({ type: AREA_LIST_REQUEST })
    const { data } = await Axios.get('/api/area')
    dispatch({ type: AREA_LIST_SUCCESS, payload: data?.area })
  } catch (error) {
    dispatch({ type: AREA_LIST_FAIL, payload: error.message })
  }
}

const addAreaAction = (name, description, isActive) => async (dispatch) => {
  try {
    dispatch({ type: AREA_ADD_REQUEST,  payload: { name, description, isActive } })
    const { data } = await Axios.post('/api/area', { name, description, isActive })
    dispatch({ type: AREA_ADD_SUCCESS, payload: data?.area })
  } catch (error) {
    dispatch({ type: AREA_ADD_FAIL, payload: error.message })
  }
}


const deleteAreaAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: AREA_DELETE_REQUEST, payload:id})
    const { data } = await Axios.delete('/api/area/'+id)
    dispatch({ type: AREA_DELETE_SUCCESS, payload: data?.area })
  } catch (error) {
    dispatch({ type: AREA_DELETE_FAIL, payload: error.message })
  }
}

const editAreaAction = (id, name, description, isActive) => async (dispatch) => {
  try {
    dispatch({ type: AREA_EDIT_REQUEST,  payload: {id, name, description, isActive } })
    const { data } = await Axios.put('/api/area/'+ id, {id, name, description, isActive})
    dispatch({ type: AREA_EDIT_SUCCESS, payload: data?.area })
  } catch (error) {
    dispatch({ type: AREA_EDIT_FAIL, payload: error.message })
  }
}

export {listAreaAction, addAreaAction, deleteAreaAction, editAreaAction };