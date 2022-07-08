import React from 'react'
import { useDocument } from '../../hooks/useDocument'
import { useParams } from 'react-router-dom'
import './styles.css'
import ProjectSummary from './ProjectSummary'
import ProjectComment from './ProjectComment'

const Project = () => {
  const params = useParams()
  const { document, error } = useDocument("projects", params.id)

  if(error) {
    return <div className='error'>{error}</div>
  }
  if(!document && !error) {
    return <div className='loading'>Загрузка...</div>
  }

  return (
    <div className='project-details'>
      <ProjectSummary project={document} />
      <ProjectComment />
    </div>
  )
}

export default Project