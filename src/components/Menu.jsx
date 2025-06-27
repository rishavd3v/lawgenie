import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import PopupCard from "./PopupCard";
import { LogOut, Settings } from "lucide-react";

export default function Menu({ref}) {   
    const navigate = useNavigate();
    const {signoutUser} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [popupData, setPopupData] = useState({});

    const handleLogout = async () => {
        try {
            await signoutUser();
            navigate('/profile');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
    const handlePopup = (onConfirm,text)=>{
        setPopupData({onConfirm,text});
        setIsOpen(true);
    }
    return(
        <div ref={ref} className="absolute top-12 right-1 bg-gray-800 border border-gray-700 shadow-md py-2 p-1 w-48 rounded-lg text-white text-sm">
            <div className="w-full">
                <button className="hover:bg-gray-500 w-full text-left px-2 py-1  rounded-lg flex items-center gap-2 cursor-pointer transition-all duration-150" onClick={()=>navigate('/profile')}>
                    <Settings size={16}/>
                    <div>Settings</div>
                </button>

                <div className="h-[1px] w-full bg-gray-700"></div>

                <button className="hover:bg-gray-500 hover:text-white w-full text-left px-2 py-1 rounded-lg transition-all flex items-center gap-2 cursor-pointer" onClick={()=>handlePopup(handleLogout,"Are you sure you want to delete your account? This action cannot be undone.")}>
                    <LogOut size={16}/>
                    <div>Logout</div>
                </button>

                <PopupCard isOpen={isOpen} setIsOpen={setIsOpen} data={popupData}/>
            </div>
        </div>
    )
}