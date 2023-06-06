import React from 'react'
import "./style/admin-component.scss"
import NightsStayIcon from '@mui/icons-material/NightsStay';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const AdminNavbar = () => {
  return (
    <div className='admin-navbar'>
      <div className="admin-navbar-wrapper">
        <div></div>
        <div className="admin-navbar-items">
          <div className="admin-navbar-item">
            <NightsStayIcon className='admin-navbar-item-icon'/>
          </div>
          <div className="admin-navbar-item">
            <FormatListBulletedIcon className='admin-navbar-item-icon'/>
          </div>
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
