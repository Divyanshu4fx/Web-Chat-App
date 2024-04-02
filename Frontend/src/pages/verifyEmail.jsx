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
      <div className="flex items-center justify-center p-4 bg-red-500 bg-opacity-0 border rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg form-container border-2 border-white shadow-md shadow-black ">
        <Form
          layout="vertical"
          onFinish={sendOTPHandler}
          className="p-4 w-3/8"
        >
          <h1 className="text-4xl font-bold text-center text-black underline m-4 mb-8">Enter email</h1>

         
          <Form.Item
            label ={<span className="text-xl">Email</span>}
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input type="text" required placeholder="Your email" className="font-semibold text-black"/>
          </Form.Item>
          <div className="flex-row justify-content">
          <Link to="/login" className="m-2 text-white hover:text-black">
            Already registered? Login from here
          </Link>
          </div>
          <div className=" flex flex-row justify-center">
          <button
            type="submit"
            className="m-2 w-2/5 py-2 text-sm text-white font-semibold bg-red-500 hover:bg-green-500 shadow-md shadow-black rounded-2xl "
          >
            {loading ? <span className="loading loading-spinner"></span> : "Send OTP"}
          </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default VerifyEmail;
