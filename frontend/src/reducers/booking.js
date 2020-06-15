import { BOOKING_SUCCESS, BOOKING_FAIL } from './types'
import axios from 'axios'

const initial_state = {
    days: null,
    guestS: null,
}

export default function (state = initial_state, action) {
    switch (action.type) {
        case BOOKING_SUCCESS:
        case BOOKING_FAIL:
        default:
            break
    }
}

export const book = (days, guests) => dispatch => {
    if (days && days.from && days.to && guests && guests.adults && guests.children && guests.rooms) {
        console.log('Booking')
        console.log(days)
        console.log(guests)
    }
}