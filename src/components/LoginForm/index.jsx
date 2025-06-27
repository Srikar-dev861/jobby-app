import { useState } from "react"
import {useNavigate, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }
  const onChangePassword = event => {
    setPassword(event.target.value)
  }
  const renderPasswordField = () => (
    <>
      <label htmlFor="password" className="input-label">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={onChangePassword}
        className="input-field"
        placeholder="Password"
      />
    </>
  )
  const renderUsernameField = () => (
    <>
      <label htmlFor="username" className="input-label">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={onChangeUsername}
        className="input-field"
        placeholder="Username"
      />
    </>
  )
  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    navigate('/', {replace: true})
  }
  const onSubmitFailure = error => {
    setShowSubmitError(true)
    setErrorMsg(error)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {
      username,
      password,
    }
    const url = `https://apis.ccbp.in/login`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }
  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Navigate to="/" replace />
  }
  return (
    <div className="login-form-container">
      
      <form className="form-container" onSubmit={submitForm}>
        <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="login-website-logo-mobile-img"  
      />
        <div className="input-container">
          {renderUsernameField()}
        </div>
        <div className="input-container">
          {renderPasswordField()}
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && (
          <p className="error-msg">*{errorMsg}</p>
        )}
      </form>
    </div>
  )
}

export default LoginForm