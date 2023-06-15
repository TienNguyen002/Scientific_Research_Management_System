import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getLecturersFilter } from "../../Services/LecturerService";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./style/user.scss";
import LecturerFilter from "../../Components/Shared/Filter/Lecturer/LecturerFilter";
import Loading from "../../Components/Shared/Loading";
import { useSelector } from "react-redux";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Lecturer = () => {
  const [lecturersList, setLecturersList] = useState([]),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    lecturerFilter = useSelector((state) => state.lecturerFilter);

  let ps = 10,
    p = 1;

  useEffect(() => {
    document.title = "Danh sách Giảng viên";
    getLecturersFilter(
      lecturerFilter.keyword,
      lecturerFilter.departmentId,
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
      <LecturerFilter />
      {isVisibleLoading ? (
        <Loading />
      ) : (
        <div className="row department-item">
          {lecturersList.length > 0 ? (
            lecturersList.map((item, index) => (
              <div className="col-6" key={index}>
                <div className="item-card mt-3">
                  <div className="d-flex card-content">
                    <FontAwesomeIcon icon={faUser}
                    fontSize={50}
                    className="px-3 text-success"/>
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
                  <div>
                  <Link to={`/giang-vien/${item.urlSlug}`}>
                      <Button>Xem chi tiết</Button>
                    </Link>
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

export default Lecturer;
