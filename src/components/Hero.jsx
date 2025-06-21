import { ArrowRight, Sparkles} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const navigate = useNavigate();
    return(
        <div className=" bg-background flex flex-col gap-6 items-center justify-center text-center h-screen">
            <HighlightText/>
            <div className="text-7xl font-bold">Your Intelligent <span className="bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">Legal Assistant</span></div>
            <div className="text-2xl text-gray px-20">Streamline your legal workflow with AI-powered document analysis, contract review, and legal research. Get instant insights and save hours of manual work.</div>
            <ActionButton onClick={()=>navigate('/home')}>Get Started</ActionButton>
        </div>
    )
}

function HighlightText(){
    return(
        <div className="rounded-full flex gap-2 items-center py-2 px-4 bg-blue-600/20 text-blue-400 mb-8">
            <Sparkles size={17}/> Powered by Advanced AI
        </div>
    )
}

function ActionButton({children, onClick}) {
    return(
        <button className="group flex items-center gap-2 py-2 px-4 rounded-md bg-green-600 cursor-pointer hover:bg-green-700 transition-all duration-100" onClick={onClick}>      
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-100"/>
            {children}
        </button>
    )
}