// import React from "react";
// // import logo from './logo.svg'
// import './App.css'
// import 'materialize-css'
//
// function App() {
//
//
//
//   return (
//     <div className="App">
//       <p>qwer</p>
//         <button className="btn waves-effect waves-light" type="submit" name="action">Submit
//             <i className="material-icons right">send</i>
//         </button>
//     </div>
//   )
// }
//
// export default App
import React from 'react'
import 'materialize-css'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {useRoutes} from "./routes"
import {useAuth} from "./hooks/auth.hook"
import {AuthContext} from "./context/AuthContext"
import {Navbar} from "./components/Navbar"
import {bindActionCreators, createStore} from 'redux'
import {connect, Provider} from 'react-redux'
import {MainPage} from "./pages/MainPage";
import {AuthPage} from "./pages/AuthPage";

const initialState = {
    name: 'Имя пользователя'
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ACTION_CHANGE_NAME':
            return {...state, name: action.payload}
    }

    return state
}

const store = createStore(rootReducer)

console.log(store.getState())

const putStateToProps = (state) => {
    console.log(state)
    return {
        name: state.name
    }
}

const putActionToProps = (dispatch) => {
    return {
        changeName: bindActionCreators(changeName, dispatch)
    }
}

const WrappedNavbar = connect(putStateToProps)(Navbar)
const WrappedAuthPage = connect(putStateToProps, putActionToProps)(AuthPage)

const changeName = (newName) => {
    return {
        type: 'ACTION_CHANGE_NAME',
        payload: newName
    }
}


function App() {
    const {token, login, logout, userId, ready} = useAuth()
    console.log(token, login, logout, userId, ready)
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Provider store={store}>
            <Router>
                {/*{isAuthenticated && <WrappedNavbar/>}*/}

                {/*<div className="container">*/}
                {/*    {routes}*/}
                {/*</div>*/}

                {isAuthenticated ? (
                    <>
                        <WrappedNavbar/>
                        <div className="container">
                            <Switch>
                                <Route path="/" exact>
                                    <MainPage />
                                </Route>
                                <Redirect to="/" />
                            </Switch>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="container">
                            <Switch>
                                <Route path="/" exact>
                                    <WrappedAuthPage />
                                </Route>
                                <Redirect to="/" />
                            </Switch>
                        </div>
                    </>
                )}
            </Router>
            </Provider>
        </AuthContext.Provider>
    )
}

// function App() {
//     return (
//         <Provider store={store}>
//             <main/>
//         </Provider>
//     )
// }

export default App

