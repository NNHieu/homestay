import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { LOGIN_URL } from '../../urls'

export function AuthRoute(props) {
    const authState = useSelector(state => state.auth)
    const { component: Component, verify, ...other } = props
    console.log('Auth Route to ' + other.path)
    return (
        <Route
            {...other}
            render={props => (authState.isAuthenticated && (!verify || (verify && authState.user.is_verified)) ?
                <Component {...props} /> :
                <Redirect to={LOGIN_URL + "?next=" + other.path} />
            )}
        />
    )
}
