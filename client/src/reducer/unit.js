import { UNIT_ADD_FAIL, UNIT_ADD_REQUEST, UNIT_ADD_SUCCESS, UNIT_DELETE_FAIL, UNIT_DELETE_REQUEST, UNIT_DELETE_SUCCESS, UNIT_EDIT_FAIL, UNIT_EDIT_REQUEST, UNIT_EDIT_SUCCESS, UNIT_LIST_FAIL, UNIT_LIST_REQUEST, UNIT_LIST_SUCCESS } from "../contant/unit";


function UNITListReducer (state = { unitList: [] }, action) {
    switch (action.type) {
        case UNIT_LIST_REQUEST:
            return { loading: true, unitList: [] }

        case UNIT_LIST_SUCCESS:
            return { loading: false, unitList: action.payload }

        case UNIT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

function UnitAddReducer (state = { unitAdd: {} }, action) {
    switch (action.type) {
        case UNIT_ADD_REQUEST:
            return { loading: true, unitAdd: {} }

        case UNIT_ADD_SUCCESS:
            return { loading: false, success: true, unitAdd: action.payload }

        case UNIT_ADD_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

function UnitDeleteReducer (state = { unitDelete: {} }, action) {
    switch (action.type) {
        case UNIT_DELETE_REQUEST:
            return { loading: true, unitDelete: {} }

        case UNIT_DELETE_SUCCESS:
            return { loading: false, success: true, unitDelete: action.payload }

        case UNIT_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


function UnitEditReducer (state = { unitEdit: {} }, action) {
    switch (action.type) {
        case UNIT_EDIT_REQUEST:
            return { loading: true, unitEdit: {} }

        case UNIT_EDIT_SUCCESS:
            return { loading: false, success: true, unitEdit: action.payload }

        case UNIT_EDIT_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export { UNITListReducer, UnitAddReducer, UnitDeleteReducer, UnitEditReducer};