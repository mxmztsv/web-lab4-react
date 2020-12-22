import React, {useCallback, useContext, useEffect, useState} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from "../hooks/http.hook";


export const Navbar = (props) => {
    const {loading, error, request, clearError} = useHttp()
    const {token} = useContext(AuthContext)
    const {userId} = useContext(AuthContext)
    const history = useHistory()
    const auth = useContext(AuthContext)


    const destroySession = async () => {
        await request(`http://localhost:8080/api/v1/session/destroy/?token=${token}`, 'POST', {
            'x-user-id': userId,
            'x-token': token
        })
    }


    const logoutHandler = event => {
        event.preventDefault()

        destroySession()
        auth.logout()
        history.push('/')
    }


    return (
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper indigo" style={{ padding: '0 2rem' }}>
                    <span className="brand-logo">ЛР4 - id#{props.name}</span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
