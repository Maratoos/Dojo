import React, { useEffect, useState } from 'react'
import { useGetCollection } from '../../hooks/useCollection'
import Select from 'react-select'
import './styles.css'

const categories = [
  {value: 'development', label: 'Development'},
  {value: 'design', label: 'Design'},
  {value: 'sales', label: 'Sales'},
  {value: 'marketing', label: 'Marketing'}
]

const Create = () => {
  const { documents, error } = useGetCollection("users")
  const [users, setUsers] = useState([])
  const [name, setName] = useState("")
  const [details, setDetails] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("")
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    setFormError(null)

    if(!category) {
      setFormError("Please, select project category!")
      return
    }
    if(!assignedUsers.length) {
      setFormError("Please, assign the project at least 1 user!")
      return
    }

    const assignedUsersList = assignedUsers.map(u => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })

    const createdBy = {
      
    }
  
    const project = {
      name,
      details,
      assignedUsersList,
      dueDate: new Date(dueDate),
      createdBy,
      comments: []
    }
  }
  
  useEffect(() => {
    if(documents) {
      setUsers(documents.map((user) => {
        return {value: {...user, id: user.id}, label: user.displayName}
      }))
    }
  }, [documents])

  return (
    <div className="create-form">
      <h2 className='page-title'>Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input 
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)} 
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea 
          required
          value={details}
          onChange={(e) => setDetails(e.target.value)} 
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input 
          type="date"
          required
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)} 
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
          onChange={(option) => setCategory(option)} 
          options={categories} 
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
          onChange={(option) => setAssignedUsers(option)} 
          options={users} 
          isMulti
          />
        </label>
        {formError && <div className='error'>{formError}</div>}
        <button className='btn'>Add project</button>
  </form>
    </div>
  )
}

export default Create