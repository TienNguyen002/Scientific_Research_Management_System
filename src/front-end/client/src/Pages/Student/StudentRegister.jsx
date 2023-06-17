import React, { useState, useEffect } from "react";
import TopicFilter from "../../Components/Shared/Filter/Topic/TopicFilter";
import Loading from "../../Components/Shared/Loading";
import format from "date-fns/format";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getTopicsFilter, registerTopic } from "../../Services/TopicService";
import Swal from "sweetalert2";

const StudentRegister = () => {
    const params = useParams(),
        [topicsList, setTopicsList] = useState([]),
        [isVisibleLoading, setIsVisibleLoading] = useState(true),
        topicFilter = useSelector((state) => state.topicFilter),
        { slug } = params;

    let statusId = 1,
        p = 1,
        ps = 10;

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
            p
        ).then((data) => {
            if (data) {
                setTopicsList(data.items);
            } else setTopicsList([]);
            setIsVisibleLoading(false);
        });
    }, [topicFilter, ps, p, slug]);

    const handleRegister = (e, id, modelslug) => {
        Register(id, modelslug);
        async function Register(id, modelslug) {
            Swal.fire({
                title: "Bạn có muốn đăng ký đề tài này không?",
                text: "Chỉ được đăng ký 1 lần!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đăng ký"
            }).then((result) => {
                if (result.isConfirmed) {
                    registerTopic(id, modelslug);
                    window.location.reload(false);
                    Swal.fire({
                        title: "Xóa thành công",
                        icon: "success",
                    }
                    )
                }
            })
        }

    }

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
                                            {item.description.substring(0, 50)}...
                                        </p>
                                    </td>
                                    <td>
                                        {format(new Date(item.registrationDate), "dd/MM/yyyy")}
                                    </td>
                                    <td>{format(new Date(item.endDate), "dd/MM/yyyy")}</td>
                                    <td>{item.studentNumbers}</td>
                                    <td>{item.department.name}</td>
                                    <td>
                                        {item.lecturer?.fullName
                                            ? item.lecturer?.fullName
                                            : "Chưa có giảng viên hướng dẫn"}
                                    </td>
                                    <td>{item.status.name}</td>
                                    <td>
                                        <Button type="submit" onClick={(e) => handleRegister(e, item.id, slug)}>Đăng ký đề tài</Button>
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
        </>
    )
}

export default StudentRegister;