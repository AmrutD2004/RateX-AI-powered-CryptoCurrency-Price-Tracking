import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Table = ({ currency, setCurrency, coinData }) => {
    const [displayCoin, setDisplayCoin] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterData, setFilterdData] = useState([])

    useEffect(() => {
        setLoading(true)
        setDisplayCoin(coinData)
        setTimeout(() => setLoading(false), 400)
    }, [coinData])

    const [input, setInput] = useState('')
    const handleChange = (e) => {
        setInput(e.target.value)
        if(e.target.value === ""){
            setDisplayCoin(coinData)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const searchData = await coinData.filter((item) => 
            item.name.toLowerCase().includes(input.toLowerCase())
        )
        setDisplayCoin(searchData)
    }
    return (
        <div className='max-w-4xl mx-auto border border-neutral-300 rounded-lg bg-linear-to-tl from-[#FFEDD4] via-[#F7F3F1] to-[#FFEDD4] shadow-sm p-2'>
            <form onSubmit={handleSubmit} className="w-full relative">
                <input onChange={handleChange} value={input}
                    placeholder="Search crypto.."
                    className="w-full border border-neutral-300 bg-slate-100 px-4 py-4 rounded-lg shadow font-mono outline-none"
                    type="text"
                />

                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-lg font-medium font-mono bg-[#3A2F3B] px-4 py-2 rounded-lg cursor-pointer shadow-sm"
                >
                    Search
                </button>
            </form>
            {loading ? (
                <Skeleton className='w-full h-84 rounded-lg' />
            ) : (
                <table className='w-full'>
                    <thead className='border-b border-neutral-400'>
                        <tr className='text-neutral-800 font-mono'>
                            <th className='text-left px-6 py-3 text-lg font-medium'>#</th>
                            <th className='text-left px-14 py-3 text-lg font-medium'>COIN</th>
                            <th className='text-center px-6 py-3 text-lg font-medium'>PRICE</th>
                            <th className='text-center px-6 py-3 text-lg font-medium'>24H CHANGE</th>
                            <th className='text-right px-6 py-3 text-lg font-medium'>MARKET CAP</th>
                        </tr>
                    </thead>

                    <tbody>
                        {displayCoin.slice(0, 10).map((item, index) => (
                            <tr
                                key={item.id}
                                className="hover:bg-[#F3CFA4] transition-colors duration-200 cursor-pointer"
                            >

                                <td className='px-6 py-3 border-b border-neutral-300 text-neutral-700 font-mono'>
                                    <Link to={`/currency/${item.id}`}>{item.market_cap_rank}</Link>
                                </td>

                                <td className='px-6 py-3 border-b border-neutral-300 text-neutral-700 font-mono'>
                                    <Link to={`/currency/${item.id}`}>
                                        <div className='flex items-center gap-4'>
                                            <img className='w-8 h-8' src={item.image} alt={item.name} />
                                            <span>{item.name}</span>
                                        </div>
                                    </Link>
                                </td>

                                <td className='px-6 py-3 text-center border-b border-neutral-300 text-neutral-700 font-mono'>
                                    {currency.symbol}{item.current_price.toLocaleString()}
                                </td>

                                <td className={`px-6 py-3 text-center border-b border-neutral-300 font-mono 
                                    ${item.price_change_percentage_24h < 0 ? 'text-red-600' : 'text-green-600'}
                                `}>
                                    {item.price_change_percentage_24h?.toFixed(2)}%
                                </td>

                                <td className='px-6 py-3 text-right border-b border-neutral-300 text-neutral-700 font-mono'>
                                    {currency.symbol}{item.market_cap.toLocaleString()}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Table
