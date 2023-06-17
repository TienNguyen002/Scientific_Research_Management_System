import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isEmptyOrSpaces } from "../../../Utils/Utils";
import { getStudentBySlug } from "../../../Services/StudentService";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import TopicByStudents from "../Topics/TopicByStudents";
import "../style/user.scss";

const StudentDetails = () => {
  const params = useParams(),
  [student, setStudent] = useState([]),
  { slug } = params,
  navigate = useNavigate();

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
      <Tabs className="mb-3">
        <Tab eventKey="thong-tin" title="Thông tin chi tiết">
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
                <td>
                  <Link
                    className="text-danger text-decoration-none"
                    to={`mailto:${student.email}`}
                  >
                    {student.email}
                  </Link>
                </td>
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
        </Tab>
        <Tab eventKey="de-tai" title="Danh sách đề tài đã đăng ký">
          <TopicByStudents />
        </Tab>
      </Tabs>
      <hr />
      <Button onClick={() => navigate(-1)} className="btn-danger white-text">
        Quay lại
      </Button>
    </>
  );
};

export default StudentDetails;
