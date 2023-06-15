import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Button } from "bootstrap";
import { Link } from "react-router-dom";
import { getFeedbackFilter } from "../../../../Services/AdminService"
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  updateKeyword,
  updateMonth,
  updateYear,
} from "../../../../Redux/Feedback";

const FeedbackFilter = () => {
  const feedbackFilter = useSelector((state) => state.feedbackFilter),
    dispatch = useDispatch(),
    [filter, setFilter] = useState({
      monthList: [],
    });

  const handleReset = (e) => {
    dispatch(reset());
  };

  useEffect(() => {
    getFeedbackFilter().then((data) => {
      if (data) {
        setFilter({
          monthList: data.monthList,
        });
      } else {
        setFilter({
          monthList: [],
        });
      }
    })
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
          value={feedbackFilter.keyword}
          onChange={(e) => dispatch(updateKeyword(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="col-auto">
        <Form.Label className="visually-hidden">Year</Form.Label>
        <Form.Control
          type="number"
          placeholder="Lọc theo năm đăng ký..."
          name="year"
          value={feedbackFilter.year}
          max={feedbackFilter.year}
          onChange={(e) => dispatch(updateYear(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="col-auto">
        <Form.Label className="visually-hidden">Month</Form.Label>
        <Form.Select
          name="month"
          value={feedbackFilter.month}
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

export default FeedbackFilter;
