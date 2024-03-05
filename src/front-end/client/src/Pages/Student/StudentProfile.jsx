import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { getStudentBySlug, updateStudent, getFilter } from "../../Services/StudentService";
import { useSnackbar } from "notistack";
import { isEmptyOrSpaces } from "../../Utils/Utils";
import "./style/student-page.scss"

const StudentProfile = () => {
  const initialState = {
      slug: "",
      studentId: "",
      fullName: "",
      email: "",
      doB: "",
      phone: "",
      class: "",
      year: "",
      address: "",
      imageUrl: "",
      departmentId: 0,
    },
    [student, setStudent] = useState(initialState),
    [filter, setFilter] = useState({
      departmentList: [],
    }),
    { enqueueSnackbar } = useSnackbar(),
    [validated, setValidated] = useState(false);

  let { slug } = useParams();
  slug = slug ?? null;

  useEffect(() => {
    document.title = "Cập nhật thông tin";
    GetStudent();
    async function GetStudent() {
      const data = await getStudentBySlug(slug);
      console.log(data);
      if (data) {
        setStudent(data);
      } else setStudent([]);
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
      data.forEach((x) => console.log(x));
      updateStudent(data).then((data) => {
        if (data) {
          console.log(data);
          enqueueSnackbar("Đã thay đổi thông tin thành công", {
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
          <h3 className="text-success py-3">Thông tin cá nhân</h3>
          <Form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
          >
            <Form.Control type="hidden" name="urlSlug" value={student.urlSlug} />
            {!isEmptyOrSpaces(student.imageUrl) && <div className="row mb-3">
            <Form.Label className="col-sm-2 col-form-label">
                Avatar
            </Form.Label>
                <div className="col-sm-10">
                    <img src={`https://localhost:7129/${student.imageUrl}`} alt={student.fullName} className="avatar-user"/>
                </div>
            </div>}
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
                        onChange={e => setStudent({
                            ...student,
                            imageFile: e.target.files[0]
                        })}/>
                </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                MSSV
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="studentId"
                  title="Student ID"                  
                  value={student.studentId || ""}
                  onChange={(e) =>
                    setStudent({ ...student, studentId: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  MSSV không được bỏ trống
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Họ và tên
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="fullName"
                  title="Full Name"
                  value={student.fullName || ""}
                  onChange={(e) =>
                    setStudent({ ...student, fullName: e.target.value })
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
                  value={student.email || ""}
                  onChange={(e) =>
                    setStudent({ ...student, email: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                    Email không được bỏ trống
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Ngày tháng năm sinh
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="dOB"
                  title="Day Of Birth"
                  value={student.doB}
                  onChange={(e) =>
                    setStudent({ ...student, doB: e.target.value })
                  }
                />
                (Theo định dạng MM/dd/yyyy)
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Số điện thoại
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="phone"
                  title="Phone"
                  value={student.phone}
                  onChange={(e) =>
                    setStudent({ ...student, phone: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Lớp
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="class"
                  title="Class"
                  value={student.class}
                  onChange={(e) =>
                    setStudent({ ...student, class: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Năm học
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="year"
                  title="Year"
                  value={student.year}
                  onChange={(e) =>
                    setStudent({ ...student, year: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Địa chỉ
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="address"
                  title="Address"
                  value={student.address}
                  onChange={(e) =>
                    setStudent({ ...student, address: e.target.value })
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
                  value={student.departmentId || student.department?.id}
                  required
                  onChange={(e) =>
                    setStudent({
                      ...student,
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

export default StudentProfile;
