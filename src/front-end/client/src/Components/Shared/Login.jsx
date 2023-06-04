import { Button } from "react-bootstrap"
import "./style/shared.scss"

const Login = () => {
    return(
        <div className="login">
            <Button className="register">Đăng ký</Button>
            <Button>Đăng nhập</Button>
        </div>
    )
}

export default Login;