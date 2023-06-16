import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { isEmptyOrSpaces } from "../../../Utils/Utils";
import { getDepartmentBySlug } from "../../../Services/DepartmentService";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import { Button } from "react-bootstrap";
import "../style/user.scss";
import TopicByDepartment from "../Topics/TopicByDepartment";
import StudentByDepartment from "../Students/StudentsByDepartment";
import LecturerByDepartment from "../Lecturers/LecturerByDepartment";

const DepartmentDetails = () => {
  const params = useParams();
  const [department, setDepartment] = useState([]);
  const { slug } = params;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Chi tiết khoa";
    getDepartmentBySlug(slug).then((data) => {
      window.scroll(0, 0);
      if (data) {
        setDepartment(data);
        console.log(data);
      } else setDepartment({});
    });
  }, [slug]);

  return (
    <>
      <h1 className="header">{department.name}</h1>
      <Tabs className="mb-3">
        <Tab eventKey="gioi-thieu" title="Giới thiệu">
          <Table>
            <tbody>
              <th>{department.name}</th>
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="sinh-vien" title="Danh sách sinh viên">
          <StudentByDepartment />
        </Tab>
        <Tab eventKey="giang-vien" title="Danh sách giảng viên">
          <LecturerByDepartment />
        </Tab>
        <Tab eventKey="de-tai" title="Danh sách đề tài">
          <TopicByDepartment />
        </Tab>
      </Tabs>
      <hr />
      <Button onClick={() => navigate(-1)} className="btn-danger white-text">
        Quay lại
      </Button>
    </>
  );
};

export default DepartmentDetails;
