import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import logo from '../assets/images/Logo.png';

function HomeLayout({children}) {
  
  return (
    <div className="min-h-[90vh]  bg-[#0A7116] ">
        <header className='flex justify-between items-center py-4 px-[100px]'>
            <img src={logo} className='w-[150px] h-[60px]' alt="logo"/>
            <ul className='flex  gap-8 text-[#FFDC58] font-bold text-[25px] '>
                <li><Link>Home</Link></li>
                <li><Link>Details</Link></li>
                <li><Link>Payments</Link></li>
                
            </ul>
            <button className='text-[25px] bg-[#2BA942] text-white font-bold px-4 py-2 rounded-sm'>Logout</button>
        </header>
        {children}
        <Footer/>
    </div>
  );
}
export default HomeLayout;
