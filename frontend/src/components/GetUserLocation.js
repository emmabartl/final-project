import React, { useState, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'

import user from '../reducers/user'


export const GetUserLocation = ({ panMapTo }) => {
	const dispatch = useDispatch()

	const onButtonClick = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude
				const lng = position.coords.longitude

				dispatch(user.actions.setCurrentPosition({lat, lng}))

				panMapTo({ lat: lat, lng: lng })
			}
		)	
	}

	return (
		<button 
			className="position-button"
			onClick={onButtonClick}	
		>Find me
			{/* <img className="position-button-img" src="user.svg" alt="find-me-icon" /> */}
		</button>
	)
}