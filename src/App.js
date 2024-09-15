import React from 'react'
import CameraTable from './component/CameraTable'
import Logo from './image/logo_wobot.webp'

const App = () => {
  return (
    <div className='bg_color'>
    <div className='wobot_img'>
      <img src={Logo} alt="" />
    </div>
       <CameraTable/>
    </div>
  )
}

export default App