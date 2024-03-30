import React from 'react'
import SearchInput from './SearchInput'
import Chats from './Chats'
import LogoutButton from './LogoutButton'
function Sidebar() {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <SearchInput/>
      <div className='divider my-1'></div>
      <Chats/>
      <LogoutButton/>
    </div>
  )
}

export default Sidebar
