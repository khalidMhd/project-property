import Axios from "axios";
import Cookie from 'js-cookie'
import { UNIT_ADD_FAIL, UNIT_ADD_REQUEST, UNIT_ADD_SUCCESS, UNIT_DELETE_FAIL, UNIT_DELETE_REQUEST, UNIT_DELETE_SUCCESS, UNIT_EDIT_FAIL, UNIT_EDIT_REQUEST, UNIT_EDIT_SUCCESS, UNIT_LIST_FAIL, UNIT_LIST_REQUEST, UNIT_LIST_SUCCESS } from "../contant/unit";

const userInfo = Cookie.getJSON("userInfo") || null
if (userInfo) {
  Axios.defaults.headers.common.Authorization = "Bearer "+userInfo?.data?.access_token
}

const listUnitAction = () => async (dispatch) => {
  try {
    dispatch({ type: UNIT_LIST_REQUEST })
    const { data } = await Axios.get('/api/unit')
    dispatch({ type: UNIT_LIST_SUCCESS, payload: data.unit })
  } catch (error) {
    dispatch({ type: UNIT_LIST_FAIL, payload: error.message })
  }
}

const addUnitAction = (name, description, isActive) => async (dispatch) => {
  try {
    dispatch({ type: UNIT_ADD_REQUEST,  payload: { name, description, isActive } })
    const { data } = await Axios.post('/api/unit', { name, description, isActive })
    dispatch({ type: UNIT_ADD_SUCCESS, payload: data.unit })
  } catch (error) {
    dispatch({ type: UNIT_ADD_FAIL, payload: error.message })
  }
}


const deleteUnitAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: UNIT_DELETE_REQUEST, payload:id})
    const { data } = await Axios.delete('/api/unit/'+id)
    dispatch({ type: UNIT_DELETE_SUCCESS, payload: data.unit })
  } catch (error) {
    dispatch({ type: UNIT_DELETE_FAIL, payload: error.message })
  }
}

const editUnirAction = (id, name, description, isActive) => async (dispatch) => {
  try {
    dispatch({ type: UNIT_EDIT_REQUEST,  payload: {id, name, description, isActive } })
    const { data } = await Axios.put('/api/unit/'+ id, {id, name, description, isActive})
    dispatch({ type: UNIT_EDIT_SUCCESS, payload: data.unit })
  } catch (error) {
    dispatch({ type: UNIT_EDIT_FAIL, payload: error.message })
  }
}

export {listUnitAction, addUnitAction, deleteUnitAction, editUnirAction };