import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../reusable/urls'
import user from '../reducers/user'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const accessToken = useSelector(store => store.user.accessToken)
  const errors = useSelector(store => store.user.errors)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      history.push('/bathmap')
    }
  }, [accessToken, history])

  const onNameChange = (event) => {
    setUsername(event.target.value)
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
      body: JSON.stringify({ username, password })
    }

    fetch(API_URL('users'), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.userId))
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))

            // localStorage.setItem('bath', JSON.stringify({
            //   userId: data.userId,
            //   username: data.username,
            //   accessToken: data.accessToken
            // }))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
  }

  return (
    <section className="signup-container">
      <form className="signup-form" onSubmit={onFormSubmit}>
        <h1 className="header-form">Create an user</h1>
        {errors && 
          <>
            {errors.error.code === 11000 
            ? 
            <p className="error-message">Username is not unique</p>
            : 
            <p className="error-message">{errors.message}</p>}
          </>
        }
        <label className="input-wrapper">
          <p className="input-label">Name</p>
          <input
            className="input-field"
            type="text"
            value={username}
            onChange={onNameChange}
            placeholder="Type your username"
            required
          />
        </label>
        <label className="input-wrapper">
          <p className="input-label">Password</p>
          <input
            className="input-box"
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
            required
          />
        </label>
        <div className="button-container">
          <button type="submit" className="form-button">Sign up</button>
        </div>
      </form>
      <div className="img-container">
        <img src="../public/flamingo.png" alt="flamingo icon" />
      </div>
    </section>
  )
}

export default SignUp