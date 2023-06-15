import { Outlet } from "react-router-dom";
import "./style/admin-page.scss";
import AdminSidebar from "../../Components/Admin/Shared/Sidebar";
import AdminNavbar from "../../Components/Admin/Shared/Navbar";
import { SnackbarProvider } from "notistack";

const AdminLayout = () => {
  return (
    <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
      <div className="admin">
        <AdminSidebar />
        <div className="admin-container">
          <AdminNavbar />
          <Outlet />
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default AdminLayout;
