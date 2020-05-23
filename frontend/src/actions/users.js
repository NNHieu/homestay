import axios from 'axios';

import { GET_USERS, DELETE_USER, ADD_USER } from './types';

const api_url = '/account/api/';

//GET USERS
export const getUsers = () => dispatch => {
    axios
        .get(api_url)
        .then((res) => {
            dispatch({
                type: GET_USERS,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
};

//DELETE USER
export const deleteUser = (id) => dispatch => {
    axios
        .delete(api_url + `${id}/`)
        .then((res) => {
            dispatch({
                type: DELETE_USER,
                payload: id, //id của user bị xóa
            });
        })
        .catch(err => console.log(err));
}

//ADD USER
export const addUser = (user) => dispatch => {
    axios
        .post(api_url, user)
        .then(res => {
            dispatch({
                type: ADD_USER,
                payload: res.data,
            })
        })
        .catch(err => console.log(err));
}