import { Outlet } from "react-router-dom";
import { NavbarWithMegaMenu } from "../Components/Home/Header";
function HomeLayout() {
  return (
    <div>
      <NavbarWithMegaMenu />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
