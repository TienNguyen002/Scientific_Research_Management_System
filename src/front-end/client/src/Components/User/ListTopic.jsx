import React, { useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import { getTopicsFilter } from "../../Services/TopicService";
import { Link } from "react-router-dom";
import "./style/user.scss"
import StudentList from "../Shared/StudentList";
import format from "date-fns/format";
import TopicFilterSearch from "../../Components/User/Filter/Topic/TopicFilterSearch"
import TopicFilter from "../../Components/User/Filter/Topic/TopicFilter"
import Loading from "../../Components/Shared/Loading";
import { useSelector } from "react-redux";

const ListTopic = () => {
    const [topicsList, setTopicsList] = useState([]),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    topicFilter = useSelector(state => state.topicFilter);

    let p = 1, ps = 11;
    useEffect(() => {
        getTopicsFilter(topicFilter.keyword,
            topicFilter.departmentId,
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
            <h1 className="topics">Danh sách kết quả nghiên cứu</h1>
            <TopicFilterSearch/>
            {isVisibleLoading ? (
                <Loading />
            ) : (
            <Table striped responsive bordered className="small-table">
                <thead className="table text-center">
                    <tr className="table-title">
                        <th>Tên đề tài</th>
                        <th>Mô tả</th>
                        <th className="width">Ngày thực hiện</th>
                        <th className="width">Ngày nghiệm thu</th>
                        <th className="width">Số người thực hiện</th>
                        <th>Khoa</th>
                        <th>Giảng viên</th>
                        <th>Sinh viên thực hiện</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody className="table-content">
                    {topicsList.length > 0 ? topicsList.map((item, index) => 
                        <tr key={index}>
                            <td>
                                <Link className="table-content" to={`/de-tai/${item.urlSlug}`}>
                                    {item.title}
                                </Link>
                            </td>
                            <td><p className="shortDescription">{item.description}</p></td>
                            <td>{format(new Date(item.registrationDate), "dd/MM/yyyy")}</td>
                            <td>{format(new Date(item.endDate), "dd/MM/yyyy")}</td>
                            <td>{item.studentNumbers}</td>
                            <td>
                                <Link className="table-content" to={`/khoa/${item.department.urlSlug}`}>
                                    {item.department.name}
                                </Link>
                            </td>
                            <td>
                                <Link className="table-content" to={`/giang-vien/${item.lecturer.urlSlug}`}>
                                    {item.lecturer.fullName}
                                </Link>
                            </td>
                            <td className="table-content"><StudentList studentList={item.students}/></td>  
                            <td>{item.status?.id == 1 ? <p className="not">Chưa đăng ký</p>
                                : item.status?.id == 2 ? <p className="regis">Đã đăng ký</p>
                                : item.status?.id == 3 ? <p className="done">Đã nghiệm thu</p>
                                : item.status?.id == 4 ? <p className="stop">Tạm dừng</p>
                                : <p className="not-regis">Chưa có người thực hiện</p>}</td>                      
                        </tr>
                    )
                    : 
                        <tr>
                            <td>
                                <h4>Không tìm thấy khóa học nào</h4>
                            </td>
                        </tr>
                    }
                </tbody>
            </Table>
            )}
        </>
    )
}

export default ListTopic;