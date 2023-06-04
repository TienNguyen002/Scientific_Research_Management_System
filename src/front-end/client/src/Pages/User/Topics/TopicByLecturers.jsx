import React, { useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import { getTopicsByLecturerSlug } from "../../../Services/TopicService";
import { Link, useParams } from "react-router-dom";
import format from "date-fns/format";
import {Button} from "react-bootstrap";
import StudentList from "../../../Components/Shared/StudentList";

const TopicByLecturers = () => {
    const [topicsList, setTopicsList] = useState([]);
    const params = useParams();
    const {slug} = params;

    let p = 1, ps = 5;
    useEffect((ps, p) => {
        getTopicsByLecturerSlug(slug).then(data => {
            if(data){
                setTopicsList(data.items)
            }
            else
                setTopicsList([])
        })
    }, [ps, p])

    return(
        <>
            <h1>Danh sách đề tài đã đăng ký</h1>
            <Table striped responsive bordered>
                <thead className="table text-center">
                    <tr className="table-title">
                        <th>Tiêu đề</th>
                        <th>Ngày đăng ký</th>
                        <th>Số người thực hiện</th>
                        <th>Khoa</th>
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
                            <td>{item.department.name}</td>
                            <td><td className="table-content"><StudentList studentList={item.students}/></td> </td>
                            <td>{item.process.name}</td>
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
        </>
    )
}

export default TopicByLecturers;