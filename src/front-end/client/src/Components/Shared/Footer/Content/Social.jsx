import React from "react";
import "../style/Footer.scss"
import { Link } from "react-router-dom";
import facebook from "../../images/facebook.png"
import youtube from "../../images/ytb.png"
import zalo from "../../images/zalo.png"

const Social = () => {
    return(
        <div className="social col-6">
            <h4>MẠNG XÃ HỘI</h4>
            <div className="row">
                <div className="facebook">
                    <Link to={`https://www.facebook.com/DalatUni/`}>
                        <img src={facebook} className="facebook" alt="facebook"/>
                    </Link>
                </div>
                <div className="youtube">
                    <Link to={`https://www.youtube.com/channel/UCebR0s9FjDZTtqKw0edCmZA`}>
                        <img src={youtube} className="youtube" alt="youtube"/>
                    </Link>
                </div>
                <div className="zalo">
                    <Link to={`https://zalo.me/1040313370479861634`}>
                        <img src={zalo} className="zalo" alt="zalo"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Social;