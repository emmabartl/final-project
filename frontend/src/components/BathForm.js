import React, { useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { FaWater } from 'react-icons/fa'

import { API_URL } from '../reusable/urls'

import user from '../reducers/user'




const BathForm = (props) => {
  const [name, setName] = useState("")
  const [bathRating, setBathRating] = useState(0)
  const [newBath, setNewBath] = useState(null)
  // const [hover, setHover] = useState(null)
  // const location = useLocation()
  // console.log(location.state)
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

            // localStorage.setItem('user', JSON.stringify(data.baths))
          })
        } else {
          dispatch(user.actions.setErrors(data))
          setName('')
          setBathRating(null)
        }
      })
    } 
  
  return (
      <section className="form-container">
        {/* {data.bath} */}
        <h1>Create your bath place</h1>
         <form className="bath-form" onSubmit={onFormSubmit}>
          <label className="bath-input-label">
            <p className="bath-input-title">Bath place</p>
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
          <button 
            className="submit-button" 
            type="submit"
            
          >
            Submit form button
          </button>
        </form>
      </section>
  )
}

export default BathForm
