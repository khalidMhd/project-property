import Axios from "axios";
import Cookie from 'js-cookie'
import { CATEGORY_ADD_FAIL, CATEGORY_ADD_REQUEST, CATEGORY_ADD_SUCCESS, CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_EDIT_FAIL, CATEGORY_EDIT_REQUEST, CATEGORY_EDIT_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS } from "../contant/category";

const userInfo = Cookie.getJSON("userInfo") || null
if (userInfo) {
  Axios.defaults.headers.common.Authorization = "Bearer "+userInfo?.data?.access_token
}

const listCategoryAction = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST })
    const { data } = await Axios.get('/api/category')
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data?.category })
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message })
  }
}


const addCategoryAction = (name, description, isActive) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_ADD_REQUEST,  payload: { name, description, isActive } })
    const { data } = await Axios.post('/api/category', { name, description, isActive })
    dispatch({ type: CATEGORY_ADD_SUCCESS, payload: data?.category })
  } catch (error) {
    dispatch({ type: CATEGORY_ADD_FAIL, payload: error.message })
  }
}


const deleteCategoryAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST, payload:id})
    const { data } = await Axios.delete('/api/category/'+id)
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data?.category })
  } catch (error) {
    dispatch({ type: CATEGORY_DELETE_FAIL, payload: error.message })
  }
}

const editCategoryAction = (id, name, description, isActive) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_EDIT_REQUEST,  payload: {id, name, description, isActive } })
    const { data } = await Axios.put('/api/category/'+ id, {id, name, description, isActive})
    dispatch({ type: CATEGORY_EDIT_SUCCESS, payload: data?.category })
  } catch (error) {
    dispatch({ type: CATEGORY_EDIT_FAIL, payload: error.message })
  }
}

export { listCategoryAction, editCategoryAction, deleteCategoryAction, addCategoryAction };