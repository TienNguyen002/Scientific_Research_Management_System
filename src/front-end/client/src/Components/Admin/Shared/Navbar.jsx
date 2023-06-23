import React, { useState, useEffect } from "react";
import "./style/admin-component.scss";
import { getLecturerBySlug } from "../../../Services/LecturerService";
import { isEmptyOrSpaces } from "../../../Utils/Utils";

const AdminNavbar = () => {
  let slug = sessionStorage.getItem("UrlSlug");
  const [lecturer, setLecturer] = useState();

  useEffect(() => {
    getLecturerBySlug(slug).then((data) => {
      if (data) {
        setLecturer(data);
      } else setLecturer([]);
    });
  }, []);

  return (
    <div className="admin-navbar">
      <div className="admin-navbar-wrapper">
        <div></div>
        <div className="admin-navbar-items">
          {isEmptyOrSpaces(lecturer?.imageUrl) ? (
            <div className="admin-navbar-items">
              <div className="admin-navbar-item">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                  alt="."
                  className="admin-navbar-item-avatar"
                />
              </div>
            </div>
          ) : (
            <div className="">
              <img
                src={`https://localhost:7129/${lecturer?.imageUrl}`}
                alt={lecturer?.fullName}
                className="admin-navbar-item-avatar"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
