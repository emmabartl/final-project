import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, batch } from 'react-redux'
import { FaWater } from 'react-icons/fa'

import { API_URL } from '../reusable/urls'

import user from '../reducers/user'
import bath from '../reducers/bath'

const BathForm = () => {
  const userId = useSelector(store => store.user.userId)
  const username = useSelector(store => store.user.username)
  const accessToken = useSelector(store => store.user.accessToken)
  const currentPosition = useSelector(store => store.user.currentPosition)
  const rating = useSelector(store => store.bath.rating)

  const [name, setName] = useState("")
  const [bathRating, setBathRating] = useState(0)
  // const [hover, setHover] = useState(null)
  
  const dispatch = useDispatch()
  const history = useHistory()

  const onNameChange = (event) => {
    setName(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }, 
      body: JSON.stringify({ 
        name,
        coordinates: {
          lat: currentPosition.lat,
          lng: currentPosition.lng
        },
        rating: bathRating
      })
    }
    console.log(currentPosition)
    console.log(options)
    fetch(API_URL('baths'), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          
          batch(() => {
            dispatch(bath.actions.setName(data.name))
            dispatch(bath.actions.setCoordinates(data.coordinates))
            dispatch(bath.actions.setRating(data.rating))
            dispatch(bath.actions.setErrors(null))

            // localStorage.setItem('user', JSON.stringify({
            //   userId: data.userId,
            //   username: data.username,
            //   accessToken: data.accessToken
            // }))
        })
      } else {
          dispatch(bath.actions.setErrors(data))
          // setName('')
          // setBathLocation([])
          // setBathRating(null)
      }
    })
  } 

  // useEffect(() => {
  //   if (!accessToken) {
  //     history.push('/');
  //   }
  // }, [accessToken, history]);
  
  return (
      <section className="form-container">
        <h1>Create your bath place</h1>
        <form className="bath-form" onSubmit={onFormSubmit}>
          <label className="bath-input-label">
            <p className="bath-input-title">Bath place</p>
            <input
              className="bath-input-field"
              type="text"
              value={name}
              onChange={onNameChange}
              placeholder="What do you call your place?"
              required
            />
          </label>
          <div className="rating-container">
            {[...Array(5)].map((wave, val) => {
              const ratingValue =  val + 1
              return (
                <label> 
                  <input 
                    className="radio-buttons" 
                    type="radio" 
                    name="rating" 
                    value={ratingValue} 
                    onClick={() => setBathRating(ratingValue)}
                  />
                <FaWater 
                  className="rating-waves" 
                  size={100}
                  color={ratingValue <= bathRating ? "#FA649A" : "#f2f2f2" }
                  // (hover || rating)
                  // onMouseEnter={() => setHover(ratingValue)}
                  // onMouseLeave={() => setHover(null)}
                />
                </label>
              )
           })} 
          </div>
          <button className="submit-button" type="submit">
            Submit form button
          </button>
        </form>
      </section>
  )
}

export default BathForm