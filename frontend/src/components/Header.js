import React, {useState, useEffect } from 'react'
import { batch, useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import user from '../reducers/user'

const Header = () => {
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

  // useEffect(() => {
  //   history.push('/signup')

  // }, [logout, history])

  const onButtonClick = (event) => {

    batch(() => {
      // dispatch(user.actions.setUserId(null))
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))

      localStorage.removeItem('user')
    })
  }

  return (
    <header>
      {accessToken && <button className="sign-out-button" onClick={onButtonClick}>Sign out</button>}  
    </header>
  )
}

export default Header