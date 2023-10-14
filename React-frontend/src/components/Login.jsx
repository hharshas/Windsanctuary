import React, { useState } from "react";


export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <>
        <h2 className="text-5xl font-bold text-green-400 p-5 m-1 bg-white bg-opacity-20 backdrop-blur rounded italic drop-shadow">LOGIN</h2>
        <div className="mt-2 p-8 rounded-md bg-white w-96 max-w-full">
        <form onSubmit={handleSubmit}>
          <label className="font-medium text-gray-900 block mb-1">
            Email
          </label>
          <input
            type="email" placeholder="Email-id" id="email" name="email"
            value = {email}
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            className="font-medium text-gray-900 block mb-1 mt-8"
          >
            Password
          </label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password" placeholder="Password" id="password" name="password"
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
          />
          <button className="bg-green-700 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 ">
            Log In
          </button>
        </form>
        <div className="bg-orange-100 text-orange-700 py-7" role="alert">
           <p className="font-bold hover:cursor-pointer">Forgot Password?</p>
           <p onClick={() => props.onFormSwitch('register')}>Don’t have an account? <b className="hover:cursor-pointer">Sign-up.</b></p>
        </div>
      </div>
        </>
    )
}