import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getDoneTopicsFilter, increaseView } from "../../Services/TopicService";
import { Link } from "react-router-dom";
import "./style/user.scss";
import StudentList from "../Shared/StudentList";
import format from "date-fns/format";
import TopicFilterSearch from "../../Components/Shared/Filter/Topic/TopicFilterSearch";
import Loading from "../../Components/Shared/Loading";
import { useSelector } from "react-redux";

const ListTopic = () => {
  const [topicsList, setTopicsList] = useState([]),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    topicFilter = useSelector((state) => state.topicFilter);

  let p = 1,
    ps = 11;
  useEffect(() => {
    getDoneTopicsFilter(
      topicFilter.keyword,
      topicFilter.departmentId,
      ps,
      p
    ).then((data) => {
      if (data) {
        setTopicsList(data.items);
      } else setTopicsList([]);
      setIsVisibleLoading(false);
    });
  }, [topicFilter, ps, p]);

  return (
    <>
      <h1 className="topics">Danh sách kết quả nghiên cứu</h1>
      <TopicFilterSearch />
      {isVisibleLoading ? (
        <Loading />
      ) : (
        <Table striped responsive bordered className="small-table">
          <thead className="table text-center">
            <tr className="table-title">
              <th className="w-25">Tên đề tài</th>
              <th width="200px">Mô tả</th>
              <th>Khoa</th>
              <th>Giảng viên</th>
              <th>Sinh viên thực hiện</th>
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
                    <Link
                      className="table-content"
                      to={`/khoa/${item.department.urlSlug}`}
                    >
                      {item.department.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="table-content"
                      to={`/giang-vien/${item.lecturer.urlSlug}`}
                    >
                      {item.lecturer.fullName}
                    </Link>
                  </td>
                  <td className="table-content">
                    <StudentList studentList={item.students} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <h4>Không tìm thấy khóa học nào</h4>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ListTopic;
