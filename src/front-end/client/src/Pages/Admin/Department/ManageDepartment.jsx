import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import {
  getDepartmentsFilter,
  deleteDepartment,
} from "../../../Services/DepartmentService";
import { Link, useParams } from "react-router-dom";
import "../style/admin-page.scss";
import Loading from "../../../Components/Shared/Loading";
import DepartmentFilter from "../../../Components/Shared/Filter/Department/DepartmentFilter";
import { useSelector } from "react-redux";
import { IconButton, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";

const ManageDepartment = () => {
  const [departments, setDepartments] = useState([]),
    [reRender, setRender] = useState(false),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    departmentFilter = useSelector((state) => state.departmentFilter);

  let { id } = useParams,
    p = 1,
    ps = 10;

  useEffect(() => {
    document.title = "Danh sách Khoa";
    getDepartmentsFilter(departmentFilter.keyword).then((data) => {
      if (data) {
        setDepartments(data.items);
      } else {
        setDepartments([]);
      }
      setIsVisibleLoading(false);
    });
  }, [departmentFilter, ps, p, reRender]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    RemoveDepartment(id);
    async function RemoveDepartment(id) {
      Swal.fire({
        title: "Bạn có muốn xóa khoa này không?",
        text: "Sau khi xóa sẽ không thể khôi phục!",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "XÓA"
      }).then((result) => {
        if(result.isConfirmed){
          deleteDepartment(id);
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
        <h1 className="text danger text-center department">Quản lý Khoa</h1>
      </div>
      <div>
        <div className="row department-item">
          <div className="item-filter-admin">
            <DepartmentFilter />
            <Link className="text-decoration-none" to={`/admin/khoa/edit`}>
              <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </Link>
          </div>
          {isVisibleLoading ? (
            <Loading />
          ) : (
            <Table striped responsive bordered>
              <thead>
                <tr>
                  <th>Tên khoa</th>
                  <th>Sửa</th>
                  <th>Xoá</th>
                </tr>
              </thead>
              <tbody>
                {departments.length > 0 ? (
                  departments.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td className="text-center">
                        <Link to={`/admin/khoa/edit/${item.id}`}>
                          <IconButton aria-label="edit" color="primary">
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </td>
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
                    <td colSpan={3}>
                      <h4 className="text-danger text-center">
                        Không tìm thấy khoa nào
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

export default ManageDepartment;
