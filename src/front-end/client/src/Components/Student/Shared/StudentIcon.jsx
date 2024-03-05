import { useEffect, useState } from "react";
import { getStudentBySlug } from "../../../Services/StudentService";
import { isEmptyOrSpaces } from "../../../Utils/Utils";
import "./style/student-component.scss";
import { Link } from "react-router-dom";

const StudentIcon = ({ slug, logout }) => {
  const [student, setStudent] = useState();
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    getStudentBySlug(slug).then((data) => {
      if (data) {
        setStudent(data);
      } else setStudent([]);
    });
  }, [reRender]);



  return (
    <div className="d-flex">
      <div>
        <p className="hello-user">Xin chào, {student?.fullName}</p>
        <Link to={`/`} className="logout" onClick={logout}>Đăng xuất</Link>
      </div>
      <div>
        <Link to={`/sinh-vien`}>
          {isEmptyOrSpaces(student?.imageUrl) ? (
            <div className="student-navbar-items">
              <div className="student-navbar-item">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                  alt="."
                  className="student-navbar-item-avatar"
                />
              </div>
            </div>
          ) : (
            <div className="">
              <img
                src={`https://localhost:7129/${student?.imageUrl}`}
                alt={student?.fullName}
                className="student-navbar-item-avatar"
              />
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default StudentIcon;
