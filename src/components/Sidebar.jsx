import { useEffect, useState } from "react";
import { useDeleteChat, useGetConversation } from "../utils/fetch";
import { PanelLeftClose, Scale, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useChatStore } from "../store/chatStore";
import Avatar from "./Avatar";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({showSidebar, setShowSidebar}) {

    const [recentChats, setRecentChats] = useState();
    const getConversation = useGetConversation();
    const deleteChat = useDeleteChat();
    const navigate = useNavigate();
    const {setConversation, setHistory} = useChatStore();
    const {user} = useAuth();

    useEffect(()=>{
        try{
            const fetchData = async () => {
                const chats = await getConversation();
                setRecentChats(chats);
            };
            fetchData();
        }
        catch{
            console.error("Error fetching recent chats:", error);
            alert("An error occurred while fetching recent chats. Please try again later.");
        }
    },[])
    
    const handleNavigate = (id) => {
        setConversation([]);
        setHistory([]);
        navigate(`/chat/${id}`);
    }
    const handleDelete = async (id) => {
        deleteChat(id);
        setRecentChats(prev => prev.filter(chat => chat.id !== id));
    }
    return (
        <div className={`flex flex-col justify-between h-screen bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${showSidebar?"translate-x-0":"-translate-x-full"}`}>
            <div>
                <div>
                    <div className="flex p-2 text-xl items-center justify-between font-semibold font-mono">
                        <Link to='/' className="flex items-center gap-2">
                            <p><Scale size={20}/></p>
                            <p>LAWGENIE</p>
                        </Link>
                        <PanelLeftClose size={20} className="cursor-pointer" onClick={()=>setShowSidebar(false)}/>
                    </div>
                    <div className="h-[0.5px] bg-gray-700"></div>
                </div>
                {recentChats?.length>0 && <div className="px-2">
                    <h2 className="my-4 px-2 text-gray-300 text-sm">Recent Chats</h2>
                    <ul className="space-y-2">
                        {recentChats && recentChats.map((item, index) => (
                            <li key={index} className="group cursor-pointer flex justify-between items-center hover:bg-gray-700 rounded-md px-2 py-1 text-sm" onClick={()=>handleNavigate(item.id)}>
                                <div className="cursor-pointer">{item.title.charAt(0).toUpperCase() + item.title.slice(1)}...</div>
                                <button className="hidden group-hover:block hover:text-red-500 cursor-pointer" onClick={(e)=>{e.stopPropagation();handleDelete(item.id)}}><Trash size={16}/></button>
                            </li>
                        ))}
                    </ul>
                </div>}
            </div>
            {user && <div className="p-2 flex w-full mb-2">
                <div className="flex items-center gap-2 text-sm">
                    <Avatar onClick={()=>navigate("/profile")}/>
                    <div>
                        <div className="">{user.displayName}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                </div>
            </div>}
        </div>
    )
}