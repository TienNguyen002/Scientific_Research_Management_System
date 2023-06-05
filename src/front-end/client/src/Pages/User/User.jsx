import React, { useEffect, useState } from "react";
import { getStudentsFilter } from "../../Services/StudentService";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style/user.scss";
import StudentFilter from "../../Components/User/Filter/StudentFilter";
import Loading from "../../Components/Shared/Loading";
import { useSelector } from "react-redux";

const User = () => {
  const [studentsList, setStudentsList] = useState([]),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    studentFilter = useSelector(state => state.studentFilter);

  let ps = 10,
    p = 1;

  useEffect(
    () => {
      document.title = "Danh sách Sinh viên";
      getStudentsFilter(studentFilter.keyword,
        studentFilter.departmentId,
        ps, p).then((data) => {
        if (data) {
          setStudentsList(data.items);
        } else setStudentsList([]);
        setIsVisibleLoading(false);
      });
    },
    [studentFilter, ps, p]
  );

  return (
    <>
      <h1>Danh sách Sinh viên</h1>
      <StudentFilter />
      {isVisibleLoading ? (
        <Loading />
      ) : (
        <Table striped responsive bordered>
          <thead className="table text-center">
            <tr className="table-title">
              <th>MSSV</th>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Khoa</th>
              <th>Lớp</th>
              <th>Năm học</th>
            </tr>
          </thead>
          <tbody className="table-content">
            {studentsList.length > 0 ? (
              studentsList.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Link className="content" to={`/sinh-vien/${item.urlSlug}`}>
                      {item.studentId}
                    </Link>
                  </td>
                  <td>
                    <Link className="content" to={`/sinh-vien/${item.urlSlug}`}>
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
                  <td>{item.class}</td>
                  <td>{item.year}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <h4>Không tìm thấy sinh viên nào</h4>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default User;
