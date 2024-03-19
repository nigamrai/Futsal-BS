import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// Hi Soltini
function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  );
}

export default App;
