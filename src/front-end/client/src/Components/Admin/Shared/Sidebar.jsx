import React from "react";
import "./style/admin-component.scss";
import logo from "../../../Components/Shared/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGraduationCap, faBook, faUser, faUsers, faComment, faUserTie, faRightFromBracket, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  let slug = sessionStorage.getItem("UrlSlug")

  const handleLogout = () => {
    sessionStorage.clear()
  }

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <span className="sidebar-top-logo">
          <img src={logo} alt="admin" className="sidebar-top-logo" />
        </span>
      </div>
      <hr />
      <div className="sidebar-center">
        <ul>
          <p className="sidebar-center-title">Trang chủ</p>
          <Link className="text-decoration-none" to={`/admin`}>
            <li>
              <FontAwesomeIcon icon={faHouse} className="sidebar-center-icon" />
              <span>Bảng điều khiển</span>
            </li>{" "}
          </Link>
          <p className="sidebar-center-title">Mục quản lý</p>
          <Link className="text-decoration-none" to={`/admin/khoa`}>
            <li>
              <FontAwesomeIcon icon={faGraduationCap} className="sidebar-center-icon" />
              <span>Khoa</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/admin/de-tai`}>
            <li>
              <FontAwesomeIcon icon={faBook} className="sidebar-center-icon" />
              <span>Đề tài</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/admin/sinh-vien`}>
            <li>
              <FontAwesomeIcon icon={faUser} className="sidebar-center-icon" />
              <span>Sinh viên</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/admin/giang-vien`}>
            <li>
              <FontAwesomeIcon icon={faUsers} className="sidebar-center-icon" />
              <span>Giảng viên</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/admin/feedback`}>
            <li>
              <FontAwesomeIcon icon={faComment} className="sidebar-center-icon" />
              <span>Feedback</span>
            </li>
          </Link>
          <p className="sidebar-center-title">Người dùng</p>
          <Link className="text-decoration-none" to={`/admin/${slug}/thong-tin`}>
            <li>
              <FontAwesomeIcon icon={faUserTie} className="sidebar-center-icon" />
              <span>Thông tin</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/admin/${slug}/doi-mat-khau`}>
            <li>
              <FontAwesomeIcon icon={faKey} className="sidebar-center-icon" />
              <span>Đổi mật khẩu</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/`} onClick={handleLogout}>
            <li>
              <FontAwesomeIcon icon={faRightFromBracket} className="sidebar-center-icon" />
              <span>Đăng xuất</span>
            </li>
          </Link>
        </ul>
      </div>
      {/* <div className="sidebar-bottom">
        <div className="sidebar-bottom-colorOption"></div>
        <div className="sidebar-bottom-colorOption"></div>
      </div> */}
    </div>
  );
};

export default AdminSidebar;
