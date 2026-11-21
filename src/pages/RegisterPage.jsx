import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { authErrorMessage } from '../../authErrors.js'

function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (values.name.trim().length < 3) {
      setError('Enter your name (at least 3 characters).')
      return
    }
    setError('')
    setBusy(true)
    try {
      await register(values.name.trim(), values.email, values.password)
      navigate(location.state?.from ?? '/', { replace: true })
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="card form" onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={values.name} onChange={handleChange} required />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} required />
        <label htmlFor="password">Password (at least 6 characters)</label>
        <input id="password" name="password" type="password" autoComplete="new-password" value={values.password} onChange={handleChange} required />
        {error && <p className="field-error" role="alert">{error}</p>}
        <button type="submit" className="btn" disabled={busy}>{busy ? 'Creating…' : 'Register'}</button>
        <p className="muted">Already registered? <Link to="/login" state={location.state}>Log in</Link></p>
      </form>
    </section>
  )
}

export default RegisterPage
