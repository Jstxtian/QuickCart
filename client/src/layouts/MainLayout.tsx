import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";
import AddedToCartModal from "../components/product/AddedToCartModal";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AddedToCartModal />
    </>
  );
};

export default MainLayout;
