import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import {
  getDepartmentsFilter,
  deleteDepartment,
} from "../../../Services/DepartmentService";
import { Link, useParams } from "react-router-dom";
import "../style/admin-page.scss";
import Loading from "../../../Components/Shared/Loading";
import DepartmentFilter from "../../../Components/User/Filter/Department/DepartmentFilter";
import { useSelector } from "react-redux";
import { IconButton, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

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

  const handleDeleteDepartment = (e, id) => {
    e.preventDefault();
    RemoveDepartment(id);
    async function RemoveDepartment(id) {
      if (window.confirm("Bạn có muốn xoá phòng khoa này?")) {
        const response = await deleteDepartment(id);
        if (response) {
          alert("Đã xoá phòng khoa này");
          setRender(true);
        } else alert("Đã xảy ra lỗi khi xoá");
      }
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
                          onClick={(e) => handleDeleteDepartment(e, item.id)}
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
