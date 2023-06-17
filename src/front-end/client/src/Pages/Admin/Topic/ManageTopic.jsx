import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getTopicsFilter, deleteTopic } from "../../../Services/TopicService";
import { Link } from "react-router-dom";
import "../style/admin-page.scss";
import format from "date-fns/format";
import { Button } from "react-bootstrap";
import AdminTopicFilter from "../../../Components/Shared/Filter/Topic/AdminTopicFiler";
import Loading from "../../../Components/Shared/Loading";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faUserEdit, faCheck, faX, faCheckSquare, faHand } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const ManageTopic = () => {
  const [topicsList, setTopicsList] = useState([]),
    [reRender, setRender] = useState(false),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    topicFilter = useSelector((state) => state.topicFilter);

  let p = 1,
    ps = 11;
  useEffect(() => {
    getTopicsFilter(
      topicFilter.keyword,
      topicFilter.departmentId,
      topicFilter.lecturerId,
      topicFilter.statusId,
      topicFilter.year,
      topicFilter.month,
      ps,
      p
    ).then((data) => {
      if (data) {
        setTopicsList(data.items);
        console.log(data.items);
      } else setTopicsList([]);
      setIsVisibleLoading(false);
    });
  }, [topicFilter, ps, p, reRender]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    window.location.reload(false);
    RemoveTopic(id);
    async function RemoveTopic(id) {
      Swal.fire({
        title: "Bạn có muốn xóa đề tài này không?",
        text: "Sau khi xóa sẽ không thể khôi phục!",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "XÓA",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteTopic(id);
          setRender(true);
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
      <h1 className="topics">Danh sách kết quả nghiên cứu</h1>
      <div className="d-flex">
        <AdminTopicFilter />
        <Link className="text-decoration-none" to={`/admin/de-tai/edit`}>
          <Button>Thêm mới</Button>
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
              <th>Phân công</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody className="table-content">
            {topicsList.length > 0 ? (
              topicsList.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>

                  <td>
                    {format(new Date(item.registrationDate), "dd/MM/yyyy")}
                  </td>
                  <td>{format(new Date(item.endDate), "dd/MM/yyyy")}</td>
                  <td>{item.department.name}</td>
                  <td>{item.lecturer?.fullName}</td>
                  <td>
                    {item.status?.id == 1 ? (
                      <FontAwesomeIcon icon={faX} className="not" />
                    ) : item.status?.id == 2 ? (
                      <FontAwesomeIcon icon={faCheck} className="regis" />
                    ) : item.status?.id == 3 ? (
                      <FontAwesomeIcon icon={faCheckSquare} className="done" />
                    ) : (
                    item.status?.id == 4 ? (
                      <FontAwesomeIcon icon={faHand} className="stop" />
                    ) : (<p></p>)
                    )}
                  </td>
                  <td className="text-center">
                    <Link to={`/admin/de-tai/edit/${item.id}`}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                  </td>
                  <td className="text-center">
                    <Link to={`/admin/de-tai/phan-cong/${item.id}`}>
                      <FontAwesomeIcon icon={faUserEdit} />
                    </Link>
                  </td>
                  <td className="text-center">
                    <div onClick={(e) => handleDelete(e, item.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>
                  <h4 className="text-danger text-center">
                    Không tìm thấy đề tài nào
                  </h4>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
      <p>Ghi chú:
        <FontAwesomeIcon icon={faCheck} className="regis" />: Đã đăng ký |
        <FontAwesomeIcon icon={faX} className="not" />: Chưa đăng ký |
        <FontAwesomeIcon icon={faCheckSquare} className="done" />: Đã nghiệm thu |
        <FontAwesomeIcon icon={faHand} className="stop" />: Tạm dừng
      </p>
    </>
  );
};

export default ManageTopic;
