import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import user from '../reducers/user'
import bath from '../reducers/bath'

const BathList = () => {
  
  const name = useSelector(store => store.bath.name)
  
  const dispatch = useDispatch()
  const history = useHistory()

  // useEffect(() => {
  //   if (!accessToken) {
  //     history.push('/');
  //   }
  // }, [accessToken, history]);
  
  return (
    <div className="list-container">
      <h1>Your bath places:</h1>
    </div>
  )
}

export default BathList