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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Pager from "../../../Components/Shared/Pager";

const ManageStudent = () => {
  const [studentsList, setStudentsList] = useState([
      {
        items: [],
        metadata: [],
      },
    ]),
    [reRender, setRender] = useState(false),
    [metadata, setMetadata] = useState({}),
    [pageNumber, setPageNumber] = useState(1),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    studentFilter = useSelector((state) => state.studentFilter);

  let { id } = useParams,
    ps = 5,
    p = 1;
  function updatePageNumber(inc) {
    setPageNumber((curentVal) => curentVal + inc);
  }

  useEffect(() => {
    document.title = "Danh sách Sinh viên";
    getStudentsFilter(
      studentFilter.keyword,
      studentFilter.departmentId,
      ps,
      pageNumber
    ).then((data) => {
      if (data) {
        setData(data);
      } else setStudentsList([]);
      setIsVisibleLoading(false);
    });

    function setData(props) {
      setStudentsList(props.items);
      setMetadata(props.metadata);
    }
  }, [studentFilter, ps, pageNumber, reRender]);

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
        confirmButtonText: "XÓA",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteStudent(id);
          setRender(true);
          window.location.reload(false);
          Swal.fire({
            title: "Xóa thành công",
            icon: "success",
          });
        }
      });
    }
  };

  return (
    <>
      <div className="department">
        <h1 className="text danger text-center department">
          Quản lý Sinh viên
        </h1>
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
                        <div onClick={(e) => handleDelete(e, item.id)}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger"
                          />
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
        <Pager metadata={metadata} onPageChange={updatePageNumber} />
      </div>
    </>
  );
};

export default ManageStudent;
