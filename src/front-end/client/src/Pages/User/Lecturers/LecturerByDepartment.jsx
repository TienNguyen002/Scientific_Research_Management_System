import React, { useEffect, useState } from "react";
import { getLecturersFilterByDepartmentSlug } from "../../../Services/LecturerService";
import { Link, useParams } from "react-router-dom";
import LecturerFilterSearch from "../../../Components/User/Filter/Lecturer/LecturerFilterSearch";
import Loading from "../../../Components/Shared/Loading";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const LecturerByDepartment = () => {
  const [lecturersList, setLecturersList] = useState([]),
    params = useParams(),
    { slug } = params,
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    lecturerFilter = useSelector((state) => state.lecturerFilter);

  let departmentSlug = slug,
    p = 1,
    ps = 5;

  useEffect(() => {
    document.title = "Danh sách Giảng viên";
    getLecturersFilterByDepartmentSlug(
      lecturerFilter.keyword,
      departmentSlug,
      ps,
      p
    ).then((data) => {
      if (data) {
        setLecturersList(data.items);
      } else setLecturersList([]);
      setIsVisibleLoading(false);
    });
  }, [lecturerFilter, ps, p]);

  return (
    <>
      <LecturerFilterSearch />
      {isVisibleLoading ? (
        <Loading />
      ) : (
        <div className="row department-item">
          {lecturersList.length > 0 ? (
            lecturersList.map((item, index) => (
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
                        to={`/giang-vien/${item.urlSlug}`}
                      >
                        <div className="text-name">Họ tên: {item.fullName}</div>
                      </Link>

                      {item.email === null ? (
                        <span className="text-danger">
                          Email: Giảng viên chưa cập nhật email
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
              Không tìm thấy giảng viên
            </h2>
          )}
        </div>
      )}
    </>
  );
};

export default LecturerByDepartment;
