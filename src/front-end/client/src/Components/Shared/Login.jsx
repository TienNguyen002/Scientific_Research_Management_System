import { Button } from "react-bootstrap";
import "./style/shared.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Login = () => {
  return (
    <div className="login">
      <Link to={`/admin`} className="text-decoration-none login-button">
        <FontAwesomeIcon icon={faUser} />
        Đăng nhập
      </Link>
    </div>
  );
};

export default Login;
