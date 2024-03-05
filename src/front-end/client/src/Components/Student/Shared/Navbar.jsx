import React, {useState, useEffect} from 'react'
import "./style/student-component.scss"
import { getStudentBySlug } from "../../../Services/StudentService"
import { isEmptyOrSpaces } from "../../../Utils/Utils";

const StudentNavbar = () => {
  let slug = sessionStorage.getItem("UrlSlug")
  const [student, setStudent] = useState();

  useEffect(() => {
    getStudentBySlug(slug).then((data) => {
      if (data) {
        setStudent(data);
      } else setStudent([]);
    });
  }, []);

  return (
    <div className='student-navbar'>
      <div className="student-navbar-wrapper">
        <div></div>
        <div className="student-navbar-items">
          <div className="student-navbar-item">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentNavbar;
