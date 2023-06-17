import React from 'react'
import "./style/admin-component.scss"

const AdminNavbar = () => {
  return (
    <div className='admin-navbar'>
      <div className="admin-navbar-wrapper">
        <div></div>
        <div className="admin-navbar-items">
          <div className="admin-navbar-item">
            <img
              src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
              alt='.'
              className='admin-navbar-item-avatar'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar;
