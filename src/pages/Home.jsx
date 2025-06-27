import { useState } from 'react';
import { ArrowRight, Globe, NotebookPen, Upload } from 'lucide-react';
import SelectCountry from '../components/SelectCountry';
import Container from '../components/Container';
import Conversation from '../components/Conversation';
import { useCreateChat } from '../utils/fetch';

export default function Home() {
    const [activeTab, setActiveTab] = useState("question");
    const [question, setQuestion] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("India");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showConversation, setShowConversation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [history, setHistory] = useState([]);
    const createChat = useCreateChat();

    const handleSubmit = async () => {
        if (!question) {
            alert("Please enter a question");
            return;
        }
        setConversation(prev => [...prev, {role: 'user', content: question, timestamp: new Date().toLocaleTimeString()}]);
        setLoading(true);
        try{
            const response = await createChat(question,selectedCountry);
            setConversation(prev=>[...prev, {role: 'model', content: response.text, timestamp: new Date().toLocaleTimeString()}]);
            setHistory(response.history);
            setShowConversation(true);

        }
        catch(error) {
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching data. Please try again later.");
        }
        finally{
            setLoading(false);
            setQuestion("");
        }
    };

    if(showConversation){
        return <Conversation setQuestion={setQuestion} setShowConversation={setShowConversation} selectedCountry={selectedCountry} conversation={conversation} setConversation={setConversation} history={history} setHistory={setHistory}/>
    }

    return(
        <div className='h-[90vh] flex justify-center items-center'>
            <Container>
                <div className='flex gap-2 justify-start w-full'>
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