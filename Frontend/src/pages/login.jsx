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
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>{`Login` + " "}
                    <span className='text-blue-500'>
                        ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'><span className='text-base-text'>Username</span></label>
                        <input type="text" placeholder='Enter username' className='w-full input-bordered h-10 rounded p-4' value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />
                    </div>
                    <div>
                        <label className='label p-2'><span className='text-base-label-text'>Password</span></label>
                        <input type="text" placeholder='Enter password' className='w-full input-bordered h-10 rounded p-4' value={inputs.password} onChange={(e)=>setInputs({...inputs,password : e.target.value})}/>
                    </div>
                    <Link to='/signup' className='test-sm hover:underline hover:text-blue-600 mt-2 inline-block'>Don't have a account?</Link>
                    <div>
                        <button className='btn btn-block btn-sm mt-2 border border-slate-700' type='submit' disabled={loading}>{loading ?<span className='loading loading-spinner'></span> : "Login" }</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
