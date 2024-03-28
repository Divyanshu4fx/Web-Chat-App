import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { useState } from "react";
function UploadImge() {
    const [loading ,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const handleUpload = async (event) => {
        const formData = new FormData();
        setLoading(true);
        formData.append('profileImage', event.target.profileImage.files[0]);
        try {
            const res = await fetch('/api/update/profilePic', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            console.log(data);
            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error('Error uploading image:', error);
        }
        finally{
            setLoading(false);
        }
    };
    return {loading,handleUpload};
}

export default UploadImge;