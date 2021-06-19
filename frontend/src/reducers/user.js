import { createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch, batch } from 'react-redux'

import { API_URL } from '../reusable/urls'

const initialState = localStorage.getItem('user')
	? {
    // userId: JSON.parse(localStorage.getItem('user')).userId,
    username: JSON.parse(localStorage.getItem('user')).username,
    accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
    currentPosition: null,
    errors: null
  }
	: {
    // userId: null,
    username: null,
    accessToken: null,
    currentPosition: null,
    errors: null
  }

const user = createSlice({
	name: "bath",
	initialState,
	reducers: {
		// setUserId: (store, action) => {
		// 	store.userId = action.payload
		// },
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

// export const loginRegister = (usernameOrEmail, password, mode) => {
// 	return (dispatch, getStore) => {
// 		const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ usernameOrEmail, password })
//     }

//     fetch(API_URL(mode), options)
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           batch(() => {
//             // dispatch(user.actions.setUserId(data.userId))
//             dispatch(user.actions.setUsername(data.username))
//             dispatch(user.actions.setAccessToken(data.accessToken))
//             dispatch(user.actions.setErrors(null))

//             localStorage.setItem('user', JSON.stringify({
//               username: data.username,
//               accessToken: data.accessToken
//             }))
//           })
//         } else {
//           dispatch(user.actions.setErrors(data))
//           setUsernameOrEmail("")
//           setPassword("")
//         }
//       })
// 	}
// }

export default user