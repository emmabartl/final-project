import React from 'react'

const HeroVideo = () => {
  return (
    <header className="hero-container">
      <h1 className="title">BadenBaden</h1>
      <video 
        className="video"
        src="./Videos/waves.mp4"
        type="video/mp4" 
        autoPlay={true}
        loop={true}
        muted={true}
      >
      </video>
    </header>
  )
}

export default HeroVideo