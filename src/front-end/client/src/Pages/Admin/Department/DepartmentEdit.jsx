import React, { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getDepartmentById,
  addDepartment,
  updateDepartment,
} from "../../../Services/DepartmentService";
import { isEmptyOrSpaces, isInteger } from "../../../Utils/Utils";
import { Button, Form } from "react-bootstrap";

const DepartmentEditAdmin = () => {
  const initialState = {
      name: "",
    },
    params = useParams(),
    [department, setDepartment] = useState(initialState);

  let { id } = params;
  id = id ?? 0;

  useEffect(() => {
    GetDepartment();
    async function GetDepartment(){
        const data = await getDepartmentById(id);
        if(data){
            setDepartment(data);
        } else setDepartment([]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: department.name,
    };

    if (id > 0) {
      Update(data);
    } else {
      Add(data);
    }

    async function Update(data) {
      const responsive = await updateDepartment(id, data);
      if (responsive) {
        alert("Cập nhật thành công");
      } else {
        alert("Cập nhật thất bại");
      }
    }

    async function Add(data) {
      const responsive = await addDepartment(data);
      if (responsive) {
        alert("Cập nhật thành công");
      } else {
        alert("Cập nhật thất bại");
      }
    }
  };

  return (
    <>
      <div className="col-10">
        <div className="department-wrapper">
          <h3 className="text-success py-3">Thêm/cập nhật phòng khoa</h3>
          <Form
            method={isInteger(id) ? "put" : "post"}
            encType="multipart/form-data"
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
