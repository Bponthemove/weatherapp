import React from 'react'
import Image from 'next/image'
import { FaLocationArrow } from 'react-icons/fa'

export const Outlook = ({ partial, min ,max }) => {
    //The % range in that container to fit min and max comfortably
    // offset = ((((temp / prev range) + min) * new range ) - (new range / 2) * 5% correction for space top and bottom
    const offset = (((partial.temp / (max - min)) * 40) - 20) * 0.95
    
  return (
    <li>
        <div className='daytime-container'>
            <p>{ new Date(partial.time).toString().slice(0,3) }</p>
            <p>{ partial.time.slice(11, 16) }</p>
        </div>
        <div className='temp-box' style={{ bottom: `${offset}%` }}>
            <Image 
                src={ `http://openweathermap.org/img/wn/${partial.icon}@2x.png` }
                alt='weather icon'
                height='250em'
                width='250em'
                />
            <p className='temp'>{ `${Math.round(partial.temp * 10) / 10 }ºC` }</p>
        </div>
        <div className='wind-box'>
            <p className='windDirection'>
                <FaLocationArrow style={{ transform: `rotate(${partial.windDeg + 135}deg)` }}/>
            </p>
            <p className='windSpeed'>{ Math.round(partial.windSpeed * 2.23693629) }</p> 
        </div>
    </li>
  )
}
