import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/authContext';
import validator from 'validator';
function useSignup() {

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const { setAuthUser } = useAuthContext()
  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Is Strong Password");
      setButtonDisabled(false);
    } else {
      setErrorMessage("Is Not Strong Password");
      setButtonDisabled(true);
    }
    if (value === "") {
      setErrorMessage("");
      setButtonDisabled(true);
    }
  };
  const signup = async ({ fullname, username, email, password, confirmpassword, gender }) => {
    const success = handleInputErrors({ fullname, username, email, password, confirmpassword, gender })
    if (!success) return;
    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, username, email, password, confirmpassword, gender })
      })
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Sign Up Succesfull");
      localStorage.setItem("chat-user", JSON.stringify(data))
      setAuthUser(data);
    } catch (e) {
      toast.error(e.message);
    }
    finally {
      setLoading(false);
    }
  }
  return { loading, signup, errorMessage, isButtonDisabled, validate };
}

export default useSignup

function handleInputErrors({ fullname, username, email, password, confirmpassword, gender }) {
  if (!fullname || !username || !email || !password || !confirmpassword || !gender) {
    toast.error('Please fill in all fields');
    return false;
  }

  if (password !== confirmpassword) {
    toast.error('Password do not match');
    return false;
  }

  if (password.length < 8) {
    toast.error('Password must be at least 6 characters');
    return false;
  }

  return true;
}
