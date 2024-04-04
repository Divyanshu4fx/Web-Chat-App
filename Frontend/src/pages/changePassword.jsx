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
      setErrorMessage("Strong Password");
      setButtonDisabled(false);
    } else {
      setErrorMessage("Password Is Not Strong");
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
      <div className="flex items-center justify-center p-1 bg-red-500 bg-opacity-0 border rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg form-container border-2 border-white shadow-md shadow-black ">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="w-full p-14"
        >
          <h1 className="text-4xl font-bold text-center text-black underline m-4 mb-8">Change Password</h1>
          <div className="py-4 text-xl font-semibold">{email}</div>

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
              <span className={"font-bold text-lg mb-2 " + (errorMessage === "Strong Password" ? "text-green-400" : "text-red-600")}>{errorMessage}</span>
            )}
          <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isButtonDisabled}
            className="m-2 w-2/5 py-2 text-xl text-white font-semibold bg-red-500 hover:bg-green-500 shadow-md shadow-black rounded-xl"
          >
            Change
          </button>
          </div>
        </Form>
      </div>
  );
};

export default ChangePassword;
