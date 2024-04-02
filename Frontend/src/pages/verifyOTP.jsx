import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Form, Input, message } from "antd";
import axios from "axios";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading,setLoading] = useState(false);
  const email = location.state.email || "";
  const newRegister = location.state.newRegister || false;

  const verifyOTPHandler = async (values) => {
    setLoading(true);
    try {

      const res = await axios.post("/api/auth/verifyOTP", {
        ...values,
        email,
      });

      if (res.data.success) {
        message.success(res.data.message);
        if (newRegister === "true")
          navigate("/signup", { state: { email: email } });
        else navigate("/changePassword", { state: { email: email } });
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
     
      if (error.response) {
        if (error.response.status === 401) {
          message.error("OTP is incorrect");
        } else {
          message.error("Something went wrong");
          console.log(
            "Error in sendOTP handler: " + error.response.data.message
          );
        }
      } else {
        // Network or client-side error
        message.error("Something went wrong");
        console.log("Network or client-side error: " + error.message);
      }
    }
    finally
    {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center p-4 bg-red-500 bg-opacity-0 border rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg form-container border-2 border-white shadow-md shadow-black ">
      <Form
        layout="vertical"
        onFinish={verifyOTPHandler}
        className="p-4 w-3/8"
      >
        <h1 className="text-4xl font-bold text-center text-black underline m-4 mb-8">Enter OTP</h1>
        <div className="text-xl font-semibold">{email}</div>
        <Form.Item label="OTP" name="OTP" required>
          <Input type="text" required placeholder="Enter the OTP" className="font-semibold text-black"/>
        </Form.Item>

        <div className="flex items-center justify-center">
          <Link
            to={`/verifyEmail?newRegister=${newRegister}`}
            className="m-3 w-2/5 text-center py-1 px-1 text-lg text-white font-semibold bg-red-500 hover:bg-green-500 hover:text-white shadow-md shadow-black rounded-2xl"
          >
            Back
          </Link>
          <button
            type="submit"
            className="m-2 w-2/5 py-2 text-sm text-white font-semibold bg-red-500 hover:bg-green-500 shadow-md shadow-black rounded-2xl"
          >
            {loading ? <span className="flex items-center text-center loading loading-spinner"></span> : "Verify your OTP"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default VerifyOTP;
