import React, { useContext } from "react";
import ChartistGraph from "react-chartist";
import dynamic from "next/dynamic";
import { WeatherContext } from "../src/context/weatherContext";
  
export default function Air() {
    const { dataAir, locationName } = useContext(WeatherContext)
    let arrCurrent 
    if (dataAir) {
        arrCurrent = Object.values(dataAir)
    }

    let data = {
        labels: ["no2", "o3", "so2", "pm2_5", "pm10"],
        series: [   
            [360, 85, 185, 55.4, 254],
            [100, 70, 75, 35.4, 154],
            [53, 54, 35, 12, 54],
            arrCurrent, 
        ]
    }

    let options = {
        seriesBarDistance: 0,
        low: 0,
        axisX: { showLabel: true }
    }

    return (
        <>
            <header>
                <h1 className="air-h1">Air Quality</h1>
                <h2 className="air-h2">in {locationName ? ' ' + locationName.name : 'no location found'}</h2>
            </header>
            <section className="air-section">
                {dataAir && typeof window !== 'undefined' ? 
                    <ChartistGraph
                        className={window.matchMedia('(max-width: 50em)').matches ? "ct-major-second" : "ct-minor-sixth" }
                        type='Bar'
                        data={ data }
                        options={ options }
                    />
                    :
                    <p>no data</p>
                }
                <legend>
                    <p><span style={{color: '#242423'}}>■</span>: current level</p>
                    <p><span style={{color: '#69db5a'}}>■</span>: Good</p>
                    <p><span style={{color: '#f4c63d'}}>■</span>: Satisfactory</p>
                    <p><span style={{color: '#d70206'}}>■</span>: Moderately polluted</p>
                </legend>
            </section>
        </>
    )
}

