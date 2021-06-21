import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useSelector, useDispatch, batch } from 'react-redux'


import { API_URL } from '../reusable/urls'
import user from '../reducers/user'
import { useHistory } from 'react-router-dom'


const BathList = () => {
  const [isLoading, setIsLoading] = useState(true)
 
  const accessToken = useSelector(store => store.user.accessToken)
  const bathList = useSelector(store => store.user.baths)
  
  const dispatch = useDispatch()
  const history = useHistory()

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
        if (data.success) {
          batch(() => {
            setIsLoading(false)
            dispatch(user.actions.setBaths(data.baths))
            dispatch(user.actions.setErrors(null))
          })
        } else {
          setIsLoading(false)
          dispatch(user.actions.setErrors(data))  
        }
      })
      .catch(error => {
        alert (error.message)
      })   
  }

  const onButtonClick = () => {

  }
    
  return (
    <section className="list-container">
      <h1>Your bath places</h1>
      {isLoading && <h3>Loading...</h3>}
      <div className="bath-list">
        <p>Here's a list of your previous baths:</p>
        {bathList && bathList.map((bath) => {
          return (
            <div>
              <p>{bath.name}</p>
              <p>{bath.rating}</p>
              <p>{moment(bath.createdAt).calendar()}</p>
            </div>
          ) 
        })
        }
      </div>
      <button 
        className="button" 
        type="button"
        onClick={() => history.push('/bathmap')}
      >Show baths on map
      </button>

    </section>
  )
}

export default BathList

 
  // console.log(bathList.data)

  // if using useFetch
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': accessToken
  //   }
  // }

  // const { fetchData, data: bathList, isLoading } = UseFetch('baths', options)

  // useEffect(() => {
  //   fetchData()
  // }, [])