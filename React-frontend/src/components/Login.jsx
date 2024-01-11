import React, { useState } from "react";
import $ from "jquery";
import SignedInPhoto from "../assets/SignedIn.png"

export const Login = ({IsLogin ,setIsLogin, CurrEmail, setCurrEmail,onFormSwitch}) => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [theerror, seterror] = useState("");


  const handlesubmit = (e) => {
    var $form = $(e.target);
    // var $error = $form.find(".error");
    var data = $form.serialize();

    $.ajax({
      url: "http://localhost:5000/api/signin",
      type: "POST",
      data: data,
      dataType: "json",
      success: function (resp) {
        console.log(resp.responseJSON);
      },
      error: function (resp) {
        if(typeof resp.responseJSON === "undefined"){
          seterror("Recheck the email / password"); return;
        }
        if (!resp.responseJSON.error) {
          localStorage["email"] = resp.responseJSON.email
          localStorage["login"] = resp.responseJSON.login
          setCurrEmail(localStorage['email']);
          setIsLogin(localStorage['login']);
          seterror("");
        }
      },
    });

    e.preventDefault();
  };
  const LogOutPressed =()=>{
    localStorage["email"] = "noemail";
    localStorage["login"] = "false";
    setCurrEmail(localStorage['email']);
    setIsLogin(localStorage['login']);
    seterror("");
  }

  return (
    <>
      <h2 className="text-5xl font-bold text-green-400 p-5 m-1 bg-white bg-opacity-20 backdrop-blur rounded italic drop-shadow">LOGIN</h2>
      <div className="mt-2 p-8 rounded-md bg-white w-96 max-w-full">
        <form onSubmit={handlesubmit}>
          {
            (IsLogin !== "true") ? (
              <>
              <label className="font-medium text-gray-900 block mb-1">Email</label>
              <input
                type="email"
                placeholder="Email-id"
                id="email"
                name="email"
                value={email}
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="font-medium text-gray-900 block mb-1 mt-8">
                Password
              </label>
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
              />
              <div className="my-2 text-red-500">{ theerror }</div>     {/*error*/}
              <button className="bg-green-700 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 ">
                Log In
              </button>
          </>
            ) : (
              <div className="flex justify-center my-11">
                <img width="130px" src={SignedInPhoto}></img>
              </div>
            )
          }
        </form>
        
        {
          (IsLogin !== "true") ? (
            <div className="bg-orange-100 text-orange-700 my-2 py-6 px-3 rounded" role="alert">
              <p onClick={() => onFormSwitch("register")}>
                Don’t have an account?{" "}
                <b className="hover:cursor-pointer">Sign-up.</b>
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <button onClick={LogOutPressed} className="bg-green-700 text-white py-4 px-8 rounded-lg font-bold text-lg">
                Log Out
              </button>
            </div>
          )
        }
      </div>
    </>
  );
};
