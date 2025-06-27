import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ActionButton({children, onClick,to}) {
    return(
        <Link to={to} className="group flex items-center gap-2 py-2 px-4 text-black rounded-full bg-white cursor-pointer hover:bg-green-600 hover:text-white hover:shadow-2xl hover:shadow-green-400 hover:scale-105 transition-all duration-300" onClick={onClick}>      
            {children}
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-100"/>
        </Link>
    )
}