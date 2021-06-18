import React from "react";
import styled from "styled-components";

export const MainImages = styled.div`
  width: 100%;
  margin-right: calc(0px + 58 * ((100vw - 320px) / 1600));
  max-width: calc(270px + 150 * ((100vw - 320px) / 1600));
  height: auto;

  svg {
    width: 100%;
    height: auto;
  }
`
export const MainButtons = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`
export const MainText = styled.p`
  font-weight: 300;
  font-size: calc(16px + 4 * ((100vw - 320px) / 1600));
  line-height: 170%;
  margin-bottom: calc(10px + 27 * ((100vw - 320px) / 1600));
`
export const MainTitle = styled.h1`
  font-weight: 500;
  font-size: calc(30px + 20 * ((100vw - 320px) / 1600));
  line-height: calc(35px + 30 * ((100vw - 320px) / 1600));
  margin-bottom: calc(10px + 15 * ((100vw - 320px) / 1600));
`
export const MainSection = styled.section`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  padding-bottom: calc(0px + 121 * ((100vw - 320px) / 1600));
`
export const MainBlock = styled.div`
  max-width: calc(300px + 160 * ((100vw - 320px) / 1600));
  margin-left: calc(0px + 9 * ((100vw - 320px) / 1600));
`

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 0;
`
export const PageWrapper = styled.div`
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-height: 89vh;
`
export const Page = styled.main`
  /*position: absolute;*/
  right: 0;
  top: 0;
  width: 84.375%;
  min-height: 100vh;
`
export const PageContent = styled.div`
  min-height: 100%;
  padding-top: 32px;
  padding-bottom: 32px;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding-left: calc(-10px + 60 * ((100vw - 320px) / 1600));
  padding-right: calc(-10px + 56 * ((100vw - 320px) / 1600));
`