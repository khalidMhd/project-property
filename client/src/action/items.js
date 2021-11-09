import Axios from "axios";
import Cookie from 'js-cookie'
import { ITEM_ADD_FAIL, ITEM_ADD_REQUEST, ITEM_ADD_SUCCESS, ITEM_DELETE_FAIL, ITEM_DELETE_REQUEST, ITEM_DELETE_SUCCESS, ITEM_EDIT_FAIL, ITEM_EDIT_REQUEST, ITEM_EDIT_SUCCESS, ITEM_LIST_FAIL, ITEM_LIST_REQUEST, ITEM_LIST_SUCCESS } from "../contant/items";

const userInfo = Cookie.getJSON("userInfo") || null
if (userInfo) {
  Axios.defaults.headers.common.Authorization = "Bearer "+userInfo?.data?.access_token
}

const listItemsAction = () => async (dispatch) => {
  try {
    dispatch({ type: ITEM_LIST_REQUEST })
    const { data } = await Axios.get('/api/items')
    dispatch({ type: ITEM_LIST_SUCCESS, payload: data?.items })
  } catch (error) {
    dispatch({ type: ITEM_LIST_FAIL, payload: error.message })
  }
}

const addItemsAction = (name, unitId, categoryId, isActive, minPrice, maxPrice) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_ADD_REQUEST,  payload: { name, unitId, categoryId, isActive, minPrice, maxPrice } })
    const { data } = await Axios.post('/api/items', {name, unitId, categoryId, isActive, minPrice, maxPrice})
    dispatch({ type: ITEM_ADD_SUCCESS, payload: data?.items  })
  } catch (error) {
    dispatch({ type: ITEM_ADD_FAIL, payload: error.message })
  }
}

const editItemsAction = (id, name, unitId, categoryId, isActive, minPrice, maxPrice) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_EDIT_REQUEST,  payload: {id, name, unitId, categoryId, isActive, minPrice, maxPrice } })
    const { data } = await Axios.put('/api/items/'+ id, {name, unitId, categoryId, isActive, minPrice, maxPrice })
    dispatch({ type: ITEM_EDIT_SUCCESS, payload: data?.items  })
  } catch (error) {
    dispatch({ type: ITEM_EDIT_FAIL, payload: error.message })
  }
}


const deleteItemsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_DELETE_REQUEST, payload:id})
    const { data } = await Axios.delete('/api/items/'+id)
    dispatch({ type: ITEM_DELETE_SUCCESS, payload: data?.items  })
  } catch (error) {
    dispatch({ type: ITEM_DELETE_FAIL, payload: error.message })
  }
}

export { listItemsAction, addItemsAction, deleteItemsAction, editItemsAction };