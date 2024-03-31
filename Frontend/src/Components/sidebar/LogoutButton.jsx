import React from 'react'
import { CiLogout } from "react-icons/ci";
import useLogout from '../../hooks/useLogout.js';
export default function LogoutButton() {
  const { loading, logout } = useLogout();
  return (
    <div className='mt-2'>
      <CiLogout className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
    </div>
  )
}

