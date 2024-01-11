import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function SidePhoto() {
  const [res, setRes] = useState([]);
  const [desc, setDesc] = useState({
    comment: "",
    email: "",
    pred: "",
  });
  const [selectedDiv, setDivSelect] = useState("0");

  const hello = useCallback(async () => {
    let response = await fetch(
      `http://localhost:5000/api/showpost?email=${localStorage["email"]}`,
      {
        method: "get",
      }
    );
    const ans = await response.json();
    setRes(ans);
    setDesc({
      comment: ans[0]["comment"],
      email: ans[0]["email"],
      pred: ans[0]["pred"],
    });
    console.log(typeof res);
    console.log(ans);
  }, []);

  useEffect(() => {
    if (res.length === 0) {
      console.log("hii");
      hello();
    }
  }, [hello]);

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const selectedPhoto = (e) => {
    var id = e.target.id;
    setDesc({
      comment: res[id]["comment"],
      email: res[id]["email"],
      pred: res[id]["pred"],
    });
    setDivSelect(id);
    console.log(selectedDiv);
  };

  const textAnimate = {
    hidden: {
      y: "10px",
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,

      transition: {
        ease: "easeInOut",
        duration: 0.2,
      },
    },
  };
  const textSideanimate = {
    hidden: {
      x: "-10px",
      opacity: 0,
      color: "#0f0f0f",
    },
    show: {
      x: 0,
      opacity: 1,
      color: "#ffffff",
      transition: {
        ease: "easeInOut",
        duration: 0.4,
        staggerChildren: 0.4,
        delayChildren: 1,
      },
    },
  };

  return (
    <div className="h-[800px] text-center w-screen sm:pr-0 pr-10 ">
      <div
        className="mx-auto relative flex text-center w-full h-[50%]"
        id="hello"
      >
        <motion.div
          variants={textAnimate}
          initial="hidden"
          animate="show"
          key={desc.pred}
          className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] grid grid-row-2 font-mono h-full justify-center items-center -z-10 p-3 w-full text-xl "
          id="hello2"
        >
          <span className="max-w-[500px] break-normal text-[#DAE1E7] underline font-bold">
            {desc.pred}
          </span>
          <span className="max-w-[500px] break-normal  font-semibold">
            <p className="text-green-500">{desc.comment}</p>
            <br></br>
            <motion.p
            variants={textSideanimate}
            initial="hidden"
            animate="show"
            key={desc.email}
            className="text-[#DAE1E7]">- {desc.email}</motion.p>
          </span>
        </motion.div>
      </div>
      <div className="sm:mr-[110px] mr-[10px] flex items-center mt-11">
        <MdChevronLeft
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideLeft}
          size={40}
        />
        <div
          id="slider"
          className="backdrop-blur-sm bg-white/10 rounded-lg p-1 w-full h-full overflow-y-hidden overflow-x-hidden scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {res.map((item, ind) => (
            <img
              className={`max-w-[220px] object-contain max-h-48  inline-block m-2 cursor-pointer ${
                selectedDiv === `${ind}` ? "border-white border-4" : " "
              } hover:scale-105`}
              src={item["img"]}
              id={ind}
              alt="/"
              onClick={selectedPhoto}
            />
          ))}
        </div>
        <MdChevronRight
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideRight}
          size={40}
        />
      </div>
    </div>
  );
}

export default SidePhoto;
