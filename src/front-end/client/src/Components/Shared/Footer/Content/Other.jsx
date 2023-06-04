import React from "react";
import { Link } from "react-router-dom";
import "../style/Footer.scss"

const Other = () => {
    return(
        <>
            <div className="link">
                <h4>LIÊN KẾT</h4>
                <ul>
                    <li> <Link to="https://dlu.edu.vn">Trường Đại học Đà Lạt</Link></li>
                    <li><Link to="https://thuvien.dlu.edu.vn">Thư viện</Link></li>
                    <li><Link to="https://tckh.dlu.edu.vn/index.php/tckhdhdl">Tạp chí Khoa học Đại học Đà Lạt</Link></li>
                    <li><Link to="https://tuyensinh.dlu.edu.vn">Tuyển sinh</Link></li>
                </ul>   
            </div>
        </>
    )
}

export default Other;