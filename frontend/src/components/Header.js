import React from 'react'
import { batch, useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import user from '../reducers/user'

const Header = () => {
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

  const onButtonClick = () => {

    batch(() => {
      // dispatch(user.actions.setUserId(null))
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))

      localStorage.removeItem('user')

      history.push('/')
    })
  }

  return (
    <section className="header-container">
      {/* <header className="hero-container">
        {'/' && <video 
          src="./Videos/waves.mp4"
          type="video/mp4" 
          // autoPlay={true}
          loop={true}
          muted={true}
          width="750"
          height="500"
        >
        </video>}
          
        

      </header> */}
      {accessToken && <button className="sign-out-button" onClick={onButtonClick}>Sign out</button>}  
    </section>
  )
}

export default Header