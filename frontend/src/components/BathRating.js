// import React, { useState } from 'react'
// import { FaWater } from 'react-icons/fa'
// // import { useDispatch } from 'react-redux'

// // import user from '../reducers/user'

// const BathRating = () => {
//   const [rating, setRating] = useState(null)
//   // const [hover, setHover] = useState(null)
  

//   return (
//     <div className="rating-container">
//       {[...Array(5)].map((wave, val) => {
//         const ratingValue =  val + 1
//         return (
//         <label>
//           <input 
//             className="radio-buttons" 
//             type="radio" 
//             name="rating" 
//             value={ratingValue} 
//             onClick={() => setRating(ratingValue)}
//           />
//           <FaWater 
//             className="waves" 
//             size={100}
//             color={ratingValue <= rating ? "#FA649A" : "#f2f2f2" }
//             // (hover || rating)
//             // onMouseEnter={() => setHover(ratingValue)}
//             // onMouseLeave={() => setHover(null)}
//           />
//         </label>
//         )
//       })} 
//     </div>
//   )
// }

// export default BathRating

