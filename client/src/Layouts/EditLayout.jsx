import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import logo from '../assets/images/Logo.png';
import { logout } from '../redux/slices/authSlices';

function EditBooking({children}) {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  async function handleLogout(){
    const response=await dispatch(logout());
    if(response?.payload?.success){
      navigate("/");
    }
  }
  return (
    <div className="min-h-[100vh]  bg-[#0A7116] ">
        <header className='flex justify-between items-center py-4 px-[100px]'>
            <img src={logo} className='w-[150px] h-[60px]' alt="logo"/>
            <ul className='flex  gap-8 text-[#FFDC58] font-bold text-[25px] '>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link>My Bookings</Link></li>
                <li><Link>Contact Us</Link></li>
                
            </ul>
            <button className='text-[25px] bg-[#2BA942] text-white font-bold px-4 py-2 rounded-sm' onClick={handleLogout}>Logout</button>
        </header>
        {children}
        <Footer/>
    </div>
  );
}
export default EditBooking;
