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
            <div className='w-full p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>{`Login` + " "}
                    <span className='text-blue-500'>
                        ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='p-2 label'><span className='text-base-text'>Username</span></label>
                        <input type="text" placeholder='Enter username' className='w-full h-10 p-4 rounded input-bordered' value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />
                    </div>
                    <div>
                        <label className='p-2 label'><span className='text-base-label-text'>Password</span></label>
                        <input type="password" placeholder='Enter password' className='w-full h-10 p-4 rounded input-bordered' value={inputs.password} onChange={(e)=>setInputs({...inputs,password : e.target.value})}/>
                    </div>
                    <Link to='/verifyEmail?newRegister=false' className='inline-block mt-2 test-sm hover:underline hover:text-blue-600'>Forgot password?</Link>
                    <br/>
                    <Link to='/verifyEmail?newRegister=true' className='inline-block mt-2 test-sm hover:underline hover:text-blue-600'>Don't have a account?</Link>
                    <div>
                        <button className='mt-2 border btn btn-block btn-sm border-slate-700' type='submit' disabled={loading}>{loading ?<span className='loading loading-spinner'></span> : "Login" }</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
