import {
    faEnvelope,
    faGlobe,
    faPhone,
 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../style/Footer.scss"
import { Link } from "react-router-dom";

const About = () => {
    return(
        <div className="about-footer">
            <h4>LIÊN HỆ</h4>
            <div>
                
                <div className="footer-address">
                    <FontAwesomeIcon icon={faGlobe} className="footer-fa-icon fa-address" />
                    Địa chỉ: 1 Đường Phù Đổng Thiên Vương, Phường 8, Thành phố Đà Lạt, Lâm Đồng
                </div>
                <div className="footer-hotline">
                    <FontAwesomeIcon icon={faPhone} className="footer-fa-icon fa-phone" />
                    Hotline: 
                    <Link to={"tel:0263 3822 246"} className="footer-hotline-call">
                        0263 3822 246
                    </Link>
                </div>
                <div>
                    <FontAwesomeIcon icon={faEnvelope} className="footer-fa-icon fa-envelope" />
                    Email:
                    <Link to={"mailto:info@dlu.edu.vn"} className="footer-email-send">
                        info@dlu.edu.vn
                    </Link>
                </div>
                <div>
                    <iframe title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.2877902405253!2d108.44201621412589!3d11.95456563961217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112d959f88991%3A0x9c66baf1767356fa!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyDEkMOgIEzhuqF0!5e0!3m2!1svi!2s!4v1633261535076!5m2!1svi!2s"></iframe>
                </div>
            </div>
        </div>
    )
}

export default About;