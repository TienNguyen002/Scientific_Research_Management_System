import Navbar from "../../Components/Shared/Navbar"
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Shared/Footer/Footer";

const Layout = () => {
    return(
        <>
            <Navbar/>
            <div>
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}

export default Layout; 