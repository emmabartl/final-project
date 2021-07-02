import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import BathForm from '../components/BathForm'
import BathList from '../components/BathList'

const Profile = () => {
  const username = useSelector(store => store.user.username)
  const accessToken = useSelector(store => store.user.accessToken)
  
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