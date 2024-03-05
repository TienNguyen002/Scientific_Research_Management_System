import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useSnackbar } from "notistack";
import { registerAccount } from "../../Services/StudentService";

const RegisterPage = () => {
  const initialState = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    [error, setError] = useState(),
    [student, setStudent] = useState(initialState),
    navigate = useNavigate(),
    { enqueueSnackbar } = useSnackbar(),
    [validated, setValidated] = useState(false);

  useEffect(() => {
    document.title = "Đăng ký tài khoản";
  }, []);

  const handleSubmit = (e) => {
    setError(localStorage.getItem("EData"));
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      let data = new FormData(e.target);
      data.forEach((x) => console.log(x));
      registerAccount(data).then((data) => {
        if (data) {
          console.log(data);
          enqueueSnackbar("Đăng ký thành công", {
            variant: "success",
            autoHideDuration: 2000,
          });
          navigate(`/dang-nhap`)
        } else {
          enqueueSnackbar("Lỗi: " + error, {
            variant: "error",
            autoHideDuration: 2000,
          });
        }
      });
    }
  };

  return (
    <div className="login">
      <div className="login-mainpage">
        <h1 className="login-header">Đăng ký</h1>
        <div className="card-body">
          <Form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
          >
            <div className="row mb-3">
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="fullName"
                  title="Full Name"
                  required
                  placeholder="Họ và tên"
                  onChange={(e) =>
                    setStudent({ ...student, fullName: e.target.value })
                  }
                  className="login-form"
                />
                <Form.Control.Feedback type="invalid">
                  Họ và tên không được bỏ trống
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-10">
                <Form.Control
                  type="email"
                  name="email"
                  title="Email"
                  required
                  placeholder="Email"
                  onChange={(e) =>
                    setStudent({ ...student, email: e.target.value })
                  }
                  className="login-form"
                />
                <Form.Control.Feedback type="invalid">
                  Email không được bỏ trống hoặc sai định dạng
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-10">
                <Form.Control
                  type="password"
                  name="password"
                  title="Password"
                  required
                  placeholder="Mật khẩu"
                  onChange={(e) =>
                    setStudent({ ...student, password: e.target.value })
                  }
                  className="login-form"
                />
                <Form.Control.Feedback type="invalid">
                  Mật khẩu không được bỏ trống
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-10">
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  title="Confirm Password"
                  required
                  placeholder="Mật khẩu xác nhận"
                  onChange={(e) =>
                    setStudent({ ...student, confirmPassword: e.target.value })
                  }
                  className="login-form"
                />
                <Form.Control.Feedback type="invalid">
                  Mật khẩu xác nhận không được bỏ trống
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="text-center">
              <Button variant="success" type="submit">
                Đăng ký
              </Button>
            </div>
          </Form>
        </div>

        <div className="login-member">
          Đã có tài khoản?
          <Link to={`/dang-nhap`} className="text-decoration-none">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
