import React, { useState, useEffect, useCallback, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import moment from 'moment'
import '@reach/combobox/styles.css'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FaWater } from 'react-icons/fa'

import { API_URL } from '../reusable/urls'
import { Mapstyle } from '../components/MapStyle'
import MapPlacesAutocomplete from '../components/MapPlacesAutocomplete'
import GetUserLocation from '../components/GetUserLocation'

import user from '../reducers/user'

const libraries = ["places"] 

const mapContainerStyle = {
	width: "100vw",
	height: "80vh"
}

const center = { lat: 59.334591, lng: 18.063240 }

const options = {
	styles: Mapstyle,
	disableDefaultUI: true,
	zoomControl: true	
}

const BathMap = () => {
	const [bathMarkers, setBathMarkers] = useState([])
	const [selected, setSelected] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

  const currentPosition = useSelector(store => store.user.currentPosition)
	const bathList = useSelector(store => store.user.baths)
	const accessToken = useSelector(store => store.user.accessToken)

  const history = useHistory()
	const dispatch = useDispatch()

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries
	})

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
	}, [])

	const mapRef = useRef() 
	const onMapLoad = useCallback((map) => { 
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

	return (
		<section className="map-container">
			<MapPlacesAutocomplete panMapTo={panMapTo} />
			<GetUserLocation panMapTo={panMapTo} />
			<GoogleMap 
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				center={center} 
				options={options}
				onClick={onMapClick}
				onLoad={onMapLoad}
			> {bathMarkers.map(marker => (
				<Marker 
					key={marker.time.toISOString()}
					position={{lat: marker.coordinates.lat, lng: marker.coordinates.lng}} 
					icon={{
						url: "/flamingo.png",
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
						url: "/user.svg",
						scaledSize: new window.google.maps.Size(120, 120),
						origin: new window.google.maps.Point(0, 0),
						anchor: new window.google.maps.Point(33, 58)
					}}
			/>) : null}

			{bathList && bathList.map(bath => (
				<Marker 
					key={bath._id} 
					position={{lat: bath.coordinates.lat, lng: bath.coordinates.lng}} 
					icon={{
						url: "/flamingo.png", 
						scaledSize: new window.google.maps.Size(30, 30),
						origin: new window.google.maps.Point(0, 0),
						anchor: new window.google.maps.Point(15, 15)
					}}
					onClick={() => {
						setSelected(bath) 
					}}
				/>
			))}

			{selected ? (
				<InfoWindow 
					position={{lat: selected.coordinates.lat, lng: selected.coordinates.lng}}
					onCloseClick={onInfoCloseClick}
				>
					<div className="info-window">
						<h2>My bathplace</h2>
						<div className="info-rating-container">
							<p className="bath-name">{selected.name}</p>
							{[...Array(selected.rating).keys()].map(wave => {  
								return (
									<div className="info-window-rating"> 
										<FaWater 
										className="rating-waves-small" 
										size={20}
										color={"#FA649A"}
										/>
									</div>
								)
							})}
						</div>
						<p>Created {moment(selected.createdAt).calendar()}</p>
					</div>
				</InfoWindow>) : null}
				
				<div className="map-button-container">
					<button className="create-bath-button" onClick={() => history.push('/profile')}>Create bathplace
					</button>
				</div>

			</GoogleMap>
		</section>
	)
}

export default BathMap