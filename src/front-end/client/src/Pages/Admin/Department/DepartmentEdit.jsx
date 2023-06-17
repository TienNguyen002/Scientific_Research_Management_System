import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDepartmentById,
  addOrUpdateDepartment,
} from "../../../Services/DepartmentService";
import { isEmptyOrSpaces, isInteger } from "../../../Utils/Utils";
import { Button, Form } from "react-bootstrap";
import { useSnackbar } from "notistack";

const DepartmentEditAdmin = () => {
  const initialState = {
      id: 0,
      name: "",
    },
    [department, setDepartment] = useState(initialState),
    navigate = useNavigate(),
    { enqueueSnackbar } = useSnackbar(),
    [validated, setValidated] = useState(false);

  let { id } = useParams();
  id = id ?? 0;

  useEffect(() => {
    document.title = "Thêm / Cập nhật khoa";
    GetDepartment();
    async function GetDepartment() {
      const data = await getDepartmentById(id);
      if (data) {
        setDepartment(data);
      } else setDepartment([]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      let data = new FormData(e.target);
      addOrUpdateDepartment(data).then((data) => {
        if (data) {
          enqueueSnackbar("Đã lưu thành công", {
            variant: "success",
            autoHideDuration: 2000,
          });
          navigate(`/admin/khoa`);
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
          <h3 className="text-success py-3">Thêm/cập nhật phòng khoa</h3>
          <Form
            method="post"
            encType=""
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
          >
            <Form.Control type="hidden" name="id" value={department.id} />
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Tên khoa
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="name"
                  title="Name"
                  required
                  value={department.name || ""}
                  onChange={(e) =>
                    setDepartment({ ...department, name: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Tên khoa không được bỏ trống
                </Form.Control.Feedback>
              </div>
            </div>

            <div className="text-center">
              <Button variant="success" type="submit">
                Lưu các thay đổi
              </Button>
              <Link to="/admin/khoa" className="btn btn-danger ms-2">
                Hủy và quay lại
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default DepartmentEditAdmin;
