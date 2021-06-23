import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('user')
	? {
    username: JSON.parse(localStorage.getItem('user')).username,
    accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
		baths: [], 
    currentPosition: null,
    errors: null
  }
	: {
    username: null,
    accessToken: null,
		baths: [],
    currentPosition: null,
    errors: null
  }

const user = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUsername: (store, action) => {
			store.username = action.payload
		},
		setAccessToken: (store, action) => {
			store.accessToken = action.payload
		},
		setBaths: (store, action) => {
			store.baths = action.payload
		},
		setCurrentPosition: (store, action) => {
			store.currentPosition = action.payload
		},
		addBath: (store, action) => {
			let bathList = [action.payload, ...store.baths]
			store.baths = bathList
		},
		setErrors: (store, action) => {
			store.errors = action.payload
		}
	}
})

export default user