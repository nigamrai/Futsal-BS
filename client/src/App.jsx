import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";
import Futsal from "./pages/Futsal";
import FutsalAdmin from "./pages/FutsalAdmin";
import TotalUsers from "./pages/TotalUsers";
import EditPage from "./pages/Edit";


function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
     <Route path="/home" element={<HomePage/>}></Route>

      <Route path="/" element={<Login />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/user" element={<User />}></Route>
      <Route path="/futsal" element={<Futsal />}></Route>
      <Route path="/futsaladmin" element={<FutsalAdmin />}></Route>
      <Route path="/totalusers" element={<TotalUsers />}></Route>
      <Route path="/superadmin/user/edit/:id" element={<EditPage/>}></Route>
      
    </Routes>
  );
}

export default App;
