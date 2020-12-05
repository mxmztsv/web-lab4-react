import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        login: '',
        pass: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    },[error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {

            // здесь будет запрос на авторизацию

            // const data = await request('/api/auth/login', 'POST', {...form})
            // console.log(data)
            // localStorage.setItem('userData', data)

            // ожидается что то типа такого в ответе
            const data = {
                token: 'testToken',
                userId: '123',
                name: 'Maxim'
            }

            auth.login(data.token, data.userId, data.name)

        } catch (e) {
            console.log(e.message)
        }
    }


    const registerHandler = async () => {
        try {

            // здесь будет запрос на регистрацию

            // const data = await request('/api/auth/register', 'POST', {...form})
            // console.log('Data', data)
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Вход</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Войдите или зарегистрируйтесь</span>
                        <div>

                            <div className="input-field">
                                <input placeholder="Введите логин" id="login" type="text" name="login" value={form.login} onChange={changeHandler}/>
                                <label htmlFor="login">Логин</label>
                            </div>

                            <div className="input-field">
                                <input placeholder="Введите пароль" id="pass" type="password" name="pass" value={form.pass} onChange={changeHandler}/>
                                <label htmlFor="login">Пароль</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" onClick={loginHandler} disabled={loading} style={{marginRight: 10}}>Войти</button>
                        <button className="btn yellow darken-4" onClick={registerHandler} disabled={loading}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
