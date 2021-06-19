import React from "react";
import styled from "styled-components";

const ImgWrapperPicture = styled.picture`
  display: flex;
  align-items: center;
`
export const ImgWrapper: React.FC<{path: string}> = ({path}) => {
    return <ImgWrapperPicture>
        <source srcSet={path} type="image/webp"/>
        <img src={path} alt="signup"/>
    </ImgWrapperPicture>
}