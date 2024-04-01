import React from 'react'
// import { CiLogout } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";
import useLogout from '../../hooks/useLogout.js';
export default function LogoutButton() {
  const { loading, logout } = useLogout();
  return (
    <div className='mt-2'>
      <TbLogout2 className='w-6 h-6 text-white cursor-pointer hover:text-black' onClick={logout} />
    </div>
  )
}

