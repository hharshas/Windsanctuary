import {motion} from "framer-motion"
import { Login } from "./Login";
import { Register } from "./Register";
import React, { useEffect, useState,  useRef } from "react";
import Scroller from "./Scroller";


const Section = (props) =>{
    const {children} = props;
    return (
        <motion.section className={`h-screen w-screen p-8 max-w-screen-2xl mx-auto flex flex-col items-start justify-center`} 
        initial = {{ 
            opacity:0,
            y: 50,
        }}
        whileInView={{
            opacity :1,
            y:0,
            transition: {
                duration :1,
                delay: 0.6,
            }
        }}> {children} </motion.section>
    )
}




const IdentifyNewSpecies = () =>{

  const [image, setImage] = useState(null);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (file != null) {
      const data = new FormData();
      data.append('file_from_react', file);
  
      let response = await fetch('http://localhost:5000/url_route',
        {
          method: 'post',
          body: data,
        }
      );
      let res = await response.json();
      if (res.status !== 1){
        alert('Error uploading file');
      }
    }

    const imgname = e.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
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
      <div className="backdrop-blur-sm bg-white/10 rounded-lg p-5 flex items-center justify-center w-11/12">
      <h1 className="text-4xl ml-11 font-extrabold leading-snug">
            <br/>
            <span className="text-green-400 px-1 italic">
              UPLOAD IN<br/>SANCTUARY
            </span>
        </h1>
      <div className="mt-7">
        <div className="pointer flex justify-center">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="upload image" className="flex justify-center img-display-after" />
            ) : (
              <img src="./images/upload_icon.png" alt="upload image" className="flex justify-center img-display-before" />
            )}
        </div>
        <div className="flex justify-center p-2">
        <label className="w-[100px] custom-file-upload font-semibold text-white hover:scale-125 hover:transition-transform">
        <input type="file" onChange={uploadFile} className="hidden"/>
          UPLOAD
        </label>
        </div>
        <form class="flex justify-center p-2">
        <button className="w-[100px] text-white border-r-2 border border-white px-4 py-1 hover:scale-125 hover:transition-transform">POST</button>
        </form>
        <div className="flex justify-center p-2 text-green-800 font-bold bg-yellow-50">{"?-Species"}</div>
      </div>
      
      </div>
    </Section>
  )
}


export const Interface =()=>{
    return(
        <div className="flex flex-col items-center w-screen px-11">
        <HomeSection/>
        
        <ExploreNewSpecies/>
        <IdentifyNewSpecies />
        <AuthSection/> 
        </div>
    )
};
const HomeSection= ()=>{
    return (
    <Section>
        <h2 className="text-2xl font-bold bg-white text-green-900 leading-snug">It's your ..</h2>
        <h1 className="text-6xl font-extrabold leading-snug">
            <br/>
            <span className="text-yellow-400 px-1 italic">
              WIND<br/>SANCTUARY
            </span>
        </h1>
        <motion.p className="text-lg text-green-900 mt-4" 
        initial={{
            opacity:0,
            y:0,
        }}
        whileInView={
           { opacity:1,
            y:0,}
        }
        transition = {{
            duration: 1,
            delay: 1.5,
        }}
        >
            A website for you to discover
            <br/>
            and explore the birds species
        </motion.p>
        <motion.button className={"bg-green-700 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16"}
        initial={{
            opacity:0,
            y:0,
        }}
        whileInView={
           { opacity:1,
            y:0,}
        }
        transition = {{
            duration: 1,
            delay: 2,
        }}
        >
         Identify New Species
        </motion.button>
    </Section>
    )
}
const ExploreNewSpecies = () =>{
  let [current, setCurrent] = useState(0);
return (
<Section>
<h1 className="text-4xl ml-11 font-extrabold leading-snug">
            <br/>
            <span className="text-green-400 px-1 italic">
              EXPLORE<br/>THE SANCTUARY
            </span>
        </h1>
  <Scroller/>
</Section>
);
}
const AuthSection = () =>{

  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
    return (
        <Section>
      <div>
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
        </Section>
    )
}