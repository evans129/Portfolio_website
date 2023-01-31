import React from 'react'
import Navbar from '../components/Navbar'
import HeroImg from '../components/HeroImg'
import Footer from '../components/Footer'
import Work from '../components/Work'

const Home = () => {
  return (
    <div>
        <Navbar></Navbar>
        <HeroImg></HeroImg>
        <Work></Work>
        <Footer></Footer>
    </div>
  )
}

export default Home