import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import BathForm from '../components/BathForm'
import BathList from '../components/BathList'
import Header from '../components/Header'

import user from '../reducers/user'
import bath from '../reducers/bath'

const Profile = () => {
  const userId = useSelector(store => store.user.userId)
  const username = useSelector(store => store.user.username)
  const accessToken = useSelector(store => store.user.accessToken)
  
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/');
    }
  }, [accessToken, history]);
  
  return (
    <section className="profile-container">
      <Header />
      <div>
        <h1>
          Welcome {username}
        </h1>
      </div>
      <BathForm />
      <BathList />
    </section>
  )
}

export default Profile