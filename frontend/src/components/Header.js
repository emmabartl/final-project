import React from 'react'
import { batch, useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import flamingo from '../assets/flamingos.png'

import user from '../reducers/user'

const Header = () => {
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

  const onButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))

      localStorage.removeItem('user')

      history.push('/')
    })
  }

  return (
    <section className="header-container">
      <div className="img-container">
        <img className="flamingo" src={flamingo} alt="flamingo icon" />
      </div>
      {accessToken && <button className="sign-out-button" onClick={onButtonClick}>Sign out</button>}  
    </section>
  )
}

export default Header