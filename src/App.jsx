import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Courses from "./Components/Courses";
import Users from "./Components/Users";
import useZuStore from "./zuStore";
import { useEffect } from "react";

function App() {
  const setCourses = useZuStore((state) => state.setCourses);
  const setMyCourses = useZuStore((state) => state.setMyCourses);

  useEffect(() => {
    setCourses();

    setMyCourses();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/users" element={<Users />} />
          {/* <Route path="/mycourses" element={<MyCourses />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
