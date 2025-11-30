import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import OpenAI from "openai";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import {ArrowLeft} from 'lucide-react'


const AiInsights = ({ coinData }) => {
    const navigate = useNavigate()
    const userID = localStorage.getItem('userID')
    const [loading, setLoading] = useState(false)
    const [aiInsights, setAiInsights] = useState([])

    const client = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: import.meta.env.VITE_API_KEY,
        dangerouslyAllowBrowser: true
    });

    const getAiInsights = async () => {
        setLoading(true)
        try {
            const response = await client.chat.completions.create({
                model: "z-ai/glm-4.5-air:free",
                messages: [
                    {
                        role: "system",
                        content: "Extract the meaning full information form the the given cryptocurrency data and generate meaningfull insinghts only 3 sentences and lastly give a verdict which will help the user and his time spent on the website. Return ONLY valid JSON. No text outside JSON. "

                    },
                    { role: "user", content: JSON.stringify(coinData) }

                ]
            });
            let raw = response.choices[0].message.content.trim();

            // REMOVE ```json and ```
            raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();

            const parsed = JSON.parse(raw);

            setAiInsights(parsed.insights)


        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (coinData.length > 0) {
            getAiInsights()
        }
    }, [coinData])

    useEffect(() => {
        if (!userID) {
            toast.error('please login first to latest news')
            navigate('/')


        }
    }, [userID])
    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <h1 className='text-2xl mt-5 font-semibold font-mono text-[#3A2F3B] tracking-tighter'>AI Insights</h1>
                    <p className='text-sm text-neutral-500 tracking-tight'>Get your <strong>Top 3 Latest Crypto News</strong> provieded by AI</p>
                </div>
                <div className=' min-h-100 flex items-center justify-center'>

                    <div className='lg:w-full w-120 mt-6 border border-neutral-300 px-2 py-3 rounded-lg shadow-sm bg-white'>
                        {loading && (
                            <div className="space-y-2">

                                <div className="flex items-center gap-3">
                                    <Skeleton circle height={12} width={12} />
                                    <div className='flex-1'>
                                        <Skeleton height={12} className="w-2/3 rounded" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Skeleton circle height={12} width={12} />
                                    <div className='flex-1'>
                                        <Skeleton height={12} className="w-2/3 rounded" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Skeleton circle height={12} width={12} />
                                    <div className='flex-1'>
                                        <Skeleton height={12} className="w-2/3 rounded" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <ul className='list-disc ms-6 text-neutral-700 space-y-10 lg:space-y-7'>
                            {aiInsights.map((point, index) => (
                                <li className='text-lg font-medium font-mono' key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>

                </div>
                <div className='flex justify-end items-center'>
                    <Link to='/' className='text-lg font-medium font-mono flex items-center gap-1 underline'><ArrowLeft size={18} />Home</Link>
                </div>
                <Toaster />
            </div>
        </>
    )
}

export default AiInsights
