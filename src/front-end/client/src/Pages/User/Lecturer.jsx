import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getLecturersFilter } from "../../Services/LecturerService";
import { Link } from "react-router-dom";
import "./style/user.scss";
import LecturerFilter from "../../Components/User/Filter/LecturerFilter"
import Loading from "../../Components/Shared/Loading";
import { useSelector } from "react-redux";

const Lecturer = () => {
  const [lecturersList, setLecturersList] = useState([]),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    lecturerFilter = useSelector(state => state.lecturerFilter);

  let ps = 10,
    p = 1;

  useEffect(
    () => {
      document.title = "Danh sách Giảng viên";
      getLecturersFilter(lecturerFilter.keyword,
        lecturerFilter.departmentId,
        ps, p).then((data) => {
        if (data) {
          setLecturersList(data.items);
        } else 
          setLecturersList([]);
        setIsVisibleLoading(false);
      });
    },
    [lecturerFilter, ps, p]
  );

  return (
    <>
      <h1>Danh sách giảng viên</h1>
      <LecturerFilter/>
      {isVisibleLoading ? (
        <Loading />
      ) : (
      <Table striped responsive bordered>
        <thead className="table text-center">
          <tr className="table-title">
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Khoa</th>
            <th>Cấp bậc</th>
          </tr>
        </thead>
        <tbody className="table-content">
          {lecturersList.length > 0 ? (
            lecturersList.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link className="content" to={`/giang-vien/${item.urlSlug}`}>
                    {item.fullName}
                  </Link>
                </td>
                <td>{item.email}</td>
                <td>
                  <Link
                    className="content"
                    to={`/khoa/${item.department.urlSlug}`}
                  >
                    {item.department.name}
                  </Link>
                </td>
                <td>{item.qualification}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <h4>Không tìm thấy giảng viên nào</h4>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      )}
    </>
  );
};

export default Lecturer;
