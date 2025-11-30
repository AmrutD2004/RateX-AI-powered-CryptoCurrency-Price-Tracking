import React from 'react'

const Hero = ({ coinData, currency, setCurrency }) => {

    return (
        <div className="w-full px-4 sm:px-6 lg:px-0">
            <div className="flex flex-col items-center max-w-2xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10 text-center">

                <h1 className="text-[#3A2F3B] font-mono font-semibold tracking-wide text-3xl sm:text-4xl lg:text-5xl leading-tight">
                    Your Edge in the
                    <span className="block">Crypto Market Starts Here</span>
                </h1>

                <p className="font-mono text-neutral-500 text-sm sm:text-base lg:text-lg max-w-md">
                    Real-time numbers combined with AI-powered clarity for smarter decisions.
                </p>

            </div>
        </div>
    )
}

export default Hero
