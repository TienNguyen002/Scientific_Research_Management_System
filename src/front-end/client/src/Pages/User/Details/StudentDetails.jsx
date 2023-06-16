import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isEmptyOrSpaces } from "../../../Utils/Utils";
import { getStudentBySlug } from "../../../Services/StudentService";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import { Button } from "react-bootstrap";
import TopicByStudents from "../Topics/TopicByStudents";
import "../style/user.scss";
import { getTopicsFilter, registerTopic } from "../../../Services/TopicService";
import TopicFilter from "../../../Components/Shared/Filter/Topic/TopicFilter";
import { useSelector } from "react-redux";
import Loading from "../../../Components/Shared/Loading";
import Swal from "sweetalert2";

const StudentDetails = () => {
  const params = useParams(),
  [student, setStudent] = useState([]),
  [topicsList, setTopicsList] = useState([]),
  [isVisibleLoading, setIsVisibleLoading] = useState(true),
  topicFilter = useSelector((state) => state.topicFilter),
  { slug } = params,
  navigate = useNavigate();

  let statusId = 1,
    p = 1,
    ps = 10;

  useEffect(() => {
    document.title = "Chi tiết sinh viên";
    getStudentBySlug(slug).then((data) => {
      window.scroll(0, 0);
      if (data) {
        setStudent(data);
        console.log(data);
      } else setStudent({});
    });
    getTopicsFilter(
      topicFilter.keyword,
      topicFilter.departmentId,
      topicFilter.lecturerId,
      1,
      topicFilter.year,
      topicFilter.month,
      ps,
      p
    ).then((data) => {
      if (data) {
        setTopicsList(data.items);
      } else setTopicsList([]);
      setIsVisibleLoading(false);
    });
  }, [topicFilter, ps, p, slug]);

  const handleRegister = (e, id, modelslug) => {
    registerTopic(id, modelslug);
    window.location.reload(false);
  }
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
        <Tab eventKey="dang-ky-de-tai" title="Đăng ký đề tài">
        <TopicFilter />
      {isVisibleLoading ? (
        <Loading />
      ) : (
        <Table striped responsive bordered>
          <thead className="table text-center">
            <tr className="table-title">
              <th className="w-25">Tên đề tài</th>
              <th width="200px">Mô tả</th>
              <th className="width">Ngày thực hiện</th>
              <th className="width">Ngày nghiệm thu</th>
              <th className="width">Số người thực hiện</th>
              <th>Khoa</th>
              <th>Giảng viên</th>
              <th>Trạng thái</th>
              <th>Đăng ký đề tài</th>
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
                      {item.description.substring(0, 50)}...
                    </p>
                  </td>
                  <td>
                    {format(new Date(item.registrationDate), "dd/MM/yyyy")}
                  </td>
                  <td>{format(new Date(item.endDate), "dd/MM/yyyy")}</td>
                  <td>{item.studentNumbers}</td>
                  <td>{item.department.name}</td>
                  <td>
                    {item.lecturer?.fullName
                      ? item.lecturer?.fullName
                      : "Chưa có giảng viên hướng dẫn"}
                  </td>
                  <td>{item.status.name}</td>
                  <td>
                    <Button type="submit" onClick={(e) => handleRegister(e, item.id, slug )}>Đăng ký đề tài</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>
                  <h4>Không còn đề tài chưa đăng ký</h4>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
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
