import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { getDepartments } from "../../Services/DepartmentService";
import { Link } from "react-router-dom";
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
      <h1 className="text-center">Danh sách các khoa</h1>
      <div className="container">
        <div className="wrapper row">
          {departments.length > 0 ? (
            departments.map((item, index) => (
              <div className="col-4 card" key={index}>
                <img
                  src="https://du-lich-da-lat.com/wp-content/uploads/2022/03/Top-truong-Dai-hoc-Da-Lat.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{item.name}</h5>
                  <Button className="btn">
                    <Link to={`/khoa/${item.urlSlug}`} className="btn">Xem chi tiết</Link>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <tr>
              <td>
                <h4>Không tìm thấy khoa nào</h4>
              </td>
            </tr>
          )}
        </div>
      </div>
    </>
  );
};

export default Department;
