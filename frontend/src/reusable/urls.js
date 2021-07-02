const BASE_URL = process.env.REACT_APP_API_URL

export const API_URL = (slug) => `${BASE_URL}/${slug}`
