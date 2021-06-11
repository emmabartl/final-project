import React, { useState, useCallback, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox'
import '@reach/combobox/styles.css'

	//usePlaceAutocomplete gives us a number of variables in an object that we can deconstruct the values from 
	export const Search = () => {
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
		return (
			<div>
				<Combobox 
					className="search-box" 
					onSelect={(address) => {
						console.log(address)
					}}
				>
					<ComboboxInput 
						value={value} //gets the value from the usePlaceAutocomplete hook 
						onChange={(e) => {
							setValue(e.target.value)
						}}
						disabled={!ready}
						placeholder="Enter an address" 
					/>
					<ComboboxPopover>
						<ComboboxList>
							{status === "OK" && data.map(({id, description}) => 
								<ComboboxOption
									key={id}
									value={description} 
								/>
							)}
						</ComboboxList> 		
					</ComboboxPopover>
				</Combobox>
			</div>
		)
	}

	//ComboboxPopover receives all of the suggestions that google places has given us
	//data.map through the suggestions and for each suggestion (by deconstructuring) we get the id and the description