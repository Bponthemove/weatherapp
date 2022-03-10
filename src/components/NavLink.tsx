import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const NavLink = ({ setClick, link, click }: {setClick: React.Dispatch<React.SetStateAction<boolean>>, link: { name: string, path: string }, click: boolean }) => {
    const router = useRouter()    

  return (
      <div
        className={ router.pathname == link.path ? 'active' : '' }
        id={ click ? 'open' : 'close' }      
      >
        <Link href={ link.path }>
            <a
              onClick={ click ? () => setClick(false) : null }
            >{ link.name }</a>
        </Link>
    </div>
  )
}
