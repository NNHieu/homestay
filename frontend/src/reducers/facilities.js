import { LOAD_LIST_FACILITY, CHECKED_FACILITIES, LOAD_LIST_FACILITY_FAIL } from './types'
import { getErrors } from './errors'
import axios from 'axios';
import Cookies from 'js-cookie';
import { createSelector } from 'reselect'

import { loadList } from './homestay'
import { mapToObj } from '../utils/collection';

const initialState = {
    list: [],
    visibilityFilter: 'SHOW_ALL'
}

export default function (state = initialState, action) {
    switch (action.type) {
        // Action load list cac facility
        case LOAD_LIST_FACILITY:
            return {
                ...state,
                list: action.payload.map(f => {
                    f.checked = false
                    return f
                })
            }
        case CHECKED_FACILITIES:
            console.log('CHECK FACILITY ACTION')
            let newFilterString = ""
            return {
                ...state,
                list: state.list.map(f => {
                    if (action.payload.includes(f.id)) {
                        f.checked = true
                    } else {
                        f.checked = false
                    }
                    return f
                })
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



export const checkFacilities = (fids) => dispatch => {
    dispatch({
        type: CHECKED_FACILITIES,
        payload: fids, //cac id cua facility trong checked list
    })
}


/*
    Selector
*/

const getFacilities = state => state.facilities.list

export const getAllFacilities = createSelector(
    getFacilities
)

export const getFacilitiesFromHomestay = (homestay) => createSelector(
    getFacilities,
    facilities => {
        if (!homestay)
            return []
        return facilities.filter(f => homestay.facilities.includes(f.id))
    }
)

export const getCheckedFacility = createSelector(
    getFacilities,
    facilities => {
        return facilities.filter(f => {
            console.log(f.checked)
            return f.checked
        })
    }
)



export const getListSuggestFacility = (isAreaFacility) => createSelector(
    getFacilities,
    facilities => {
        if (isAreaFacility !== undefined)
            facilities = facilities.filter(f => f.is_area_facility === isAreaFacility)
        // const ret = mapToObj(facilities, [["name", "title"], "id"])
        // console.log(ret)
        return facilities.map(f => ({ title: f.name, id: f.id }))
    }
)

export const filterString = flist => {
    let filterString = ""
    flist.map(f => {
        filterString += `\&${f.id}`
    })
    return filterString
}