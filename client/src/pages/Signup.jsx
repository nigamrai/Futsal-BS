import Logo from '../assets/images/Logo.png';
function Signup(){
    return (
        <div className="h-screen bg-[#0A7116] w-full p-10">
            <div className="bg-[#F0F2F5] w-[1285px] h-[575px] rounded-2xl border-8 border-[#50A637] flex justify-around items-center gap-20">
                <div className="flex flex-col gap-2 ">
                    <img src={Logo} className='w-[200px]'/>
                    <p className="text-3xl w-[250px]"><b>Rave Futsal Booking System</b></p>
                </div> 
                <div className='bg-[#FEFCFC] h-[450px] w-[440px] rounded-xl'>
                    <div className='flex flex-col items-center gap-2 pt-8'>
                        <div>
                            <input className='w-[400px] h-[35px]  border-[1px] border-black rounded p-3' type='text' placeholder='Full name'/>
                        </div>
                        <div>
                        <input className='w-[400px] h-[35px]  border-[1px] border-black rounded p-3' type='tel' placeholder='Phone number'/>
                        </div>
                        <div>
                        <input className='w-[400px] h-[35px]  border-[1px] border-black rounded p-3' type='email' placeholder='Email address'/>
                        </div>
                        <div>
                        <input className='w-[400px] h-[35px]  border-[1px] border-black rounded p-3' type='text' placeholder='Password'/>
                        </div>
                        <div>
                        <input className='w-[400px] h-[35px] border-[1px] border-black rounded p-3' type='text' placeholder='Confirm password'/>
                        </div>
                    </div>
                    <div className='ml-[20px] mt-[10px]'>
                        <p> Role: 
                            <select className='bg-[#E1E1E2] ml-[5px]'>    
                            <option value="USER">USER</option>    
                            <option value="FUTSAL">FUTSAL</option>    
                            <option value="AADMIN">ADMIN</option>       
                            </select>
                        </p>  
                        <p className='mt-[10px] w-[400px]'>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.</p> 
                       
                            <button className=' text-white text-xl font-semibold p-1 text-center w-[400px] h-[50px] bg-[#2BA942] mt-[10px]'>SignUp</button>
                        
                        <p className='ml-[80px] mt-[10px]'>Already have an account?
                        <button className='text-[#1877F2] font-bold ml-1'>Login</button>
                        </p>
                    </div>
                </div>               
            </div>
        </div>
    )
}
export default Signup; 