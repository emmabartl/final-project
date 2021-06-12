import React, { useState, useCallback, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox'
import '@reach/combobox/styles.css'

	//usePlaceAutocomplete gives us a number of variables in an object that we can deconstruct the values from 
	export const MapPlacesAutocomplete = ({ panMapTo }) => {
		const {
			ready, //is the setup, searchscript, loaded etc, is everything ready
			value, //the users current value in the searchbox
			suggestions: { status, data }, //what are the suggestions we're getting back from google's API, along with the status and the actual data of the suggestions
			setValue, //a function to set the value
			clearSuggestions, //a function to clear out all the suggestions
		} = usePlacesAutocomplete(
			//{
		// 	requestOptions: { //prefers places near the user
		// 		location: { lat: () => 59.334591, lng: () => 18.063240 },
		// 		radius: 200 * 1000, //converts km to meters
		// 	}
		// }
		)

		const handleSelect = async (address) => { //async function because we will be handling promises
			setValue(address, false) //we call the setValue to basically update state and place whatever the user chose in there without going to google and fetch the data (=false) 
			clearSuggestions()

			try {
				const results = await getGeocode({ address }) //first we want to pass the address to the builtin function getGeocode and the function will return results that we have to await for since it's a promise. What we have to pass to get geocode working is an object that has an address property of whatever address the user is searching for. 
				const { lat, lng } = await getLatLng(results[0]) //getLatLng is a function that comes with the package and helps us extract the lat lng from the "big array" that the geocode returns to us. We pass in the first result to get back the lat and lng.
				console.log(lat, lng)
				panMapTo({ lat, lng })
			} catch(error) { // to catch rejected promise
				console.log(error)
			}
		}

		const handleInput = (e) => {
			setValue(e.target.value)
		}

		return (
			<div>
				<Combobox 
					className="search-box" 
					onSelect={handleSelect}
				>
					<ComboboxInput 
						value={value} //gets the value from the usePlaceAutocomplete hook 
						onChange={handleInput}
						disabled={!ready}
						placeholder="Search place" 
					/>
					<ComboboxPopover>
						<ComboboxList>
							{status === "OK" && 
								data.map(({place_id, description}) => 
									<ComboboxOption key={place_id} value={description} />
							)}
						</ComboboxList> 		
					</ComboboxPopover>
				</Combobox>
			</div>
		)
	}

	//ComboboxPopover receives all of the suggestions that google places has given us
	//data.map through the suggestions and for each suggestion (by deconstructuring) we get the id and the description