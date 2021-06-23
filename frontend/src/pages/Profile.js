import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, batch } from 'react-redux'

import { API_URL } from '../reusable/urls'
import BathForm from '../components/BathForm'
import BathList from '../components/BathList'
import Header from '../components/Header'

import user from '../reducers/user'


const Profile = () => {
  const [isLoading, setIsLoading] = useState(true)
  const username = useSelector(store => store.user.username)
  const accessToken = useSelector(store => store.user.accessToken)
  const currentPosition = useSelector(store => store.user.currentPosition)
  const baths = useSelector(store => store.user.baths)
  
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/');
    }
  }, [accessToken, history]);

  
  return (
    <section className="profile-container">
      <div className="profile-container-left">
        <h1 className="profile-title">Welcome {username}</h1>
        <h2 className="profile-subtitle">Create your bath place</h2>
        <BathForm />
      </div>
      <div className="profile-container-right">
        <BathList />
      </div>
    </section>
  )
}

export default Profile