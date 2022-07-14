import React, { useState } from 'react'
import './styles.css'
import { useGetCollection } from '../../hooks/useCollection'
import Projects from '../../components/projects/Projects'
import ProjectFilter from './ProjectFilter'
import { useAuthContext } from '../../hooks/useAuthContext'

const Dashboard = () => {
  const [currentFilter, setCurrentFilter] = useState("all")
  const { documents ,error } = useGetCollection("projects")
  const { user } = useAuthContext()

  const handleClick = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const projects = documents.filter((project) => {
    switch (currentFilter) {
      case "all": return true
      case "mine": return project.assignedUsersList.some((assignedUser) => assignedUser.id === user.uid || project.createdBy.id === user.uid)     
      case "development": 
      case "design": 
      case "marketing": 
      case "sales": return project.category === currentFilter
      default:
        return true
    }
  })
  return (
    <div>
      <h2 className='page-title'>Доска проектов</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <ProjectFilter handleClick={handleClick} currentFilter={currentFilter} />}
      {documents && <Projects projects={projects}/>}
    </div>
  )
}

export default Dashboard