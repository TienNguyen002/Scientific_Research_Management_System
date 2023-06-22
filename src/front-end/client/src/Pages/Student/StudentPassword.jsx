import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { getStudentBySlug, changePassword } from "../../Services/StudentService";
import { useSnackbar } from "notistack";
import format from "date-fns/format";
import { isEmptyOrSpaces } from "../../Utils/Utils";

const StudentPassword = () => {
  const initialState = {
      slug: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    [student, setStudent] = useState(initialState),
    navigate = useNavigate(),
    { enqueueSnackbar } = useSnackbar(),
    [validated, setValidated] = useState(false);

  let { slug } = useParams();
  slug = slug ?? null;

  useEffect(() => {
    document.title = "Đổi mật khẩu";
    GetStudent();
    async function GetStudent() {
      const data = await getStudentBySlug(slug);
      console.log(data);
      if (data) {
        setStudent(data);
      } else setStudent([]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      let data = new FormData(e.target);
      data.forEach((x) => console.log(x));
      changePassword(data).then((data) => {
        if (data) {
          console.log(data);
          enqueueSnackbar("Đã thay đổi mật khẩu thành công", {
            variant: "success",
            autoHideDuration: 2000,
          });
          window.location.reload(false);
        } else {
          enqueueSnackbar("Đã xảy ra lỗi khi thay đổi", {
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
          <h3 className="text-success py-3">Đổi mật khẩu</h3>
          <Form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
          >
            <Form.Control type="hidden" name="urlSlug" value={student.urlSlug} />
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">Mật khẩu cũ</Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="password"
                  name="password"
                  title="Password"
                  required
                />
                <Form.Control.Feedback type="invalid">
                    Mật khẩu không được bỏ trống
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">Mật khẩu mới</Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="password"
                  name="newPassword"
                  title="New Password"
                  required
                />
                <Form.Control.Feedback type="invalid">
                    Mật khẩu mới không được bỏ trống
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">Xác nhận mật khẩu</Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  title="Confirm Password"
                  required
                />
                <Form.Control.Feedback type="invalid">
                    Mật khẩu xác nhận không được bỏ trống
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="text-center">
              <Button variant="success" type="submit">
                Cập nhật thông tin
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default StudentPassword;
