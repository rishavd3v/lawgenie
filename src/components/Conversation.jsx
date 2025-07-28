import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import { Send, SquarePen } from "lucide-react";
import axios from "axios";
import ReactMarkdown  from "react-markdown";
import { useCreateChat } from "../utils/Fetch";
import { useNavigate } from "react-router-dom";
export default function Conversation({selectedCountry,conversation,addMessage, history, setHistory, conversationId,resetChat}) {
    const [followUp, setFollowUp] = useState("");
    const [loading, setLoading] = useState(false);
    const bottonRef = useRef(null);
    const createChat = useCreateChat();
    const navigate = useNavigate();

    useEffect(() => {
        if (bottonRef.current) {
            bottonRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation]);

    const handleFollowUp = async (e) => {
        if(e && e.type === 'keydown' && e.key !== 'Enter') return;
        if (!followUp.trim()) return;
        addMessage({
            role: 'user',
            content: followUp,
            timestamp: new Date().toLocaleTimeString(),
        });
        setFollowUp('');
        setLoading(true);
        try{
            const response = await createChat(followUp,selectedCountry, history, conversationId);
            addMessage({
                role: 'model',
                content: response.text,
                timestamp: new Date().toLocaleTimeString(),
            })
            setHistory(response.history);
        }
        
        catch(error) {
            console.error("Error fetching data:", error);
            addMessage({
                role: 'model',
                error: "Error: An error occurred while fetching data. Please try again later.",
                timestamp: new Date().toLocaleTimeString(),
            })
        }
        finally {
            setLoading(false);
        }
    }

    const handleReset=()=>{
        resetChat();
        navigate('/home')
    }

    return(
        <div className='flex flex-col gap-4 items-center justify-center h-full w-full'>
            <div className='w-full flex justify-between'>
                <div className='font-medium'>Legal Analysis - {selectedCountry}</div>
                <button onClick={handleReset} className='flex gap-2 items-center text-sm hover:bg-white hover:text-background px-2 py-2 rounded-md cursor-pointer bg-gray-800 border border-gray-600 text-white transition-all duration-200'><SquarePen size={16}/>New Chat</button>
            </div>
            <Container>
                <div className='w-full flex flex-col gap-10 text-sm'>
                    {conversation.map((msg, index) => {
                        const isLast = index === conversation.length - 1;
                        return(
                            <div key={index} ref={isLast?bottonRef:null} className={`flex ${msg.role=='user'?"justify-end":"justify-start"}`}>
                                <div className={`max-w-[70%] flex flex-col gap-1 p-3 rounded-lg ${msg.role === 'user'?'bg-green-600 text-white':'bg-gray-800 text-gray-100 border border-gray-700'} `}>
                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    {msg.error && <p className="text-red-500 text-xs">{msg.error}</p>}
                                    <p className="text-xs text-gray-300">{msg.timestamp}</p>
                                </div>
                            </div>
                        )
                    })}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-500 border-t-transparent" />
                                <span className="text-gray-300 text-sm">AI is thinking...</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={bottonRef}/>
                </div>
            </Container>

            <div className='w-full flex items-center gap-2'>
                <input className='w-full h-full px-2 py-3 rounded-md focus:outline-none bg-gray-800 border-gray-700 text-white text-sm disabled:pointer-events-none' type="text" placeholder='Ask a follow-up question...' value={followUp} onChange={(e)=>setFollowUp(e.target.value)} onKeyDown={!loading ? handleFollowUp:undefined}/>
                <button onClick={handleFollowUp} className={`flex justify-center items-center h-full bg-green-600 p-3 rounded-md hover:bg-green-700 cursor-pointer disabled:pointer-events-none disabled:opacity-50`} disabled={loading || !followUp.trim()}><Send size={15}/></button>
            </div>
        </div>
    )
}