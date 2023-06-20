import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getLecturerById,
  updateLecturer,
  getFilter,
} from "../../../Services/LecturerService";
import { isEmptyOrSpaces, isInteger } from "../../../Utils/Utils";
import { Button, Form } from "react-bootstrap";
import { useSnackbar } from "notistack";

const LecturerEditAdmin = () => {
  const initialState = {
      id: 0,
      fullName: "",
      email: "",
      password: "",
      qualification: "",
      doB: "",
      imageUrl: "",
      departmentId: 0,
    },
    [lecturer, setLecturer] = useState(initialState),
    [filter, setFilter] = useState({
      departmentList: [],
    }),
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
      updateLecturer(data).then((data) => {
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
          <h3 className="text-success py-3">Thêm/cập nhật giảng viên</h3>
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
                  value={lecturer.password || ""}
                  onChange={(e) =>
                    setLecturer({ ...lecturer, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Cấp bậc
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="qualification"
                  title="Qualification"
                  value={lecturer.qualification || ""}
                  onChange={(e) =>
                    setLecturer({ ...lecturer, qualification: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Ngày tháng năm sinh
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="doB"
                  title="Day Of Birth"
                  value={lecturer.doB || ""}
                  onChange={(e) =>
                    setLecturer({ ...lecturer, doB: e.target.value })
                  }
                />
              </div>
            </div>
            {!isEmptyOrSpaces(lecturer.imageUrl) && (
              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  Avatar
                </Form.Label>
                <div className="col-sm-10">
                  {!isEmptyOrSpaces(lecturer.imageUrl) ? (
                    <p></p>
                  ) : (
                    <img
                      src={`https://localhost:7129/${lecturer.imageUrl}`}
                      alt={lecturer.fullName}
                      className="img-thumbnail"
                    />
                  )}
                </div>
              </div>
            )}
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Chọn hình ảnh
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  title="Image File"
                  onChange={(e) =>
                    setLecturer({
                      ...lecturer,
                      imageFile: e.target.files[0],
                    })
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
                Lưu các thay đổi
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
export default LecturerEditAdmin;
