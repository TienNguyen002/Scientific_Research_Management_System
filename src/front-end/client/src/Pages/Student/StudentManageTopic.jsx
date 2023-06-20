import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getTopicsByStudentSlug } from "../../Services/TopicService";
import { Link, useParams } from "react-router-dom";
import format from "date-fns/format";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import ShowMoreText from "../../Components/Shared/ShowMoreText";

const StudentManageTopic = () => {
  const [topicsList, setTopicsList] = useState([]);
  const params = useParams();
  const { slug } = params;

  let p = 1,
    ps = 5;
  useEffect(
    (ps, p) => {
      document.title = "Quản lý đề tài";
      getTopicsByStudentSlug(slug).then((data) => {
        if (data) {
          setTopicsList(data.items);
        } else setTopicsList([]);
      });
    },
    [ps, p]
  );

  return (
    <>
      <h1>Danh sách đề tài đã đăng ký</h1>
      <Table striped responsive bordered>
        <thead className="table text-center">
          <tr className="table-title">
            <th className="w-25">Tên đề tài</th>
            <th width="200px">Mô tả</th>
            <th>Ngày đăng ký</th>
            <th>Khoa</th>
            <th>Giảng viên</th>
            <th>Đăng thuyết minh đề tài</th>
            <th>Đăng kết quả đề tài</th>
          </tr>
        </thead>
        <tbody className="table-content">
          {topicsList.length > 0 ? (
            topicsList.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link
                    className="table-content"
                    to={`/de-tai/${item.urlSlug}`}
                  >
                    {item.title}
                  </Link>
                </td>
                <td>
                  <p className="shortDescription">
                    <ShowMoreText text={item.description} maxLength={50} />
                  </p>
                </td>
                <td>{format(new Date(item.registrationDate), "dd/MM/yyyy")}</td>
                <td>{item.department.name}</td>
                <td>
                  <Link
                    className="table-content"
                    to={`/giang-vien/${item.lecturer?.urlSlug}`}
                  >
                    {item.lecturer?.fullName}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/sinh-vien/${slug}/dang-thuyet-minh/${item.urlSlug}`}
                  >
                    <FontAwesomeIcon icon={faUpload} className="text-primary" />
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/sinh-vien/${slug}/dang-ket-qua/${item.urlSlug}`}
                  >
                    <FontAwesomeIcon icon={faUpload} className="text-success" />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>
                <h4>Không tìm thấy đề tài nào</h4>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default StudentManageTopic;
