import Navbar from "../../Components/Shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Shared/Footer/Footer";
import { SnackbarProvider } from "notistack";

const Layout = () => {
  return (
    <>
      <SnackbarProvider>
        <Navbar />
        <div>
          <Outlet />
        </div>
        <Footer />
      </SnackbarProvider>
    </>
  );
};

export default Layout;
