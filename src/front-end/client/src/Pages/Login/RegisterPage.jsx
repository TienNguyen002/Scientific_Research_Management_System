import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login.scss";

const RegisterPage = () => {
    return (

        <div className="login">
            <div className="login-mainpage">
                <h1 className="login-header">Đăng ký</h1>
                <form action="#">
                    <input type="text" placeholder="Họ và tên" className="login-form"/>
                    <input type="text" placeholder="Email" className="login-form"/>
                    <input type="password" placeholder="Mật khẩu" className="login-form"/>
                    <input type="password" placeholder="Nhập lại mật khẩu" className="login-form"/>
                </form>
                <Button className="login-register">Đăng ký</Button>
                <div className="login-member">
                    Đã có tài khoản? <Link to={`/dang-nhap`} className="text-decoration-none">Đăng nhập ngay</Link>
                </div>
            </div>
        </div>

    )
}

export default RegisterPage;