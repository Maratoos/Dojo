import { Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { v4 as uuidv4 } from 'uuid'
import Avatar from '../../components/avatar/Avatar'
import { toNow } from '../../helpers/date'

const ProjectComment = ({ project }) => {
  const { user } = useAuthContext()
  const { updateDocument, response } = useCollection("projects")
  const [newComment, setNewComment] = useState("")
  const [isPending, setIsPending] = useState(false) 

  const handleSubmit = async (e) => {
    setIsPending(true)
    e.preventDefault()

    const commentToAdd = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        content: newComment,
        createdAt: Timestamp.fromDate(new Date()),
        id: uuidv4()
    }
    await updateDocument(project.id, {
        comments: [...project.comments, commentToAdd]
    })
    setIsPending(false)
    if(!response.error) {
        setNewComment("")
    }
  }
  return (
    <div className="project-comments">
        <h4>Комментарии</h4>
        <ul className='comment-list'>
            {project.comments.length > 0 && 
              project.comments.map((comment) => (
                <li key={comment.id}>
                    <div className="comment-header">
                        <div className="comment-author">
                            <Avatar src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>{toNow(comment.createdAt.toDate())} назад</p>
                        </div>
                    </div>
                    <div className="comment-content">
                        <p>{comment.content}</p>
                    </div>
                </li>
              ))
            }
        </ul>
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
            {!isPending && <button className='btn'>Добавить</button>}
            {isPending && <button className="btn">Загрузка...</button>}
        </form>
    </div>
  )
}

export default ProjectComment