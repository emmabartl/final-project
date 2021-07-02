import React, { useState } from 'react'
import { batch, useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { Drawer } from "antd"
import { MenuOutlined } from "@ant-design/icons"
import "antd/dist/antd.css"

import flamingo from '../assets/flamingos.png'

import user from '../reducers/user'

const Header = () => {
  const [visible, setVisible] = useState(false)
 
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const handleLogOut = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))

      localStorage.removeItem('user')

      history.push('/')
    })
    onClose()
  }


  return (
    <section className="header-container">
      <img className="flamingo-logo" src={flamingo} alt="flamingo icon" />
      <MenuOutlined className="burger-icon" onClick={showDrawer} />
      <Drawer
        title="Menu"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <div className="drawer-container">
          <div className="drawer-links-top-container">
            <Link onClick={onClose} to="/" className="drawer-link">Home</Link>
            <Link onClick={onClose} to="/profile" className="drawer-link">Profile</Link>
            <Link onClick={onClose} to="/bathmap" className="drawer-link">Create bath</Link>
            <Link onClick={onClose} to="/register" className="drawer-link">Register</Link>
          </div>
          {accessToken && 
            <div className="drawer-links-bottom-container">
              <Link to="/" className="drawer-link" onClick={handleLogOut}>Sign out</Link>
            </div>
          }
        </div>
      </Drawer>      
    </section>
  )
}

export default Header






