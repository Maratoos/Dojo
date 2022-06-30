import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { auth, firestore } from '../firebase/config'
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password)

            const usersRef = doc(firestore, "users", user.uid)
            await setDoc(usersRef, {
                isOnline: true
            }, {merge: true})

            dispatch({type: 'LOGIN', payload:user})
            
            if(!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
         catch(err) {
            if(!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    return { login, error, isPending }
}