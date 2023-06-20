import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isEmptyOrSpaces } from "../../../Utils/Utils";
import { getTopicBySlug, increaseView } from "../../../Services/TopicService";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import { Button } from "react-bootstrap";
import StudentList from "../../../Components/Shared/StudentList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileWord } from "@fortawesome/free-regular-svg-icons";
import PriceComponent from "../../../Components/Shared/PriceComponent";

const TopicDetails = () => {
  const params = useParams();
  const [topic, setTopic] = useState([]);
  const { slug } = params;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Chi tiết đề tài";
    getTopicBySlug(slug).then((data) => {
      window.scroll(0, 0);
      if (data) {
        setTopic(data);
      } else setTopic({});
    });
    increaseView(slug);
  }, []);

  return (
    <>
      <h1>Chi tiết đề tài</h1>
      <Table striped responsive bordered>
        <tbody className="table-content">
          <tr></tr>
          <tr>
            <th>Tên đề tài</th>
            <td>{topic.title}</td>
          </tr>
          <tr>
            <th>Mô tả</th>
            <td>{topic.description}</td>
          </tr>
          <tr>
            <th>Ngày thực hiện</th>
            <td>{topic.registrationDate}</td>
          </tr>
          <tr>
            <th>Ngày nghiệm thu</th>
            <td>{topic.endDate}</td>
          </tr>
          <tr>
            <th>Số sinh viên thực hiện</th>
            <td>{topic.studentNumbers}</td>
          </tr>
          <tr>
            <th>Kinh phí</th>
            <td><PriceComponent amount={topic.price}/></td>
          </tr>

          <tr>
            <th>Khoa</th>
            <td>{topic.department?.name}</td>
          </tr>
          <tr>
            <th>Giảng viên hướng dẫn</th>
            <td>
              <Link
                className="table-content"
                to={`/giang-vien/${topic.lecturer?.urlSlug}`}
              >
                {topic.lecturer?.fullName}
              </Link>
            </td>
          </tr>
          <tr>
            <th>Sinh viên thực hiện</th>
            <td>
              <StudentList studentList={topic.students} />
            </td>
          </tr>
          <tr>
            <th>Thuyết minh đề tài</th>
            <td>
              {topic.outlineUrl === null ? (
                <div>Chưa có file thuyết minh</div>
              ) : (
                <Link
                  to={`https://localhost:7129/${topic.outlineUrl}`}
                  className="text-decoration-none text-danger"
                >
                  <FontAwesomeIcon
                    icon={faFileWord}
                    fontSize={50}
                    className="text-danger px-2"
                  />
                  Tải File
                </Link>
              )}
            </td>
          </tr>
          <tr>
            <th>Trạng thái</th>
            <td>
              {topic.status?.name === "Chưa đăng ký" ? (
                <Link to={``} className="text-decoration-none">
                  {topic.status?.name}
                </Link>
              ) : (
                topic.status?.name
              )}
            </td>
          </tr>
          <tr>
            <th>Kết quả</th>
            <td>
              {topic.resultUrl === null ? (
                <div>Chưa có file kết quả</div>
              ) : (
                <Link
                  to={`https://localhost:7129/${topic.resultUrl}`}
                  className="text-decoration-none text-danger"
                >
                  <FontAwesomeIcon
                    icon={faFileWord}
                    fontSize={50}
                    className="text-danger px-2"
                  />
                  Tải File
                </Link>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
      <hr />
      <Button onClick={() => navigate(-1)} className="btn-danger white-text">
        Quay lại
      </Button>
    </>
  );
};

export default TopicDetails;
