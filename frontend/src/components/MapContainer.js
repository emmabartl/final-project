import React, { useState, useCallback, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox'
import '@reach/combobox/styles.css'

import { Mapstyle } from './MapStyle'
import { MapPlacesAutocomplete } from './MapPlacesAutocomplete'
import { GetUserLocation } from './GetUserLocation'


const libraries = ["places"] //if using google places

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

export const MapContainer = () => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: "AIzaSyDsRQkIeyHXT6ImlwQ5SsnJUhfKB7Kktww",
		libraries
		//process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	})

	const [bathMarkers, setBathMarkers] = useState([])
	const [selected, setSelected] = useState(null)

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
		<div>
			<h1 className="title">BadenBaden 
				<span className="wave-emoji" role="img" aria-label="wave">🌊</span>
			</h1>
			<MapPlacesAutocomplete panMapTo={panMapTo} />
			<GetUserLocation panMapTo={panMapTo} />
			<GoogleMap 
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				center={center} //another way to display this?
				options={options}
				onClick={onMapClick}
				onLoad={onMapLoad}
			>
				{bathMarkers.map(marker => (
					<Marker 
						key={marker.time.toISOString()} //what does toISOString do?
						position={{lat: marker.lat, lng: marker.lng}} 
						icon={{
							url: "/flamingo.png", //maybe change color?
							scaledSize: new window.google.maps.Size(30, 30),
							origin: new window.google.maps.Point(0, 0),
							anchor: new window.google.maps.Point(15, 15)
						}}
						onClick={() => {
							setSelected(marker) //change this to a function?
						}}
					/>
				))}
				{selected ? (
					<InfoWindow 
						position={{lat: selected.lat, lng: selected.lng}}
						onCloseClick={onInfoCloseClick}
					>
						<div>
							<h2>My bathplace</h2>
							<p>Last swim here "date"</p>
						</div>
					</InfoWindow>) : null}
			</GoogleMap>
		</div>
	)
}


