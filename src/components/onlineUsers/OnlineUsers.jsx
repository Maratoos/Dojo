import React from 'react'
import Avatar from '../avatar/Avatar'
import { useGetCollection } from '../../hooks/useCollection'
import './styles.css'

const OnlineUsers = () => {
    const { error, documents } = useGetCollection('users')
  return (
    <div className='user-list'>
        <h2>All Users</h2>
        {error && <div className='error'>{error}</div>}
        {documents && documents.map((user) => {
            return (
                <div className='user-list-item' key={user.id}>
                    {user.isOnline && <span className='online-user'></span>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoURL}/>
                </div>
            )
        })}
    </div>
  )
}

export default OnlineUsers