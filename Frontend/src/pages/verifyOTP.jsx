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
    <div className="flex items-center justify-center w-3/12 bg-red-500 bg-opacity-0 border rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg ">
      <Form
        layout="vertical"
        onFinish={verifyOTPHandler}
        className="p-4 w-3/8"
      >
        <h1 className="py-5 text-4xl text-center">Enter OTP</h1>
        <div className="text-xl">{email}</div>
        <Form.Item label="OTP" name="OTP" required>
          <Input type="text" required placeholder="Enter the OTP" />
        </Form.Item>

        <div>
          <Link
            to={`/verifyEmail?newRegister=${newRegister}`}
            className="px-4 py-2 m-2 font-bold text-white bg-blue-400 border rounded roundedbg-blue-500 hover:bg-blue-700 "
          >
            Back
          </Link>
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-400 border rounded roundedbg-blue-500 hover:bg-blue-700"
          >
            {loading ? <span className="loading loading-spinner"></span> : "Verify your OTP"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default VerifyOTP;
