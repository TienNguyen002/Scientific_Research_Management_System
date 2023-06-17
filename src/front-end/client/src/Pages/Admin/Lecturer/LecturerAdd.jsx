import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getLecturerById,
  addLecturer,
} from "../../../Services/LecturerService";
import { isEmptyOrSpaces, isInteger } from "../../../Utils/Utils";
import { Button, Form } from "react-bootstrap";
import { useSnackbar } from "notistack";

const LecturerAddAdmin = () => {
  const initialState = {
    id: 0,
    fullName: "",
    email: "",
    password: "",
  },
    [lecturer, setLecturer] = useState(initialState),
    navigate = useNavigate(),
    { enqueueSnackbar } = useSnackbar(),
    [validated, setValidated] = useState(false);

  let { id } = useParams();
  id = id ?? 0;

  useEffect(() => {
    document.title = "Cập nhật giảng viên";
    GetLecturer();
    async function GetLecturer() {
      const data = await getLecturerById(id);
      console.log(data);
      if (data) {
        setLecturer(data);
      } else setLecturer([]);
    }
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
      addLecturer(data).then((data) => {
        if (data) {
          console.log(data);
          enqueueSnackbar("Đã lưu thành công", {
            variant: "success",
            autoHideDuration: 2000,
          });
          navigate(`/admin/giang-vien`);
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
          <h3 className="text-success py-3">Thêm giảng viên</h3>
          <Form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
          >
            <Form.Control type="hidden" name="id" value={lecturer.id} />
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
                  value={lecturer.fullName || ""}
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
                  type="text"
                  name="email"
                  title="Email"
                  required
                  value={lecturer.email || ""}
                  onChange={(e) =>
                    setLecturer({ ...lecturer, email: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Email không được bỏ trống
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
                  required
                  value={lecturer.password || ""}
                  onChange={(e) => setLecturer({ ...lecturer, password: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  Mật khẩu không được bỏ trống
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="text-center">
              <Button variant="success" type="submit">
                Thêm mới
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
export default LecturerAddAdmin;
