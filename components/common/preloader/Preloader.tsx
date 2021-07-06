import React from "react";
import s from "./Preloader.module.css"

type PropsType = {
    theme?: string | boolean //if true dark theme, default: white
}

//preloader component
const Preloader:React.FC<PropsType> = () => {
  return <div className ={s.PreloaderWrap}>
        <div className={s.ldsDualRing}/>
      </div>
};

export default Preloader;
