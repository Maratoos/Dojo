import React from 'react'
import Temple from '../../assets/temple.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import './styles.css'
import { useAuthContext } from '../../hooks/useAuthContext'

const Navbar = () => {
  const { logout, isPending, error } = useLogout()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
        <ul>
            <li className='logo'>
                <img src={Temple} alt="logo" />
                <span>The Dojo</span>
            </li>
            {!user && <>          
            <li>
                <Link to="/login">Авторизация</Link>
            </li>
            <li>
                <Link to="/signup">Регистрация</Link>
            </li>
            </>}
            {user &&    
            <li>
                {!isPending && <button onClick={handleLogout} className="btn">Выйти</button>}
                {isPending && <button className="btn">Загрузка...</button>}
                {error && <div className='error'>{error}</div>}
            </li>
            }
        </ul>
    </nav>
  )
}

export default Navbar