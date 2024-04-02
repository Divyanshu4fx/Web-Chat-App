import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin';

function Login() {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const {loading,login} = useLogin();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await login(inputs)
    }
    return (
        <div className='flex flex-col items-center justify-center mx-auto min-w-96'>
            <div className='w-full p-6 border-2 border-white rounded-xl shadow-md shadow-black bg-clip-padding backdrop-filter backdrop-blur-lg'>
                <h1 className='text-4xl font-bold text-center text-black underline m-4 mb-8'>{`Login` + " "}
                    <span className='text-blue-700'>
                        ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className='my-2'>
                        <label className='p-2 label text-xl text-white font-semibold'><span className='text-base-text'>Username :</span></label>
                        <input type="text" placeholder='Enter username' className='w-full h-10 p-4 rounded-lg input-bordered' value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />
                    </div>
                    <div className='my-2'>
                        <label className='p-2 label text-xl text-white font-semibold'><span className='text-base-label-text'>Password :</span></label>
                        <input type="password" placeholder='Enter password' className='w-full h-10 p-4 rounded-lg input-bordered' value={inputs.password} onChange={(e)=>setInputs({...inputs,password : e.target.value})}/>
                    </div>
                    <Link to='/verifyEmail?newRegister=false' className='inline-block mt-8 mr-8 mb-2 text-white hover:underline hover:text-black'>Forgot password?</Link>
                    <Link to='/verifyEmail?newRegister=true' className='inline-block mt-8 ml-8 mb-2 text-white hover:underline hover:text-black'>Don't have an account?</Link>
                    <div className='flex justify-center items-center'>
                        <button className='m-2 py-2 btn w-2/5 btn-block btn-sm text-2xl text-white font-semibold bg-red-500 hover:bg-green-500 shadow-md shadow-black box-content rounded-2xl' type='submit' disabled={loading}>{loading ?<span className='loading loading-spinner'></span> : "Login" }</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
