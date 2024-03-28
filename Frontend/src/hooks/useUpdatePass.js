import { useState } from "react"
import toast from "react-hot-toast";

function updatePassword() {

    const [loading, setLoading] = useState(false);

    const handleReset = async (passwords) => {
        setLoading(true);
        const { oldPassword, newPassword, confirmPassword } = passwords;
        if(!oldPassword || !newPassword || !confirmPassword)
        {
            toast.error("Please fill all fields");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Confirm Password does not match");
            return;
        }
        if (oldPassword === confirmPassword)
        {
            toast.error("New password is same as old");
            return;
        }
        try {
            const res = await fetch("/api/update/password", {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oldPassword, newPassword }),
            })
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success("Password Change Successfull");
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    return {loading , handleReset};
}

export default updatePassword;