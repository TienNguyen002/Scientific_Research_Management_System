import { Outlet } from "react-router-dom";
import "./style/student-page.scss";
import StudentSidebar from "../../Components/Student/Shared/Sidebar";
import StudentNavbar from "../../Components/Student/Shared/Navbar";
import { SnackbarProvider } from "notistack";

const StudentLayout = () => {
  return (
    <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
      <div className="student">
        <StudentSidebar />
        <div className="student-container">
          <StudentNavbar />
          <Outlet />
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default StudentLayout;
