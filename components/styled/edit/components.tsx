import styled from "styled-components";
import {TitleH2} from "../projects/components";
import {Btn, Btn2} from "../buttons/Buttons";

export const EditWrapper = styled.section`
`
export const EditHeader = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
`
export const EditTitle = styled(TitleH2)`
`
export const EditForm = styled.form`
  margin-top: calc(20px + 28 * ((100vw - 320px) / 1600));
  margin-left: calc(0px + 9 * ((100vw - 320px) / 1600));
`
export const FormEditHeader = styled.div`
`
export const FormEditLabel = styled.h4`
  font-size: calc(12px + 2 * ((100vw - 320px) / 1600));
  line-height: calc(14px + 7 * ((100vw - 320px) / 1600));
  margin-bottom: calc(10px + 5 * ((100vw - 320px) / 1600));
  color: #111742;
`
export const FormEditBox = styled.div`
  background-color: transparent;
  border: 1px solid #ebedf5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 30px;
  padding: calc(5px + 10 * ((100vw - 320px) / 1600));
  margin-bottom: calc(10px + 5 * ((100vw - 320px) / 1600));
`
export const FormEditInput = styled.input`
  width: 100%;
  font-size: calc(15px + 3 * ((100vw - 320px) / 1600));
  line-height: calc(18px + 9 * ((100vw - 320px) / 1600));

  &::-webkit-input-placeholder {
    font-size: calc(15px + 3 * ((100vw - 320px) / 1600));
    line-height: calc(18px + 9 * ((100vw - 320px) / 1600));
    color: rgba(17, 23, 66, 0.3);
  }

  &::-moz-placeholder {
    font-size: calc(15px + 3 * ((100vw - 320px) / 1600));
    line-height: calc(18px + 9 * ((100vw - 320px) / 1600));
    color: rgba(17, 23, 66, 0.3);
  }

  &:-ms-input-placeholder {
    font-size: calc(15px + 3 * ((100vw - 320px) / 1600));
    line-height: calc(18px + 9 * ((100vw - 320px) / 1600));
    color: rgba(17, 23, 66, 0.3);
  }

  &::-ms-input-placeholder {
    font-size: calc(15px + 3 * ((100vw - 320px) / 1600));
    line-height: calc(18px + 9 * ((100vw - 320px) / 1600));
    color: rgba(17, 23, 66, 0.3);
  }

  &::placeholder {
    font-size: calc(15px + 3 * ((100vw - 320px) / 1600));
    line-height: calc(18px + 9 * ((100vw - 320px) / 1600));
    color: rgba(17, 23, 66, 0.3);
  }
`
export const Edits = styled.section``
export const EditsHeader = styled.section`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 32px;
  height: calc(15px + 45 * ((100vw - 320px) / 1600));
  padding-right: calc(0px + 3 * ((100vw - 320px) / 1600));
`
export const ControlEditsHeader = styled.section`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`
export const BorderWrap = styled.div`
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 15px rgba(24, 46, 122, 0.02);
  box-shadow: 0px 0px 15px rgba(24, 46, 122, 0.02);
  border-radius: calc(0px + 20 * ((100vw - 320px) / 1600));
  padding-top: calc(0px + 50 * ((100vw - 320px) / 1600));
  padding-bottom: calc(0px + 50 * ((100vw - 320px) / 1600));
  padding-left: calc(-10px + 60 * ((100vw - 320px) / 1600));
  padding-right: calc(-10px + 55 * ((100vw - 320px) / 1600));
  margin-bottom: calc(10px + 10 * ((100vw - 320px) / 1600));
`
export const ControlEdits = styled(BorderWrap)`
  padding-top: calc(0px + 47 * ((100vw - 320px) / 1600));
`
export const EditsTitle = styled(TitleH2)``
export const EditsButton = styled(Btn2)`
  padding-left: calc(0px + 22 * ((100vw - 320px) / 1600));
`
export const PanelEdits = styled.ul`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-top: calc(15px + 20 * ((100vw - 320px) / 1600));

  @media screen and (max-width: 1892px) {
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
`
export const PanelEditsItem = styled.li`
  margin-right: calc(0px + 15 * ((100vw - 320px) / 1600));

  &:last-child {
    margin: 0 0 0 0;
  }

  &:nth-child(5) {
    width: 100%;
    //margin-top: 20px;
  }
`
export const OfferEdits = styled.div``
export const OfferEditsHeader = styled.div`
  border-top: 1px dashed #ebedf5;
  margin-top: calc(0px + 50 * ((100vw - 320px) / 1600));
  padding-top: calc(0px + 54 * ((100vw - 320px) / 1600));
  margin-bottom: calc(15px + 20 * ((100vw - 320px) / 1600));

`
export const Label = styled.div`
  font-size: calc(7px + 13 * ((100vw - 320px) / 1600));
  line-height: calc(7px + 23 * ((100vw - 320px) / 1600));
  color: #111742;
`
export const EditsLabel = styled(Label)``
export const ControlEditsLabel = styled(Label)`
  padding-top: 4px;
`
export const OfferEditsForm = styled.form`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;

`
export const TaskEditsArrow = styled.span`
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-right: calc(0px + -6 * ((100vw - 320px) / 1600));
  width: calc(15px + 15 * ((100vw - 320px) / 1600));
  height: calc(15px + 15 * ((100vw - 320px) / 1600));
  background: #e6e8ef;
  border-radius: 50%;
  cursor: pointer;

  svg {
    width: calc(8px + 4 * ((100vw - 320px) / 1600));
    height: calc(5px + 2 * ((100vw - 320px) / 1600));
  }

`
export const OfferEditsBlock = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-left: auto;
  padding-right: 10px;
`
export const OfferEditsReserveBtn = styled.div`
  padding-left: calc(-15px + 115 * ((100vw - 320px) / 1600));
  padding-right: calc(-15px + 115 * ((100vw - 320px) / 1600));
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
  color: #ffffff;
  background: #229b68;
  white-space: nowrap;
  cursor: pointer;
`

export const ProgressEdits = styled(BorderWrap)`
  padding-top: calc(-10px + 53 * ((100vw - 320px) / 1600));
  padding-bottom: calc(-10px + 53 * ((100vw - 320px) / 1600));
  padding-right: calc(0px + 53 * ((100vw - 320px) / 1600));
`
export const ProgressEditsWrapper = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`
export const ProgressEditsLabel = styled(Label)`
  margin-right: calc(-15px + 41 * ((100vw - 320px) / 1600));

`
export const ProgressEditsList = styled.ul`
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
`
export const ProgressEditsItem = styled.li`
  margin-right: calc(0px + 5 * ((100vw - 320px) / 1600));

  &:last-child {
    margin: 0 0 0 0;
  }
`
export const TaskEditsList = styled.ol`
  counter-reset: myCounter;
  margin-top: calc(15px + 0 * ((100vw - 320px) / 1600));
`
export const TaskEditsItem = styled.li`
  list-style: none;
  padding-top: calc(1px + 13 * ((100vw - 320px) / 1600));
  padding-bottom: calc(1px + 13 * ((100vw - 320px) / 1600));
  padding-left: calc(1px + 14 * ((100vw - 320px) / 1600));
  padding-right: calc(1px + 16 * ((100vw - 320px) / 1600));
  border: 1px solid #ebedf5;
  border-radius: calc(10px + 20 * ((100vw - 320px) / 1600));
  margin-bottom: calc(10px + 5 * ((100vw - 320px) / 1600));


  &:last-child {
    margin: 0 0 0 0;
  }

  .task-open.task-edits__box {
    display: block;
  }

  .task-open.task-edits__body {
    display: block;
  }

  .task-open.task-edits__edit {
    display: none;
  }

  .task-open.task-edits__delete {
    display: none;
  }

  .task-open.task-edits__block svg {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .task-open.task-edits__block svg path {
    fill: #888BA0;
  }

  .task-edits__number {
    width: calc(10px + 20 * ((100vw - 320px) / 1600));
    height: calc(10px + 20 * ((100vw - 320px) / 1600));
    background: #e6e8ef;
    border-radius: 100px;
    position: relative;
  }

  .task-edits__number::before {
    counter-increment: myCounter;
    content: counter(myCounter);
    position: absolute;
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
    font-weight: 600;
    font-size: calc(8px + 10 * ((100vw - 320px) / 1600));
    line-height: calc(8px + 19 * ((100vw - 320px) / 1600));
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #888ba0;
  }
`

export const TaskEditsTop = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
`
export const TaskEditsNumber = styled.div``
export const TaskEditsEdit = styled.div`
  font-weight: 500;
  font-size: calc(12px + 4 * ((100vw - 320px) / 1600));
  line-height: calc(12px + 12 * ((100vw - 320px) / 1600));
  color: #1078f1;
  background-color: transparent;
`
export const TaskEditsDelete = styled.div`
  font-weight: 500;
  font-size: calc(12px + 4 * ((100vw - 320px) / 1600));
  line-height: calc(12px + 12 * ((100vw - 320px) / 1600));
  color: rgba(17, 23, 66, 0.3);
  margin-left: calc(5px + 10 * ((100vw - 320px) / 1600));
  background-color: transparent;
  -webkit-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  
  &:hover {
    color: #f701a5;
  }
`
export const TaskEditsBody = styled.div`
  margin-top: calc(10px + 21 * ((100vw - 320px) / 1600));
  display: none;
`
export const TaskEditsBox = styled.div`
  display: none;
`
export const TaskEditsWrap = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`
export const TaskEditsWrapper = styled.div`
  position: relative;
  margin-left: calc(5px + 13 * ((100vw - 320px) / 1600));
`
export const TaskEditsFile = styled.input`
  opacity: 0;
  visibility: hidden;
  position: absolute;
`
export const TaskEditsFileIcon = styled.span`
  svg {
    -o-object-fit: cover;
    object-fit: cover;
    width: calc(10px + 10 * ((100vw - 320px) / 1600));
    height: calc(10px + 10 * ((100vw - 320px) / 1600));
    display: block;
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
  }

  svg path {
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
  }

  &:hover svg path {
    fill: #0076ff;
  }
`
export const TaskEditsTextarea = styled.textarea`
  width: 100%;
  min-height: calc(40px + 58 * ((100vw - 320px) / 1600));
  padding-left: 10px;
  font-size: calc(7px + 11 * ((100vw - 320px) / 1600));
  line-height: calc(9px + 18 * ((100vw - 320px) / 1600));
  resize: none;

  &::-webkit-input-placeholder {
    font-size: calc(12px + 6 * ((100vw - 320px) / 1600));
    line-height: calc(12px + 15 * ((100vw - 320px) / 1600));
    color: rgba(17, 23, 66, 0.3);
  }

  &::-moz-placeholder {
    font-size: calc(12px + 6 * ((100vw - 320px) / 1600));
    line-height: calc(12px + 15 * ((100vw - 320px) / 1600));
    color: rgba(17, 23, 66, 0.3);
  }

  &:-ms-input-placeholder {
    font-size: calc(12px + 6 * ((100vw - 320px) / 1600));
    line-height: calc(12px + 15 * ((100vw - 320px) / 1600));
    color: rgba(17, 23, 66, 0.3);
  }

  &::-ms-input-placeholder {
    font-size: calc(12px + 6 * ((100vw - 320px) / 1600));
    line-height: calc(12px + 15 * ((100vw - 320px) / 1600));
    color: rgba(17, 23, 66, 0.3);
  }

  &::placeholder {
    font-size: calc(12px + 6 * ((100vw - 320px) / 1600));
    line-height: calc(12px + 15 * ((100vw - 320px) / 1600));
    color: rgba(17, 23, 66, 0.3);
  }
`
export const TaskEditsBlock = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-left: auto;
  
  svg {
    margin-right: calc(0px + 6 * ((100vw - 320px) / 1600));
    width: 8px;
    height: 5px;
  }
`

export const FormEditWrapper = styled.div`
  margin-top: calc(20px + 11 * ((100vw - 320px) / 1600));
`
export const TaskEditsInner = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-top: calc(20px + 10 * ((100vw - 320px) / 1600));
`
export const TaskEditsCorrectionButton = styled(Btn)`
  padding-left: calc(0px + 57 * ((100vw - 320px) / 1600));
  padding-right: calc(0px + 57 * ((100vw - 320px) / 1600));
`
export const TaskEdits = styled(BorderWrap)`
  .task-edits-open .task-edits__arrow {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .task-edits-open .task-edits__list {
    display: block;
    margin-top: calc(15px + 9 * ((100vw - 320px) / 1600));
  }
  .task-edits-closed .task-edits__list {
    display: none;
  }
  .task-edits-closed .task-edits__btn {
    display: none;
  }
  .task-edits-closed .task-edits__inner {
    display: none;
  }
`
export const TaskEditsHeader = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-right: calc(0px + 5 * ((100vw - 320px) / 1600));
`


export const LeftWorkspaceLabel = styled.div`
  font-size: calc(8px + 6 * ((100vw - 320px) / 1600));
  line-height: calc(8px + 13 * ((100vw - 320px) / 1600));
  color: #111742;
`
export const LeftWorkspace = styled.form`
  border-top: 1px dashed #ebedf5;
  margin-top: calc(10px + 38 * ((100vw - 320px) / 1600));
  padding-top: calc(10px + 40 * ((100vw - 320px) / 1600));
`
export const LeftWorkspaceList = styled.ul`
  margin-top: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`
export const LeftWorkspaceInput = styled.input`
  font-size: calc(7px + 11 * ((100vw - 320px) / 1600));
  line-height: calc(7px + 20 * ((100vw - 320px) / 1600));
  color: #111742;
  width: 100%;

  &::-webkit-input-placeholder {
    font-size: calc(7px + 11 * ((100vw - 320px) / 1600));
    line-height: calc(7px + 20 * ((100vw - 320px) / 1600));
    color: #111742;
  }

  &::-moz-placeholder {
    font-size: calc(7px + 11 * ((100vw - 320px) / 1600));
    line-height: calc(7px + 20 * ((100vw - 320px) / 1600));
    color: #111742;
  }

  &:-ms-input-placeholder {
    font-size: calc(7px + 11 * ((100vw - 320px) / 1600));
    line-height: calc(7px + 20 * ((100vw - 320px) / 1600));
    color: #111742;
  }

  &::-ms-input-placeholder {
    font-size: calc(7px + 11 * ((100vw - 320px) / 1600));
    line-height: calc(7px + 20 * ((100vw - 320px) / 1600));
    color: #111742;
  }

  &::placeholder {
    font-size: calc(7px + 11 * ((100vw - 320px) / 1600));
    line-height: calc(7px + 20 * ((100vw - 320px) / 1600));
    color: #111742;
  }
`
export const LeftWorkspaceItem = styled.li`
  margin-right: 10px;
  border: 1px solid #ebedf5;
  border-radius: calc(10px + 20 * ((100vw - 320px) / 1600));
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  height: calc(15px + 45 * ((100vw - 320px) / 1600));
  padding-left: calc(0px + 30 * ((100vw - 320px) / 1600));
  padding-right: calc(0px + 30 * ((100vw - 320px) / 1600));
  width: calc(50px + 70 * ((100vw - 320px) / 1600));
  
  &:last-child {
    margin: 0 0 0 0;
  }
`
export const LeftWorkspaceDesc = styled.div`
  font-size: calc(7px + 11 * ((100vw - 320px) / 1600));
  line-height: calc(7px + 20 * ((100vw - 320px) / 1600));
  color: rgba(17, 23, 66, 0.3);
  display: block;
`