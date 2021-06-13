import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import BathRating from '../components/BathRating'

import user from '../reducers/user'
import bath from '../reducers/bath'

const Profile = () => {
  const userId = useSelector(store => store.user.userId)
  const username = useSelector(store => store.user.username)
  const accessToken = useSelector(store => store.user.accessToken)
  const name = useSelector(state => state.bath.name)
  
  const dispatch = useDispatch()
  const history = useHistory()

  // useEffect(() => {
  //   if (!accessToken) {
  //     history.push('/');
  //   }
  // }, [accessToken, history]);
  
  return (
    <section className="profile-container">
      <div className="form-container">
        <h1>Create your bath place</h1>
        <form className="create-bath-form">
          <label className="bath-input-wrapper">
            <p className="bath-input-label">Bath place</p>
            <input
              className="bath-input-field"
              type="text"
              value={name}
              // onChange={onNameChange}
              placeholder="What do you call your place?"
              required
            />
          </label>
          <button>
            Submit form button
          </button>
        </form>
      <BathRating />
      </div>
      <div className="bath-container">
        <h1>Your bath places</h1>
      </div>
    </section>
  )
}

export default Profile