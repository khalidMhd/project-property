import { AREA_ADD_FAIL, AREA_ADD_REQUEST, AREA_ADD_SUCCESS, AREA_DELETE_FAIL, AREA_DELETE_REQUEST, AREA_DELETE_SUCCESS, AREA_EDIT_FAIL, AREA_EDIT_REQUEST, AREA_EDIT_SUCCESS, AREA_LIST_FAIL, AREA_LIST_REQUEST, AREA_LIST_SUCCESS } from "../contant/area";


function AreaListReducer (state = { areaList: [] }, action) {
    switch (action.type) {
        case AREA_LIST_REQUEST:
            return { loading: true, areaList: [] }

        case AREA_LIST_SUCCESS:
            return { loading: false, areaList: action.payload }

        case AREA_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

function AreaAddReducer (state = { areaAdd: {} }, action) {
    switch (action.type) {
        case AREA_ADD_REQUEST:
            return { loading: true, areaAdd: {} }

        case AREA_ADD_SUCCESS:
            return { loading: false, success: true, areaAdd: action.payload }

        case AREA_ADD_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

function AreaDeleteReducer (state = { areaDelete: {} }, action) {
    switch (action.type) {
        case AREA_DELETE_REQUEST:
            return { loading: true, areaDelete: {} }

        case AREA_DELETE_SUCCESS:
            return { loading: false, success: true, areaDelete: action.payload }

        case AREA_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


function AreaEditReducer (state = { areaEdit: {} }, action) {
    switch (action.type) {
        case AREA_EDIT_REQUEST:
            return { loading: true, areaEdit: {} }

        case AREA_EDIT_SUCCESS:
            return { loading: false, success: true, areaEdit: action.payload }

        case AREA_EDIT_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export { AreaListReducer, AreaAddReducer, AreaDeleteReducer, AreaEditReducer};