// import { useEffect, useState } from "react"
// import toast from "react-hot-toast";

// const useGetGroups = () => {
//     const [loading, setLoading] = useState(false);
//     const [groups, setGroups] = useState([]);
//     useEffect(() => {
//         const getGroups = async () => {
//             setLoading(true);
//             try {
//                 const res = await fetch("/api/group/getgroups",
//                 {
//                     credentials: 'include',
//                 });
//                 const data = await res.json();
//                 if (data.error) {
//                     throw new Error(data.error)
//                 }
//                 setGroups(data);
//             }
//             catch (e) {
//                 toast.error(e.message);
//             }
//             finally {
//                 setLoading(false);
//             }
//         }
//         getGroups();
//     }, [])
//     return {loading,groups};
// }

// export default useGetGroups;