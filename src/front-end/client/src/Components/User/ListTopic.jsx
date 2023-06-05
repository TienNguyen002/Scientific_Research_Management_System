import React, { useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import { getTopics } from "../../Services/TopicService";
import { Link } from "react-router-dom";
import "./style/user.scss"
import StudentList from "../Shared/StudentList";
import format from "date-fns/format";

const ListTopic = () => {
    const [topicsList, setTopicsList] = useState([]);

    let p = 1, ps = 5;
    useEffect((ps, p) => {
        getTopics().then(data => {
            if(data){
                setTopicsList(data.items)
            }
            else
                setTopicsList([])
        })
    }, [ps, p])

    return(
        <>
            <h1 className="topics">Danh sách kết quả nghiên cứu</h1>
            <Table striped responsive bordered>
                <thead className="table text-center">
                    <tr className="table-title">
                        <th>Tiêu đề</th>
                        <th>Ngày đăng ký</th>
                        <th>Số người thực hiện</th>
                        <th>Khoa</th>
                        <th>Giảng viên</th>
                        <th>Sinh viên thực hiện</th>
                        <th>Tiến trình</th>
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
                            <td>{item.process?.id == 1 ? <p className="start">Bắt đầu làm</p>
                                : item.process?.id == 2 ? <p className="doing">Đang làm</p>
                                : item.process?.id == 3 ? <p className="stop">Tạm dừng</p>
                                : item.process?.id == 4 ? <p className="doing">Đang viết báo cáo</p>
                                : item.process?.id == 5 ? <p className="stop">Chưa hoàn thành</p>
                                : item.process?.id == 5 ?<p className="done">Hoàn thành</p>
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
        </>
    )
}

export default ListTopic;