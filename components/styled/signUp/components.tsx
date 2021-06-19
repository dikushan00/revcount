import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 1430px;
  margin: 0 auto;
  padding: 0 15px;
`
export const SignUpSection = styled.section`
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  /*padding-top: 90px;*/
  padding: 90px 0;

  @media screen and (max-width: 479.98px) {
    padding: 0 10px;
  }
`

export const BreadCrumbs = styled.nav`
  margin-top: 35px;

  @media (max-width: 1430px) {
    margin-top: calc(10px + 25 * ((100vw - 320px) / 1110));
  }
`
export const BreadCrumbsList = styled.ul`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  li:first-child {
    margin-right: 4px;
  }
`
export const BreadCrumbsItem = styled.span`
  color: #868594;
  font-size: 16px;
  line-height: 24px;

  @media (max-width: 1430px) {
    font-size: calc(12px + 4 * ((100vw - 320px) / 1110));
    line-height: calc(16px + 8 * ((100vw - 320px) / 1110));
  }
`
export const BreadCrumbsLink = styled.a`
  color: #0076ff;
  font-size: 16px;
  line-height: 24px;
  display: inline-block;

  &::after {
    content: "-";
    margin-left: 6px;
  }

  @media (max-width: 1430px) {
    font-size: calc(12px + 4 * ((100vw - 320px) / 1110));
    line-height: calc(16px + 8 * ((100vw - 320px) / 1110));
  }
`
export const SignUpContent = styled.div`
  margin-top: 100px;
  padding-left: 100px;
  padding-right: 100px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;

  @media (max-width: 1430px) {
    margin-top: calc(10px + 90 * ((100vw - 320px) / 1110));
    padding-left: calc(10px + 90 * ((100vw - 320px) / 1110));
    padding-right: calc(10px + 90 * ((100vw - 320px) / 1110));
  }
`
export const SignUpForm = styled.form`
  max-width: 500px;
  width: 100%;
  margin-right: 30px;
  padding-top: 4px;

  @media (max-width: 1430px) {
    margin-right: calc(20px + 10 * ((100vw - 320px) / 1110));
    padding-top: calc(0px + 4 * ((100vw - 320px) / 1110));
  }
`
export const SignUpTitle = styled.h1`
  font-weight: 500;
  font-size: 50px;
  line-height: 75px;
  margin-bottom: 10px;

  @media (max-width: 1430px) {
    font-size: calc(30px + 20 * ((100vw - 320px) / 1110));
    line-height: calc(30px + 45 * ((100vw - 320px) / 1110));
    margin-bottom: calc(5px + 5 * ((100vw - 320px) / 1110));
  }
`
export const SignUpDesc = styled.p`
  font-size: 18px;
  line-height: 27px;
  margin-bottom: 42px;
  color: #868594;

  @media (max-width: 1430px) {
    font-size: calc(14px + 4 * ((100vw - 320px) / 1110));
    line-height: calc(16px + 11 * ((100vw - 320px) / 1110));
    margin-bottom: calc(20px + 22 * ((100vw - 320px) / 1110));
  }
`
export const SignUpLine = styled.div`
  margin-bottom: 12px;
`
export const SignUpBlock = styled.div`
  margin-top: 60px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;

  @media (max-width: 1430px) {
    margin-top: calc(20px + 40 * ((100vw - 320px) / 1110));
  }
`
export const SignUpInput = styled.input`
  width: 100%;
  background-color: transparent;
  border-bottom: 1px solid #ebedf5;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 22px;
  line-height: 33px;

  &::-webkit-input-placeholder {
    color: #b7b6bf;
  }

  &::-moz-placeholder {
    color: #b7b6bf;
  }

  &:-ms-input-placeholder {
    color: #b7b6bf;
  }

  &::-ms-input-placeholder {
    color: #b7b6bf;
  }

  &::placeholder {
    color: #b7b6bf;
  }

  @media (max-width: 1430px) {
    padding-top: calc(5px + 15 * ((100vw - 320px) / 1110));
    padding-bottom: calc(5px + 15 * ((100vw - 320px) / 1110));
    font-size: calc(16px + 6 * ((100vw - 320px) / 1110));
    line-height: calc(18px + 15 * ((100vw - 320px) / 1110));
  }
`

export const SignUpHeader = styled.header`
  width: 100%;
  height: 90px;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 15px rgba(27, 48, 192, 0.1);
  box-shadow: 0px 0px 15px rgba(27, 48, 192, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`
export const SignUpContentContainer = styled(Container)`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
`
export const SignUpHeaderLogo = styled.div`
  width: 178px;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  cursor: pointer;
`
export const SignUpHeaderLogoLink = styled.a`
  display: inline-block;
`
export const SignUpHeaderLink = styled.a`
  font-size: 16px;
  line-height: 24px;
  color: #111742;
  -webkit-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;

  &:hover {
    color: #0076ff;
  }


  @media (max-width: 1430px) {
    font-size: calc(12px + 4 * ((100vw - 320px) / 1110));
    line-height: calc(14px + 10 * ((100vw - 320px) / 1110));
  }
`
export const SignUpHeaderList = styled.ul`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`
export const SignUpHeaderItem = styled.li`
  margin-right: 31px;

  &:last-child {
    margin: 0 0 0 0;
  }

  @media (max-width: 1430px) {
    margin-right: calc(2px + 29 * ((100vw - 320px) / 1110));
  }
`
export const SignUpHeaderButton = styled.button`
  padding-left: 20px;
  padding-right: 20px;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 50px;
  border: 1px solid #1078f1;
  border-radius: 100px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-left: 36px;
  color: #1078f1;
  background-color: transparent;
  -webkit-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;

  &:hover {
    color: #f701a5;
    border: 1px solid #f701a5;
  }

  @media (max-width: 1430px) {
    padding-left: calc(0px + 20 * ((100vw - 320px) / 1110));
    padding-right: calc(0px + 20 * ((100vw - 320px) / 1110));
    height: calc(10px + 40 * ((100vw - 320px) / 1110));
    font-size: calc(10px + 6 * ((100vw - 320px) / 1110));
    line-height: calc(12px + 12 * ((100vw - 320px) / 1110));
    margin-left: calc(2px + 34 * ((100vw - 320px) / 1110));
  }
`


