import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-white">
            <h1 className="text-9xl font-extrabold text-black tracking-widest">
                404
            </h1>
            <div className="text-black font-bold px-4 text-xl">
                Page not found ...
            </div>
            <button className="mt-5">
                <a className="relative inline-block text-sm font-medium text-white group active:text-yellow-500 focus:outline-none focus:ring">
                    <span onClick={() => navigate(-1)} className="relative block px-8 py-3 bg-[#1A2238] border border-current cursor-pointer">
                        Go Back
                    </span>
                </a>
            </button>
        </div>
    );
}

export default NotFound;