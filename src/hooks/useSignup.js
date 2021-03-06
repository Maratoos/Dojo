import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, firestore, storage } from '../firebase/config'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, name, file) => {
        setError(null)
        setIsPending(true)

        try {
        const response = await createUserWithEmailAndPassword(auth, email, password)

        const uploadPath = `avatars/${response.user.uid}/${file.name}`
        const imgRef = ref(storage, uploadPath)
        const uploadedImg = await uploadBytesResumable(imgRef, file)
        const imgUrl = await getDownloadURL(uploadedImg.ref)

        const usersRef = doc(firestore, "users", response.user.uid) 
        await setDoc(usersRef, { 
            isOnline:true,
            displayName: name,
            photoURL: imgUrl,
            email
        })

        await updateProfile(response.user, {
            displayName: name,
            photoURL: imgUrl
        })
        await dispatch({type: 'SIGN_UP', payload: response.user})  

        setIsPending(false)
        setError(null)
        } catch(error) {
            console.log(error.message)
            setError(error.message)
            setIsPending(false)
        }
    }
    return { signup, error, isPending }
}