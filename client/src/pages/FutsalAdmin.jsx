import FutsalLayout from "../Layouts/FutsalLayout";

function FutsalAdmin(){
   return <FutsalLayout>
           <div className="bg-white w-full h-screen">
            <p className="text-black font-bold text-5xl text-center p-10">Timetable</p>
            <div className="flex flex-col gap-3 text-black font-bold ml-[1000px]">
                <div className="bg-[#2BA942] w-[30px] h-[30px]">
                    <p className="ml-[35px] w-[150px]">Available</p>
                </div>
                <div className="bg-[#FC0101] w-[30px] h-[30px]">
                    <p className="ml-[35px] w-[150px]">Booked and Paid</p>
                </div>
                <div className="bg-[#FFAC33] w-[30px] h-[30px]">
                    <p className="ml-[35px] w-[160px]">Booked But not Paid</p>
                </div>
            </div>
        </div>
   </FutsalLayout>

} 
export default FutsalAdmin;