import { Scale } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";
import Menu from "./Menu";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";

export default function Navbar(){
    const {user, loading} = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();
    const ref = useRef(null);
    
    useClickAway(ref,()=>{
        setShowDropdown(false);
    });
    useEffect(() => {
        setShowDropdown(false);
    },[location])

    return(
        <div className="flex justify-between items-center p-4 px-30 bg-primary text-white border-b border-gray-800/50">
            <Link to={''} className="flex gap-1 items-center text-2xl font-semibold font-mono"><Scale size={24}/>LawGenie</Link>
            {user && 
                <div ref={ref} className="relative">
                    <div className="flex gap-4 items-center text-sm font-semibold">
                        <button className="cursor-pointer" onClick={()=>setShowDropdown(!showDropdown)}><Avatar size={10}/></button>
                        {showDropdown && <Menu/>}
                    </div>
                </div>
            }
            {!user && !loading && <div className="flex gap-4 items-center text-sm font-semibold">
                <Button className={"bg-blue-500 hover:bg-blue-600"} to={'profile'}>Sign In</Button>
            </div>}
        </div>
    )
}

function Button({children, className,to}) {
    return (
        <Link to={to}  className={`px-4 py-2 rounded-md transition duration-200 cursor-pointer ${className}`}>
            {children}
        </Link>
    );
}