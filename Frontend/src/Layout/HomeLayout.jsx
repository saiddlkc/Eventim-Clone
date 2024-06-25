import { Outlet } from "react-router-dom";
import { NavbarWithMegaMenu } from "../Components/Home/Header";
import { FooterWithSitemap } from "../Components/Home/Footer";
import Settings from "../Components/Home/Settings";
function HomeLayout() {
  return (
    <div>
      <NavbarWithMegaMenu />

      <Settings />
      <Outlet />
      <FooterWithSitemap />
    </div>
  );
}

export default HomeLayout;
