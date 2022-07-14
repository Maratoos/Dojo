import { addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { firestore } from "../firebase/config";

const initialState = {
    document:null,
    isPending:false,
    error:null,
    success:null
}

const firestoreReducer = (state, action) => {
    switch(action.type) {
        case "IS_PENDING": {
            return { isPending: true, document: null, error: null, success:true}
        }
        case "ADDED_DOCUMENT": {
            return { isPending: false, document: action.payload, error: null, success:true}
        }
        case "ERROR": {
            return { isPending: false, error: action.payload, document: null, success:false}
        }
        case "UPDATED_DOCUMENT": {
            return { isPending: false, error: null, document: action.payload, success:false}
        }
        case "DELETED_DOCUMENT": {
            return { isPending: false, error: null, document: null, success: false }
        }
        default:
            return state
    }
}


export const useCollection = (collectionName) => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [response, dispatch] = useReducer(firestoreReducer, initialState)

    const collectionRef = collection(firestore, collectionName)

    const addDocument = async (newDocument) => {
        dispatch({type:"IS_PENDING"})
        try {
            const addedDoc = await addDoc(collectionRef, { ...newDocument, createdAt:serverTimestamp(),})
            dispatch({type:"UPDATED_DOCUMENT", payload: addedDoc})
        } catch(err) {
            dispatch({type:"ERROR", payload: err.message})
        }
    }
    
    const updateDocument = async (docId, newData) => {
      dispatch({type: "IS_PENDING"})
        try{
           const updatedDoc = await setDoc(
            doc(firestore, "projects", docId),
            newData,
            { merge: true }
            ) 
            dispatch({ type: "UPDATED_DOCUMENT", payload: updatedDoc })   
            return updateDoc  
        } catch (err) {
            dispatch({ type: "ERROR", payload: err.message })
            return null
        }
    }

    const deleteDocument = async (docId) => {
        dispatch({type:"IS_PENDING"})
        try {
            await deleteDoc(doc(firestore, collectionName, docId))
            dispatch({type:"DELETED_DOCUMENT"})
        } catch (err) {
            dispatch({type:"ERROR", payload: err.message})
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, isCancelled, response, updateDocument, deleteDocument }
}

export const useGetCollection = (collectionName, options) => {
    const [documents, setDocuments] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const collectionRef = query(collection(firestore, collectionName))

        const unsubscribe = onSnapshot(collectionRef, (snap) => {
            let results = []

            snap.docs.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.id})
            });

            setDocuments(results)
            setError(null)
        })
        return () => {
            unsubscribe()
        }
    }, [collectionName, options])

    return { documents, error }
}

