import Axios from "axios";
import Cookie from 'js-cookie'
import { REGULATE_ITEM_LIST_REQUEST, REGULATE_ITEM_LIST_SUCCESS, REGULATE_ITEM_LIST_FAIL,} from "../contant/regulateItem";

const userInfo = Cookie.getJSON("userInfo") || null
if (userInfo) {
  Axios.defaults.headers.common.Authorization = "Bearer "+userInfo?.data?.access_token
}

const listRegulateItemsAction = (itemId) => async (dispatch) => {
  try {
    dispatch({ type: REGULATE_ITEM_LIST_REQUEST, payload:{itemId} })
    const { data } = await Axios.get('/api/regulate/item/'+itemId)
    dispatch({ type: REGULATE_ITEM_LIST_SUCCESS, payload: data?.items })
  } catch (error) {
    dispatch({ type: REGULATE_ITEM_LIST_FAIL, payload: error.message })
  }
}


export { listRegulateItemsAction};