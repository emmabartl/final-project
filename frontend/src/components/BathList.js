import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useSelector, useDispatch, batch } from 'react-redux'
import { FaWater } from 'react-icons/fa'


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
    <>
      {bathList.length > 0 ? 
        <section className="list-container">
          <h1 className="list-title">Your previous baths</h1>
          {isLoading && <h3>Loading...</h3>}
          <div className="bath-list">
            {bathList && bathList.map((bath) => {
              const rating = bath.rating
              return (
                <div className="list-item">
                  <div className="item-details">
                    <p className="bath-name">{bath.name}</p>
                    <div className="bath-rating">
                    {[...Array(rating).keys()].map(wave => {  
                      return (
                        <div className="info-window-rating"> 
                          <FaWater 
                            className="rating-waves-small" 
                            size={20}
                            color={"#fc8fb7"}
                          />
                        </div>
                      )
                    })} 
                    </div>
                  </div>
                  <p className="bath-time">{moment(bath.createdAt).calendar()}</p>
                </div>
              ) 
            })
            }
          </div>
          <div className="list-button-container">
            <button 
              className="list-button" 
              type="button"
              onClick={() => history.push('/bathmap')}
            >Show baths on map
            </button>
          </div>    
        </section>
      : <p className="no-baths-text">You haven't created any baths yet</p>}
    </>
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