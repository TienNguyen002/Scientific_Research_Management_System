import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { getDepartmentsFilter } from "../../Services/DepartmentService";
import { Link } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style/user.scss";
import Loading from "../../Components/Shared/Loading";
import DepartmentFilter from "../../Components/Shared/Filter/Department/DepartmentFilter";
import { useSelector } from "react-redux";

const Department = () => {
  const [departments, setDepartments] = useState([]),
  [isVisibleLoading, setIsVisibleLoading] = useState(true),
  departmentFilter = useSelector((state) => state.departmentFilter);;

  let p = 1,
    ps = 10;

  useEffect(() => {
    document.title = "Danh sách Khoa";
    getDepartmentsFilter(departmentFilter.keyword).then((data) => {
      if (data) {
        setDepartments(data.items);
      } else {
        setDepartments([]);
      }
      setIsVisibleLoading(false);
    });
  }, [departmentFilter, ps, p]);

  return (
    <>
      <div>
      <div className="d-flex">
        <DepartmentFilter />
      </div>
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
