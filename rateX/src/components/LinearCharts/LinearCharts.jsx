import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LinearCharts = ({coinHistData}) => {
    const [data, setCoinData] = useState([
        [
            "Date",
            "Prices"
        ]
    ])

    useEffect(()=>{
        let dataCopy = [["Date", "Prices"]]
        if(coinHistData.prices){
            coinHistData.prices.map((items)=>{
                dataCopy.push([`${new Date(items[0]).toLocaleDateString().slice(0.-5)} `, items[1]])
            })
            setCoinData(dataCopy)
        }
    },[coinHistData])
  return (
    <Chart 
        chartType='LineChart'
        data={data}
        height={'100%'}
        style={{ borderRadius: "50px" }}

    />
  )
}

export default LinearCharts
