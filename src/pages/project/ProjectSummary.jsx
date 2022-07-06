import React from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/esm/locale'
import Avatar from '../../components/avatar/Avatar'

const ProjectSummary = ({ project }) => {
  const date = format(project.dueDate.toDate(), 'EEEE d MMMM y', {locale: ru})
  return (
    <div>
        <div className="project-summary">
            <h2 className="page-title">{project.name}</h2>
            <p className="due-date">
                Сделать до: {date}
            </p>
            <p className="details">{project.details}</p>
            <h4>Assigned to:</h4>
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