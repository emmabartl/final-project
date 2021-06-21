import { useEffect, useState } from "react"
import { batch, useSelector } from 'react-redux'

import { API_URL } from '../reusable/urls'

const UseFetch = (endpoint, options) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState(null)

  const accessToken = useSelector(store => store.user.accessToken)

  // useEffect(() => {
  //   setTimeout(() => {
    const fetchData = () => {
      fetch(API_URL(endpoint), options)
        .then(res => res.json())
        .then(data => {
          
          setData(data)
          setIsLoading(false)
        }) 
        .catch(error => {
          setIsLoading(false)
          alert (error.message)
        })
    }
    // })
  // }, [])
    // const handleSuccess = () => {
    //   if (data.success) {
    //     return 
        
    //   } else {
    //     console.log('oh no')
    //     return
        
    //   }
    // }

  return { fetchData, data, isLoading, handleSuccess }
}

export default UseFetch