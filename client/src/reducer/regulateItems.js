import { REGULATE_ITEM_LIST_FAIL, REGULATE_ITEM_LIST_SUCCESS, REGULATE_ITEM_LIST_REQUEST } from "../contant/regulateItem";


function RegulateItemListReducer (state = { regulateItemList: [] }, action) {
    switch (action.type) {
        case REGULATE_ITEM_LIST_REQUEST:
            return { loading: true, regulateItemList: [] }

        case REGULATE_ITEM_LIST_SUCCESS:
            return { loading: false, regulateItemList: action.payload }

        case REGULATE_ITEM_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export { RegulateItemListReducer};