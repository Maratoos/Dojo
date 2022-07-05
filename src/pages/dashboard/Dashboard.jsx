import React from 'react'
import './styles.css'
import { useGetCollection } from '../../hooks/useCollection'
import Projects from '../../components/projects/Projects'

const Dashboard = () => {
  const { documents ,error } = useGetCollection("projects")
  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <Projects projects={documents}/>}
    </div>
  )
}

export default Dashboard