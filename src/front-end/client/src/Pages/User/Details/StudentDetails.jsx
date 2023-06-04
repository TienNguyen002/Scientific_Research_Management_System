import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isEmptyOrSpaces } from "../../../Utils/Utils";
import { getStudentBySlug } from "../../../Services/StudentService";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import { Button } from "react-bootstrap";
import TopicByStudents from "../Topics/TopicByStudents";
import "../style/user.scss"

const StudentDetails = () => {
  const params = useParams();
  const [student, setStudent] = useState([]);
  const { slug } = params;

  useEffect(() => {
    document.title = "Chi tiết sinh viên";
    getStudentBySlug(slug).then((data) => {
      window.scroll(0, 0);
      if (data) {
        setStudent(data);
        console.log(data);
      } else setStudent({});
    });
  }, [slug]);

  return (
    <>
      <Table striped responsive bordered>
        <tbody className="table-content">
          <tr>
            <th>MSSV</th>
            <td>{student.studentId}</td>
          </tr>
          <tr>
            <th>Họ và tên</th>
            <td>{student.fullName}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{student.email}</td>
          </tr>
          <tr>
            <th>Khoa</th>
            <td>{student.department?.name}</td>
          </tr>
          <tr>
            <th>Lớp</th>
            <td>{student.class}</td>
          </tr>
          <tr>
            <th>Năm học</th>
            <td>{student.year}</td>
          </tr>
        </tbody>
      </Table>
      <TopicByStudents/>
    </>
  );
};

export default StudentDetails;
