import { Handler } from "@netlify/functions";
import axios from 'axios'

export const handler: Handler = async (event) => {
   
    const { lat, long }: { lat: number, long: number} = event.queryStringParameters
    const API_KEY = process.env.API_KEY
    let allData= []
    
    try {
        await axios.all([
            axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`),
            axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${API_KEY}`),
            axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`),
            axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${API_KEY}`),
        ])
        .then(axios.spread((...res) => {
            allData = [res[0].data, res[1].data, res[2].data, res[3].data]
        }))
        return {
            statusCode: 200,
            body: JSON.stringify(allData)
        }
    } catch (error) {
        const { status , statusText, headers, data } = error.response
        return {
            statusCode: status,
            body: JSON.stringify(statusText, headers, data)
        }
    }
};
