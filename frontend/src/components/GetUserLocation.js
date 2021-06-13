import React, { useState, useCallback, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'

const onButtonClick = () => {

}

export const GetUserLocation = ({ panMapTo }) => {
	return (
		<button 
			className="position-button"
			onClick={() => {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						console.log(position)
						panMapTo({
							lat: position.coords.latitude,
							lng: position.coords.longitude
						})
						//dispatch(bath.actions.setBaths([{lat, lng}]))
					}
					//, () => null
				) 
			}}	
		>
			<img className="position-button-img" src="user.svg" alt="find-me-icon" />
		</button>
	)
}