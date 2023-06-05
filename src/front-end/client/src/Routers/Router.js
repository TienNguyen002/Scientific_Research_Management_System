import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../Pages/User/Layout";
import Home from "../Pages/User/Home";
import Department from "../Pages/User/Department"
import User from "../Pages/User/User";
import Lecturer from "../Pages/User/Lecturer";
import Topic from "../Pages/User/Topic";
import TopicDetail from "../Pages/User/Details/TopicDetails"
import TopicByStudents from "../Pages/User/Topics/TopicByStudents";
import StudentDetails from "../Pages/User/Details/StudentDetails";
import LecturerDetails from "../Pages/User/Details/LecturerDetails";
import DepartmentDetails from "../Pages/User/Details/DepartmentDetails";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/khoa" element={<Department/>}/>
                    <Route path="/nha-khoa-hoc" element={<User/>}/>
                    <Route path="/giang-vien" element={<Lecturer/>}/>
                    <Route path="/dang-ky-de-tai" element={<Topic/>}/>
                    <Route path="/de-tai/:slug" element={<TopicDetail/>}/>
                    <Route path="/sinh-vien/:slug" element={<StudentDetails/>}/>
                    <Route path="/giang-vien/:slug" element={<LecturerDetails/>}/>
                    <Route path="/khoa/:slug" element={<DepartmentDetails/>}/>
                    {/* <Route path="/sinh-vien/:slug" element={<TopicByStudents/>}/> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;