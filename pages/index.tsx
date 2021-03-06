import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'
import { Outlook } from '../src/components/Outlook'
import { WeatherContext } from '../src/context/weatherContext'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'

export default function Home() {
  const { dataToday, locationName, dataOutlook } = useContext(WeatherContext)
  const scrollContainerRef = useRef(null)
  const [scroll, setScroll] = useState<string>('')
  const [scrollEnd, setScrollEnd] = useState<string>('start')

  //calculate min and max of range to set each partial at its correct height to visually show temperature fluctuations
  let minTemp: number
  let maxTemp: number
  if (dataOutlook) minTemp =  dataOutlook.reduce((min, current) => { return min < current.temp ? min : current.temp }, 0)
  if (dataOutlook) maxTemp =  dataOutlook.reduce((max, current) => { return max > current.temp ? max : current.temp }, 0)

  //imitate smooth scrolling behaviour
  useEffect(() => {
    if (scrollContainerRef.current && scroll !== '') {
      //don't use smooth scrolling behavior as it does not keep up with interval
      const scroller = setInterval(() => {
          if(scroll === 'right') scrollContainerRef.current.scrollBy(2, 0)
          if(scroll === 'left') scrollContainerRef.current.scrollBy(-2, 0)
        }, 1)
        return () => clearInterval(scroller)
      } 
  }, [scroll])

  //find start and end of scroll to highlight button
  const onScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth} = scrollContainerRef.current
    if (scrollLeft === 0) return setScrollEnd('start')
    if (scrollLeft + clientWidth + 1 > scrollWidth) return setScrollEnd('end')
    else return setScrollEnd('middle')
  }
  
  return (
    <>
      <Head>
        <title>Weather app</title>
      </Head>
      <>
        { dataToday && locationName ?
        <>
          <section className='current-container'>
            <p className='location'>{ locationName.name }, { locationName.country }</p>
            <Image 
              src={ `http://openweathermap.org/img/wn/${dataToday.icon}@2x.png` }
              alt='weather icon'
              height='150em'
              width='150em'
            />
            <p className='temp'>{ `${Math.round(dataToday.temp * 10) / 10 }??C` }</p>
          </section>
          <section className='outlook-container'>
            <FaArrowAltCircleLeft
              style={ scrollEnd === 'start' ? { 'fill' : 'red'} : { 'fill' : 'black'}}
              onMouseEnter={ () => setScroll('left') }
              onMouseLeave={ () => setScroll('') }
            />
            <div  className='outlook-container-inner' 
                  ref={ scrollContainerRef }
                  onScroll={ () => onScroll()}
            >
              {dataOutlook ? 
                <ul className='outlook-list'>
                  { dataOutlook.map(partial => (
                      <Outlook key={ partial.time } partial={ partial } min={ minTemp } max={ maxTemp } />
                  )) }
                </ul>
              :
              <p>can not connect, please refresh</p>
              }
            </div>
            <FaArrowAltCircleRight
            style={ scrollEnd === 'end' ? { 'fill' : 'red'} : { 'fill' : 'black'}}
              onMouseEnter={ () => setScroll('right') }
              onMouseLeave={ () => setScroll('') }
            />
          </section>
        </>
          :
          <p>loading...</p>
        }
      </>
    </>
    
    
  )
}
