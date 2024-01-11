import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SchoolIcon from '@mui/icons-material/School';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useEffect, useState } from 'react';


export const Menu=(props)=>{
  const {onSectionChange,menuOpened, setMenuOpened} = props;

  
  return (<>
  <button
      onClick={() => setMenuOpened(!menuOpened)}
      className="z-20 fixed top-12 right-12 p-3 bg-green-700 w-11 h-11 rounded-md"
    >
      <div
        className={`bg-white h-0.5 rounded-md w-full transition-all ${
          menuOpened ? "rotate-45  translate-y-0.5" : ""
        }`}
      />
      <div
        className={`bg-white h-0.5 rounded-md w-full my-1 ${
          menuOpened ? "hidden" : ""
        }`}
      />
      <div
        className={`bg-white h-0.5 rounded-md w-full transition-all ${
          menuOpened ? "-rotate-45" : ""
        }`}
      />
    </button>
    <div
      className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col
    ${menuOpened ? "w-80" : "w-0"}`}
    >
      <div className="flex-1 flex items-start justify-center flex-col gap-8 p-10">
        <MenuButton label="HOME" onClick={() => onSectionChange(0)} />
        <MenuButton label="EXPLORE" onClick={() => onSectionChange(1)} />
        <MenuButton label="IDENTIFY" onClick={() => onSectionChange(2)} />
        <MenuButton label="LOGIN / REGISTER" onClick={() => onSectionChange(3)} />
      </div>
    </div>
  </>);
}

const MenuButton = (props) =>{
const {label, onClick} = props;
return (

  <>
  <button
  onClick={onClick}
  className="text-2xl font-bold cursor hover:text-indigo-600 hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.1)] transition-colors"
  >
    {label}
  </button>
  </>
)
}