import React from 'react'
import "./styles.css"

const filterList = ["all", "mine", "development", "design", "marketing", "sales"]

const ProjectFilter = ({ handleClick, currentFilter }) => {
  return (
    <div className="project-filter">
        <nav>
            <p>Фильтры:</p>
            {filterList.map((filter) => (
                <button 
                key={filter} 
                onClick={() => handleClick(filter)}
                className={currentFilter === filter ? "active" : ""}
                >
                  {
                  filter === "all" ? "Все" : 
                  filter === "mine" ? "Мои" : 
                  filter === "development" ? "Разработка" : 
                  filter === "design" ? "Дизайн" : 
                  filter === "marketing" ? "Маркетинг" : 
                  "Продажи"
                  }
                </button>
            ))}
        </nav>
    </div>
)
}

export default ProjectFilter