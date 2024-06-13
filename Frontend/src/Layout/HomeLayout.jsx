import { Outlet } from "react-router-dom";
import { NavbarWithMegaMenu } from "../Components/Home/Header";
import { FooterWithSitemap } from "../Components/Home/Footer";
function HomeLayout() {
  return (
    <div>
      <NavbarWithMegaMenu />
      <Outlet />
      <FooterWithSitemap />
    </div>
  );
}

export default HomeLayout;
