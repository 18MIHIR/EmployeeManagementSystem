import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role')
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    navigate('/login')
  }

  return (
    <div className="bg-slate-800 h-16 px-16 items-center flex">
      <h1 className="text-3xl font-bold text-green-500"> 👨🏼‍💻 EM Service </h1>
      <div className="space-x-4 ml-auto flex items-center">
        {token ? (
          <>
            <div className="text-white">
              <span className="font-semibold">{username}</span>
              <span className="text-sm text-gray-300 ml-2">({role})</span>
            </div>
            <a className="hover:text-blue-400 text-white" href="/"> Home</a>
            <button 
              className="hover:text-red-400 text-white cursor-pointer"
              onClick={handleLogout}
            > 
              Logout 
            </button>
          </>
        ) : (
          <>
            <a className="hover:text-blue-400 text-white" href="/login"> Login</a>
            <a className="hover:text-blue-400 text-white" href="/register"> Register</a>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar