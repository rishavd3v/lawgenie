import axios from "axios"
import { useAuth } from "../context/AuthContext";

export const useCreateChat = () => {
    const { user } = useAuth();

    const createChat = async (message,country,history=[], conversationId) => {
        if (!user) {
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