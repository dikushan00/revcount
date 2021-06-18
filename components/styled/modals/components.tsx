import styled from "styled-components";

export const PopupClose = styled.div`
  width: 33px;
  height: 33px;
  position: absolute;
  top: 30px;
  right: 30px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 30;
  background-color: #e6e8ef;
  background-image: url("/public/img/icons/x.svg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 13px 13px;
  -webkit-transition: all 0.3s linear 0s;
  -o-transition: all 0.3s linear 0s;
  transition: all 0.3s linear 0s;

  &:hover {
    background-color: #c6cadb;
  }

  @media screen and (min-width: 991.98px) {
    opacity: 0.5;
  }
`
export const PopupTitle = styled.h2`
  font-weight: 500;
  font-size: 40px;
  line-height: 60px;
  color: #111742;
  margin-bottom: 35px;
`
export const PopupForm = styled.form``
export const PopupTabs = styled.div``
export const PopupItem = styled.div`
  position: relative;
  margin-bottom: 15px;

  .popup__icon {
    position: absolute;
    z-index: 1;
    width: 24px;
    height: 24px;
    right: 0;
    top: 50%;
    cursor: pointer;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 22px;
    line-height: 33px;
    color: rgba(17, 23, 66, 0.3);
  }
`
export const PopupTabsNav = styled.div``
export const PopupTabsItem = styled.div``
export const PopupTabsBody = styled.div``
export const PopupTabsBlock = styled.div``
export const PopupTabsLine = styled.div``
export const PopupTabsInput = styled.input``
export const PopupTabsColumn = styled.div``
export const PopupInput = styled.input`

  font-size: 22px;
  line-height: 33px;
  width: 100%;
  height: 68px;
  border-bottom: 1px solid #ebedf5;

  &::-webkit-input-placeholder {
    color: rgba(17, 23, 66, 0.3);
  }

  &::-moz-placeholder {
    color: rgba(17, 23, 66, 0.3);
  }

  &:-ms-input-placeholder {
    color: rgba(17, 23, 66, 0.3);
  }

  &::-ms-input-placeholder {
    color: rgba(17, 23, 66, 0.3);
  }

  &::placeholder {
    color: rgba(17, 23, 66, 0.3);
  }

  &:focus {
    border-bottom: 1px solid #0e0b2a;
  }
`
export const PopupInputDate = styled(PopupInput)`
  &::-webkit-inner-spin-button {
    visibility: visible;
  }

  &::-webkit-calendar-picker-indicator {
    position: relative;
    opacity: 0;
    z-index: 2;
    cursor: pointer;
  }

  &::-webkit-input-placeholder {
    color: rgba(17, 23, 66, 0.3);
  }

  &::-moz-placeholder {
    color: rgba(17, 23, 66, 0.3);
  }

  &:-ms-input-placeholder {
    color: rgba(17, 23, 66, 0.3);
  }

  &::-ms-input-placeholder {
    color: rgba(17, 23, 66, 0.3);
  }

  &::placeholder {
    color: rgba(17, 23, 66, 0.3);
  }
`
export const PopupInputId = styled(PopupInput)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /*overflow-x: auto;*/
  padding: 10px 20px;

`
export const IdBlockItem = styled.div`

  padding: 8px 7px 7px 10px;
  border: 1px solid #ebedf5;
  border-radius: 100px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  height: 80%;
  margin: 5px 10px 5px 0;

  &:last-child {
    margin: 0 0 0 0;
  }

`
export const IdBlockNumber = styled.div`
  font-size: 18px;
  line-height: 100%;
  text-transform: uppercase;
  color: #0e0b2a;
`
export const InputTag = styled.input`
  height: 100%;
  width: 100%;
  min-width: 100px;
`
export const PopupButton = styled.button`
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
`
export const PopupIcon = styled.label``
export const PopupProfession = styled.div``
export const PopupInfo = styled.div``
export const PopupBlock = styled.ul``
export const PopupBox = styled.li`
  .active {
    background: rgba(97, 155, 206, 0.75);
  }
`
export const PopupSelect = styled.select``
export const PopupLink = styled.span``
export const PopupDesc = styled.div`
  font-weight: 300;
  font-size: 14px;
  line-height: 21px;
  color: #111742;
  margin-top: 16px;
  
`
export const PopupActions = styled.ul`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-top: 1px solid #ebedf5;
  padding-top: 50px;
  margin-top: 50px;
  
`
export const PopupActionsItem = styled.ul`
  padding: 15px 25px;
  background: #f3f5f7;
  border-radius: 100px;
  margin-right: 15px;
  -webkit-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  cursor: pointer;

  &:last-child {
    margin: 0 0 0 0;
  }

  &:hover {
    background: #9a9ea1;
  }

  &:hover .actions-popup__link {
    color: #0b113b;
  }

  &:hover .actions-popup__link svg path {
    fill: #0b113b;
  }
`
export const PopupActionsLink = styled.span`

  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: #888ba0;
  -webkit-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;

  svg {
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
    margin-left: 12px;
  }
`