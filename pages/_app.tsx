import { Layout } from '../src/components/Layout'
import { WeatherContextProvider } from '../src/context/weatherContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return ( 
    <WeatherContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WeatherContextProvider>
  )
}

export default MyApp
