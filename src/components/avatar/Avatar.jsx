import React from 'react'
import './styles.css'

const Avatar = ({ src }) => {
  return (
    <div className='avatar'>
        <img src={src} alt="User Avatar" />
    </div>
  )
}

export default Avatar