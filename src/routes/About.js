import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroImg2 from '../components/HeroImg2'
import AboutContent from '../components/AboutContent'


const About = () => {
  return (
    <div>
      <Navbar></Navbar>
      <HeroImg2 heading="ABOUT" text="Im a Software Developer"></HeroImg2>
      <AboutContent></AboutContent>
      <Footer></Footer>
    </div>
  )
}

export default About