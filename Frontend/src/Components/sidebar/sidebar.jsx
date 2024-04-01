import React from 'react'
import SearchInput from './SearchInput'
import Chats from './Chats'
import LogoutButton from './LogoutButton'
function Sidebar() {
  return (
    <div className='border-r-2 border-white p-4 flex flex-col'>
      <SearchInput/>
      {/* <div className='divider my-1'></div> */}
      <div><hr className='border-t-2 border-white mt-2'/></div>
      <Chats/>
      <LogoutButton/>
    </div>
  )
}

export default Sidebar
