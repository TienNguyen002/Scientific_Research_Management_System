import React, { useEffect, useState } from "react";
import { getStudentsFilter } from "../../Services/StudentService";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./style/user.scss";
import StudentFilter from "../../Components/User/Filter/Student/StudentFilter";
import Loading from "../../Components/Shared/Loading";
import { useSelector } from "react-redux";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const User = () => {
  const [studentsList, setStudentsList] = useState([]),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    studentFilter = useSelector((state) => state.studentFilter);

  let ps = 10,
    p = 1;

  useEffect(() => {
    document.title = "Danh sách Sinh viên";
    getStudentsFilter(
      studentFilter.keyword,
      studentFilter.departmentId,
      ps,
      p
    ).then((data) => {
      if (data) {
        setStudentsList(data.items);
      } else setStudentsList([]);
      setIsVisibleLoading(false);
    });
  }, [studentFilter, ps, p]);

  return (
    <>
      <StudentFilter />
      {isVisibleLoading ? (
        <Loading />
      ) : (
        <div className="row department-item">
          {studentsList.length > 0 ? (
            studentsList.map((item, index) => (
              <div className="col-6" key={index}>
                <div className="item-card mt-3">
                  <div className="d-flex card-content">
                    <FontAwesomeIcon
                      icon={faUser}
                      fontSize={50}
                      className="px-3 text-success"
                    />
                    <div className="d-flex flex-column">
                      <Link
                        className="text-success text-decoration-none"
                        to={`/sinh-vien-nghien-cuu/${item.urlSlug}`}
                      >
                        <div className="text-name">Họ tên: {item.fullName}</div>
                      </Link>

                      {item.email === null ? (
                        <span className="text-danger">
                          Email: Sinh viên chưa cập nhật email
                        </span>
                      ) : (
                        <Link
                          className="text-danger text-decoration-none"
                          to={`mailto:${item.email}`}
                        >
                          Email: {item.email}
                        </Link>
                      )}
                      <Link
                        className="text-decoration-none"
                        to={`/khoa/${item.department?.urlSlug}`}
                      >
                        Khoa: {item.department?.name}
                      </Link>
                    </div>
                  </div>
                  <div>
                  <Link to={`/sinh-vien-nghien-cuu/${item.urlSlug}`}>
                      <Button>Xem chi tiết</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-warning text-center py-3">
              Không tìm thấy sinh viên
            </h2>
          )}
        </div>
      )}
    </>
  );
};

export default User;
