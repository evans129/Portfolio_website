import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroImg2 from '../components/HeroImg2'
import ResumeContent from '../components/ResumeContent'
const Resume = () => {
  return (
    <div classname="Resume">
        <Navbar></Navbar>
        <HeroImg2 heading="RESUME" text="My Resume Details"></HeroImg2>
        <ResumeContent></ResumeContent>
        <Footer></Footer>
    </div>
  )
}

export default Resume