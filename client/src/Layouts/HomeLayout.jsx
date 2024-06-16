import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import logo from '../assets/images/Logo.png';
import { logout } from '../redux/slices/authSlices';

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await dispatch(logout());
    if (response?.payload?.success) {
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="container mx-auto py-4 px-4 md:px-10 lg:px-20 flex items-center justify-between">
        <img src={logo} className="w-24 md:w-32 rounded-lg" alt="logo" />
        <nav className="space-x-4 md:space-x-8">
          <Link to="/home" className="text-lg md:text-xl font-semibold hover:text-yellow-600">Home</Link>
          <Link to="/about" className="text-lg md:text-xl font-semibold hover:text-yellow-600">About Us</Link>
          <Link to="/bookings" className="text-lg md:text-xl font-semibold hover:text-yellow-600">My Bookings</Link>
          <Link to="/contact" className="text-lg md:text-xl font-semibold hover:text-yellow-600">Contact Us</Link>
        </nav>
        <button
          onClick={handleLogout}
          className="text-lg md:text-xl font-semibold bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-300"
        >
          Logout
        </button>
      </header>
      <main className="container mx-auto mt-8 md:mt-12 px-4 md:px-10 lg:px-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default HomeLayout;
