import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import logo from '../assets/images/Logo.png';

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const { futsalData } = useSelector((state) => state?.futsal);

  return (
    <div className='bg-black text-white'>
      <div className='container mx-auto px-4 md:px-10 lg:px-20 py-6'>
        <div className='flex flex-col md:flex-row items-center justify-between mb-4'>
          <img src={logo} className='w-32 h-auto mb-4 md:mb-0 rounded-lg' alt="logo" />
          
          <ul className='text-lg'>
            <li className='mb-2 text-xl'>Contact Us</li>
            <li>+977-0145325</li>
            <li>bhatbhateni@gmail.com</li>
            <li>Chuchepati, Chabahil</li>
          </ul>
          
          <div className='flex flex-col gap-2 md:flex-row text-lg'>
            <p className='text-xl font-semibold'>FAQ</p>
            <p className='text-xl font-semibold'>About Us</p>
          </div>
          
          <div className='flex gap-4 mt-4 md:mt-0'>
            <FaFacebook size={32} />
            <FaInstagram size={32} />
            <FaYoutube size={32} />
            <FaTiktok size={32} />
            <FaTwitter size={32} />
          </div>
        </div>
        
        <div className='text-center'>
          <p className='text-sm md:text-base'>
            &copy; {year} Book Bhatbhateni Futsal. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
