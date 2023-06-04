import React, {useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import { getLecturers } from "../../Services/LecturerService";
import { Link } from "react-router-dom";
import "./style/user.scss"

const Lecturer = () => {
    const [lecturers, setLecturers] = useState([]);

    useEffect(() => {
        document.title = "Danh sách Giảng viên"
        getLecturers().then(data => {
            if(data){
                setLecturers(data);
            }
            else{
                setLecturers([])
            }
        })
    }, [])

    return(
        <>
            <h1>Danh sách giảng viên</h1>
            <Table striped responsive bordered>
                <thead className="table text-center">
                    <tr className="table-title">
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Khoa</th>
                        <th>Cấp bậc</th>
                    </tr>
                </thead>
                <tbody className="table-content">
                    {lecturers.length > 0 ? lecturers.map((item, index) => 
                        <tr key={index}>
                            <td>
                                <Link className="content" to={`/giang-vien/${item.urlSlug}`}>
                                    {item.fullName}
                                </Link>
                            </td>
                            <td>{item.email}</td>
                            <td>{item.department}</td>
                            <td>{item.qualification}</td>
                        </tr>
                    )
                    : 
                        <tr>
                            <td>
                                <h4>Không tìm thấy giảng viên nào</h4>
                            </td>
                        </tr>
                    }
                </tbody>
            </Table>
        </>
    )
}

export default Lecturer;