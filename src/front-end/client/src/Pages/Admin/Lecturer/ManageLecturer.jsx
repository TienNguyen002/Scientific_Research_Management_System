import React, { useEffect, useState } from "react";
import {
  getLecturersFilter,
  deleteLecturer,
} from "../../../Services/LecturerService";
import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../style/admin-page.scss";
import LecturerFilter from "../../../Components/Shared/Filter/Lecturer/LecturerFilter";
import Loading from "../../../Components/Shared/Loading";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";


const ManageLecturer = () => {
  const [lecturersList, setLecturersList] = useState([]),
    [reRender, setRender] = useState(false),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    lecturerFilter = useSelector((state) => state.lecturerFilter);

  let { id } = useParams,
    ps = 10,
    p = 1;

  useEffect(() => {
    document.title = "Danh sách Giảng viên";
    getLecturersFilter(
      lecturerFilter.keyword,
      lecturerFilter.departmentId,
      ps,
      p
    ).then((data) => {
      if (data) {
        setLecturersList(data.items);
      } else setLecturersList([]);
      setIsVisibleLoading(false);
    });
  }, [lecturerFilter, ps, p, reRender]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    window.location.reload(false);
    RemoveLecturer(id);
    async function RemoveLecturer(id) {
      Swal.fire({
        title: "Bạn có muốn xóa giảng viên này không?",
        text: "Sau khi xóa sẽ không thể khôi phục!",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "XÓA"
      }).then((result) => {
        if (result.isConfirmed) {
          deleteLecturer(id);
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
        <h1 className="text danger text-center department">Quản lý Giảng viên</h1>
      </div>
      <div>
        <div className="row department-item">
          <div className="item-filter-admin">
            <LecturerFilter />
            <Link className="text-decoration-none" to={`/admin/giang-vien/edit`}>
              <Button>Thêm mới</Button>
            </Link>
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
                  <th>Sửa</th>
                  <th>Xoá</th>
                </tr>
              </thead>
              <tbody>
                {lecturersList.length > 0 ? (
                  lecturersList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.fullName}</td>
                      <td>{item.email}</td>
                      <td>{item.department?.name}</td>
                      <td className="text-center">
                        <Link to={`/admin/giang-vien/edit/${item.id}`}>
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                      </td>
                      <td className="text-center">
                        <div
                          onClick={(e) => handleDelete(e, item.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <h4 className="text-danger text-center">
                        Không tìm thấy giảng viên nào
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

export default ManageLecturer;
