import { LOAD_LIST_FACILITY, TOGGLE_FACILITY, LOAD_LIST_FACILITY_FAIL } from './types'
import { getErrors } from './errors'
import axios from 'axios';
import Cookies from 'js-cookie';
import { createSelector } from 'reselect'

import { loadList } from './homestays'

const initialState = {
    list: [],
    filterString: "",
    visibilityFilter: 'SHOW_ALL'
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
                list: list,
                filterString: ""
            }
        case TOGGLE_FACILITY:
            let newFilterString = ""

            list = state.list.map(f => {
                if (action.payload.includes(f.id)) {
                    newFilterString += `&${f.id}`
                }
                return f
            })
            console.log('TOGGLE FACILITY ACTION')
            action.reload({ facilities: newFilterString })
            return {
                ...state,
                filterString: newFilterString
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



export const toggleFacilityChecked = (fids, reloadHListFunc) => dispatch => {
    console.log(reloadHListFunc)
    dispatch({
        type: TOGGLE_FACILITY,
        payload: fids, //cac id cua facility trong checked list
        reload: reloadHListFunc
    })
}


/*
    Selector
*/

const getFacilities = state => state.facilities.list

export const getCheckedFacility = createSelector(
    getFacilities,
    facilities => {
        return facilities.filter(f => {
            console.log(f.checked)
            return f.checked
        })
    }
)

export const getListSuggestFacility = createSelector(
    getFacilities,
    facilities => {
        return facilities.map(f => ({ title: f.name, fid: f.id }))
    }
)