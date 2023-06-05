import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isEmptyOrSpaces } from "../../../Utils/Utils";
import { getTopicBySlug } from "../../../Services/TopicService";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import { Button } from "react-bootstrap";
import StudentList from "../../../Components/Shared/StudentList";

const TopicDetails = () => {
  const params = useParams();
  const [topic, setTopic] = useState([]);
  const { slug } = params;

  useEffect(() => {
    document.title = "Chi tiết đề tài";
    getTopicBySlug(slug).then((data) => {
      window.scroll(0, 0);
      if (data) {
        setTopic(data);
      } else setTopic({});
    });
  }, [slug]);

  return (
    <>
      <h1>Chi tiết đề tài</h1>
      <Table striped responsive bordered>
        <tbody className="table-content">
          <tr></tr>
          <tr>
            <th>Tiêu đề</th>
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
            <th>Số sinh viên thực hiện</th>
            <td>{topic.studentNumbers}</td>
          </tr>
          <tr>
            <th>Giá tiền ước tính</th>
            <td>{topic.price}</td>
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
            <th>Đề cương</th>
            <td>{topic.outlineUrl}</td>
          </tr>
          <tr>
            <th>Điểm</th>
            <td>{topic.point}</td>
          </tr>
          <tr>
            <th>Trạng thái</th>
            <td>{topic.status?.name}</td>
          </tr>
          <tr>
            <th>Tiến trình</th>
            <td>{topic.process?.name}</td>
          </tr>
          <tr>
            <th>Kết quả</th>
            <td>{topic.resultUrl}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TopicDetails;
