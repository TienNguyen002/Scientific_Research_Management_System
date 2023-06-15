import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../Pages/User/Layout";
import Home from "../Pages/User/Home";
import Department from "../Pages/User/Department"
import User from "../Pages/User/User";
import Lecturer from "../Pages/User/Lecturer";
import Topic from "../Pages/User/Topic";
import TopicDetail from "../Pages/User/Details/TopicDetails"
import StudentDetails from "../Pages/User/Details/StudentDetails";
import LecturerDetails from "../Pages/User/Details/LecturerDetails";
import DepartmentDetails from "../Pages/User/Details/DepartmentDetails";
import AdminLayout from "../Pages/Admin/AdminLayout";
import Dashboard from "../Pages/Admin/Dashboard";
import ManageDepartment from "../Pages/Admin/Department/ManageDepartment";
import ManageTopic from "../Pages/Admin/ManageTopic";
import ManageStudent from "../Pages/Admin/ManageStudent";
import ManageLecturer from "../Pages/Admin/ManageLecturer";
import ManageFeedback from "../Pages/Admin/ManageFeedback";
import AdminProfile from "../Pages/Admin/AdminProfile"
import DepartmentEditAdmin from "../Pages/Admin/Department/DepartmentEdit";
import Feedback from "../Pages/User/Feedback";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/khoa" element={<Department/>}/>
                    <Route path="/sinh-vien-nghien-cuu" element={<User/>}/>
                    <Route path="/giang-vien" element={<Lecturer/>}/>
                    <Route path="/dang-ky-de-tai" element={<Topic/>}/>
                    <Route path="/de-tai/:slug" element={<TopicDetail/>}/>
                    <Route path="/sinh-vien-nghien-cuu/:slug" element={<StudentDetails/>}/>
                    <Route path="/giang-vien/:slug" element={<LecturerDetails/>}/>
                    <Route path="/khoa/:slug" element={<DepartmentDetails/>}/>
                    <Route path="/lien-he" element={<Feedback/>}/>
                </Route>
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route path="/admin" element={<Dashboard/>}/>
                    <Route path="/admin/khoa" element={<ManageDepartment/>}/>
                    <Route path="/admin/khoa/edit" element={<DepartmentEditAdmin/>}/>
                    <Route path="/admin/khoa/edit/:id" element={<DepartmentEditAdmin/>}/>
                    <Route path="/admin/de-tai" element={<ManageTopic/>}/>
                    <Route path="/admin/sinh-vien" element={<ManageStudent/>}/>
                    <Route path="/admin/giang-vien" element={<ManageLecturer/>}/>
                    <Route path="/admin/feedback" element={<ManageFeedback/>}/>
                    <Route path="/admin/thong-tin" element={<AdminProfile/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;