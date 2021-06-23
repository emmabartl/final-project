import React, { useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { FaWater } from 'react-icons/fa'

import { API_URL } from '../reusable/urls'

import user from '../reducers/user'




const BathForm = (props) => {
  const [name, setName] = useState("")
  const [bathRating, setBathRating] = useState(0)
  // const [hover, setHover] = useState(null)
  
  const accessToken = useSelector(store => store.user.accessToken)
  const currentPosition = useSelector(store => store.user.currentPosition)
  
  const dispatch = useDispatch()

  const onNameChange = (event) => {
    setName(event.target.value)
  }

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

  const onFormSubmit = (event) => {
    event.preventDefault()

    fetch(API_URL('baths'), options)
      .then(res => 
        res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.addBath(data.bath))
            dispatch(user.actions.setErrors(null))
          })
        } else {
          dispatch(user.actions.setErrors(data))
          setName('')
          setBathRating(null)
        }
      })
      setName("")
    } 
  
  return (
    <>
      {currentPosition && <section className="bath-form-container">
        <form className="bath-form" onSubmit={onFormSubmit}>
          <p className="bath-input-label">Bath place</p>
          <label className="bath-input-label">
            <input
              className="bath-input-field"
              type="text"
              name="name"
              value={name}
              onChange={onNameChange}
              placeholder="What do you call your place?"
              required
            />
          </label>
          <p className="bath-input-label">Rate your bath</p>
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
                  size={80}
                  color={ratingValue <= bathRating ? "#fc8fb7" : "#f2f2f2" }
                  // onMouseEnter={() => setHover(ratingValue)}
                  // onMouseLeave={() => setHover(null)}
                />
                </label>
              )
            })} 
          </div>
          <button className="save-button" type="submit">Save bath</button>
        </form>
      </section>}
    </>
  )
}

export default BathForm
