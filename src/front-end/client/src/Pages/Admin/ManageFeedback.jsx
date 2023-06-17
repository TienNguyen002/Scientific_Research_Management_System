import React, { useEffect, useState } from "react";
import {
  getFeedback,
  deleteFeedback,
} from "../../Services/AdminService";
import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./style/admin-page.scss";
import FeedbackFilter from "../../Components/Shared/Filter/Feedback/FeedbackFilter";
import Loading from "../../Components/Shared/Loading";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import format from "date-fns/format";
import Swal from "sweetalert2";

const ManageFeedback = () => {
  const [feedbacksList, setFeedbacksList] = useState([]),
    [reRender, setRender] = useState(false),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    feedbackFilter = useSelector((state) => state.feedbackFilter);

  let { id } = useParams,
    ps = 10,
    p = 1;

  useEffect(() => {
    document.title = "Danh sách Sinh viên";
    getFeedback(
      feedbackFilter.keyword,
      feedbackFilter.year,
      feedbackFilter.month,
      ps,
      p
    ).then((data) => {
      if (data) {
        setFeedbacksList(data.items);
      } else setFeedbacksList([]);
      setIsVisibleLoading(false);
    });
  }, [feedbackFilter, ps, p, reRender]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    RemoveFeedback(id);
    async function RemoveFeedback(id) {
      Swal.fire({
        title: "Bạn có muốn xóa feedback này không?",
        text: "Sau khi xóa sẽ không thể khôi phục!",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "XÓA"
      }).then((result) => {
        if(result.isConfirmed){
          deleteFeedback(id);
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
        <h1 className="text danger text-center department">Quản lý Feedback</h1>
      </div>
      <div>
        <div className="row department-item">
          <div className="item-filter-admin"><FeedbackFilter /></div>
          {isVisibleLoading ? (
            <Loading />
          ) : (
            <Table striped responsive bordered>
              <thead>
                <tr>
                  <th>Người gửi</th>
                  <th>Nội dung</th>
                  <th>Ngày gửi</th>
                  <th>Xoá</th>
                </tr>
              </thead>
              <tbody>
                {feedbacksList.length > 0 ? (
                  feedbacksList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.username}</td>
                      <td>{item.content}</td>
                      <td>{format(new Date(item.createDate), "dd/MM/yyyy")}</td>
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
                    <td colSpan={4}>
                      <h4 className="text-danger text-center">
                        Không tìm thấy feedback nào
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

export default ManageFeedback;
