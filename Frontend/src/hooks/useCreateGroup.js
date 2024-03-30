import { useState } from "react";
import toast from "react-hot-toast";

const useCreateGroup = () => {
    const [loading, setLoading] = useState(false);
    const createGroup = async ( groupname, user ) => {
        setLoading(true);
        if (!groupname) {
            toast.error("Groupname is required");
            return;
        }
        if (user < 2) {
            toast.error("Group must have more than 2 members.");
            return;
        }
        const participants = user.map(user => user._id);
        try {
            const res = await fetch("/api/group/creategroup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ groupName : groupname, participants }),
            })
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success(data.message);
        } catch (e) {
            toast.error(e.message);
        }
        finally {
            setLoading(false);
        }
    }
    return { loading, createGroup };
}

export default useCreateGroup;