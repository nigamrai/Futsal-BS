import { Route, Routes } from "react-router-dom";

import Confirmation from "./Components/Auth/Confirmation";
import RequireAuth from "./Components/Auth/RequireAuth";
import EditBooking from "./Components/EditBooking";
import Loader from "./Components/Loader/Loader";
import useLoadingWithRefresh from "./hooks/useLoadingWithRefresh";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Denied from "./pages/Denied";
import EditPage from "./pages/Edit";
import FutsalAdmin from "./pages/FutsalAdmin";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SetPassword from "./pages/SetPassword";
import Signup from "./pages/Signup";
import User from "./pages/User";
function App() {
  const { loading } = useLoadingWithRefresh();

  return loading ? (
    <Loader message="Loading, please wait.." />
  ) : (
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/set-password/:token" element={<SetPassword />}></Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/confirmation/:token" element={<Confirmation />}></Route>
      {/* <Route path="futsal/booking/payment" element={<Payment/>}></Route> */}
      <Route
        element={<RequireAuth allowedRoles={["USER", "ADMIN", "SUPERADMIN"]} />}
      >
        <Route path="/home" element={<HomePage />}></Route>
      </Route>
      <Route element={<RequireAuth allowedRoles={["SUPERADMIN"]} />}>
        <Route path="/superadmin/user/edit/:id" element={<EditPage />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN", "SUPERADMIN"]} />}>
        <Route
          path="/admin/futsaladmin/edit/:id"
          element={<EditBooking />}
        ></Route>
        <Route path="/futsaladmin" element={<FutsalAdmin />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Route>
      <Route path="/editbooking" element={<EditBooking />}></Route>
      <Route path="*" element={<NotFound />}></Route>
      <Route path="/denied" element={<Denied />}></Route>
    </Routes>
  );
}

export default App;
