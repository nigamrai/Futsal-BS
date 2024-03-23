import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
     <Route path="/home" element={<HomePage/>}></Route>

      <Route path="/" element={<Login />}></Route>

    </Routes>
  );
}

export default App;
