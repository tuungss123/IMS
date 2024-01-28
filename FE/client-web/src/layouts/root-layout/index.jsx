import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar";
import SideNav from "../../components/sidenav";
import './style.css'


const RootLayout = () => {
  return (
    <div className="protected-page">
        <NavBar />
        <div className="sidebar-main-container">
            <SideNav/>
            <div className="main-content">
              <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default RootLayout;