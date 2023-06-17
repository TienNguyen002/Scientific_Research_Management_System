import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Button } from "bootstrap";
import { Link } from "react-router-dom";
import { getFilter } from "../../../../Services/TopicService";
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  updateKeyword,
  updateDepartmentId,
  updateLecturerId,
  updateStatusId,
  updateMonth,
  updateYear,
} from "../../../../Redux/Topic";

const AdminTopicFilter = () => {
  const topicFilter = useSelector((state) => state.topicFilter),
    dispatch = useDispatch(),
    [filter, setFilter] = useState({
      departmentList: [],
      lecturerList: [],
      statusList: [],
      monthList: [],
    });

  const handleReset = (e) => {
    dispatch(reset());
  };

  useEffect(() => {
    getFilter().then((data) => {
      if (data) {
        setFilter({
          departmentList: data.departmentList,
          lecturerList: data.lecturerList,
          statusList: data.statusList,
          monthList: data.monthList,
        });
      } else {
        setFilter({
          departmentList: [],
          lecturerList: [],
          statusList: [],
          monthList: [],
        });
      }
    });
  }, []);

  return (
    <Form
      method="get"
      onReset={handleReset}
      className="row gy-2 gx-3 align-items-center p-2"
    >
      <Form.Group className="col-auto">
        <Form.Label className="visually-hidden">Keyword</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập từ khóa..."
          name="keyword"
          value={topicFilter.keyword}
          onChange={(e) => dispatch(updateKeyword(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="col-auto">
        <Form.Label className="visually-hidden">DepartmentId</Form.Label>
        <Form.Select
          name="departmentId"
          value={topicFilter.departmentId}
          onChange={(e) => dispatch(updateDepartmentId(e.target.value))}
          title="Department Id"
        >
          <option value="">-- Lọc theo khoa --</option>
          {filter.departmentList.length > 0 &&
            filter.departmentList.map((item, index) => (
              <option key={index} value={item.value}>
                {item.text}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="col-auto">
        <Form.Label className="visually-hidden">LecturerId</Form.Label>
        <Form.Select
          name="lecturerId"
          value={topicFilter.lecturerId}
          onChange={(e) => dispatch(updateLecturerId(e.target.value))}
          title="Lecturer Id"
        >
          <option value="">-- Lọc theo giảng viên --</option>
          {filter.lecturerList.length > 0 &&
            filter.lecturerList.map((item, index) => (
              <option key={index} value={item.value}>
                {item.text}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="col-auto">
        <Form.Label className="visually-hidden">StatusId</Form.Label>
        <Form.Select
          name="statusId"
          value={topicFilter.statusId}
          onChange={(e) => dispatch(updateStatusId(e.target.value))}
          title="Status Id"
        >
          <option value="">-- Lọc theo trạng thái --</option>
          {filter.statusList.length > 0 &&
            filter.statusList.map((item, index) => (
              <option key={index} value={item.value}>
                {item.text}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="col-auto">
        <Form.Label className="visually-hidden">Year</Form.Label>
        <Form.Control
          type="number"
          placeholder="Lọc theo năm đăng ký..."
          name="year"
          value={topicFilter.year}
          max={topicFilter.year}
          onChange={(e) => dispatch(updateYear(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="col-auto">
        <Form.Label className="visually-hidden">Month</Form.Label>
        <Form.Select
          name="month"
          value={topicFilter.month}
          onChange={(e) => dispatch(updateMonth(e.target.value))}
          title="Month"
        >
          <option value="">-- Lọc theo tháng đăng ký --</option>
          {filter.monthList.length > 0 &&
            filter.monthList.map((item, index) => (
              <option key={index} value={item.value}>
                {item.text}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
    </Form>
  );
};

export default AdminTopicFilter;
