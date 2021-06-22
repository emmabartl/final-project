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
      <Header />
      <div>
        <h1>
          Welcome {username}
        </h1>
      </div>
      {currentPosition && <BathForm />}
      {baths.length > 0 ? 
        <BathList />
      : <div>
          <p>You haven't created any baths yet</p>
          {/* <p>Go to the menu to create one</p> */}
        </div>
      }
    </section>
  )
}

export default Profile