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
import Pager from "../../../Components/Shared/Pager";

const ManageLecturer = () => {
  const [lecturersList, setLecturersList] = useState([
      {
        items: [],
        metadata: [],
      },
    ]),
    [reRender, setRender] = useState(false),
    [metadata, setMetadata] = useState({}),
    [pageNumber, setPageNumber] = useState(1),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    lecturerFilter = useSelector((state) => state.lecturerFilter);

  let ps = 5;
  function updatePageNumber(inc) {
    setPageNumber((curentVal) => curentVal + inc);
  }

  useEffect(() => {
    document.title = "Danh sách Giảng viên";
    getLecturersFilter(
      lecturerFilter.keyword,
      lecturerFilter.departmentId,
      ps,
      pageNumber
    ).then((data) => {
      if (data) {
        setData(data);
      } else setLecturersList([]);
      setIsVisibleLoading(false);
    });

    function setData(props) {
      setLecturersList(props.items);
      setMetadata(props.metadata);
    }
  }, [lecturerFilter, ps, pageNumber, reRender]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    RemoveLecturer(id);
    async function RemoveLecturer(id) {
      Swal.fire({
        title: "Bạn có muốn xóa giảng viên này không?",
        text: "Sau khi xóa sẽ không thể khôi phục!",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "XÓA",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteLecturer(id);
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
          Quản lý Giảng viên
        </h1>
      </div>
      <div>
        <div className="row department-item">
          <div className="item-filter-admin">
            <LecturerFilter />
            <Link
              className="text-decoration-none"
              to={`/admin/giang-vien/add`}
            >
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
                        Không tìm thấy giảng viên nào
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

export default ManageLecturer;
