import React from "react";
import styled from "styled-components"


const PopupButton = styled.button`
  padding-left: 36px;
  padding-right: 36px;
  margin-top: 52px;
  font-size: 16px;
  line-height: 24px;
  height: 60px;
  background: #0076ff;
  border-radius: 100px;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  -webkit-transition: all 0.5s ease 0s;
  -o-transition: all 0.5s ease 0s;
  transition: all 0.5s ease 0s;
  cursor: pointer;

  &:hover {
    background: #f701a5;
  }
`
const PopupDivButton = styled.div`
  padding-left: 36px;
  padding-right: 36px;
  margin-top: 52px;
  font-size: 16px;
  line-height: 24px;
  height: 60px;
  background: #0076ff;
  border-radius: 100px;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  -webkit-transition: all 0.5s ease 0s;
  -o-transition: all 0.5s ease 0s;
  transition: all 0.5s ease 0s;
  cursor: pointer;

  &:hover {
    background: #f701a5;
  }
`

export const InputIdButton = styled(PopupButton)`
      display: inline-flex;
      align-items: center;
    `

export const InputIdDivButton = styled(PopupDivButton)`
  display: inline-flex;
  align-items: center;
`
export const IdBlockButton = styled.span`
      width: 16px;
      height: 16px;
      background: #888ba0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      border-radius: 50%;
      margin-left: 5px;
      cursor: pointer;

      svg {
        width: 6px;
        height: 6px;
      }
    `



