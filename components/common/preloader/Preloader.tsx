import React from "react";

type PropsType = {
    theme?: string | boolean //if true dark theme, default: white
}

//preloader component
const Preloader:React.FC<PropsType> = () => {
  return <div className = "PreloaderWrap">
        <div className={"ldsDualRing"}/>
      </div>
};

export default Preloader;
