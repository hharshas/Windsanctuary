import { motion } from "framer-motion";
import { Login } from "./Login";
import { Register } from "./Register";
import React, { useEffect, useState, useRef } from "react";
import Scroller from "./Scroller";
import SidePhoto from "./SidePhoto";
import { MdCloudySnowing } from "react-icons/md";
import { Loader } from "./loader";
import { Footer } from "./smallComponents/Footer";

const Section = (props) => {
  const { children } = props;
  return (
    <motion.section
      className={`h-screen w-screen p-auto max-w-screen-2xl sm:mx-auto ml-10 flex flex-col items-start justify-center`}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {" "}
      {children}{" "}
    </motion.section>
  );
};

const IdentifyNewSpecies = () => {
  const [image, setImage] = useState(null);
  const [imgtopst, setimgtopst] = useState(null);
  const [bird, setBird] = useState("undefined");
  const [CurrImg, setCurrImg] = useState("");
  const [okimage, setOkimage] = useState("");
  const [loaderHTML, setLoaderInnerHtml] = useState("");


  const [data, setdata] = useState({
    name: "",
  });

  const readFile = async () =>{
    const body = new FormData();
    body.append("file", CurrImg);
    body.append("upload_preset","windsanctuary");

    setLoaderInnerHtml(<Loader />);

    await fetch("https://api.cloudinary.com/v1_1/dkdratnao/image/upload",{
      method:"post",
      body:body
    }).then((res)=>res.json())
    .then(async (body)=>{
      await fetch(`http://localhost:5000/api/postCm?email=${localStorage["email"]}&pred=${bird}&img=${body.secure_url}&comment=${document.getElementById("commentArea").value}`, {
        method: "post",
        body: data,
      }).then((res)=>{
        document.getElementById("commentArea").value="";
        setLoaderInnerHtml("");
      }).catch((err)=>{
        console.log(err);
        document.getElementById("loadingPost").innerHTML = "oops try again !!";
      })
    }).catch((err)=>{
      console.log(err);
    })
  }

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/data").then((res) =>
  //     res.json().then((data) => {
  //       setdata({
  //         name: data.Name,
  //       });
  //     })
  //   );
  // }, []);

  const postTheComment = async () =>{
    console.log(bird);
    if(bird === "undefined"){
      setLoaderInnerHtml("Upload the bird picture !!");
    } else if(localStorage["email"]=="noemail"){
      setLoaderInnerHtml("User is not Signed In !!");
    } else {
      await readFile()
    }
  }

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (file != null) {
      const data = new FormData();
      data.append("file_from_react", file);
      setimgtopst(file);

      let response = await fetch(`http://localhost:5000/url_route?email=${localStorage["email"]}`, {
        method: "post",
        body: data,
      });
      let res = await response.json();
      console.log(res.message)
      setBird(res.message);
    }
    
    const imgname = e.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      setCurrImg(reader.result);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });

            console.log(file);
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  return (
    <Section>
      <div className="backdrop-blur-sm bg-white/10 rounded-lg p-5 h-[600px] grid grid-rows-6 w-11/12">
        <h1 className="text-4xl ml-11 font-extrabold leading-snug row-span-1">
          <span className="text-green-400 px-1 italic">
            UPLOAD IN SANCTUARY
          </span>
        </h1>
        <div className="row-span-5 grid sm:grid-cols-2 grid-cols-1 sm:gap-10 gap-36">
          <div className="grid grid-row-3">
            <div className="pointer flex justify-center items-center">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="upload image"
                  className="flex justify-center img-display-after"
                />
              ) : (
                <img
                  src="./images/upload_icon.png"
                  alt="upload image"
                  className="flex justify-center img-display-before"
                />
              )}
            </div>
            <div className="flex justify-center p-2 items-center">
              <label className="bg-green-700 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 hover:cursor-pointer">
                <input type="file" onChange={uploadFile} className="hidden" />
                UPLOAD
              </label>
            </div>
              
            <div className="flex justify-center rounded p-2 text-green-800 font-bold bg-yellow-50 items-center">
              {bird!="undefined"?bird:"_>Species<_"}
            </div>
          </div>
          <div className="relative">
            <div className="relative w-full">
              <textarea rows={13} id="commentArea"
                className="peer sm:h-full h-11 w-full !resize-none rounded-[7px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border border-blue-gray-200 border-t-transparent bg-transparent px-4 py-2.5 font-mono text-white text-xl font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "></textarea>
              <label
                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Your Comment
              </label>
            </div>
            <div className="flex w-full justify-end py-1.5">

              <div className="h-full flex justify-center items-center pt-3 pr-5 text-red-600 font-bold">{loaderHTML}</div>
              <div className="flex gap-2">
                <button
                  onClick={postTheComment}
                  className="select-none rounded-md bg-green-700 h-11 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-green-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button">
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export const Interface = () => {
  return (
    <div className="flex flex-col items-center w-screen px-11">
      <HomeSection />

      <ExploreNewSpecies />
      <IdentifyNewSpecies />
      <AuthSection />
    </div>
  );
};
const HomeSection = () => {
  return (
    <Section>
      <h2 className="text-2xl font-bold bg-white text-green-900  leading-snug">
        It's your ..
      </h2>
      <h1 className="text-6xl font-extrabold leading-snug">
        <br />
        <span className="text-yellow-400 px-1 italic">
          WIND
          <br />
          SANCTUARY
        </span>
      </h1>
      <motion.p
        className=" text-green-300  mt-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-semibold text-2xl"
        initial={{
          opacity: 0,
          y: 0,
        }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        A website for you to discover
        <br />
        and explore the birds species
      </motion.p>
      <motion.button
        className={
          "bg-green-700 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16"
        }
        initial={{
          opacity: 0,
          y: 0,
        }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Identify New Species
      </motion.button>
    </Section>
  );
};
const ExploreNewSpecies = () => {
  let [current, setCurrent] = useState(0);
  return (
    <Section>
      <h1 className="text-4xl font-extrabold leading-snug">
        <br />
        <span className="text-green-400 italic">
          BIRDS RECENT POSTS
        </span>
      </h1>
      <SidePhoto />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
    </Section>
  );
};
const AuthSection = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const [IsLogin, setIsLogin] = useState(localStorage["login"]);
  const [CurrEmail, setCurrEmail] = useState(localStorage["email"]);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <Section>
      <div>
        {currentForm === "login" ? (
          <Login onFormSwitch={toggleForm} setCurrEmail={setCurrEmail} setIsLogin={setIsLogin} IsLogin={IsLogin} CurrEmail={CurrEmail} />
        ) : (
          <Register onFormSwitch={toggleForm} setCurrEmail={setCurrEmail} setIsLogin={setIsLogin} IsLogin={IsLogin} CurrEmail={CurrEmail} />
        )}
      </div>
      <Footer />
    </Section>
  );
};
