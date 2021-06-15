import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('user')
	? {
    userId: JSON.parse(localStorage.getItem('user')).userId,
    username: JSON.parse(localStorage.getItem('user')).username,
    accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
    currentPosition: null,
    errors: null
  }
	: {
    userId: null,
    username: null,
    accessToken: null,
    currentPosition: null,
    errors: null
  }

const user = createSlice({
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
		setErrors: (store, action) => {
			store.errors = action.payload
		}
	}
})

export default user