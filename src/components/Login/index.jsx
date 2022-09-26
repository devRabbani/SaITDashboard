import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../../lib/firebase'
import { toast } from 'react-hot-toast'
import './login.style.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Login({ user }) {
  const location = useLocation()
  const navigate = useNavigate()

  const redirPath = location.state?.from || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const toastId = toast.loading('Signing In Please Wait')
    signInWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      password.trim()
    )
      .then((res) => {
        toast.success('Signin Successfull', { id: toastId })
        setIsLoading(false)
        navigate(redirPath, { replace: true })
      })
      .catch((err) => {
        toast.error('Email or Password is Wrong, Try Again!', {
          id: toastId,
        })
        setIsLoading(false)
        console.log(err.message, err?.code)
      })
  }

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/')
    }
  }, [])

  return (
    <div className='loginWrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          required
          type='email'
          name='email'
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type='password'
          name='password'
          minLength={6}
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={isLoading}>{isLoading ? 'Loading' : 'Signin'}</button>
      </form>
    </div>
  )
}
