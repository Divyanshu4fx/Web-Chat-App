import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const usersRes = await fetch("/api/users", {
                    credentials: 'include',
                });
                const usersData = await usersRes.json();
                if (usersData.error) {
                    throw new Error(usersData.error);
                }
                const groupsRes = await fetch("/api/group/getgroups", {
                    credentials: 'include',
                });
                const groupsData = await groupsRes.json();
                if (groupsData.error) {
                    throw new Error(groupsData.error);
                }
                const mergedChats = [...usersData, ...groupsData];
                setChats(mergedChats.filter((Object) => { if(Object._id !== "660913e18dba4e4ba213aafa") return Object; }));
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { loading, chats , setChats };
};

export default useGetConversation;
