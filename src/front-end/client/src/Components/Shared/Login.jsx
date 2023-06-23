import "./style/shared.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";

const Login = () => {
  const [isUser, setIsUser] = useState(false);
  const [reRender, setReRender] = useState(false);
  let token = localStorage.getItem("Token");
  let urlSlug = localStorage.getItem("UrlSlug");

  useEffect(() => {
    if (token === null) {
      setIsUser(false);
    } else setIsUser(true);
  },[reRender]);

  const handleLogout = () => {
    localStorage.clear()
    setReRender(true);
  }

  return (
    <div className="loginnn">
      {isUser ? (
        <div>
          <Link to={`/sinh-vien/${urlSlug}`}>Hello {urlSlug}</Link>
          <Link to={`/`} onClick={handleLogout}>Dang xuat</Link>
        </div>
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
