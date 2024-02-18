import { Outlet } from "react-router-dom";
import CommissarySidenav from "../../components/sidenav/commissary";
import './style.css'


const CommissaryLayout = () => {
  return (
    <div className="protected-page">
        <div className="sidebar-main-container">
            <CommissarySidenav />
            
            <div className="main-content">
              <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default CommissaryLayout;