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
import PriceComponent from "../../../Components/Shared/PriceComponent";

const TopicEditAdmin = () => {
  const initialState = {
      id: 0,
      title: "",
      description: "",
      note: "",
      endDate: "",
      studentNumbers: "",
      price: "",
      departmentId: 0,
      statusId: 0,
    },
    [topic, setTopic] = useState(initialState),
    [filter, setFilter] = useState({
      departmentList: [],
      statusList: [],
    }),
    navigate = useNavigate(),
    { enqueueSnackbar } = useSnackbar(),
    [validated, setValidated] = useState(false);

  let { id } = useParams();
  id = id ?? 0;

  useEffect(() => {
    document.title = "Thêm / Cập nhật đề tài";
    GetTopic();
    async function GetTopic() {
      const data = await getTopicById(id);
      console.log(data);
      if (data) {
        setTopic(data);
      } else setTopic([]);
    }

    getFilter().then((data) => {
      if (data) {
        setFilter({
          departmentList: data.departmentList,
          statusList: data.statusList,
        });
      } else {
        setFilter({
          departmentList: [],
          statusList: [],
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
      data.forEach((x) => console.log(x))
    ;
      addOrUpdateTopic(data).then((data) => {
        if (data) {
          console.log(data);
          enqueueSnackbar("Đã lưu thành công", {
            variant: "success",
            autoHideDuration: 2000,
          });
          navigate(`/admin/de-tai`);
        } else {
          enqueueSnackbar("Đã xảy ra lỗi khi lưu", {
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
          <h3 className="text-success py-3">Thêm/cập nhật đề tài</h3>
          <Form
            method="post"
            encType="multipart/form-data"
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
                  required
                  value={topic.title || ""}
                  onChange={(e) =>
                    setTopic({ ...topic, title: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Tên đề tài không được bỏ trống
                </Form.Control.Feedback>
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
                  required
                  value={topic.description || ""}
                  onChange={(e) =>
                    setTopic({ ...topic, description: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Mô tả không được bỏ trống
                </Form.Control.Feedback>
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
                  value={topic.note || ""}
                  onChange={(e) => setTopic({ ...topic, note: e.target.value })}
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
                  required
                  value={topic.endDate || ""}
                  onChange={(e) =>
                    setTopic({ ...topic, endDate: e.target.value })
                  }
                />
                (Theo định dạng MM/dd/yyyy)
                <Form.Control.Feedback type="invalid">
                  Ngày nghiệm thu không được bỏ trống
                </Form.Control.Feedback>
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
                  required
                  value={topic.studentNumbers || ""}
                  onChange={(e) =>
                    setTopic({ ...topic, studentNumbers: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Số sinh viên thực hiện không được bỏ trống
                </Form.Control.Feedback>
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
                  value={topic.price || ""}
                  onChange={(e) =>
                    setTopic({ ...topic, price: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">Khoa</Form.Label>
              <div className="col-sm-10">
                <Form.Select
                  name="departmentId"
                  title="Department Id"
                  value={topic.departmentId || topic.department?.id}
                  required
                  onChange={(e) =>
                    setTopic({
                      ...topic,
                      departmentId: e.target.value,
                    })
                  }
                >
                  <option value=''>-- Chọn khoa --</option>
                  {filter.departmentList.length > 0 &&
                  filter.departmentList.map((item, index) => 
                  <option key={index} value={item.value}>{item.text}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Khoa không được bỏ trống.
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">Trạng thái</Form.Label>
              <div className="col-sm-10">
                <Form.Select
                  name="statusId"
                  title="Status Id"
                  value={topic.statusId || topic.status?.id}
                  required
                  onChange={(e) =>
                    setTopic({
                      ...topic,
                      statusId: e.target.value,
                    })
                  }
                >
                  <option value=''>-- Chọn trạng thái --</option>
                  {filter.statusList.length > 0 &&
                  filter.statusList.map((item, index) => 
                  <option key={index} value={item.value}>{item.text}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Trạng thái không được bỏ trống.
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="text-center">
              <Button variant="success" type="submit">
                Lưu các thay đổi
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
export default TopicEditAdmin;
