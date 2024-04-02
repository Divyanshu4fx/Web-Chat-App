import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import toast from 'react-hot-toast';
function SignUp() {
   const location=useLocation()
  const [inputs, setInputs] = useState(
    {
      fullname: '',
      username: '',
      password: '',
      email: '',
      confirmpassword: '',
      gender: '',
    }
  );

  const email = location.state.email || "";
  const { loading, signup, errorMessage, isButtonDisabled, validate } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender })
  }

  const handleSubmit = async (e) => {
    console.log(isButtonDisabled);
    e.preventDefault();

    await signup({inputs, email});
  }


  return (
    <div className='flex flex-col border-2 rounded-lg shadow-md shadow-black items-center justify-center w-6/12 mx-auto min-w-100'>
      <div className='w-full p-8 bg-white-500 bg-opacity-70 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg'>

        <h1 className='text-black font-bold text-4xl underline text-center'>Sign Up <span className='text-blue-700'>ChatApp</span></h1>
        <div className="text-black font-semibold py-5 text-xl">Email : {email}</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='p-2 label'><span className='text-white font-semibold text-center text-lg'>Full Name :</span></label>
            <input type="text" placeholder='Enter Full Name' className='w-full h-10 p-4 rounded-lg input-bordered' value={inputs.fullname} onChange={(e) => { setInputs({ ...inputs, fullname: e.target.value }) }} />
          </div>
          <div>
            <label className='p-2 label'><span className='text-white font-semibold text-center text-lg'>Username :</span></label>
            <input type="text" placeholder='Enter Username' className='w-full h-10 p-4 rounded-lg input-bordered' value={inputs.username} onChange={(e) => { setInputs({ ...inputs, username: e.target.value }) }} />
          </div>

          <div>
            <label className='p-2 label'><span className='text-white font-semibold text-center text-lg'>Password :</span></label>
            <input type="password" placeholder='Enter Password' className='w-full h-10 p-4 rounded-lg input-bordered' value={inputs.password} onChange={(e) => { setInputs({ ...inputs, password: e.target.value }); validate(inputs.password); }} />
            {errorMessage === "" ? (
              <span />
            ) : (
              <span className={"font-semibold " + (errorMessage === "Strong Password" ? "text-green-600" : "text-red-600")}>{errorMessage}</span>
            )}
          </div>
          <div>
            <label className='p-2 label'><span className='text-white font-semibold text-center text-lg'>Confirm Password :</span></label>
            <input type="password" placeholder='Confirm Password' className='w-full h-10 p-4 rounded-lg input-bordered' value={inputs.confirmpassword} onChange={(e) => { setInputs({ ...inputs, confirmpassword: e.target.value }) }} />
          </div>
          {/* gender code */}
          <div className='flex'>
            <div className='form-control flex flex-row justify-center items-center mr-4'>
              <label className={`label gap-2 cursor-pointer ${inputs.gender === "male" ? "selected" : ""}`}><span className='text-white font-semibold text-center text-lg'>Male</span></label>
              <input type='checkbox' className='checkbox border-slate-900' checked={inputs.gender === "male"} onChange={() => handleCheckboxChange("male")} />
            </div>
            <div className='form-control flex flex-row justify-center items-center ml-4'>
              <label className={`label gap-2 cursor-pointer ${inputs.gender === "female" ? "selected" : ""}`}><span className='text-white font-semibold text-center text-lg'>Female</span></label>
              <input type='checkbox' className='checkbox border-slate-900' checked={inputs.gender === "female"} onChange={() => handleCheckboxChange("female")} />
            </div>
          </div>
          <Link className='text-white text-center inline-block mt-4 text-sm hover:underline hover:text-black' to="/login">Already have an account?</Link>
          <div className='flex justify-center'>
            <button className='mt-2 shadow-md shadow-black py-2 box-content font-semibold rounded-xl w-2/5 text-xl text-white bg-red-500 hover:bg-green-500' type='submit'>{loading ? <span className='loading loading-spinner'></span> : "SignUp"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
