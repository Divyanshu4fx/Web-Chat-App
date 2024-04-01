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
    <div className='flex flex-col items-center justify-center w-6/12 mx-auto min-w-100'>
      <div className='w-full p-8 bg-red-500 bg-opacity-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg'>
        
        <h1 className='text-lg font-bold text-center'>Sign Up <span className='text-blue-500'>ChatApp</span></h1>
        <div className="py-5 text-xl">{email}</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='p-2 label'><span className='text-base-label-text'>Full Name</span></label>
            <input type="text" placeholder='Enter Full Name' className='w-full h-10 p-4 rounded input-bordered' value={inputs.fullname} onChange={(e) => { setInputs({ ...inputs, fullname: e.target.value }) }} />
          </div>
          <div>
            <label className='p-2 label'><span className='text-base-label-text'>Username</span></label>
            <input type="text" placeholder='Enter Username' className='w-full h-10 p-4 rounded input-bordered' value={inputs.username} onChange={(e) => { setInputs({ ...inputs, username: e.target.value }) }} />
          </div>
          
          <div>
            <label className='p-2 label'><span className='text-base-label-text'>Password</span></label>
            <input type="password" placeholder='Enter Password' className='w-full h-10 p-4 rounded input-bordered' value={inputs.password} onChange={(e) => { setInputs({ ...inputs, password: e.target.value }); validate(inputs.password); }} />
            {errorMessage === "" ? (
              <span />
            ) : (
              <span className={"font-bold" + errorMessage === "Is Strong Password" ? "text-green-600" : "text-red-600"}>{errorMessage}</span>
            )}
          </div>
          <div>
            <label className='p-2 label'><span className='text-base-label-text'>Confirm Password</span></label>
            <input type="password" placeholder='Confirm Password' className='w-full h-10 p-4 rounded input-bordered' value={inputs.confirmpassword} onChange={(e) => { setInputs({ ...inputs, confirmpassword: e.target.value }) }} />
          </div>
          {/* gender code */}
          <div className='flex'>
            <div className='form-control'>
              <label className={`label gap-2 cursor-pointer ${inputs.gender === "male" ? "selected" : ""}`}><span className='label-text'>Male</span></label>
              <input type='checkbox' className='checkbox border-slate-900' checked={inputs.gender === "male"} onChange={() => handleCheckboxChange("male")} />
            </div>
            <div className='form-control'>
              <label className={`label gap-2 cursor-pointer ${inputs.gender === "female" ? "selected" : ""}`}><span className='label-text'>Female</span></label>
              <input type='checkbox' className='checkbox border-slate-900' checked={inputs.gender === "female"} onChange={() => handleCheckboxChange("female")} />
            </div>
          </div>
          <Link className='inline-block mt-4 text-sm hover:underline hover:text-blue-600' to="/login">Already have an account?</Link>
          <div>
            <button className='mt-2 border btn btn-block btn-sm border-slate-700 ' type='submit' disabled={loading || isButtonDisabled}>{loading ? <span className='loading loading-spinner'></span> : "SignUp"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
