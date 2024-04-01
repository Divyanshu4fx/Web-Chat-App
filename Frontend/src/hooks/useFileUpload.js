import axios from 'axios'
import { useState } from "react";
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast";
const uploadFile = () => {
    const [loading, setLoading] = useState();
    const { messages, setMessages, selectedChat } = useConversation()
    const upload = async (data) => {
        setLoading(true)
        try {
            const res = await axios.post(`/api/messages/uploadFile/${selectedChat._id}`, data)
            if (res.error) {
                throw new Error(res.error);
            }
            setMessages([...messages, res.data])
        }
        catch (e) {
            toast.error(e.message);
        }
        finally {
            setLoading(false);
        }
    }
    return {loading, upload}
}
export default uploadFile