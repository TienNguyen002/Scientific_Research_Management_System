import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useSnackbar } from "notistack";
import { loginAccount } from "../../Services/StudentService";

const LoginPage = () => {
  const initialState = {
      email: "",
      password: "",
    },
    [student, setStudent] = useState(initialState),
    { enqueueSnackbar } = useSnackbar(),
    [validated, setValidated] = useState(false),
    navigate = useNavigate();

  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      let data = new FormData(e.target);
      data.forEach((x) => console.log(x));
      loginAccount(data).then((data) => {
        if (data) {
          console.log(data);
          enqueueSnackbar("Đăng nhập thành công", {
            variant: "success",
            autoHideDuration: 2000,
          });
          navigate(`/`);
        } else {
          enqueueSnackbar("Đã xảy ra lỗi khi đăng nhập ", {
            variant: "error",
            autoHideDuration: 2000,
          });
        }
      });
    }
  };

  return (
    <div className="login">
      <div className="login-mainp">
        <h1 className="login-header">Đăng nhập</h1>
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

            <div className="text-center">
              <Button variant="success" type="submit">
                Đăng nhập
              </Button>
            </div>
          </Form>
        </div>
        <div className="login-member">
          Chưa có tài khoản?{" "}
          <Link to={`/dang-ky`} className="text-decoration-none">
            Đăng ký ngay
          </Link>
        </div>
        <div className="login-member">
          <Link to={`/dang-nhap-admin`} className="text-decoration-none">
            ADMIN
          </Link>
        </div>
        <div className="login-member">
          <Link to={`/`} className="text-decoration-none">
            QUAY LẠI
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
