import // Backdrop,
// RoundedBox,
// ScrollControls,
// Scroll,
// Sparkles,
// Float,
// Ring
"@react-three/drei";
import { Experience } from "./components/Experience";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/interface";
import { ScrollManager } from "./components/ScrollMAnager";
import { useState,useEffect } from "react";
import { Menu } from "./components/Menue";
import { cloneUniformsGroups } from "three";

function App() {

  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() =>{
    setMenuOpened(false);
  },[section])
  
  // const [data, setData]= useState({});
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
      <Canvas shadows camera={{ position: [0, 2, 4], fav: 30 }}>
        {/* <color attach="background" args={["#ececec"]} /> */}
        <ScrollControls pages={4} damping={0.1}>
          <ScrollManager section={section} onSectionChange={setSection} />
          <Experience />
          <Scroll html>
            <Interface />
            
          </Scroll>
        </ScrollControls>
      </Canvas>
      <Menu onSectionChange = {setSection} menuOpened ={menuOpened} setMenuOpened = {setMenuOpened}/>
    </>
  );
}

export default App;
