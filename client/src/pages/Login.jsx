import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/Logo.png';

function Login(){
    const [loginData,setLoginData]=useState({
        email:"",
        password:""
    })
    function handleUserInput(e){
        const {name,value}=e.target;
        setLoginData({
            ...loginData,
            [name]:value
        })
    }
    return <div className="h-screen bg-[#0A7116] w-full p-12">
            <div className="bg-[#F0F2F5] w-[1450px] h-[650px] rounded-xl border-8 border-[#50A637] flex justify-evenly items-center gap-20 px-20">
                <div className="flex flex-col gap-2 ">
                    <img src={logo} className='w-[200px]'/>
                    <h1 className='text-4xl font-bold w-[300px]'>Rave Futsal Booking System</h1>
                </div>
                <div>
                    <form className='bg-[#FEFAFA]  w-[400px] h-[300px] rounded-md pt-8 flex flex-col items-center gap-6'>
                        <div className='flex flex-col justify-center items-center gap-2 '>
                        <div>
                            <input 
                            className='w-[350px] h-[50px] rounded-md px-4 border-2 border-black'
                            name="email"
                            onChange={handleUserInput}
                            type="email"
                            placeholder='Email address'
                            value={loginData.email} 
                            />
                        </div>
                        <div>
                            <input 
                            className='w-[350px] h-[50px] rounded-md px-4 border-2 border-black'
                            name="password"
                            type="password"
                            placeholder='Password'
                            value={loginData.password}
                            />
                        </div>
                        
                        </div>
                        <button type="submit" className='bg-[#2BA942] w-[350px] rounded-md h-[50px] text-white text-2xl font-bold'>Login</button>
                        <div className='flex flex-col gap-4 items-center'>
                            <div className='w-[350px] h-[1px] bg-black'></div>
                            <p>Don't have an account? <Link to="/signup" className='text-[#1877F2] font-bold'>Signup</Link></p>
                        </div>
                    </form>
                </div>
            </div>
    </div>
    
}
export default Login;