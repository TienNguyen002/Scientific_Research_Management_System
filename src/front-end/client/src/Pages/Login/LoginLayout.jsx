import { Outlet } from "react-router-dom";
import "./login.scss"
import { SnackbarProvider } from "notistack";

const LoginLayout = () => {
  return (
    <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
        <div className="login-container">
          <Outlet />
        </div>
    </SnackbarProvider>
  );
};

export default LoginLayout;
