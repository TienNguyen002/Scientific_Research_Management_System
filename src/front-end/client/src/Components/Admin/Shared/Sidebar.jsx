import React from "react";
import "./style/admin-component.scss";
import logo from "../../../Components/Shared/images/logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import TopicIcon from "@mui/icons-material/Topic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
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
              <DashboardIcon className="sidebar-center-icon" />
              <span>Bảng điều khiển</span>
            </li>{" "}
          </Link>
          <p className="sidebar-center-title">Mục quản lý</p>
          <Link className="text-decoration-none" to={`/admin/khoa`}>
            <li>
              <SchoolIcon className="sidebar-center-icon" />
              <span>Khoa</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/admin/de-tai`}>
            {" "}
            <li>
              <TopicIcon className="sidebar-center-icon" />
              <span>Đề tài</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/admin/sinh-vien`}>
            <li>
              <PersonIcon className="sidebar-center-icon" />
              <span>Sinh viên</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/admin/giang-vien`}>
            <li>
              <AssignmentIndIcon className="sidebar-center-icon" />
              <span>Giảng viên</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/admin/feedback`}>
            <li>
              <FeedbackIcon className="sidebar-center-icon" />
              <span>Feedback</span>
            </li>
          </Link>
          <p className="sidebar-center-title">Người dùng</p>
          <Link className="text-decoration-none" to={`/admin/thong-tin`}>
            <li>
              <AccountCircleIcon className="sidebar-center-icon" />
              <span>Thông tin</span>
            </li>
          </Link>
          <Link className="text-decoration-none" to={`/`}>
            <li>
              <LogoutIcon className="sidebar-center-icon" />
              <span>Đăng xuất</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-bottom-colorOption"></div>
        <div className="sidebar-bottom-colorOption"></div>
      </div>
    </div>
  );
};

export default AdminSidebar;
