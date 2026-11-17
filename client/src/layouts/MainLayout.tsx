import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";
import AddedToCartModal from "../components/product/AddedToCartModal";
import ScrollToTop from "../components/layout/ScrollToTop";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
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
