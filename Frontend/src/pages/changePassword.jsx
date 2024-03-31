import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import validator from "validator";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const email = location.state.email || "";

  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

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
  };

  const onFinishHandler = async (values) => {
    try {


      const res = await axios.post("/api/auth/changePassword", {
        ...values,
        email,
      });
   

      if (res.data.success) {
        //await is very important

        message.success(res.data.message);
        navigate("/login");
      } else {
        //dispatch

        message.error(res.data.message);
      }
    } catch (err) {
      message.error("Something went wrong");
      console.log(err);
      //imp
      console.log(err.response.data.message);
    }
  };
  return (
      <div className="flex items-center justify-center bg-red-500 bg-opacity-0 border rounded-lg shadow-md form-container bg-clip-padding backdrop-filter backdrop-blur-lg">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="w-full p-14"
        >
          <h1 className="py-5 text-4xl text-center">Change Password</h1>
          <div className="py-5 text-xl">{email}</div>

          <Form.Item label="New Password" name="password" required>
            <Input.Password
              placeholder="Input password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
              onChange={(e) => validate(e.target.value)}
              required
            />
          </Form.Item>
        
          {errorMessage === "" ? (
            <span />
          ) : (
            <span className="font-bold text-red-600">{errorMessage}</span>
          )}
          <button
            type="submit"
            disabled={isButtonDisabled}
            className="px-4 py-2 mx-12 font-bold text-white bg-blue-400 border rounded roundedbg-blue-500 hover:bg-blue-700"
          >
            Login
          </button>
        </Form>
      </div>
  );
};

export default ChangePassword;
