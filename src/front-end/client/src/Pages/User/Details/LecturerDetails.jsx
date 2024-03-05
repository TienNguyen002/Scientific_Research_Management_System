import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isEmptyOrSpaces } from "../../../Utils/Utils";
import { getLecturerBySlug } from "../../../Services/LecturerService";
import { Table } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import { Button } from "react-bootstrap";
import "../style/user.scss";
import TopicByLecturers from "../Topics/TopicByLecturers";

const LecturerDetails = () => {
  const params = useParams();
  const [lecturer, setLecturer] = useState([]);
  const { slug } = params;
  const navigate = useNavigate();

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
      <Tabs className="mb-3">
        <Tab eventKey="thong-tin" title="Thông tin chi tiết">
          <Table striped responsive bordered>
            <tbody className="table-content">
              <tr>
                <th>Avatar</th>
                <td>
                  <img
                    src={`https://localhost:7129/${lecturer.imageUrl}`}
                    alt={lecturer.fullName}
                    className="avatar-user"
                  />
                </td>
              </tr>
              <tr>
                <th>Họ và tên</th>
                <td>{lecturer.fullName}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>
                  <Link
                    className="text-danger text-decoration-none"
                    to={`mailto:${lecturer.email}`}
                  >
                    {lecturer.email}
                  </Link>
                </td>
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
        </Tab>
        <Tab eventKey="de-tai" title="Danh sách đề tài hướng dẫn">
          <TopicByLecturers />
        </Tab>
      </Tabs>
      <hr />
      <Button onClick={() => navigate(-1)} className="btn-danger white-text">
        Quay lại
      </Button>
    </>
  );
};

export default LecturerDetails;
