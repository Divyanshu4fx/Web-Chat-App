import { useState } from "react";
import toast from "react-hot-toast";
const useGetUser = () => {
    const [loading, setLoading] = useState(false);
    const getUser = async (senderId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/users/user/${senderId}`);
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            return data;
        } catch (e) {
            toast.error(e.message);
        }
        finally {
            setLoading(false);
        }
    }
    return { loading, getUser };
}
export default useGetUser;