import React from 'react'
import Temple from '../../assets/temple.svg'
import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import './styles.css'
import { useAuthContext } from '../../hooks/useAuthContext'

const Navbar = () => {
  const { logout, isPending, error } = useLogout()
  const { user } = useAuthContext()
  return (
    <nav className="navbar">
        <ul>
            <li className='logo'>
                <img src={Temple} alt="logo" />
                <span>The Dojo</span>
            </li>
            {!user && <>          
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/signup">Signup</Link>
            </li>
            </>}
            {user &&    
            <li>
                {!isPending && <button onClick={logout} className="btn">Logout</button>}
                {isPending && <button className="btn">Loading...</button>}
                {error && <div className='error'>{error}</div>}
            </li>
            }
        </ul>
    </nav>
  )
}

export default Navbar