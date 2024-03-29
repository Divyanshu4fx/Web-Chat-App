import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import toast from 'react-hot-toast';
function SignUp() {

  const [inputs, setInputs] = useState(
    {
      fullname: '',
      username: '',
      password: '',
      confirmpassword: '',
      gender: '',
    }
  );

  const {loading,signup} = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({...inputs, gender })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.error("Error");
    // console.log("Error");
    await signup(inputs);
    console.log(inputs);
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-100 mx-auto w-6/12'>
      <div className='w-full p-8 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 bg-red-500'>
        <h1 className='font-bold text-lg text-center'>Sign Up <span className='text-blue-500'>ChatApp</span></h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'><span className='text-base-label-text'>Full Name</span></label>
            <input type="text" placeholder='Enter Full Name' className='w-full input-bordered h-10 rounded p-4' value={inputs.fullname} onChange={(e) => { setInputs({ ...inputs, fullname: e.target.value }) }} />
          </div>
          <div>
            <label className='label p-2'><span className='text-base-label-text'>Username</span></label>
            <input type="text" placeholder='Enter Username' className='w-full input-bordered h-10 rounded p-4' value={inputs.username} onChange={(e) => { setInputs({ ...inputs, username: e.target.value }) }} />
          </div>
          <div>
            <label className='label p-2'><span className='text-base-label-text'>Password</span></label>
            <input type="text" placeholder='Enter Username' className='w-full input-bordered h-10 rounded p-4' value={inputs.password} onChange={(e) => { setInputs({ ...inputs, password: e.target.value }) }} />
          </div>
          <div>
            <label className='label p-2'><span className='text-base-label-text'>Confirm Password</span></label>
            <input type="text" placeholder='Confirm Password' className='w-full input-bordered h-10 rounded p-4' value={inputs.confirmpassword} onChange={(e) => { setInputs({ ...inputs, confirmpassword: e.target.value }) }} />
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
          <Link className='text-sm hover:underline hover:text-blue-600 mt-4 inline-block' to="/login">Already have an account?</Link>
          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700 ' type='submit' disabled={loading}>{loading ? <span className='loading loading-spinner'></span> : "SignUp"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
