import React from 'react'
import { dueDate } from '../../helpers/date'
import Avatar from '../../components/avatar/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, firestore } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'

const ProjectSummary = ({ project }) => {
  const { user } = useAuthContext()
  const navigate = useNavigate()
//   const { deleteDocument } = useCollection()

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
        const docRef = doc(firestore, "projects", project.id)
        await deleteDoc(docRef)
        navigate('/')
    } catch (err) {
        console.log(err.message);
    }
  }
  return (
    <div>
        <div className="project-summary">
            <div className="summary-header">
            <h2 className="page-title">{project.name}</h2>
            {project.createdBy.id === user.uid && <button onClick={handleDelete} className='btn'>Удалить проект</button>}
            </div>
            <p className="due-date">
                Срок: {dueDate(project.dueDate.toDate())}
            </p>
            <p className="details">{project.details}</p>
            <h4>Исполнители проекта:</h4>
            <div className="assigned-users">
                {project.assignedUsersList.map((user) => (
                    <div key={user.id}>
                        <Avatar src={user.photoURL} />
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ProjectSummary