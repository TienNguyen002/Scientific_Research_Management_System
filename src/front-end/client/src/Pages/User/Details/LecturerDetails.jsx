import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isEmptyOrSpaces } from "../../../Utils/Utils";
import { getLecturerBySlug } from "../../../Services/LecturerService";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import { Button } from "react-bootstrap";
import "../style/user.scss";
import TopicByLecturers from "../Topics/TopicByLecturers";

const LecturerDetails = () => {
  const params = useParams();
  const [lecturer, setLecturer] = useState([]);
  const { slug } = params;

  useEffect(() => {
    document.title = "Chi tiết giảng viên";
    getLecturerBySlug(slug).then((data) => {
      window.scroll(0, 0);
      if (data) {
        setLecturer(data);
        console.log(data);
      } else setLecturer({});
    });
  }, [slug]);

  return (
    <>
      <Table striped responsive bordered>
        <tbody className="table-content">
          <tr>
            <th>Họ và tên</th>
            <td>{lecturer.fullName}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{lecturer.email}</td>
          </tr>
          <tr>
            <th>Khoa</th>
            <td>{lecturer.department?.name}</td>
          </tr>
          <tr>
            <th>Cấp bậc</th>
            <td>{lecturer.qualification}</td>
          </tr>
        </tbody>
      </Table>
      <TopicByLecturers />
    </>
  );
};

export default LecturerDetails;
