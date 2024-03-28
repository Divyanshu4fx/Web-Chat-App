import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { useState } from "react";
function UploadData() {
    const [loading ,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const handleData = async (formData) => {
        const {fullname,username,gender} = formData;
        setLoading(true);
        try {
            const res = await fetch('/api/update/user', {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({fullname,username,gender}),
            });
            const data = await res.json();
            console.log(data);
            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success("Changes Saved Succesfully");
        } catch (error) {
            console.error('Error :', error);
        }
        finally{
            setLoading(false);
        }
    };
    return {loading,handleData};
}

export default UploadData;