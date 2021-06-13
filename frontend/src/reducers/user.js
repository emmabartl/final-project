import { createSlice } from '@reduxjs/toolkit'

//fix local storage

const initialState = {
	userId: null,
	username: null,
	accessToken: null,
	currentPosition: null,
	errors: null
}

const user = createSlice({
	name: "user",
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
		setErrors: (store, action) => {
			store.errors = action.payload
		}
	}
})

export default user