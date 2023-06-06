import { Outlet } from "react-router-dom";
import "./style/admin-page.scss"
import AdminSidebar from "../../Components/Admin/Shared/Sidebar";
import AdminNavbar from "../../Components/Admin/Shared/Navbar";

const AdminLayout = () => {
  return (
    <div className="admin">
        <AdminSidebar/>
        <div className="admin-container">
          <AdminNavbar/>
          <Outlet/>
        </div>
    </div>
  );
};

export default AdminLayout;
