import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Table from '../components/Table'
import AiChatbot from '../components/AI/AiChatbot'
import Footer from '../components/Footer'

const Home = ({currency, setCurrency, coinData}) => {


  return (
    <div className='relative w-full'>
      <main className="min-h-screen flex flex-col space-y-10">
        <div className="border-b border-neutral-300">
          <Navbar coinData={coinData} setCurrency={setCurrency} currency={currency} />
        </div>
        <div className='mt-4'>
          <Hero coinData={coinData} setCurrency={setCurrency} currency={currency} />
        </div>
        <div>
          <Table coinData={coinData} setCurrency={setCurrency} currency={currency} />
        </div>
      </main>
      <AiChatbot coinData={coinData}/>
      <hr className='text-neutral-300 mt-9 py-4'/>
      <Footer />
    </div>
  )
}

export default Home
