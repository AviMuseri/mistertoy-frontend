import { useState } from "react"

import { NavLink, useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service.js'
import { LoginSignup } from './LoginSignup.jsx'
import { UserMsg } from './UserMsg.jsx'

export function AppHeader() {
    const [user, setUser] = useState(userService.getLoggedInUser())
    const navigate = useNavigate()

    async function onLogout() {
        await userService.logout()
        setUser(null)
        navigate('/')
    }

    return (
        <>
            <header className="app-header full main-layout">
                <section className="header-container flex justify-between">
                    <h1>mister-toy !(yourToy)</h1>
                    {!user && <LoginSignup setUser={setUser} />}
                    {user && (
                        <div className="nav-bar-container flex space-between">

                            <nav className="app-nav flex">
                                <NavLink to="/" >Home</NavLink>
                                <NavLink to="/about" >About</NavLink>
                                <NavLink to="/toy" >Toys</NavLink>
                                <a href="#">🛒 Cart</a>
                            </nav>

                            <div className="app-nav flex">
                                <p className="user">Hello {user.fullname}</p>
                                <button className="btn" onClick={onLogout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </header>
            <UserMsg />
        </>

    )
}
