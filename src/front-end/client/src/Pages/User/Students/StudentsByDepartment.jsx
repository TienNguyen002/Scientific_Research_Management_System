import React, { useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import { getStudentsFilterByDepartmentSlug } from "../../../Services/StudentService";
import { Link, useParams } from "react-router-dom";
import {Button} from "react-bootstrap";
import StudentList from "../../../Components/Shared/StudentList";
import FilterSearch from "../../../Components/Shared/Filter/Student/StudentFilterSearch";
import Loading from "../../../Components/Shared/Loading";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const StudentByDepartment = () => {
    const [studentsList, setStudentsList] = useState([]),
    params = useParams(),
    {slug} = params,
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    studentFilter = useSelector((state) => state.studentFilter);

    let departmentSlug = slug, p = 1, ps = 5;

    useEffect(() => {
        document.title = "Danh sách Sinh viên";
        getStudentsFilterByDepartmentSlug(
          studentFilter.keyword,
          departmentSlug,
          ps,
          p
        ).then((data) => {
          if (data) {
            setStudentsList(data.items);
          } else setStudentsList([]);
          setIsVisibleLoading(false);
        });
      }, [studentFilter, ps, p]);

    return(
        <>
            <FilterSearch />
      {isVisibleLoading ? (
        <Loading />
      ) : (
        <div className="row department-item">
          {studentsList.length > 0 ? (
            studentsList.map((item, index) => (
              <div className="col-6" key={index}>
                <div className="card mt-3">
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
                        to={`/khoa/${item.department.urlSlug}`}
                      >
                        Khoa: {item.department.name}
                      </Link>
                    </div>
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
    )
}

export default StudentByDepartment;