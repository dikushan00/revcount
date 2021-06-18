import React from "react";
import styled from "styled-components";
import {Btn2} from "../Buttons";

const ProgressEditButtonStyled = styled.button`
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: calc(15px + 30 * ((100vw - 320px) / 1600));
  padding-left: calc(0px + 60 * ((100vw - 320px) / 1600));
  padding-right: calc(0px + 60 * ((100vw - 320px) / 1600));
  font-size: calc(6px + 10 * ((100vw - 320px) / 1600));
  line-height: calc(7px + 17 * ((100vw - 320px) / 1600));
  background-color: transparent;
  border: 1px solid #888ba0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 100px;
  font-weight: 500;
  color: #888ba0;
  white-space: nowrap;

  &.btn-border {
    border: 1px solid #1078f1;
    color: #1078f1;
  }

  &.btn-blue {
    background: #1078f1;
    color: #ffffff;
  }
`
const PanelEditsButtonDivStyled = styled.div`
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding-left: calc(-5px + 35 * ((100vw - 320px) / 1600));
  padding-right: calc(-5px + 35 * ((100vw - 320px) / 1600));
  height: calc(20px + 30 * ((100vw - 320px) / 1600));
  font-size: calc(6px + 10 * ((100vw - 320px) / 1600));
  line-height: calc(6px + 18 * ((100vw - 320px) / 1600));
  border: 1px solid #888ba0;
  border-radius: 100px;
  font-weight: 500;
  color: #888ba0;
  background-color: transparent;
  -webkit-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  white-space: nowrap;
  cursor: pointer;
`
const PanelEditsButtonStyled = styled.button`
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding-left: calc(-5px + 35 * ((100vw - 320px) / 1600));
  padding-right: calc(-5px + 35 * ((100vw - 320px) / 1600));
  height: calc(20px + 30 * ((100vw - 320px) / 1600));
  font-size: calc(6px + 10 * ((100vw - 320px) / 1600));
  line-height: calc(6px + 18 * ((100vw - 320px) / 1600));
  border: 1px solid #888ba0;
  border-radius: 100px;
  font-weight: 500;
  color: #888ba0;
  background-color: transparent;
  -webkit-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  white-space: nowrap;
  cursor: pointer;
`

export const OfferEditsAcceptButton: React.FC<React.ButtonHTMLAttributes<any>> = (props) => {
    const OfferEditsAcceptButton = styled.div`
      padding-left: calc(-5px + 76 * ((100vw - 320px) / 1600));
      padding-right: calc(-5px + 76 * ((100vw - 320px) / 1600));
      height: calc(15px + 45 * ((100vw - 320px) / 1600));
      font-size: calc(7px + 9 * ((100vw - 320px) / 1600));
      line-height: calc(7px + 17 * ((100vw - 320px) / 1600));
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      background: #229b68;
      border: 1px solid #229b68;
      border-radius: 100px;
      font-weight: 500;
      color: #ffffff;
      margin-right: calc(0px + 10 * ((100vw - 320px) / 1600));
      cursor: pointer;
    `
    return <OfferEditsAcceptButton {...props}> {props.children}</OfferEditsAcceptButton>
}
export const OfferEditsDeclineButton: React.FC<React.ButtonHTMLAttributes<any>> = (props) => {
    const OfferEditsDeclineButton = styled.div`
      padding-left: calc(-5px + 35 * ((100vw - 320px) / 1600));
      padding-right: calc(-5px + 35 * ((100vw - 320px) / 1600));
      height: calc(15px + 45 * ((100vw - 320px) / 1600));
      font-size: calc(7px + 9 * ((100vw - 320px) / 1600));
      line-height: calc(7px + 17 * ((100vw - 320px) / 1600));
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      border: 1px solid #ef6868;
      border-radius: 100px;
      font-weight: 500;
      color: #ef6868;
      background-color: transparent;
      cursor: pointer;
    `
    return <OfferEditsDeclineButton {...props}> {props.children}</OfferEditsDeclineButton>
}
export const PanelEditsButton: React.FC<React.ButtonHTMLAttributes<any>> = (props) => {

    return <PanelEditsButtonStyled {...props}> {props.children}</PanelEditsButtonStyled>
}
export const CompleteButton = styled(PanelEditsButtonStyled)`
      color: #ffffff;
      background: #229B68;

      svg path {
        fill: #ffffff;
      }
    `

export const BlueEditButton = styled(PanelEditsButton)`
      background: #1078f1;
      color: #ffffff;
    `
export const ProgressEditButton: React.FC<React.ButtonHTMLAttributes<any>> = (props) => {
    return <ProgressEditButtonStyled {...props}>{props.children}</ProgressEditButtonStyled>
}

const TaskEditsBtnStyled = styled(Btn2)`
      cursor: pointer;
      padding-left: calc(-5px + 43 * ((100vw - 320px) / 1600));
      padding-right: calc(-5px + 43 * ((100vw - 320px) / 1600));

    `
export const TaskEditsButton: React.FC<React.ButtonHTMLAttributes<any>> = (props) => {

    return <TaskEditsBtnStyled {...props}>{props.children}</TaskEditsBtnStyled>
}

