import { createSlice } from '@reduxjs/toolkit'

//need to implement local storage??

const initialState = {
	// userId: null,
	// username: null,
	// accessToken: null,
	// currentPosition: null,
	bathId: null,
	name: null,
	baths: [],
	bathLocation: [],
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
		setBaths: (store, action) => {
			store.baths = action.payload
		},
		setBathLocation: (store, action) => {
			store.bathLocation = action.payload
		},
		setErrors: (store, action) => {
			store.errors = action.payload
		}
	}
})

export default bath