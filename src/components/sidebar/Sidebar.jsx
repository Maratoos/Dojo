import React from 'react'
import { NavLink } from 'react-router-dom'
import DashboardIcon from '../../assets/dashboard_icon.svg' 
import AddIcon from '../../assets/add_icon.svg' 
import './styles.css'
import Avatar from '../avatar/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'

const Sidebar = () => {
    const { user } = useAuthContext()
    return (
    <div className="sidebar">
        <div className="sidebar-content">
            <div className="user">
                <Avatar src={user.photoURL} />
                <p>{user.displayName}</p>
            </div>
            <nav className="links">
                <ul>
                    <li>
                        <NavLink to="/">
                            <img src={DashboardIcon} alt="Dashboard Icon" />
                            <span>Доска проектов</span>
                        </NavLink>
                    </li>
                    <li>  
                        <NavLink to="/create">
                            <img src={AddIcon} alt="Add Icon" />
                            <span>Новый проект</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Sidebar