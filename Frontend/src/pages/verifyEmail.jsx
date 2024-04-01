import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const newRegister = searchParams.get("newRegister");
  const [loading, setLoading] = useState(false);
  async function sendOTPHandler(values) {
    setLoading(true);
    try {

      const res = await axios.post("/api/auth/verifyEmail", {
        ...values,
        newRegister,
      });

      if (res.data.success) {
        message.success(res.data.message);
        navigate("/verifyOTP", { state: { email: values.email, newRegister } });
      } else {
        message.error(res.data.message);
      }
    } catch (error) {

      console.log(error);
      if (error.response) {
        if (error.response.status === 400) {
          message.error(error.response.data.message);
        } else {
          toast.error("error");
          // console.log(
          //   "Error in sendOTP handler: " + error.response.data.message
          // );
        }
      } else {
        toast.error(error.message);
        // console.log("Network or client-side error: " + error.message);
      }
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center bg-red-500 bg-opacity-0 border rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg form-container">
        <Form
          layout="vertical"
          onFinish={sendOTPHandler}
          className="p-4 w-3/8"
        >
          <h1 className="py-5 text-4xl text-center">Enter email</h1>

          <Form.Item
            label="email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input type="text" required placeholder="Your email" />
          </Form.Item>
          <Link to="/login" className="m-2 text-blue-400">
            Already registered? Login from here
          </Link>
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-400 border rounded roundedbg-blue-500 hover:bg-blue-700"
          >
            {loading ? <span className="loading loading-spinner"></span> : "Send OTP"}
          </button>
        </Form>
      </div>
    </>
  );
};

export default VerifyEmail;
