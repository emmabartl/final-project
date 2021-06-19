import { createSlice } from '@reduxjs/toolkit'

//need to implement local storage??

const initialState = {
	bathId: null,
	name: null,
	coordinates: {},
	rating: null,
	errors: null
}

const bath = createSlice({
	name: "bath",
	initialState,
	reducers: {
		setBathId: (store, action) => {
			store.bathId = action.payload
		},
		setName: (store, action) => {
			store.name = action.payload
		},
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