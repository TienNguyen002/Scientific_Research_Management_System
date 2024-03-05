import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addLecturer,
  getFilter,
} from "../../../Services/LecturerService";
import { Button, Form } from "react-bootstrap";
import { useSnackbar } from "notistack";

const LecturerAddAdmin = () => {
  const initialState = {
      fullName: "",
      email: "",
      password: "",
      departmentId: 0,
    },
    [lecturer, setLecturer] = useState(initialState),
    [filter, setFilter] = useState({
      departmentList: [],
    }),
    navigate = useNavigate(),
    { enqueueSnackbar } = useSnackbar(),
    [validated, setValidated] = useState(false);

  useEffect(() => {
    document.title = "Cập nhật giảng viên";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      let data = new FormData(e.target);
      data.forEach((x) => console.log(x));
      addLecturer(data).then((data) => {
        if (data) {
          console.log(data);
          enqueueSnackbar("Thêm giảng viên thành công", {
            variant: "success",
            autoHideDuration: 2000,
          });
          navigate(`/admin/giang-vien`)
        } else {
          enqueueSnackbar("Đã xảy ra lỗi khi thêm", {
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
          <h3 className="text-success py-3">Thêm giảng viên</h3>
          <Form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
          >
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Họ và tên
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="fullName"
                  title="Full Name"
                  required
                  onChange={(e) =>
                    setLecturer({ ...lecturer, fullName: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Họ và tên không được bỏ trống
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">Email</Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="email"
                  name="email"
                  title="Email"
                  required
                  onChange={(e) =>
                    setLecturer({ ...lecturer, email: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Email không được bỏ trống hoặc sai định dạng
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Mật khẩu
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="password"
                  name="password"
                  title="Password"
                  onChange={(e) =>
                    setLecturer({ ...lecturer, password: e.target.value })
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
                  value={lecturer.departmentId || lecturer.department?.id}
                  required
                  onChange={(e) =>
                    setLecturer({
                      ...lecturer,
                      departmentId: e.target.value,
                    })
                  }
                >
                  <option value="">-- Chọn khoa --</option>
                  {filter.departmentList.length > 0 &&
                    filter.departmentList.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.text}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Khoa không được bỏ trống.
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="text-center">
              <Button variant="success" type="submit">
                Thêm giảng viên
              </Button>
              <Link to="/admin/giang-vien" className="btn btn-danger ms-2">
                Hủy và quay lại
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default LecturerAddAdmin;
