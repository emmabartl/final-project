import React, { useState, useCallback, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import '@reach/combobox/styles.css'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Mapstyle } from '../components/MapStyle'
import { MapPlacesAutocomplete } from '../components/MapPlacesAutocomplete'
import { GetUserLocation } from '../components/GetUserLocation'

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
	// const [currentPosition, setCurrentPosition] = useState(null)

  const currentPosition = useSelector(store => store.user.currentPosition)

  const history = useHistory()

	const onMapClick = useCallback((event) => {
		setBathMarkers((current) => [
			...current, 
			{
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
				time: new Date()
			},
		])
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

  // const onCreateButtonClick = () => {

  // }

	
	if (loadError) {
		return "Error loading maps"
	}

	if (!isLoaded) {
		return "Loading maps"
	}

	return (
		<div>
			<h1 className="title">BadenBaden 
				{/* <span className="wave-emoji" role="img" aria-label="wave">🌊</span> */}
			</h1>

			<MapPlacesAutocomplete panMapTo={panMapTo} />

			<GetUserLocation panMapTo={panMapTo} />
      
      {currentPosition ? (
        <button 
          className="create-button"
          onClick={() => history.push('/profile')}
        >Create bathplace
        </button>) : null}

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
						position={{lat: marker.lat, lng: marker.lng}} 
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
						url: "/flamingo.png", //maybe change color?
						scaledSize: new window.google.maps.Size(30, 30),
						origin: new window.google.maps.Point(0, 0),
						anchor: new window.google.maps.Point(15, 15)
					}}
        />) : null}

				{selected ? (
					<InfoWindow 
						position={{lat: selected.lat, lng: selected.lng}}
						onCloseClick={onInfoCloseClick}
					>
						<div>
							<h2>My bathplace</h2>
							<p>Name *name*</p>
							<p>Last swim here *date*</p>
							<p>Rating *rating*</p>
						</div>
					</InfoWindow>) : null}

			</GoogleMap>
		</div>
	)
}

export default BathMap