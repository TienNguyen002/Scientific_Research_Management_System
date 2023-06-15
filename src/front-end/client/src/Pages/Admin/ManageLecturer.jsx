import React, { useEffect, useState } from "react";
import {
  getLecturersFilter,
  deleteLecturer,
} from "../../Services/LecturerService";
import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./style/admin-page.scss";
import LecturerFilter from "../../Components/Shared/Filter/Lecturer/LecturerFilter";
import Loading from "../../Components/Shared/Loading";
import { useSelector } from "react-redux";
import { IconButton, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const ManageLecturer = () => {
  const [lecturersList, setLecturersList] = useState([]),
    [reRender, setRender] = useState(false),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    lecturerFilter = useSelector((state) => state.lecturerFilter);

  let { id } = useParams,
    ps = 10,
    p = 1;

  useEffect(() => {
    document.title = "Danh sách Sinh viên";
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

  const handleDeleteLecturer = (e, id) => {
    e.preventDefault();
    RemoveLecturer(id);
    async function RemoveLecturer(id) {
      if (window.confirm("Bạn có muốn xoá giảng viên này?")) {
        const response = await deleteLecturer(id);
        if (response) {
          alert("Đã xoá giảng viên này");
          setRender(true);
        } else alert("Đã xảy ra lỗi khi xoá");
      }
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
                        <Link to={`/admin/sinh-vien/edit/${item.id}`}>
                          <IconButton aria-label="edit" color="primary">
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </td>
                      <td className="text-center">
                        <div
                          onClick={(e) => handleDeleteLecturer(e, item.id)}
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
