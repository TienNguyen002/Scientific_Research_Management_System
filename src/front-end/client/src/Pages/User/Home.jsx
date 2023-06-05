import React, { useEffect } from "react";
import "./style/user.scss"
import ListTopic from "../../Components/User/ListTopic";
import SearchBar from "../../Components/Shared/SearchBar";

const Home = () => {
    useEffect(() => {
        document.title = "Trang chủ"
    }, [])

    return(
        <div>
            <img alt="Đại học Đà Lạt" src="https://scholar.dlu.edu.vn/image/logo_hskh_vie.png" width="1310px"/>
            <div>
                <h1 className="welcome">Chào mừng bạn đến với Hệ thống quản lý</h1>
                <SearchBar/>
            </div>
            <ListTopic/>
        </div>
    )
}

export default Home;