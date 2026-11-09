import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
