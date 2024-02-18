import { Outlet } from "react-router-dom";
import SideNav from "../../components/sidenav";
import './style.css'


const RootLayout = () => {
  return (
    <div className="protected-page">
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