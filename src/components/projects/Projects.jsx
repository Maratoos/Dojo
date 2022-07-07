import React from 'react'
import Avatar from '../avatar/Avatar'
import { Link } from 'react-router-dom'
import './styles.css'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const Projects = ({ projects }) => {
  return (
    <div className='project-list'>
        {!projects.length && <p>Проектов еще нет!</p>}
        {projects.map((project) => {   
          const date = format(project.dueDate.toDate(), 'EEEE d MMMM y', {locale: ru})
            return (
                <Link to={`/project/${project.id}`} key={project.id}>
                    <h4>{project.name}</h4>
                    <p>Срок: {date}</p>
                    <div className='assigned-to'>
                        <ul>
                            {project.assignedUsersList.map((user) => (
                                <li key={user.photoURL}>
                                    <Avatar src={user.photoURL} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            )
        })}
    </div>
  )
}

export default Projects