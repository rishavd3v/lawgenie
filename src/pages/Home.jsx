import { useEffect, useState } from 'react';
import { ArrowRight, Globe, Menu, NotebookPen, Upload } from 'lucide-react';
import SelectCountry from '../components/SelectCountry';
import Container from '../components/Container';
import { useCreateChat } from '../utils/fetch';
import Grid from '../components/ui/Grid';
import Sidebar from '../components/Sidebar';
import { useChatStore } from '../store/chatStore';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const {question,setQuestion, selectedCountry, setSelectedCountry,setHistory,setConversation,setConversationId, addMessage} = useChatStore();
    const [activeTab, setActiveTab] = useState("question");
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const createChat = useCreateChat();
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(true);
    const [sidebarClosed, setSidebarClosed] = useState(false);

    useEffect(() => {
        if(!showSidebar){
            const timeout = setTimeout(() => setSidebarClosed(true), 300);
            return () => clearTimeout(timeout);
        }
        else{
            setSidebarClosed(false);
        }
    }, [showSidebar]);

    const handleSubmit = async () => {
        if (!question) {
            alert("Please enter a question");
            return;
        }
        setConversation(question.slice(0,15));
        addMessage({
            role: 'user',
            content: question,
            timestamp: new Date().toLocaleTimeString(),
        });
        setLoading(true);
        try{
            const response = await createChat(question,selectedCountry);
            addMessage({
                role: 'model',
                content: response.text,
                timestamp: new Date().toLocaleTimeString(),
            });
            setConversationId(response.conversationId);
            setHistory(response.history);
            navigate(`/chat/${response.conversationId}`);
        }
        catch(error) {
            setQuestion("");
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching data. Please try again later.");
        }
        finally{
            setLoading(false);
            setQuestion("");
        }
    };

    return(
        <Grid>
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>

            {sidebarClosed && (
                <button className="fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md shadow hover:bg-gray-700 transition-all cursor-pointer" onClick={() => setShowSidebar(true)}>
                    <Menu size={20} />
                </button>
            )}

            <div className={`col-span-5 h-screen flex justify-center items-center transition-transform duration-300 ease-in-out ${!showSidebar && "-translate-x-30"}`}>
                <Container className='w-3/4'>
                    <div className='flex gap-2 justify-start'>
                        <Tab className={`${activeTab=="question"?"bg-green-600":"bg-gray-500 hover:bg-gray-700"}`} onClick={()=>setActiveTab("question")}><NotebookPen size={18}/> Ask Question</Tab>
                        <Tab disabled={true}  className={`${activeTab=="document"?"bg-green-600":"bg-gray-500 hover:bg-gray-600"}`}><Upload size={18}/> Analyse Document</Tab>
                    </div>
                    
                    {activeTab=="question" && (
                        <div className='w-full space-y-4'>
                            <div className='space-y-2'>
                                <p className='font-semibold text-sm text-gray'>What do you need help with?</p>
                                <Textarea question={question} setQuestion={setQuestion} />
                            </div>
                
                            <div className='space-y-2'>
                                <p className='font-semibold text-sm text-gray flex items-center gap-1'><Globe size={16}/> Select your country</p>
                                <SelectCountry showDropdown={showDropdown} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setShowDropdown={setShowDropdown} />
                            </div>
                            <ActionButton loading={loading} onClick={handleSubmit}>Get Legal Analysis</ActionButton>
                        </div>
                    )}
                </Container>
            </div>
        </Grid>
    )
}

export function Textarea({question,setQuestion, loading}){
    const handleChange = (e) => {
        setQuestion(e.target.value);
    }
    return(
        <textarea value={question} onChange={handleChange} placeholder='e.g.  What documents are required to start a restaurant business in my country?' className={"w-full h-32 p-2 bg-primary text-white text-sm rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition duration-200 resize-none disabled:pointer-events-none"} disabled={loading}/>
    )
}

function Tab({children,onClick,className,disabled}) {
    return (
        <button className={`px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition duration-200 disabled:opacity-50 disabled:pointer-events-none ${className}`}disabled={disabled} onClick={onClick}>
            <div className='flex gap-2'>{children}</div>
        </button>
    )
}

function ActionButton({children,loading, onClick}) {
    return(
        <button className={`flex items-center justify-center group bg-green-600 hover:bg-green-700 transition duration-200 py-2 rounded-md cursor-pointer w-full mt-4 ${loading && "cursor-not-allowed opacity-50 disabled:pointer-events-none"}`} onClick={onClick} disabled={loading}>
            {loading ? (
                <>
                <div className="flex animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"/>Analyzing...</>
            ) : (
                <div className='flex gap-2 justify-center items-center'>
                    {children}<ArrowRight size={18} className='group-hover:translate-x-1 transition-transform duration-100'/>
                </div>
            )}
        </button>
    )
}