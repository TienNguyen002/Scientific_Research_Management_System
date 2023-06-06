import { Link } from "react-router-dom";
import "../User/style/user.scss"

const StudentList = ({studentList}) => {
    if(studentList && Array.isArray(studentList) && studentList.length > 0)
    return (
        <>
            {studentList.map((item, index) =>{
                return (
                    <div>
                        <Link to={`/sinh-vien-nghien-cuu/${item.urlSlug}`}
                        title={item.fullName}
                        className="table-content"
                        key={index}>
                        {item.fullName}
                        </Link>
                    </div>
                );
            })}
        </>
    );
    else
    return (
        <></>
    );
};

export default StudentList;