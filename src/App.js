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
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes"
import {useAuth} from "./hooks/auth.hook"
import {AuthContext} from "./context/AuthContext"
import {Navbar} from "./components/Navbar"


function App() {
    const {token, login, logout, userId, ready} = useAuth()
    console.log(token, login, logout, userId, ready)
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Router>
                { isAuthenticated && <Navbar />}

                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App

