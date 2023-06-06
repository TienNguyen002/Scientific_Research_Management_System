import React from "react";
import "./style/admin-page.scss";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;

  switch (type) {
    case "topic":
      data = {
        title: "Đề tài",
        counter: 6,
        slug: "de-tai",
        link: "Xem tất cả",
      };
      break;
    case "department":
      data = {
        title: "Khoa",
        counter: 6,
        slug: "khoa",
        link: "Xem tất cả",
      };
      break;
      case "student":
      data = {
        title: "Sinh viên",
        counter: 8,
        slug: "sinh-vien",
        link: "Xem tất cả",
      };
      break;
      case "lecturer":
      data = {
        title: "Giảng viên",
        slug: "giang-vien",
        counter: 7,
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
