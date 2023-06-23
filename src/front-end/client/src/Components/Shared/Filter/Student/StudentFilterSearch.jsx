import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  updateKeyword,
} from "../../../../Redux/Student";

const FilterSearch = () => {
  const studentFilter = useSelector(state => state.studentFilter),
      dispatch = useDispatch();

  const handleReset = (e) => {
    dispatch(reset());
  };

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
          value={studentFilter.keyword}
          onChange={(e) => dispatch(updateKeyword(e.target.value))}
        />
      </Form.Group>
    </Form>
  );
};

export default FilterSearch;
