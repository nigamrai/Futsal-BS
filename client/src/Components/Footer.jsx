import { FaFacebook, FaInstagram, FaRegCopyright, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import logo from '../assets/images/Logo.png';
function Footer(){
    const currentDate=new Date();
    const year=currentDate.getFullYear();
    const {futsalData}=useSelector((state)=>state?.futsal);
    return <footer className='text-[#FFDC58] relative left-0 bottom-0 px-[100px]'>
        <div className='flex justify-between font-semibold mb-4'>
            <img src={logo} className='w-[150px] h-[60px]' alt="logo"/>
            <ul>
                <li className='text-2xl'>Contact Us</li>
                <li>{futsalData.map((futsal)=>futsal.futsalPhoneNumber)}</li>
                <li>{futsalData.map((futsal)=>futsal.futsalEmail)}</li>
                <li>{futsalData.map((futsal)=>futsal.futsalAddress)}</li>
            </ul>
            <p className='text-2xl'>FAQ</p>
            <p className='text-2xl'>About Us</p>
            <div className='flex gap-4'>
                <FaFacebook size={32}/>
                <FaInstagram size={32}/>
                <FaYoutube size={32}/>
                <FaTiktok size={32}/>
                <FaTwitter size={32}/>
            </div>
        </div>
        <div>
            <p className=' flex gap-2 items-center font-semibold justify-center'>Copyright {year} <FaRegCopyright/> Book Bhatbhateni Futsal. All rights reserved</p>
        </div>
    </footer>
}
export default Footer;