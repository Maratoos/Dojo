import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, storage } from '../firebase/config'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const[isPending, setIsPending] = useState(false)

    const signup = async (email, password, name, file) => {
        setError(null)
        setIsPending(true)

        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email, 
                password
            )

        const uploadPath = `avatars/${response.user.uid}/${file.name}`
        const imgRef = ref(storage, uploadPath)
        const uploadedImg = await uploadBytesResumable(imgRef, file)
        const imgUrl = await getDownloadURL(uploadedImg.ref)

        await updateProfile(response.user, {
            displayName: name,
            photoURL: imgUrl
        })
        console.log(response);
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