import { useNavigate } from "react-router-dom";

function Denied() {
    const navigate = useNavigate();
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-white">
            <h1 className="text-9xl font-extrabold text-black tracking-widest">
                403
            </h1>
            <div className="text-black px-2 text-2xl font-bold ">
                Access denied
            </div>
            <button className="mt-5">
                <a className="relative inline-block text-sm font-medium text-white group active:text-yellow-500 focus:outline-none focus:ring">
                    <span onClick={() => navigate(-1)} className="relative block px-8 py-3 bg-[#1A2238] border border-current cursor-pointer">
                        Go Back
                    </span>
                </a>
            </button>
        </main>
    );

}

export default Denied;