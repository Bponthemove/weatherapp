import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from './NavLink'
import { navLinks } from '../data'
import { IoMdSunny, IoMdRainy} from 'react-icons/io'
import { WeatherContext } from '../context/weatherContext'

export const Header = () => {
    const { theme, setTheme } = useContext(WeatherContext)
    const [click, setClick] = useState<boolean>(false)
    
    useEffect(() => {
        if (theme === 'rain') {
          document.documentElement.classList.remove('theme-sun')
          document.documentElement.classList.add('theme-rain')
        } else {
          document.documentElement.classList.remove('theme-rain')
          document.documentElement.classList.add('theme-sun')
        }
      }, [theme])
    
    return (
        <header>
            <div className='theme-container'>
                <div>
                    {
                        theme === 'rain' ?
                            <IoMdRainy
                                onClick={ () => theme === 'rain' ? setTheme('sun') : null }
                            />
                            :
                            <IoMdSunny
                                onClick={ () => theme === 'sun' ? setTheme('rain') : null }
                            />
                    }
                </div>
            </div>
            <div className={click ? 'menu-toggle-Four clicked-Four' : 'menu-toggle-Four' }>
                <div className={click ? 'menu-toggle-Three clicked-Three' : 'menu-toggle-Three' }>
                    <div className={click ? 'menu-toggle-Two clicked-Two' : 'menu-toggle-Two' }>
                        <div 
                            className='menu-toggle-One'
                            onClick={ () => setClick(!click) }
                        ></div>    
                    </div>    
                </div>    
            </div>      
            <nav>
            { navLinks.map((link, index) => 
                <NavLink key={ index } link={ link } click={ click } setClick={ setClick }/>
            ) }
            </nav>  
        </header>
  )
}
