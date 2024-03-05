import "./style/shared.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import StudentIcon from "../Student/Shared/StudentIcon"

const Login = () => {
  const [isUser, setIsUser] = useState(false);
  const [reRender, setReRender] = useState(false);
  let token = sessionStorage.getItem("Token");
  let urlSlug = sessionStorage.getItem("UrlSlug");

  useEffect(() => {
    if (token === null) {
      setIsUser(false);
    } else setIsUser(true);
  }, [reRender]);

  const handleLogout = () => {
    sessionStorage.clear();
    setReRender(true);
  };

  return (
    <div className="loginnn">
      {isUser ? (
        <StudentIcon slug={urlSlug} logout={handleLogout}/>
      ) : (
        <Link to={`/dang-nhap`} className="text-decoration-none login-button">
          <FontAwesomeIcon icon={faUser} />
          Đăng nhập
        </Link>
      )}
    </div>
  );
};

export default Login;
