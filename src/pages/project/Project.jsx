import React from 'react'
import { useDocument } from '../../hooks/useDocument'
import { useParams } from 'react-router-dom'
import './styles.css'
import ProjectSummary from './ProjectSummary'

const Project = () => {
  const params = useParams()
  const { document, error } = useDocument("projects", params.id)

  if(error) {
    return <div className='error'>{error}</div>
  }
  if(!document) {
    return <div className='loading'>Loading...</div>
  }

  return (
    <div className='project-details'>
      <ProjectSummary project={document} />
    </div>
  )
}

export default Project