import React from "react";
import "./style/Footer.scss"
import About from "./Content/About"
import Social from "./Content/Social"
import Other from "./Content/Other"

const Footer = () => {
    return(
        <div className="footer">
            <div className="row">
                <div className="col-4">
                    <About/>
                </div>
                <div className="col-4">
                    <Other/>
                </div>
                <div className="col-4">
                    <Social/>
                </div>
                <div className="container-fluid text-center footer-bottom">
                    &copy; 2023 - HỆ THỐNG QUẢN LÝ HỒ SƠ KHOA HỌC TRƯỜNG ĐẠI HỌC ĐÀ LẠT
                </div>
            </div>
        </div>    
    )
}

export default Footer;