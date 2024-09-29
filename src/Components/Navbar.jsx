import useZuStore from '../zuStore';
import './index.css';
import { useLocation } from "react-router-dom";

function Navbar() {
    const locationPath = useLocation();
    const path = locationPath.pathname;

    const activeLearner = useZuStore((state) => state.activeLearner);
  return (
    <div className="navbar">
      <a href="/"><h2 className="titleOfTheApp">Course Hub</h2></a>
       <div className="navButtons">
         <a href="/" className={path=="/"?"activeA":"passiveA"}>Courses</a>
         
         <a href="/users" className={path=="/users"?"activeA":"passiveA"}>{activeLearner.name? activeLearner.name:"Users"}</a>
        
            
        </div>
    </div>
  )
}

export default Navbar;