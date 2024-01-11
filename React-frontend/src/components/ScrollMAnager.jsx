import { useScroll } from "@react-three/drei";
import {useRef,useEffect} from "react";
import { gsap } from "gsap";

export const ScrollManager =(props)=>{
    const {section,onSectionChange} = props;

    const data = useScroll();
    const lastScroll = useRef(0);
    const isAnimating = useRef(false);

    data.fill.classList.add("top-0");
    data.fill.classList.add("absolute");

    useEffect(()=>{
        gsap.to(data.el,{
            duration: 1,
            scrollTop: section * data.el.clientHeight,
            onStart :() =>{
                isAnimating.current = true; 
            },
            onComplete: ()=>{
                isAnimating.current = false;
            }
        })
    },[section])
}