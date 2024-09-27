
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './Components/Navbar';
import Courses from './Components/Courses';
import Users from './Components/Users';
import useZuStore from "./zuStore";
import { useEffect } from "react";
import MyCourses from "./Components/MyCourses";


function App() {
 const setCourses = useZuStore((state) => (state.setCourses));
 const setLearners = useZuStore((state) => (state.setLearners));
 const setMyCourses = useZuStore((state) => (state.setMyCourses));
 const activeLearner = useZuStore((state) => state.activeLearner);

  

  useEffect(() => {
   
      setCourses();
      setLearners();
      setMyCourses();
    
  }, [])

  return (
    <>
     <BrowserRouter>
          <Navbar />
          {activeLearner.learner_id && <h2 className="helloMessage">Hi, <span className="activeUserName">{activeLearner.name}</span></h2>}
            <Routes>
              <Route path="/" element={<Courses />} />
              <Route path="/users" element={<Users/>} />
              <Route path="/mycourses" element={<MyCourses />} />
     
     
      </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App;
