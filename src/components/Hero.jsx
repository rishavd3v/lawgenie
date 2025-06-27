import HighlightText from "./HighlightText";
import ActionButton from "./ActionButton";

export default function Hero() {
    return(
        <div className="flex flex-col gap-6 items-center justify-center text-center h-[80vh] px-10">
            <HighlightText>Powered by Advanced AI</HighlightText>
            <div className="text-7xl font-bold">Your Intelligent <span className="bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">Legal Assistant</span></div>
            <div className="text-2xl text-gray px-20">Streamline your legal workflow with AI-powered document analysis, contract review, and legal research. Get instant insights and save hours of manual work.</div>
            <ActionButton to={'home'}>Get Started</ActionButton>
        </div>
    )
}