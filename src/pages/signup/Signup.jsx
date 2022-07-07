import React, { useEffect, useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { useNavigate } from 'react-router-dom'
import './styles.css'
import { useAuthContext } from '../../hooks/useAuthContext'

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, error, isPending } = useSignup()
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const handleChangeFile = (event) => {
    setThumbnail(null)
    const selected = event.target.files[0]

    if(!selected) return setThumbnailError('Пожалуйста, выберите файл!!!')
    if(!selected.type.includes('image')) return setThumbnailError('Пожалуйста, выберите файл с расширением png или jpg/jpeg!!!')
    if(selected.size >= 1000000) return setThumbnailError('Пожалуйста выберите файл, размером менее 100 килобайт!!!')

    setThumbnail(selected)
    setThumbnailError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password, name, thumbnail)
    navigate('/')
  }

  useEffect(() => {
    if(user) {
      navigate("/")
    }
  }, [navigate, user])

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <label>
        <span>Эмейл:</span>
        <input 
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        />
      </label>
      <label>
        <span>Пароль:</span>
        <input 
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        />
      </label>
      <label>
        <span>Имя:</span>
        <input 
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)} 
        />
      </label>
      <label>
        <span>Картинка профиля:</span>
        <input type="file" required onChange={handleChangeFile}/>
        {thumbnailError && <span className='error'>{thumbnailError}</span>}
      </label>
      {!isPending && <button className="btn">Регистрация</button>}
      {isPending && <button className="btn">Загрузка...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Signup