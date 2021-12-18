import React from 'react'
import Hero from '../components/Hero'
import FeaturedProducts  from '../components/FeaturedProducts'
import Services  from '../components/Services'
import Contact  from '../components/Contact'
import Chatbot  from '../components/Chatbot'
const HomePage = () => {
  return <main>
    <Hero />
    <FeaturedProducts />
    <Services />
    <Contact />
    <Chatbot />
  </main>
}

export default HomePage