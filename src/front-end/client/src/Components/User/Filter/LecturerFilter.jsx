import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Button } from "bootstrap";
import { Link } from "react-router-dom";
import { getFilter } from "../../../Services/LecturerService";
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  updateKeyword,
  updateDepartmentId,
} from "../../../Redux/Lecturer";

const LecturerFilter = () => {
  const lecturerFilter = useSelector((state) => state.lecturerFilter),
    dispatch = useDispatch(),
    [filter, setFilter] = useState({
      departmentList: [],
    });

  const handleReset = (e) => {
    dispatch(reset());
  };

  useEffect(() => {
    getFilter().then((data) => {
      if (data) {
        setFilter({
          departmentList: data.departmentList,
        });
      } else {
        setFilter({
          departmentList: [],
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
          value={lecturerFilter.keyword}
          onChange={(e) => dispatch(updateKeyword(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="col-auto">
        <Form.Label className="visually-hidden">DepartmentId</Form.Label>
        <Form.Select
          name="departmentId"
          value={lecturerFilter.departmentId}
          onChange={(e) => dispatch(updateDepartmentId(e.target.value))}
          title="Department Id"
        >
          <option value="">-- Chọn khoa --</option>
          {filter.departmentList.length > 0 &&
            filter.departmentList.map((item, index) => (
              <option key={index} value={item.value}>
                {item.text}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="col-auto">
        
      </Form.Group>
    </Form>
  );
};

export default LecturerFilter;
