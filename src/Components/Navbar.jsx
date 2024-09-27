import './index.css';
import { useLocation } from "react-router-dom";

function Navbar() {
    const locationPath = useLocation();
    const path = locationPath.pathname;
  return (
    <div className="navbar">
      <h2 className="titleOfTheApp">Course Hub</h2>
       <div className="navButtons">
         <a href="/" className={path=="/"?"activeA":"passiveA"}>Courses</a>
          <a href="/mycourses" className={path=="/mycourses"?"activeA":"passiveA"}>My Courses</a>
         <a href="/users" className={path=="/users"?"activeA":"passiveA"}>Users</a>
        
            
        </div>
    </div>
  )
}

export default Navbar;