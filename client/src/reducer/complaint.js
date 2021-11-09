import { COMPLAINT_LIST_FAIL, COMPLAINT_LIST_REQUEST, COMPLAINT_LIST_SUCCESS } from "../contant/complaint";


function ComplaintListReducer (state = { complaintList: [] }, action) {
    switch (action.type) {
        case COMPLAINT_LIST_REQUEST:
            return { loading: true, complaintList: [] }

        case COMPLAINT_LIST_SUCCESS:
            return { loading: false, complaintList: action.payload }

        case COMPLAINT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export { ComplaintListReducer };