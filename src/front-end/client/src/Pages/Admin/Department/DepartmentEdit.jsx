import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDepartmentById,
  updateDepartment,
} from "../../../Services/DepartmentService";
import { isEmptyOrSpaces, isInteger } from "../../../Utils/Utils";
import { Button, Form } from "react-bootstrap";
import { useSnackbar } from "notistack";

const DepartmentEditAdmin = () => {
  const initialState = {
      name: "",
    },
    params = useParams(),
    [department, setDepartment] = useState(initialState),
    { enqueueSnackbar, closeSnackbar } = useSnackbar(),
    navigate = useNavigate();;

  let { id } = params;
  id = id ?? 0;

  useEffect(() => {
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
    let data = new FormData(e.target);
    updateDepartment(id, data).then((data) => {
      if (data) {
        enqueueSnackbar("Đã lưu thành công", {
          variant: "success",
        });
        navigate(`/admin/khoa`);
      } else {
        enqueueSnackbar("Đã xảy ra lỗi khi lưu", {
          variant: "error",
        });
      }
    });
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
