import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getTopicsFilter, increaseView } from "../../Services/TopicService";
import { Link } from "react-router-dom";
import "./style/user.scss";
import StudentList from "../Shared/StudentList";
import format from "date-fns/format";
import TopicFilterSearch from "../../Components/Shared/Filter/Topic/TopicFilterSearch";
import Loading from "../../Components/Shared/Loading";
import { useSelector } from "react-redux";
import ShowMoreText from "../Shared/ShowMoreText";
import Pager from "../../Components/Shared/Pager";

const ListTopic = () => {
  const [topicsList, setTopicsList] = useState([
      {
        items: [],
        metadata: [],
      },
    ]),
    [metadata, setMetadata] = useState({}),
    [pageNumber, setPageNumber] = useState(1),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    topicFilter = useSelector((state) => state.topicFilter);

  let p = 1,
    ps = 5;
  function updatePageNumber(inc) {
    setPageNumber((curentVal) => curentVal + inc);
  }

  useEffect(() => {
    getTopicsFilter(
      topicFilter.keyword,
      topicFilter.departmentId,
      topicFilter.lecturerId,
      3,
      topicFilter.year,
      topicFilter.month,
      ps,
      pageNumber
    ).then((data) => {
      if (data) {
        setData(data);
      } else setTopicsList([]);
      setIsVisibleLoading(false);
    });

    function setData(props) {
      setTopicsList(props.items);
      setMetadata(props.metadata);
    }
  }, [topicFilter, ps, pageNumber]);

  return (
    <>
      <h1 className="topics">Danh sách kết quả nghiên cứu đã nghiệm thu</h1>
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
                    <p className="sdescription">
                      <ShowMoreText text={item.description} maxLength={50} />
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
                <td colSpan={5}>
                  <h4>Không tìm thấy đề tài nào</h4>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
      <Pager metadata={metadata} onPageChange={updatePageNumber} />
    </>
  );
};

export default ListTopic;
