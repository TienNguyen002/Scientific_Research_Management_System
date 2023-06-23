import React, { useState, useEffect } from "react";
import TopicFilter from "../../Components/Shared/Filter/Topic/TopicFilter";
import Loading from "../../Components/Shared/Loading";
import format from "date-fns/format";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTopicsFilter, registerTopic } from "../../Services/TopicService";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import ShowMoreText from "../../Components/Shared/ShowMoreText";
import Pager from "../../Components/Shared/Pager";

const StudentRegister = () => {
  const params = useParams(),
    [topicsList, setTopicsList] = useState([
      {
        items: [],
        metadata: [],
      },
    ]),
    [error, setError] = useState(),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    [metadata, setMetadata] = useState({}),
    [pageNumber, setPageNumber] = useState(1),
    topicFilter = useSelector((state) => state.topicFilter),
    { enqueueSnackbar } = useSnackbar(),
    { slug } = params;

  let ps = 5;
  function updatePageNumber(inc) {
    setPageNumber((curentVal) => curentVal + inc);
  }

  useEffect(() => {
    document.title = "Đăng ký đề tài";
    getTopicsFilter(
      topicFilter.keyword,
      topicFilter.departmentId,
      topicFilter.lecturerId,
      1,
      topicFilter.year,
      topicFilter.month,
      ps,
      pageNumber
    ).then((data) => {
      if (data) {
        setData(data);
      } else setTopicsList([]);
      setIsVisibleLoading(false);
    });

    function setData(props) {
      setTopicsList(props.items);
      setMetadata(props.metadata);
    }
  }, [topicFilter, ps, pageNumber, slug]);

  const handleRegister = (e, id, modelslug) => {
    setError(sessionStorage.getItem("EData"))
    Register(id, modelslug);
    async function Register(id, modelslug) {
      Swal.fire({
        title: "Bạn có muốn đăng ký đề tài này không?",
        text: "Lưu ý: Nếu như khác khoa sẽ không đăng ký được!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đăng ký",
      }).then((result) => {
        if (result.isConfirmed) {
          registerTopic(id, modelslug).then((data) => {
            if (data) {
              console.log(data);
              enqueueSnackbar("Đã đăng ký thành công", {
                variant: "success",
                autoHideDuration: 2000,
              });
              window.location.reload(false);
            } else {
              enqueueSnackbar("Đăng ký thất bại: " + error, {
                variant: "error",
                autoHideDuration: 2000,
              });
              setTimeout(()=> {
                sessionStorage.removeItem("EData")
              }, 5000)
            }
          });
        }
      });
    }
  };

  return (
    <>
      <TopicFilter />
      {isVisibleLoading ? (
        <Loading />
      ) : (
        <Table striped responsive bordered>
          <thead className="table text-center">
            <tr className="table-title">
              <th className="w-25">Tên đề tài</th>
              <th width="200px">Mô tả</th>
              <th className="width">Ngày thực hiện</th>
              <th className="width">Ngày nghiệm thu</th>
              <th className="width">Số người thực hiện</th>
              <th>Khoa</th>
              <th>Giảng viên</th>
              <th>Trạng thái</th>
              <th>Đăng ký đề tài</th>
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
                    <p className="shortDescription">
                      <ShowMoreText text={item?.description} maxLength={50} />
                    </p>
                  </td>
                  <td>
                    {format(new Date(item?.registrationDate), "dd/MM/yyyy")}
                  </td>
                  <td>{format(new Date(item?.endDate), "dd/MM/yyyy")}</td>
                  <td>{item.studentNumbers}</td>
                  <td>{item.department.name}</td>
                  <td>
                    {item.lecturer?.fullName
                      ? item.lecturer?.fullName
                      : "Chưa có giảng viên hướng dẫn"}
                  </td>
                  <td>{item.status.name}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faPencil}
                      onClick={(e) => handleRegister(e, item.id, slug)}
                      className="text-primary"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>
                  <h4>Không còn đề tài chưa đăng ký</h4>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
      <Pager metadata={metadata} onPageChange={updatePageNumber} />
    </>
  );
};

export default StudentRegister;
