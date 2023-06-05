import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isEmptyOrSpaces } from "../../../Utils/Utils";
import { getDepartmentBySlug } from "../../../Services/DepartmentService";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import { Button } from "react-bootstrap";
import "../style/user.scss";
import TopicByLecturers from "../Topics/TopicByLecturers";
import TopicByDepartment from "../Topics/TopicByDepartment";

const DepartmentDetails = () => {
  const params = useParams();
  const [department, setDepartment] = useState([]);
  const { slug } = params;

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
      <TopicByDepartment />
    </>
  );
};

export default DepartmentDetails;
