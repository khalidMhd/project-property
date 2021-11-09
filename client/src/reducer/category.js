import { CATEGORY_ADD_FAIL, CATEGORY_ADD_REQUEST, CATEGORY_ADD_SUCCESS, CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_EDIT_FAIL, CATEGORY_EDIT_REQUEST, CATEGORY_EDIT_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS } from "../contant/category";


function CategoryListReducer (state = { categoryList: [] }, action) {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true, categoryList: [] }

        case CATEGORY_LIST_SUCCESS:
            return { loading: false, categoryList: action.payload }

        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


function CategoryAddReducer (state = { categoryAdd: {} }, action) {
    switch (action.type) {
        case CATEGORY_ADD_REQUEST:
            return { loading: true, categoryAdd: {} }

        case CATEGORY_ADD_SUCCESS:
            return { loading: false, success: true, categoryAdd: action.payload }

        case CATEGORY_ADD_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

function CategoryDeleteReducer (state = { categoryDelete: {} }, action) {
    switch (action.type) {
        case CATEGORY_DELETE_REQUEST:
            return { loading: true, categoryDelete: {} }

        case CATEGORY_DELETE_SUCCESS:
            return { loading: false, success: true, categoryDelete: action.payload }

        case CATEGORY_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


function CategoryEditReducer (state = { categoryEdit: {} }, action) {
    switch (action.type) {
        case CATEGORY_EDIT_REQUEST:
            return { loading: true, categoryEdit: {} }

        case CATEGORY_EDIT_SUCCESS:
            return { loading: false, success: true, categoryEdit: action.payload }

        case CATEGORY_EDIT_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export { CategoryListReducer, CategoryAddReducer, CategoryDeleteReducer, CategoryEditReducer};