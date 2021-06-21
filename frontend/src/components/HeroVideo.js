import React from 'react'

const HeroVideo = () => {
  return (
    <header className="hero-container">
      <video 
        src="./Videos/waves.mp4"
        type="video/mp4" 
        // autoPlay={true}
        loop={true}
        muted={true}
        width="750"
        height="500"
      >
      </video>
    </header>
  )
}

export default HeroVideo