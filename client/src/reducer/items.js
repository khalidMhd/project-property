import { ITEM_ADD_FAIL, ITEM_ADD_REQUEST, ITEM_ADD_SUCCESS, ITEM_DELETE_FAIL, ITEM_DELETE_REQUEST, ITEM_DELETE_SUCCESS, ITEM_EDIT_FAIL, ITEM_EDIT_REQUEST, ITEM_EDIT_SUCCESS, ITEM_LIST_FAIL, ITEM_LIST_REQUEST, ITEM_LIST_SUCCESS } from "../contant/items";


function ItemListReducer (state = { itemList: [] }, action) {
    switch (action.type) {
        case ITEM_LIST_REQUEST:
            return { loading: true, itemList: [] }

        case ITEM_LIST_SUCCESS:
            return { loading: false, itemList: action.payload }

        case ITEM_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

function ItemAddReducer (state = { itemAdd: {} }, action) {
    switch (action.type) {
        case ITEM_ADD_REQUEST:
            return { loading: true, itemAdd: {} }

        case ITEM_ADD_SUCCESS:
            return { loading: false, success: true, itemAdd: action.payload }

        case ITEM_ADD_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

function ItemEditReducer (state = { itemEdit: {} }, action) {
    switch (action.type) {
        case ITEM_EDIT_REQUEST:
            return { loading: true, itemEdit: {} }

        case ITEM_EDIT_SUCCESS:
            return { loading: false, success: true, itemEdit: action.payload }

        case ITEM_EDIT_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

function ItemDeleteReducer (state = { itemDelete: {} }, action) {
    switch (action.type) {
        case ITEM_DELETE_REQUEST:
            return { loading: true, itemDelete: {} }

        case ITEM_DELETE_SUCCESS:
            return { loading: false, success: true, itemDelete: action.payload }

        case ITEM_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export { ItemListReducer, ItemAddReducer, ItemDeleteReducer, ItemEditReducer};