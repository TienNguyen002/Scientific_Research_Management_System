import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { getDepartments } from "../../Services/DepartmentService";
import { Link } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style/user.scss";

const Department = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    document.title = "Danh sách Khoa";
    getDepartments().then((data) => {
      if (data) {
        setDepartments(data);
      } else {
        setDepartments([]);
      }
    });
  }, []);

  return (
    <>
      <div className="department">
        <h1 className="text danger text-center department">Danh sách Khoa</h1>
      </div>
      <div>
        <div className="row department-item">
          {departments.length > 0 ? (
            departments.map((item, index) => (
              <div className="col-6" key={index}>
                <div className="item-card mt-3 text-center">
                  <div className="d-flex card-content">
                    <FontAwesomeIcon
                      icon={faHome}
                      fontSize={50}
                      className="px-3 text-success text-center"
                    />
                    <Link
                      className="text-success text-decoration-none"
                      to={`/khoa/${item.urlSlug}`}
                    >
                      <div className="text-name">{item.name}</div>
                    </Link>
                  </div>
                  <div>
                    <Link to={`/khoa/${item.urlSlug}`}>
                      <Button>Xem chi tiết</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-warning text-center py-3">
              Không tìm thấy đơn vị khoa
            </h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Department;
