import React from 'react'
import "./style/student-component.scss"

const StudentNavbar = () => {
  return (
    <div className='student-navbar'>
      <div className="student-navbar-wrapper">
        <div></div>
        <div className="student-navbar-items">
          <div className="student-navbar-item">
            <img
              src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
              alt='.'
              className='student-navbar-item-avatar'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentNavbar;
