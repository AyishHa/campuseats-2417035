import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
// Step 1: connect the app to YOUR Firebase project (values in .env.local).
const app = initializeApp({
apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
appId: import.meta.env.VITE_FIREBASE_APP_ID,
})
export const auth = getAuth(app)
if (import.meta.env.VITE_USE_EMULATORS === 'true') {
connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
}