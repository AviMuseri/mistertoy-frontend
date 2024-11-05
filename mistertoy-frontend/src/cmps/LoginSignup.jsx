import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { LoginForm } from './LoginForm.jsx'

import { useState } from "react"

export function LoginSignup({ setUser }) {
  const [isSignup, setIsSignUp] = useState(false)

  function onLogin(credentials) {
    isSignup ? signup(credentials) : login(credentials)
  }

  async function login(credentials) {
    try {
      const user = await userService.login(credentials)
      setUser(user)
      showSuccessMsg('Logged in successfully')
    } catch (err) {
      console.log('err', err)
      showErrorMsg('Oops, try again')
    }
  }

  async function signup(credentials) {
    try {
      const user = await userService.signup(credentials)
      setUser(user)
      showSuccessMsg('Signed in successfully')
    } catch (err) {
      showErrorMsg('Oops, try again')
    }
  }


  return (
    <section className="login">
      <LoginForm onLogin={onLogin} isSignup={isSignup} />
      <div className="btns">
        <a href="#" onClick={() => setIsSignUp(prev => !prev)}>
          {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
        </a>
      </div>
    </section>
  )
}
