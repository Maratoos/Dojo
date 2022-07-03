import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogin } from '../../hooks/useLogin'
import './styles.css'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isPending } = useLogin()
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = await login(email, password)
    if(user) navigate('/')
  }

  useEffect(() => {
    if(user) {
      navigate("/")
    }
  }, [navigate, user])

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
    <h2>Login</h2>
    <label>
      <span>Email:</span>
      <input 
      type="email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)} 
      />
    </label>
    <label>
      <span>Password:</span>
      <input 
      type="password"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)} 
      />
    </label>
    {!isPending && <button className="btn">Login</button>}
    {isPending && <button className="btn">Loading...</button>}
    {error && <div className='error'>{error}</div>}
  </form>
  )
}

export default Login