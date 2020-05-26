import { LOAD_LIST_FACILITY, TOGGLE_FACILITY, LOAD_LIST_FACILITY_FAIL } from './types'
import { getErrors } from './errors'
import axios from 'axios';
import Cookies from 'js-cookie';
import { createSelector } from 'reselect'


const initialState = {
    list: [],
    visibilityFilter: 'SHOW_ALL',
    filterList: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        // Action load list cac facility
        case LOAD_LIST_FACILITY:
            let list = action.payload.map(f => {
                f.checked = false
                return f
            })
            return {
                ...state,
                list: list
            }
        case TOGGLE_FACILITY:
            state.list[action.payload].checked = !state.list[action.payload].checked
            return {
                ...state,
                filterList: state.filterList.map(f => f.checked ? f : undefined)
            }
        default:
            return state;
    }
}

/*
    ACTION
*/

// Send request post can gan them csrf token
axios.defaults.headers.post['X-CSRFToken'] = Cookies.get('csrftoken');
let api_url = '/homestay/api'

// LOAD LIST FACILITY
export const loadFacilities = () => dispatch => {
    axios
        .get(`${api_url}/facilities/list`)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: LOAD_LIST_FACILITY,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch(getErrors(err))
            dispatch({
                type: LOAD_LIST_FACILITY_FAIL
            })
        })
}



export const toggleFacilityChecked = (findex) => dispatch => dispatch({
    type: TOGGLE_FACILITY,
    payload: findex //index cua facility trong list
})


/*
    Selector
*/

const getVisibilityFilter = state => state.facilities.visibilityFilter
const getFacilities = state => state.facilities.list

export const getCheckedFacility = createSelector(
    [getVisibilityFilter, getFacilities],
    (visibilityFilter, facilities) => {
        switch (visibilityFilter) {
            case 'SHOW_ALL':
                return facilities
            case 'SHOW_INCLUDED':
                return facilities.filter(f => f.checked)
            case 'SHOW_EXCLUDED':
                return facilities.filter(f => !f.checked)
        }
    }
)
