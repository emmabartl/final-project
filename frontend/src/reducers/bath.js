import { createSlice } from '@reduxjs/toolkit'

//need to implement local storage??

const initialState = {
	id: null,
	name: null,
	// baths: [],
	coordinates: {},
	rating: null,
	errors: null
}

const bath = createSlice({
	name: "bath",
	initialState,
	reducers: {
		setBathId: (store, action) => {
			store.id = action.payload
		},
		setName: (store, action) => {
			store.name = action.payload
		},
		// setBaths: (store, action) => {
		// 	store.baths = action.payload
		// },
		setCoordinates: (store, action) => {
			store.coordinates = action.payload
		},
		setRating: (store, action) => {
			store.rating = action.payload
		},
		setErrors: (store, action) => {
			store.errors = action.payload
		}
	}
})

export default bath