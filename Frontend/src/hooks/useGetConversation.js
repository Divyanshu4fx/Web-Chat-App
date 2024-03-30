import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/users",
                {
                    credentials: 'include',
                });
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setChats(data);
            }
            catch (e) {
                toast.error(e.message);
            }
            finally {
                setLoading(false);
            }
        }
        getConversation();
    }, [])
    return {loading,chats};
}

export default useGetConversation;