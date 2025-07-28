import { useParams } from 'react-router-dom';
import { useChatStore } from '../store/chatStore';
import Conversation from '../components/Conversation';
import { useEffect } from 'react';
import { useGetMessages } from '../utils/Fetch';

export default function ChatPage() {
  const { conversationId } = useParams();
  const {conversation, setConversation,setConversationId,history,setHistory,setQuestion,selectedCountry,addMessage, resetChat} = useChatStore();
  const getMessages = useGetMessages();  

  useEffect(() => {
    if (conversationId) {
      setConversationId(conversationId);
    }
    const fetchMessages = async () => {
      try {
        const messages = await getMessages(conversationId);
        setMessages(messages);
        console.log("Fetched messages:", messages);
      }
      catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  },[conversationId]);
  
  const setMessages = (messages) => {
    if(messages && messages.length > 0) {
      const formattedMessages = messages.map((item) => ({
        role: item.role,
        content: item.content,
        timestamp: new Date(item.updatedat).toLocaleTimeString()
      }));
      setConversation(formattedMessages);
      const formattedHistory = messages.map((item)=>({
        role:item.role,
        parts:[{text:item.content}]
      }))
      setHistory(formattedHistory);
    }
  }
  
  return (
    <div className='flex h-screen justify-center px-30 items-center'>
        <Conversation
          conversationId={conversationId}
          setConversationId={setConversationId}
          conversation={conversation}
          setConversation={setConversation}
          history={history}
          setHistory={setHistory}
          setQuestion={setQuestion}
          selectedCountry={selectedCountry}
          addMessage={addMessage}
          resetChat={resetChat}
        />
    </div>
  );
}
