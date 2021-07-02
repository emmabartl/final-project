import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../reusable/urls'

import user from '../reducers/user'

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const accessToken = useSelector(store => store.user.accessToken)
  const errors = useSelector(store => store.user.errors)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  const onNameChange = (event) => {
    setUsername(event.target.value)
  }

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    }

    fetch(API_URL('register'), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))

            localStorage.setItem('user', JSON.stringify({
              username: data.username,
              accessToken: data.accessToken
            }))
          })
        } else {
          dispatch(user.actions.setErrors(data))
          setUsername("")
          setEmail("")
          setPassword("")
        }
      })
  }

  return (
    <section className="signup-container">
      <h1 className="form-header">Create an account</h1>
      <form className="form-container" onSubmit={onFormSubmit}>
        {errors && 
          <>
            {errors.error.code === 11000 
            ? <p className="error-message">Username is not unique</p>
            : <p className="error-message">{errors.message}</p>}
          </>
        }
        <label htmlFor="nameInput" className="input-label-register">Username
          <input
            id="nameInput"
            className="input-field"
            type="text"
            value={username}
            onChange={onNameChange}
            placeholder="Username"
            required
          />
        </label>
        <label htmlFor="emailInput" className="input-label-register">Email
          <input
            id="emailInput"
            className="input-field"
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Email"
            required
          />
        </label>
        <label htmlFor="passwordInput" className="input-label-register">Password
          <input
            id="passwordInput"
            className="input-field"
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
            required
          />
        </label>
        <div className="button-container">
          <button type="submit" className="form-button">Register</button>
        </div>
      </form>
    </section>
  )
}

export default Register