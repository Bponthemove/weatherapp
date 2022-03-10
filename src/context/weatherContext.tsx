import React, { createContext, useState, useEffect } from "react"
import axios from 'axios'

interface IDataToday {
    icon: string;
    temp: number,
    temp_min: number,
    temp_max: number,
    windSpeed: number,
    windDeg: number,
}

interface IDataOutlook {
    time: string,
    icon: string,
    temp: number,
    windSpeed: number,
    windDeg: number,
}

interface IDataAir {
    no2: number,
    o3: number,
    so2: number,
    pm2_5: number,
    pm10: number,
}

interface ILocationName {
    name: string,
    country: string,
}

interface ILocation {
    latitude: number, 
    longitude: number
}

interface ProviderProps {
    dataToday: IDataToday | null,
    locationName: ILocationName | null,
    dataOutlook: [IDataOutlook] | null,
    dataAir: IDataAir | null,
    location: ILocation | null,
    theme: string,
    setTheme: React.Dispatch<React.SetStateAction<string>>
}

export const WeatherContext = createContext<ProviderProps | undefined>(undefined)

export const WeatherContextProvider:React.FC = ({ children }) => {
    const [theme, setTheme] = useState<string>('sun')
    const [dataToday, setDataToday] = useState<IDataToday | null>(null)
    const [dataOutlook, setDataOutlook] = useState<[IDataOutlook] | null>(null)
    const [dataAir, setDataAir] = useState<IDataAir | null>(null)
    const [locationName, setLocationName] = useState<ILocationName | null>(null)
    const [location, setLocation] = useState<ILocation | null>(null)
    
    useEffect(() => {
        const found = position => {
            setLocation(
                {   latitude: position.coords.latitude,
                    longitude: position.coords.longitude })
        }
        // TODO error if no location is found
        const none = x => console.log(x)
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(found, none, {timeout: 10000})
    }, [])
    
    useEffect(() => {
        if (!location) return
        axios.get(`.netlify/functions/weather?lat=${location.latitude}&long=${location.longitude}`)
            .then(res => {
                let data = res.data
                setDataOutlook(data[2].list.map(partial => {
                    return {
                        time: partial.dt_txt, 
                        icon: partial.weather[0].icon,
                        temp: partial.main.temp,
                        windSpeed: partial.wind.speed,
                        windDeg: partial.wind.deg,
                    }
                }))
                setDataToday({
                    icon: data[0].weather[0].icon,
                    temp: data[0].main.temp,
                    temp_min: data[0].main.temp_min,
                    temp_max: data[0].main.temp_max,
                    windSpeed: data[0].wind.speed,
                    windDeg: data[0].wind.deg,
                })
                setLocationName({
                    name: data[1][0].name,
                    country: data[1][0].country
                })
                setDataAir({
                    no2: data[3].list[0].components.no2,
                    o3: data[3].list[0].components.o3,
                    so2: data[3].list[0].components.so2,
                    pm2_5: data[3].list[0].components.pm2_5,
                    pm10: data[3].list[0].components.pm10,
                })

            })
        
    }, [location])

    const value: ProviderProps = { 
        dataToday, locationName, dataOutlook, dataAir, location, theme, setTheme
    }

    return(
        <WeatherContext.Provider value={ value }>
            { children }
        </WeatherContext.Provider>
    )
}