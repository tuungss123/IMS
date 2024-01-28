import "./styles.css";
import { SidenavData } from './SidenavData';

function SideNav() {
  return (
    <div className='SideBar'>
        <ul className='SideBarList'>
        {SidenavData.map(( val, key) => {
            return( 
                <li 
                key={key} 
                className='row'
                id={window.location.pathname == val.link ? "active" : ""}
                onClick={()=>{window.location.pathname = val.link}}
                >
                    <div id='icon'>{val.icon}</div>
                    <div id='title'>{val.title}</div>
                </li>
            )
        })}
        </ul>
    </div>
  )
}

export default SideNav;