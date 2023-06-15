import React, { useEffect, useState } from "react";
import {
  getStudentsFilter,
  deleteStudent,
} from "../../../Services/StudentService";
import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../style/admin-page.scss";
import StudentFilter from "../../../Components/Shared/Filter/Student/StudentFilter";
import Loading from "../../../Components/Shared/Loading";
import { useSelector } from "react-redux";
import { IconButton, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";

const ManageStudent = () => {
  const [studentsList, setStudentsList] = useState([]),
    [reRender, setRender] = useState(false),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    studentFilter = useSelector((state) => state.studentFilter);

  let { id } = useParams,
    ps = 10,
    p = 1;

  useEffect(() => {
    document.title = "Danh sách Sinh viên";
    getStudentsFilter(
      studentFilter.keyword,
      studentFilter.departmentId,
      ps,
      p
    ).then((data) => {
      if (data) {
        setStudentsList(data.items);
      } else setStudentsList([]);
      setIsVisibleLoading(false);
    });
  }, [studentFilter, ps, p, reRender]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    RemoveStudent(id);
    async function RemoveStudent(id) {
      Swal.fire({
        title: "Bạn có muốn xóa sinh viên này không?",
        text: "Sau khi xóa sẽ không thể khôi phục!",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "XÓA"
      }).then((result) => {
        if(result.isConfirmed){
          deleteStudent(id);
          setRender(true);
          Swal.fire({
            title: "Xóa thành công",
            icon: "success",
          }
          )
        }
      })
    }
  };

  return (
    <>
      <div className="department">
        <h1 className="text danger text-center department">Quản lý Sinh viên</h1>
      </div>
      <div>
        <div className="row department-item">
          <div className="item-filter-admin">
            <StudentFilter />
          </div>
          {isVisibleLoading ? (
            <Loading />
          ) : (
            <Table striped responsive bordered>
              <thead>
                <tr>
                  <th>Họ và tên</th>
                  <th>Email</th>
                  <th>Khoa</th>
                  <th>Xoá</th>
                </tr>
              </thead>
              <tbody>
                {studentsList.length > 0 ? (
                  studentsList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.fullName}</td>
                      <td>{item.email}</td>
                      <td>{item.department?.name}</td>
                      <td className="text-center">
                        <div
                          onClick={(e) => handleDelete(e, item.id)}
                        >
                          <DeleteIcon color="secondary" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <h4 className="text-danger text-center">
                        Không tìm thấy sinh viên nào
                      </h4>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageStudent;
