import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { useState, useEffect } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import AiInsights from './pages/AiInsights'
import CurrencyDetail from './pages/CurrencyDetail'



function App() {

  const [coinData, setCoinData] = useState([])
    const [currency, setCurrency] = useState({
        name : "usd",
        symbol : "$"
    })
    const fetchData = async()=>{
        try{
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,{
                method : "GET",
                headers : {
                    accept : 'application/json', 'x-cg-demo-api-key': 'CG-by8UfRGL4WYv9zxUa3MvENBZ',
                }
            })
            const data = await response.json()
            setCoinData(data)
        }catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchData()
    },[currency])
  return (
    <div className="min-h-screen bg-linear-to-tl from-[#FFEDD4] via-[#F7F3F1] to-[#FFEDD4]">
      <Router>
        <Routes>
          <Route path="/" element={<Home coinData={coinData} setCurrency={setCurrency} currency={currency} />} />
          <Route path="/currency/:id" element={<CurrencyDetail currency={currency} setCurrency={setCurrency} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aiInsights" element={<AiInsights coinData={coinData} />} />

        </Routes>
      </Router>
    </div>
  )
}



export default App
