import axios from "axios"
import { useAuth } from "../context/AuthContext";

export const useCreateChat = () => {
    const { user } = useAuth();

    const createChat = async (message,country,history=[], conversationId) => {
        if(!user) {
            throw new Error("User not authenticated. Please sign in to continue.");
        }
        try{
            const token = await user.getIdToken();
            const res = await axios.post(
                'http://localhost:3000/api/chat',
                { message, country, history, conversationId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return res.data;
        }
        catch(error) {
            console.error("Error creating chat:", error);
            throw new Error("An error occurred while creating the chat. Please try again later.");
        }

    };

    return createChat;
};

export const useGetConversation = () => {
    const { user } = useAuth();
    const getConversation = async () => {
        if (!user) {
            throw new Error("User not authenticated. Please sign in to continue.");
        }
        try{
            const token = await user.getIdToken();
            const res = await axios.get(
                `http://localhost:3000/chat/recentChats`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return res.data;
        }
        catch(error) {
            console.error("Error fetching chat history:", error);
            throw new Error("An error occurred while fetching chat history. Please try again later.");
        }
    };

    return getConversation;
}

export const useDeleteChat = () => {
    const { user } = useAuth();
    const deleteChat = async (id) => {
        if (!user) {
            throw new Error("User not authenticated. Please sign in to continue.");
        }
        try{
            const token = await user.getIdToken();
            const res = await axios.delete(
                `http://localhost:3000/chat/deleteChat/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        }
        catch(error) {
            console.error("Error deleting chat:", error);
            throw new Error("An error occurred while deleting chat. Please try again later.");
        }
    };

    return deleteChat;
}

export const useGetMessages = () => {
    const { user } = useAuth();
    const getMessages = async (conversationId) => {
        if (!user) {
            throw new Error("User not authenticated. Please sign in to continue.");
        }
        try{
            const token = await user.getIdToken();
            const res = await axios.get(`http://localhost:3000/chat/messages/${conversationId}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.data;
        }
        catch(err) {
            console.error("Error fetching messages:", err);
            throw new Error("An error occurred while fetching messages. Please try again later.");
        }
    }
    return getMessages;
}