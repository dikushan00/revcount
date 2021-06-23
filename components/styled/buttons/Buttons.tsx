import styled from "styled-components"
import React from "react";


export const Btn = styled.button`
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: calc(-5px + 35 * ((100vw - 320px) / 1600));
  padding-right: calc(-5px + 35 * ((100vw - 320px) / 1600));
  height: calc(15px + 45 * ((100vw - 320px) / 1600));
  font-size: calc(7px + 9 * ((100vw - 320px) / 1600));
  line-height: calc(7px + 17 * ((100vw - 320px) / 1600));
  background: #0076ff;
  border-radius: 100px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.008em;
  white-space: nowrap;
  -webkit-transition: all 0.5s ease 0s;
  -o-transition: all 0.5s ease 0s;
  transition: all 0.5s ease 0s;
  cursor: pointer;
  margin-right: calc(7px + 8 * ((100vw - 320px) / 1600));

  span {
    margin-left: calc(0px + 4 * ((100vw - 320px) / 1600));
  }

  &:hover {
    background: #f701a5;
  }

  &.hover {
    background: #f701a5;
  }
`
export const Btn2 = styled.button`
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: transparent;
  padding-left: calc(-5px + 37 * ((100vw - 320px) / 1600));
  padding-right: calc(-5px + 37 * ((100vw - 320px) / 1600));
  height: calc(15px + 45 * ((100vw - 320px) / 1600));
  font-size: calc(7px + 9 * ((100vw - 320px) / 1600));
  line-height: calc(7px + 17 * ((100vw - 320px) / 1600));
  border: 1px solid #0076ff;
  border-radius: 100px;
  font-weight: 500;
  color: #0076ff;
  white-space: nowrap;
  -webkit-transition: all 0.5s ease 0s;
  -o-transition: all 0.5s ease 0s;
  transition: all 0.5s ease 0s;
  cursor: pointer;

  svg {
    margin-right: 13px;
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
  }

  span {
    margin-left: 2px;
  }

  &:hover {
    color: #F701A5;
    border: 1px solid #F701A5;
  }

  &:hover svg {
    fill: #F701A5;
  }

  &:hover svg path {
    fill: #F701A5;
  }

  &.hover {
    color: #F701A5;
    border: 1px solid #F701A5;
  }

  &.hover svg {
    fill: #F701A5;
  }

  &.hover svg path {
    fill: #F701A5;
  }
`
export const Btn2Div = styled.div`
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: transparent;
  padding-left: calc(-5px + 37 * ((100vw - 320px) / 1600));
  padding-right: calc(-5px + 37 * ((100vw - 320px) / 1600));
  height: calc(15px + 45 * ((100vw - 320px) / 1600));
  font-size: calc(7px + 9 * ((100vw - 320px) / 1600));
  line-height: calc(7px + 17 * ((100vw - 320px) / 1600));
  border: 1px solid #0076ff;
  border-radius: 100px;
  font-weight: 500;
  color: #0076ff;
  white-space: nowrap;
  -webkit-transition: all 0.5s ease 0s;
  -o-transition: all 0.5s ease 0s;
  transition: all 0.5s ease 0s;
  cursor: pointer;

  svg {
    margin-right: 13px;
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
  }

  span {
    margin-left: 2px;
  }

  &:hover {
    color: #F701A5;
    border: 1px solid #F701A5;
  }

  &:hover svg {
    fill: #F701A5;
  }

  &:hover svg path {
    fill: #F701A5;
  }

  &.hover {
    color: #F701A5;
    border: 1px solid #F701A5;
  }

  &.hover svg {
    fill: #F701A5;
  }

  &.hover svg path {
    fill: #F701A5;
  }
`
export const Btn3 = styled.button`
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: calc(0px + 20 * ((100vw - 320px) / 1600));
  padding-right: calc(0px + 20 * ((100vw - 320px) / 1600));
  font-weight: 500;
  font-size: calc(4px + 12 * ((100vw - 320px) / 1600));
  line-height: calc(5px + 19 * ((100vw - 320px) / 1600));
  color: #868594;
  background-color: transparent;
  height: calc(10px + 34 * ((100vw - 320px) / 1600));
  border-radius: 100px;
  -webkit-transition: all 0.4s ease 0s;
  -o-transition: all 0.4s ease 0s;
  transition: all 0.4s ease 0s;
  cursor: pointer;

  span {
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: calc(10px + 10 * ((100vw - 320px) / 1600));
    height: calc(10px + 10 * ((100vw - 320px) / 1600));
    background: rgba(0, 118, 255, 0.1);
    border-radius: 7px;
    font-weight: 600;
    font-size: calc(10px + 2 * ((100vw - 320px) / 1600));
    line-height: 130%;
    text-transform: uppercase;
    color: #0076ff;
    margin-left: calc(0px + 7 * ((100vw - 320px) / 1600));
    -webkit-transition: all 0.4s ease 0s;
    -o-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
  }

  &:hover {
    background-color: rgba(0, 118, 255, 0.1);
    color: #0076ff;
  }

  &:hover span {
    background: #0076ff;
    color: #ffffff;
  }

  &:active,
  &.active {
    background-color: rgba(0, 118, 255, 0.1);
    color: #0076ff;
  }

  &:active span {
    background: #0076ff;
    color: #ffffff;
  }
`

export const BorderedButton = styled(Btn2)`
  font-weight: 600;
`
export const FilledButton = styled(Btn)`
  opacity: inherit;
`
export const ProjectsButton = styled(Btn)`
  opacity: inherit;
`
export const MyCorrectionsButton = styled(Btn2)`
  margin-left: auto;
  font-weight: 600;
  padding-right: calc(0px + 14 * ((100vw - 320px) / 1600));
  padding-left: calc(0px + 14 * ((100vw - 320px) / 1600));
  font-size: calc(6px + 6 * ((100vw - 320px) / 1600));
  line-height: calc(6px + 12 * ((100vw - 320px) / 1600));
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #0076ff;
  height: calc(15px + 19 * ((100vw - 320px) / 1600));
`
export const SignUpButton = styled(Btn)`
  padding-left: 35px;
  padding-right: 35px;
  font-size: 16px;
  line-height: 24px;
  height: 60px;
  font-weight: 600;

  @media (max-width: 1430px) {
    padding-left: calc(10px + 25 * ((100vw - 320px) / 1110));
    padding-right: calc(10px + 25 * ((100vw - 320px) / 1110));
    font-size: calc(12px + 4 * ((100vw - 320px) / 1110));
    line-height: calc(16px + 8 * ((100vw - 320px) / 1110));
    height: calc(30px + 30 * ((100vw - 320px) / 1110));
  }
`

export const TeamProjectButton = styled(Btn2)`
  width: 100%;
  margin-top: calc(15px + 2 * ((100vw - 320px) / 1600));
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;

  span {
    margin-left: 4px;
  }
`

export const TeamProjectSettingsButton = styled.button`
  background-color: transparent;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  svg {
    width: calc(10px + 8 * ((100vw - 320px) / 1600));
    height: calc(10px + 8 * ((100vw - 320px) / 1600));
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
  }

  &:hover svg path {
    fill: #0076ff;
  }
`

export const EditButton = styled(Btn2)``
export const SideBarButton = styled(Btn3)``
export const SideBarFooterButton = styled.button`
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: calc(3px + 22 * ((100vw - 320px) / 1600));
  padding-right: calc(3px + 22 * ((100vw - 320px) / 1600));
  height: calc(20px + 37 * ((100vw - 320px) / 1600));
  background: #ebedf5;
  border-radius: 100px;
  font-weight: 500;
  font-size: calc(6px + 8 * ((100vw - 320px) / 1600));
  line-height: calc(6px + 15 * ((100vw - 320px) / 1600));
  color: #868594;

  svg {
    width: calc(5px + 5 * ((100vw - 320px) / 1600));
    margin-left: calc(0px + 10 * ((100vw - 320px) / 1600));
  }
`
export const SideBarBlockButton = styled.button`
  height: calc(30px + 22 * ((100vw - 320px) / 1600));
  width: 100%;
  font-size: calc(7px + 9 * ((100vw - 320px) / 1600));
  line-height: calc(7px + 17 * ((100vw - 320px) / 1600));
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 9%;
  //@ts-ignore
  background: ${(props:{isActive: boolean}) => props?.isActive ? "#f3f5f7" : "inherit"};

  span {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #f701a5;
    display: inline-block;
    margin-right: calc(1px + 9 * ((100vw - 320px) / 1600));
    position: relative;
  }

  span::before,
  span::after {
    content: "";
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #f701a5;
    display: inline-block;
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
  }

  span::before {
    top: -5px;
    left: 0;
  }

  span::after {
    bottom: -5px;
    left: 0;
  }

  &:hover span::before {
    top: 0;
  }

  &:hover span::after {
    bottom: 0;
  }

  &.block-sidebar-open {
    background-color: transparent;
  }

  &.block-sidebar-open span {
    width: 6px;
    height: 6px;
  }

  &.block-sidebar-open span::before,
  &.block-sidebar-open span::after {
    display: none;
  }

  &.block-sidebar-open .block-sidebar__body {
    display: block !important;
  }


  @media screen and (max-width: 1300px) {
    & {
      padding-left: 4%;
    }
  }
`

export const BlockSideBarButton = styled.button`
  padding-left: calc(5px + 10 * ((100vw - 320px) / 1600));
  padding-right: calc(5px + 9 * ((100vw - 320px) / 1600));
  height: calc(20px + 10 * ((100vw - 320px) / 1600));
  font-size: calc(10px + 2 * ((100vw - 320px) / 1600));
  line-height: calc(10px + 8 * ((100vw - 320px) / 1600));
  border-radius: 100px;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-weight: 500;
`

export const SideBarAcceptButton = styled(BlockSideBarButton)`
  background: #229b68;
  color: #FFFFFF;
  margin-right: 5px;
`
export const SideBarDeclineButton = styled(BlockSideBarButton)`
  border: 1px solid #ef6868;
  background: transparent;
  color: #EF6868;
`
export const SideBarBlockAddButton = styled.button`
  width: 100%;
  font-weight: 500;
  color: #868594;
  height: calc(30px + 24 * ((100vw - 320px) / 1600));
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: calc(10px + 6 * ((100vw - 320px) / 1600));
  line-height: calc(11px + 13 * ((100vw - 320px) / 1600));
  padding-left: 10%;
  background-color: transparent;

  span {
    margin-right: 4px;
  }
`