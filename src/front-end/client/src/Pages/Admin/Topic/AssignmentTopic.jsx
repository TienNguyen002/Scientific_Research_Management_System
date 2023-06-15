import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getTopicById,
  addOrUpdateTopic,
  getFilter,
} from "../../../Services/TopicService";
import { isEmptyOrSpaces, isInteger } from "../../../Utils/Utils";
import { Button, Form } from "react-bootstrap";
import { useSnackbar } from "notistack";

const AssignmentTopic = () => {
  const [topic, setTopic] = useState([]),
    [filter, setFilter] = useState({
      lecturerList: [],
    }),
    navigate = useNavigate(),
    { enqueueSnackbar } = useSnackbar(),
    [validated, setValidated] = useState(false);

  let { id } = useParams();
  id = id ?? 0;

  useEffect(() => {
    document.title = "Phân công đề tài";
    GetTopic();
    async function GetTopic() {
      const data = await getTopicById(id);
      if (data) {
        setTopic(data);
      } else setTopic([]);
    }

    getFilter().then((data) => {
      if (data) {
        setFilter({
          lecturerList: data.lecturerList,
        });
      } else {
        setFilter({
          lecturerList: [],
        });
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      let data = new FormData(e.target);
      addOrUpdateTopic(data).then((data) => {
        if (data) {
          enqueueSnackbar("Phân công thành công", {
            variant: "success",
            autoHideDuration: 2000,
          });
          navigate(`/admin/de-tai`);
        } else {
          enqueueSnackbar("Đã xảy ra lỗi khi phân công", {
            variant: "error",
            autoHideDuration: 2000,
          });
        }
      });
    }
  };

  return (
    <>
      <div className="col-10">
        <div className="department-wrapper">
          <h3 className="text-success py-3">Phân công đề tài</h3>
          <Form
            method="put"
            encType=""
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
          >
            <Form.Control type="hidden" name="id" value={topic.id} />
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Tên đề tài
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="title"
                  title="Title"
                  disabled
                  value={topic.title}
                />
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">Mô tả</Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  as="textarea"
                  rows={7}
                  type="text"
                  name="description"
                  title="Description"
                  disabled
                  value={topic.description}
                />
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Ghi chú
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  as="textarea"
                  rows={5}
                  type="text"
                  name="note"
                  title="Note"
                  disabled
                  value={topic.note}
                />
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Ngày nghiệm thu
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="endDate"
                  title="End Date"
                  disabled
                  value={topic.endDate}
                />
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Số sinh viên thực hiện
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="studentNumbers"
                  title="Student Numbers"
                  disabled
                  value={topic.studentNumbers}
                />
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Kinh phí
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="price"
                  title="Price"
                  disabled
                  value={topic.price}
                />
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">Khoa</Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  name="departmentId"
                  title="department Id"
                  disabled
                  value={topic.department?.name}
                ></Form.Control>
              </div>
            </div>
            <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Giảng viên
                </Form.Label>
            <div className="col-sm-10">
              <Form.Control
                name="lecturerId"
                title="lecturer Id"
                value={topic.lecturer?.id}
                required
                onChange={(e) =>
                  setTopic({
                    ...topic,
                    lecturerId: e.target.value,
                  })
                }
              >
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Vui lòng chọn giảng viên
              </Form.Control.Feedback>
            </div>
            </div>
            <div className="text-center">
              <Button variant="success" type="submit">
                Phân công
              </Button>
              <Link to="/admin/de-tai" className="btn btn-danger ms-2">
                Hủy và quay lại
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default AssignmentTopic;
