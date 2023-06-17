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
import ManageTopic from "../Pages/Admin/Topic/ManageTopic";
import ManageStudent from "../Pages/Admin/Student/ManageStudent";
import ManageLecturer from "../Pages/Admin/Lecturer/ManageLecturer";
import ManageFeedback from "../Pages/Admin/ManageFeedback";
import AdminProfile from "../Pages/Admin/AdminProfile"
import DepartmentEditAdmin from "../Pages/Admin/Department/DepartmentEdit";
import Contact from "../Pages/User/Contact";
import TopicEditAdmin from "../Pages/Admin/Topic/TopicEdit";
import AssignmentTopic from "../Pages/Admin/Topic/AssignmentTopic";

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
                    <Route path="/lien-he" element={<Contact/>}/>
                    <Route path="/lien-he/:id" element={<Contact/>}/>
                </Route>
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route path="/admin" element={<Dashboard/>}/>
                    <Route path="/admin/khoa" element={<ManageDepartment/>}/>
                    <Route path="/admin/khoa/edit" element={<DepartmentEditAdmin/>}/>
                    <Route path="/admin/khoa/edit/:id" element={<DepartmentEditAdmin/>}/>
                    <Route path="/admin/de-tai" element={<ManageTopic/>}/>
                    <Route path="/admin/de-tai/phan-cong/:id" element={<AssignmentTopic/>}/>
                    <Route path="/admin/de-tai/edit" element={<TopicEditAdmin/>}/>
                    <Route path="/admin/de-tai/edit/:id" element={<TopicEditAdmin/>}/>
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