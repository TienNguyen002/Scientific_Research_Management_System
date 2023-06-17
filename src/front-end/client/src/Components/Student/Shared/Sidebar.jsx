import React from "react";
import "./style/student-component.scss";
import logo from "../../../Components/Shared/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUserTie, faRightFromBracket, faKey, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

const StudentSidebar = () => {
  const {slug} = useParams();

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <span className="sidebar-top-logo">
          <img src={logo} alt="student" className="sidebar-top-logo" />
        </span>
      </div>
      <hr />
      <div className="sidebar-center">
        <ul>
          <p className="sidebar-center-title">Thông tin</p>
          <Link className="text-decoration-none" to={`/sinh-vien/${slug}/thong-tin`}>
            <li>
              <FontAwesomeIcon icon={faUserTie} className="sidebar-center-icon" />
              <span>Thông tin cá nhân</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/sinh-vien/${slug}/dang-ky-de-tai`}>
            <li>
              <FontAwesomeIcon icon={faBook} className="sidebar-center-icon" />
              <span>Đăng ký đề tài</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/sinh-vien/${slug}/quan-ly-de-tai`}>
            <li>
              <FontAwesomeIcon icon={faBookOpen} className="sidebar-center-icon" />
              <span>Quản lý đề tài</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/sinh-vien/${slug}/doi-mat-khau`}>
            <li>
              <FontAwesomeIcon icon={faKey} className="sidebar-center-icon" />
              <span>Đổi mật khẩu</span>
            </li>
          </Link>
          <p className="sidebar-center-title">Người dùng</p>
          <Link className="text-decoration-none" to={`/`}>
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

export default StudentSidebar;
