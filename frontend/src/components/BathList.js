import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { API_URL } from '../reusable/urls'
import bath from '../reducers/bath'


const BathList = () => {
  const [bathList, setBathList] = useState([])

  const name = useSelector(store => store.bath.name)
  const accessToken = useSelector(store => store.user.accessToken)
  
  useEffect(() => {
    fetchBathList()
  }, [])

  const fetchBathList = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    }

    fetch(API_URL('baths'), options)
      .then(res => res.json())
      .then(data => {
        console.log("ASKDHAKSHDKAHS")
        console.log(data)
        setBathList(data)
      })
      .catch(error => {
        alert (error.message)
      })   
  }
  console.log(bathList)
  
  return (
    <div className="list-container">
      <h1>Your bath places</h1>
      <p>Here's a list of your previous baths:</p>
      {bathList.data && bathList.data.map((bath) => {
        return (
          <div>{bath.name}</div>
        )
      })
      }
    </div>
  )
}

export default BathList