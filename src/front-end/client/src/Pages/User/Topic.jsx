import React, { useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import { getTopicsFilterNotRegis } from "../../Services/TopicService";
import { Link } from "react-router-dom";
import "./style/user.scss"
import format from "date-fns/format";
import {Button} from "react-bootstrap";
import TopicFilter from "../../Components/User/Filter/TopicFilter"
import Loading from "../../Components/Shared/Loading";
import { useSelector } from "react-redux";

const Topic = () => {
    const [topicsList, setTopicsList] = useState([]),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    topicFilter = useSelector(state => state.topicFilter);

    let statusId = 1, p = 1, ps = 10;

    useEffect(() => {
        document.title = "Đăng ký đề tài"
        getTopicsFilterNotRegis(topicFilter.keyword,
            topicFilter.departmentId,
            topicFilter.lecturerId,
            statusId,
            topicFilter.year,
            topicFilter.month,
            ps, p).then(data => {
            if(data){
                setTopicsList(data.items)
            }
            else
                setTopicsList([])
            setIsVisibleLoading(false);
        })
    }, [topicFilter, ps, p])

    return(
        <>
            <h1>Đăng ký đề tài</h1>
            <TopicFilter/>
            {isVisibleLoading ? (
                <Loading />
            ) : (
            <Table striped responsive bordered>
                <thead className="table text-center">
                    <tr className="table-title">
                        <th>Tiêu đề</th>
                        <th>Ngày đăng ký</th>
                        <th>Số người thực hiện</th>
                        <th>Khoa</th>
                        <th>Giảng viên</th>
                        <th>Trạng thái</th>
                        <th>Đăng ký đề tài</th>
                    </tr>
                </thead>
                <tbody className="table-content">
                    {topicsList.length > 0 ? topicsList.map((item, index) => 
                        <tr key={index}>
                            <td>
                                <Link className="table-content" to={`/de-tai/${item.urlSlug}`}>
                                    {item.title}
                                </Link>
                                <p className="shortDescription">{item.description}</p>
                            </td>
                            <td>{format(new Date(item.registrationDate), "dd/MM/yyyy")}</td>
                            <td>{item.studentNumbers}</td>
                            <td>{item.department.name}</td>
                            <td>{item.lecturer.fullName}</td>
                            <td>{item.status.name}</td>
                            <td><Button>Đăng ký đề tài</Button></td>
                        </tr>
                    )
                    : 
                        <tr>
                            <td>
                                <h4>Không tìm thấy đề tài nào</h4>
                            </td>
                        </tr>
                    }
                </tbody>
            </Table>
            )}
        </>
    )
}

export default Topic;