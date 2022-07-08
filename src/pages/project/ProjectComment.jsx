import { serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

const ProjectComment = () => {
  const { user } = useAuthContext()
  const [newComment, setNewComment] = useState("") 

  const handleSubmit = (e) => {
    e.preventDefault()

    const commentToAdd = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        content: newComment,
        createdAt: serverTimestamp(),
        id: Math.random()
    }
  }

  return (
    <div className="project-comments">
        <h4>Комментарии</h4>
        <form className="add-comment" onSubmit={handleSubmit}>
            <label>
                <span>Описание:</span>
                <textarea
                required
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                >
                </textarea>
            </label>
            <button className="btn">Добавить</button>
        </form>
    </div>
)
}

export default ProjectComment