import { useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase.js'
import { AuthContext } from './auth-context.js'

// AuthProvider keeps the signed-in user in state and shares it, like CartProvider does for the cart.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // true until Firebase tells us who is signed in

  useEffect(() => {
    // onAuthStateChanged fires once on load and again on every sign-in or sign-out.
    // It returns an unsubscribe function, which is exactly what an effect cleanup needs.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  async function register(name, email, password) {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(credential.user, { displayName: name })
    setUser({ ...credential.user, displayName: name }) // show the name straight away
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function loginWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider())
  }

  function logout() {
    return signOut(auth)
  }

  const value = { user, loading, register, login, loginWithGoogle, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
