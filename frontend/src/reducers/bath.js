import { createSlice } from '@reduxjs/toolkit'

//need to implement local storage??

const initialState = {
	userId: null,
	username: null,
	accessToken: null,
	currentPosition: null,
	baths: [],
	errors: null
}

const bath = createSlice({
	name: "bath",
	initialState,
	reducers: {
		setUserId: (store, action) => {
			store.userId = action.payload
		},
		setUsername: (store, action) => {
			store.username = action.payload
		},
		setAccessToken: (store, action) => {
			store.accessToken = action.payload
		},
		setCurrentPosition: (store, action) => {
			store.currentPosition = action.payload
		},
		setBaths: (store, action) => {
			store.baths = action.payload
		},
		setErrors: (store, action) => {
			store.errors = action.payload
		}
	}
})

export default bath