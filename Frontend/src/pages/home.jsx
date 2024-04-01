import React from 'react'
import Sidebar from '../Components/sidebar/sidebar'
import MessageContainer from '../Components/messagesfolder/MessageContainer.jsx'
function Home() {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] border-2 border-white rounded-lg shadow-md shadow-black overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home
