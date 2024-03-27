import { useEffect, useState } from "react";
import useChat from "../zustand/useConversation";
import toast from "react-hot-toast";
import { compare } from "bcryptjs";
const useGetMessages = () => {
    const [loading, setLoading] = useState();
    const { messages, setMessages, selectedChat } = useChat();
    useEffect(() => {
        const getMessages = async () => {
            console.log("Getting Messages...");
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedChat._id}`);
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setMessages(data);
            } catch (e) {
                toast.error(e.message);
            }
            finally {
                setLoading(false);
            }
        }
        if (selectedChat?._id) getMessages()
    }, [selectedChat?._id, setMessages])
    return { loading, messages };
}
export default useGetMessages;