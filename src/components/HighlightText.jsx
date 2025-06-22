import { Sparkles } from "lucide-react";

export default function HighlightText({children, className="mb-6"}) {
    return(
        <div className={`rounded-full flex gap-2 items-center py-2 px-4 bg-blue-600/20 text-blue-400 ${className}`}>
            <Sparkles size={17}/> {children}
        </div>
    )
}