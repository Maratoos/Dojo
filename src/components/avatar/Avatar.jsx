import React from 'react'
import './styles.css'

const Avatar = ({ src, children, className }) => {
  return (
    <div className={className + ' avatar'}>
        <img src={src} alt="User Avatar" />
        {children && children}
    </div>
  )
}

export default Avatar