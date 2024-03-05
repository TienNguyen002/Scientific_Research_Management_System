import React, { useEffect, useState } from "react";
import "./style/admin-page.scss";
import { Link } from "react-router-dom";
import { getInfoDashboard } from "../../Services/AdminService"

const Widget = ({ type }) => {
  let data;
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    getInfoDashboard().then((data) => {
      if(data){
        setDashboard(data);
      } else setDashboard([]);
    })
  }, []);

  switch (type) {
    case "topic":
      data = {
        title: "Đề tài",
        counter: dashboard.countTopic,
        slug: "de-tai",
        link: "Xem tất cả",
      };
      break;
    case "department":
      data = {
        title: "Khoa",
        counter: dashboard.countDepartment,
        slug: "khoa",
        link: "Xem tất cả",
      };
      break;
      case "student":
      data = {
        title: "Sinh viên",
        counter: dashboard.countStudent,
        slug: "sinh-vien",
        link: "Xem tất cả",
      };
      break;
      case "lecturer":
      data = {
        title: "Giảng viên",
        slug: "giang-vien",
        counter: dashboard.countLecturer,
        link: "Xem tất cả",
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="widget-left">
        <div className="widget-title">{data?.title}</div>
        <div className="widget-counter">{data?.counter}</div>
      </div>
      <div className="widget-right">
        <div className="widget-link">
          <Link className="text-decoration-none" to={`/admin/${data?.slug}`}>
            {data?.link}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Widget;
