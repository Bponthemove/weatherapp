import React from 'react'
import dynamic from 'next/dynamic'

export default function Maps() {

  const Map = dynamic(
    () => import('../src/components/map'), 
    // Prevent server-side render and load <p> on loading map
    { loading: () => <p>loading</p>,
      ssr: false }
  )

  return (
    <div id='map'>
      <Map />
    </div>
  )
}
