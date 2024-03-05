import React from "react";
import "./style/Footer.scss"
import About from "./Content/About"
import Other from "./Content/Other"

const Footer = () => {
    return(
        <div className="footer">
            <div className="row">
                <div className="col-6">
                    <About/>
                </div>
                <div className="col-6">
                    <Other/>
                </div>
                <div className="container-fluid text-center footer-bottom">
                    &copy; 2023 - HỆ THỐNG QUẢN LÝ HỒ SƠ KHOA HỌC TRƯỜNG ĐẠI HỌC ĐÀ LẠT
                </div>
            </div>
        </div>    
    )
}

export default Footer;