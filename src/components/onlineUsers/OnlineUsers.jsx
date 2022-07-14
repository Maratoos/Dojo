import React from 'react'
import Avatar from '../avatar/Avatar'
import { useGetCollection } from '../../hooks/useCollection'
import './styles.css'

const OnlineUsers = () => {
    const { error, documents } = useGetCollection('users')
  return (
    <div className='user-list'>
        <h2>Все пользователи</h2>
        {error && <div className='error'>{error}</div>}
        {documents && documents.map((user) => {
            return (
                <div className='user-list-item' key={user.id}>
                    <span className='username'>{user.displayName}</span>
                      <Avatar src={user.photoURL} className="user-avatar">    
                        {user.isOnline && <span className='online-user'></span>}
                      </Avatar>
                </div>
            )
        })}
    </div>
  )
}

export default OnlineUsers