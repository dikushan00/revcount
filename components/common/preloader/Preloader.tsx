import React from "react";
import styled from 'styled-components';

type PropsType = {
    theme?: string | boolean //if true dark theme, default: white
}

const PreloaderWrap = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
const LdsDualRing = styled.div.attrs(props => ({
    theme: props.theme || true,
}))`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid;
      border-color: ${(props) => props.theme ? "#1e2723" : "#fff"} transparent ${(props) => props.theme ? "#1e2723" : "#fff"} transparent;
      animation: ldsDualRing 1.2s linear infinite;
    }
    @keyframes ldsDualRing {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

//preloader component
const Preloader = ({ theme }:PropsType) => {
  return (
    <>
      <PreloaderWrap theme = {theme}>
        <LdsDualRing theme = {theme}/>
      </PreloaderWrap>
    </>
  );
};

export default Preloader;
