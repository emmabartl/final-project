import React from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox'
import '@reach/combobox/styles.css'

const MapPlacesAutocomplete = ({ panMapTo }) => {
	const {
		ready, 
		value,
		suggestions: { status, data }, 
		setValue, 
		clearSuggestions, 
	} = usePlacesAutocomplete()

	const handleSelect = async (address) => { 
		setValue(address, false)  
		clearSuggestions()

		try {
			const results = await getGeocode({ address }) 
			const { lat, lng } = await getLatLng(results[0]) 
			panMapTo({ lat, lng })
		} catch (error) {
		}
	}

	const handleInput = (e) => {
		setValue(e.target.value)
	}

	return (
		<>
			<Combobox className="search-box" onSelect={handleSelect}>
				<ComboboxInput 
					value={value} 
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
		</>
	)
}

export default MapPlacesAutocomplete
	