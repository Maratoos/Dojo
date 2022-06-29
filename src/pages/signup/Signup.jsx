import React, { useState } from 'react'
import './styles.css'

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)

  const handleChangeFile = (event) => {
    setThumbnail(null)
    const selected = event.target.files[0]

    if(!selected) return setThumbnailError('Please select a file')
    if(!selected.type.includes('image')) return setThumbnailError('Please select a valid picture')
    if(selected.size >= 1000000) return setThumbnailError('Please select a file smaller than 100kb')

    setThumbnail(selected)
    setThumbnailError(null)
  }

  return (
    <form className="auth-form">
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input 
        type="text"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        />
      </label>
      <label>
        <span>Password:</span>
        <input 
        type="text"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        />
      </label>
      <label>
        <span>Name:</span>
        <input 
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)} 
        />
      </label>
      <label>
        <span>Profile Thumbnail:</span>
        <input type="file" required onChange={handleChangeFile}/>
        {thumbnailError && <span className='error'>{thumbnailError}</span>}
      </label>
      <button className="btn">Sign up</button>
    </form>
  )
}

export default Signup