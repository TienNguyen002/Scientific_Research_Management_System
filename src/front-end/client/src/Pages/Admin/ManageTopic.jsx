import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getAdminTopicsFilter, deleteTopic } from "../../Services/TopicService";
import { Link } from "react-router-dom";
import "./style/admin-page.scss";
import format from "date-fns/format";
import { Button } from "react-bootstrap";
import TopicFilter from "../../Components/Shared/Filter/Topic/TopicFilter";
import Loading from "../../Components/Shared/Loading";
import { useSelector } from "react-redux";
import { IconButton, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const ManageTopic = () => {
  const [topicsList, setTopicsList] = useState([]),
    [reRender, setRender] = useState(false),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    topicFilter = useSelector((state) => state.topicFilter);

  let p = 1,
    ps = 11;
  useEffect(() => {
    getAdminTopicsFilter(
      topicFilter.keyword,
      topicFilter.departmentId,
      topicFilter.lecturerId,
      topicFilter.year,
      topicFilter.month,
      ps,
      p
    ).then((data) => {
      if (data) {
        setTopicsList(data.items);
      } else setTopicsList([]);
      setIsVisibleLoading(false);
    });
  }, [topicFilter, ps, p, reRender]);

  const handleDeleteTopic = (e, id) => {
    e.preventDefault();
    RemoveTopic(id);
    async function RemoveTopic(id) {
      if (window.confirm("Bạn có muốn xoá đề tài này?")) {
        const response = await deleteTopic(id);
        if (response) {
          alert("Đã xoá đề tài này");
          setRender(true);
        } else alert("Đã xảy ra lỗi khi xoá");
      }
    }
  };

  return (
    <>
      <h1 className="topics">Danh sách kết quả nghiên cứu</h1>
      <div className="d-flex">
        <TopicFilter />
        <Link className="text-decoration-none" to={`/admin/de-tai/edit`}>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </div>

      {isVisibleLoading ? (
        <Loading />
      ) : (
        <Table striped responsive bordered className="small-table">
          <thead className="table text-center">
            <tr className="">
              <th className="w-25">Tên đề tài</th>
              <th className="width">Ngày thực hiện</th>
              <th className="width">Ngày nghiệm thu</th>
              <th>Khoa</th>
              <th>Giảng viên</th>
              <th>Trạng thái</th>
              <th>Sửa</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody className="table-content">
            {topicsList.length > 0 ? (
              topicsList.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Link
                      className="table-content"
                      to={`/de-tai/${item.urlSlug}`}
                    >
                      {item.title}
                    </Link>
                  </td>

                  <td>
                    {format(new Date(item.registrationDate), "dd/MM/yyyy")}
                  </td>
                  <td>{format(new Date(item.endDate), "dd/MM/yyyy")}</td>
                  <td>
                    <Link
                      className="table-content"
                      to={`/khoa/${item.department.urlSlug}`}
                    >
                      {item.department.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="table-content"
                      to={`/giang-vien/${item.lecturer.urlSlug}`}
                    >
                      {item.lecturer.fullName}
                    </Link>
                  </td>
                  <td>
                    {item.status?.id == 1 ? (
                      <p className="not">Chưa đăng ký</p>
                    ) : item.status?.id == 2 ? (
                      <p className="regis">Đã đăng ký</p>
                    ) : item.status?.id == 3 ? (
                      <p className="done">Đã nghiệm thu</p>
                    ) : item.status?.id == 4 (
                      <p className="stop">Tạm dừng</p>
                    )
                    }
                  </td>
                  <td className="text-center">
                    <Link to={`/admin/de-tai/edit/${item.id}`}>
                      <IconButton aria-label="edit" color="primary">
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </td>
                  <td className="text-center">
                    <div onClick={(e) => handleDeleteTopic(e, item.id)}>
                      <DeleteIcon color="secondary" />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>
                  <h4>Không tìm thấy khóa học nào</h4>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ManageTopic;
