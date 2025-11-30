import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {LoaderPinwheel} from 'lucide-react'
import LinearCharts from '../components/LinearCharts/LinearCharts'

const CurrencyDetail = ({ currency, setCurrency }) => {

    const { id } = useParams()

    const [coinDetailData, setCoindetailData] = useState([])
    const [coinHistData, setCoinhistData] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
                method: "GET",
                headers: {
                    accept: 'application/json', 'x-cg-demo-api-key': 'CG-by8UfRGL4WYv9zxUa3MvENBZ',
                }
            })
            const data = await response.json()
            setCoindetailData(data)
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }
    const fetchHistData = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, {
                method: "GET",
                headers: {
                    accept: 'application/json', 'x-cg-demo-api-key': 'CG-by8UfRGL4WYv9zxUa3MvENBZ',
                }
            })
            const data = await response.json()
            setCoinhistData(data)
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
        fetchHistData()
    }, [currency])

    if(coinDetailData){
                    return (
        <>
            <Navbar currency={currency} setCurrency={setCurrency}/>
            <div className='max-w-7xl mx-auto space-y-5'>
                <div className='min-h-35 flex items-center justify-center gap-2'>
                    <img src={coinDetailData?.image?.large} alt="currency image" width={40} />
                    <h1 className='text-2xl font-bold font-mono text-[#3A2F3B]'>{coinDetailData.name} ({coinDetailData.symbol})</h1>
                </div>
                <div className='flex items-center justify-center'>
                        <p className='text-sm font-medium font-mono tracking-tight text-neutral-500'>Go to our AI news section to get latest crypto insights <Link to='/aiInsights' className='font-semibold text-[#3A2F3B] underline'>Click here</Link></p>
                </div>
                <div className='lg:max-w-xl mx-auto border border-neutral-300 drop-shadow-md'>
                    <LinearCharts  coinHistData = {coinHistData}/>
                </div>
                <div className='max-w-xl mx-auto mt-7'>
                        <div className='flex-col mt-10 py-10 space-y-3'>
                            <div className='flex items-center justify-between border-b border-neutral-300'>
                            <h1 className='text-lg font-medium font-mono tracking-tighter leading-tight text-[#3A2F3B]'>Crypto Market Rank</h1>
                            <h1 className='text-lg font-medium font-mono tracking-tighter leading-tight text-[#3A2F3B]'>{coinDetailData.market_cap_rank}</h1>
                        </div>
                        <div className='flex items-center justify-between border-b border-neutral-300'>
                            <h1 className='text-lg font-medium font-mono tracking-tighter leading-tight text-[#3A2F3B]'>Current Price</h1>
                            <h1 className='text-lg font-medium font-mono tracking-tighter leading-tight text-[#3A2F3B]'>{currency.symbol} {coinDetailData?.market_data?.current_price?.[currency.name]?.toLocaleString()}</h1>
                        </div>
                        <div className='flex items-center justify-between border-b border-neutral-300'>
                            <h1 className='text-lg font-medium font-mono tracking-tighter leading-tight text-[#3A2F3B]'>24 Hours High</h1>
                            <h1 className='text-lg font-medium font-mono tracking-tighter leading-tight text-[#3A2F3B]'>{currency.symbol} {coinDetailData?.market_data?.market_cap?.[currency.name]?.toLocaleString()}</h1>
                        </div>
                        <div className='flex items-center justify-between border-b border-neutral-300'>
                            <h1 className='text-lg font-medium font-mono tracking-tighter leading-tight text-[#3A2F3B]'>Crypto Market Rank</h1>
                            <h1 className='text-lg font-medium font-mono tracking-tighter leading-tight text-[#3A2F3B]'>{currency.symbol} {coinDetailData?.market_data?.high_24h?.[currency.name]?.toLocaleString()}</h1>
                        </div>
                        <div className='flex items-center justify-between border-b border-neutral-300'>
                            <h1 className='text-lg font-medium font-mono tracking-tighter leading-tight text-[#3A2F3B]'>Crypto Market Rank</h1>
                            <h1 className='text-lg font-medium font-mono tracking-tighter leading-tight text-[#3A2F3B]'>{currency.symbol} {coinDetailData?.market_data?.low_24h?.[currency.name]?.toLocaleString()}</h1>
                        </div>
                        </div>
                </div>
            </div>
        </>
    )

    }else{
                return(
        <div className='max-w-7xl mx-auto'>
            <div className='min-h-screen flex items-center justify-center'>
                <LoaderPinwheel className='text-[#3A2F3B] animate-spin' size={60}/>
            </div>
        </div>
        )
    }

}

export default CurrencyDetail
