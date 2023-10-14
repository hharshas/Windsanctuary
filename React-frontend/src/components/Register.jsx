import React, { useState } from "react";
import axios from "axios";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    // const submitMeth =(e)=>{
    //   window.location = "http://localhost:3006/";
    // }
    // useEffect(()=>{
    //   fetchData();
    // },[])
    // const fetchData = async ()=>{
    //   try{
    //     const res  = await fetch('http://localhost:5000/api/data')
    //     const jsonData = await res.json();
    //     console.log(jsonData)
    //     setData(jsonData)
    //   }catch(err){
    //     console.log('error',err);
    //   }
    // }

    return (
        <>
        <h2 className="text-5xl font-bold m-1 text-green-400 p-5 bg-white bg-opacity-20 italic backdrop-blur rounded drop-shadow">REGISTER</h2>
        <div className="mt-2 p-8 rounded-md bg-white w-96 max-w-full">
        <form method="POST" action='http://localhost:5000/api/signup' target="_blank" >
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
            Sign Up
          </button>
        </form>
        <div className="bg-orange-100 text-orange-700 py-7" role="alert">
           <p onClick={() => props.onFormSwitch('login')}>Already have an account? <b className="hover:cursor-pointer">Sign-In.</b></p>
        </div>
      </div>
    </>
    )
}
