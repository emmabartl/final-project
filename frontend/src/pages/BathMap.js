import React, { useState, useEffect, useCallback, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import moment from 'moment'
import '@reach/combobox/styles.css'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FaWater } from 'react-icons/fa'

import { API_URL } from '../reusable/urls'
import Header from '../components/Header'
import { Mapstyle } from '../components/MapStyle'
import { MapPlacesAutocomplete } from '../components/MapPlacesAutocomplete'
import { GetUserLocation } from '../components/GetUserLocation'
import BathForm from '../components/BathForm'

import user from '../reducers/user'
import bath from '../reducers/bath'

const libraries = ["places"] 

const mapContainerStyle = {
	width: "100vw",
	height: "100vh"
}

const center = {
	lat: 59.334591,
	lng: 18.063240
}

const options = {
	styles: Mapstyle,
	disableDefaultUI: true,
	zoomControl: true	
}

const BathMap = () => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: "AIzaSyDsRQkIeyHXT6ImlwQ5SsnJUhfKB7Kktww",
		libraries
		//process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	})

	const [bathMarkers, setBathMarkers] = useState([])
	const [selected, setSelected] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

  const currentPosition = useSelector(store => store.user.currentPosition)
	const bathList = useSelector(store => store.user.baths)
	const accessToken = useSelector(store => store.user.accessToken)

  const history = useHistory()
	const dispatch = useDispatch()

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

	const onMapClick = useCallback((event) => {
		const lat = event.latLng.lat()
		const lng = event.latLng.lng()
		dispatch(user.actions.setCurrentPosition({lat, lng}))
		// setBathMarkers((current) => [
		// 	...current, 
		// 	{
		// 		coordinates: {
		// 			lat: event.latLng.lat(),
		// 			lng: event.latLng.lng(),
		// 		},
		// 		time: new Date()
		// 	},
		// ])
		//dispatch till currentposition istället för Bathmarkers
	}, [])

	const mapRef = useRef() //returns a mutable ref object that will persist for the full lifetime of the object, ie it will give you the same object on every render
	const onMapLoad = useCallback((map) => { //will return a memoized version of the callback that only changes if one of the dependencies has changed. 
		mapRef.current = map
	}, [])

	const onInfoCloseClick = () => {
		setSelected(null)
	}

	const panMapTo = useCallback(({lat, lng}) => {
		mapRef.current.panTo({lat, lng})
		mapRef.current.setZoom(14)
	}, [])


	if (loadError) {
		return "Error loading maps"
	}

	if (!isLoaded) {
		return "Loading maps"
	}

	const infoWindowRating = () => {
		bathList.forEach(bath => {
			return bath.rating
		})
		const rating = bath.rating
		console.log(rating)
	}
	infoWindowRating()
	console.log(bathList)

	return (
		<section className="map-container">
			<Header />
			<h1 className="title">BadenBaden 
				{/* <span className="wave-emoji" role="img" aria-label="wave">🌊</span> */}
			</h1>

			<MapPlacesAutocomplete panMapTo={panMapTo} />

			<GetUserLocation panMapTo={panMapTo} />
      
      
        <button 
          className="create-button"
          onClick={() => history.push('/profile')}
        >Create bathplace
        </button>)

			<GoogleMap 
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				center={center} 
				options={options}
				onClick={onMapClick}
				onLoad={onMapLoad}
			>
				
        {bathMarkers.map(marker => (
					<Marker 
						key={marker.time.toISOString()} //toISOString converts the date object into a string
						position={{lat: marker.coordinates.lat, lng: marker.coordinates.lng}} 
						icon={{
							url: "/flamingo.png", //maybe change color?
							scaledSize: new window.google.maps.Size(30, 30),
							origin: new window.google.maps.Point(0, 0),
							anchor: new window.google.maps.Point(15, 15)
						}}
						onClick={() => {
							setSelected(marker) 
						}}
					/>
				))}

				{currentPosition ? (
        <Marker  
					position={currentPosition} 
					icon={{
						url: "/user.svg", //maybe change color?
						scaledSize: new window.google.maps.Size(120, 120),
						origin: new window.google.maps.Point(0, 0),
						anchor: new window.google.maps.Point(15, 15)
					}}
        />) : null}

				{bathList && bathList.map(bath => (
						<Marker 
							key={bath._id} 
							position={{lat: bath.coordinates.lat, lng: bath.coordinates.lng}} 
							icon={{
								url: "/flamingo.png", //maybe change color?
								scaledSize: new window.google.maps.Size(30, 30),
								origin: new window.google.maps.Point(0, 0),
								anchor: new window.google.maps.Point(15, 15)
							}}
							onClick={() => {
								setSelected(bath) 
							}}
						/>
					)
				)}

				{selected ? (
					<InfoWindow 
						position={{lat: selected.coordinates.lat, lng: selected.coordinates.lng}}
						onCloseClick={onInfoCloseClick}
					>
						<div className="info-window">
							<h2>My bathplace</h2>
							<p>Name {selected.name}</p>
							<p>Your rating 
								{bathList.map(bath => {
									const rating = bath.rating
									return (
										[...Array(rating).keys()].map(wave => {  
											return (
												<div className="info-window-rating"> 
													<FaWater 
													className="rating-waves" 
													size={20}
													color={"#FA649A"}
													/>
												</div>
											)
										})
									)		
								})}
							</p>
							<p>Created {moment(selected.createdAt).calendar()}</p>
							{/* <button onClick={() => history.push({'/profile', state: })}>Show in profile</button> */}
						</div>
					</InfoWindow>) : null}

			</GoogleMap>
		</section>
	)
}

export default BathMap