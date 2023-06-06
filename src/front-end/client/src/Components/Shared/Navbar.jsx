import React from "react";
import { Navbar as Nb, Nav, NavItem } from "react-bootstrap";
import{ Link } from 'react-router-dom';
import logo from "./images/logo.png"
import "./style/shared.scss"
import Login from "./Login";

const Navbar = () => {
    return (
        <Nb collapseOnSelect expand='sm' variant="light"
        className="border-bottom shadow navbar">
            <div className="container-fluid">
                <Nb.Brand href="/">
                    <img 
                        alt="NCKHSV"
                        src={logo}
                        width="30"
                        height="30"/>
                </Nb.Brand>
                <Nb.Toggle aria-controls="responsive-navbar-nav"/>
                <Nb.Collapse id="responsive-navbar-nav" className="d-sm-inline-flex
                justify-content-between">
                    <Nav className="mr-auto flex-grow-1">
                        <NavItem>
                            <Link to='/' className="navitem">
                                TRANG CHỦ
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/khoa' className="navitem">
                                KHOA
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/sinh-vien-nghien-cuu' className="navitem">
                                SINH VIÊN NGHIÊN CỨU
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/giang-vien' className="navitem">
                                GIẢNG VIÊN
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/dang-ky-de-tai' className="navitem">
                                ĐĂNG KÝ ĐỀ TÀI
                            </Link>
                        </NavItem>
                    </Nav>
                </Nb.Collapse>
                <Login/>
            </div>
        </Nb>
    )
}

export default Navbar;