import React, { useContext, useState, useEffect, useRef } from 'react'
import { MapContainer, Marker, Popup, TileLayer, LayersControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js'
import { WeatherContext } from '../context/weatherContext'
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
// import axios from 'axios'

// overwriting to have correct src path , issue with webpack and leaflet
// maybe possible with markerRef??
// for now disable it to be able to deploy it 

// let src = L.Icon.Default.prototype.constructor

// src.imagePath = '/'

L.Icon.Default.mergeOptions({
    iconUrl: 'marker-icon.png',
	shadowUrl: 'marker-shadow.png',
    iconSize: [24,36],
    iconAnchor: [12,36]
});

export default function Map() {
    const { location, theme } = useContext(WeatherContext)
    const [map, setMap] = useState(null)
    const markerRef = useRef()
    let home: [number, number]
    if (location) home = [location.latitude, location.longitude]

//setting up lambda functions for weather layers
    // useEffect(() => {
    //     if (!location) return
    //     axios.get('.netlify/functions/maps')
    //         .then(res => console.log(res))
    // }, [location])

    useEffect(() => {
        if (!map || !home) return
        let fly: ReturnType<typeof setTimeout> = setTimeout(() => {
            map.flyTo(home, 13, {duration: 3})
        }, 1000)

        return () => clearTimeout(fly)

    }, [map, home])

    return (
        <>
            {   location ? 
                    <MapContainer whenCreated={ setMap } fullscreenControl={true} center={ home } zoom={3} scrollWheelZoom={false} style={{height: '100%', width: "100%" }}>
                        <LayersControl position='topright'>
                            <LayersControl.BaseLayer checked name='none'>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    opacity={theme === 'rain' ? 0.6 : 1}
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.Overlay name='temperature'>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url= 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=2a95765e8887821747a7653e6afa9329'
                                />
                            </LayersControl.Overlay>
                            <LayersControl.Overlay name='clouds'>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url='https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=2a95765e8887821747a7653e6afa9329'
                                />
                            </LayersControl.Overlay>
                            <LayersControl.Overlay name='precipitation'>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url='https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=2a95765e8887821747a7653e6afa9329'
                                />
                            </LayersControl.Overlay>
                            <LayersControl.Overlay checked name='home'>
                            <Marker position={ home } ref={markerRef}>
                                <Popup>
                                    Your position
                                </Popup>
                            </Marker>
                            </LayersControl.Overlay>
                        </LayersControl>
                    </MapContainer>
                :
                <p>nothing</p>
            }
        </>
    )
}

