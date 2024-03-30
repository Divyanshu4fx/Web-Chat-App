// import { useEffect, useState } from "react"
// import toast from "react-hot-toast";

// const useGetConversation = () => {
//     const [loading, setLoading] = useState(false);
//     const [chats, setChats] = useState([]);
//     const {loadingG, groups} = useGetGroups();
//     useEffect(() => {
//         const getConversation = async () => {
//             setLoading(true);
//             try {
//                 const res = await fetch("/api/users",
//                 {
//                     credentials: 'include',
//                 });
//                 const data = await res.json();
//                 if (data.error) {
//                     throw new Error(data.error)
//                 }
//                 setChats(data);
//             }
//             catch (e) {
//                 toast.error(e.message);
//             }
//             finally {
//                 setLoading(false);
//             }
//         }
//         getConversation();
//     }, [])
//     return {loading,chats};
// }

// export default useGetConversation;

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetching users
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
                setChats(mergedChats);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { loading, chats };
};

export default useGetConversation;
