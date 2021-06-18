import styled from "styled-components";

export const MyCorrections = styled.div`
  margin-top: 19px;
`
export const MyCorrectionsList = styled.ul`
  
`
export const MyCorrectionsItem = styled.li`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #ffffff;
  -webkit-box-shadow: 0px 2px 7px rgba(14, 11, 42, 0.02);
  box-shadow: 0px 2px 7px rgba(14, 11, 42, 0.02);
  border-radius: 15px;
  margin-bottom: calc(7px + 3 * ((100vw - 320px) / 1600));
  padding-top: calc(-2px + 28 * ((100vw - 320px) / 1600));
  padding-bottom: calc(-2px + 27 * ((100vw - 320px) / 1600));
  padding-left: calc(-2px + 32 * ((100vw - 320px) / 1600));
  padding-right: calc(-2px + 32 * ((100vw - 320px) / 1600));
  
  &:last-child {
    margin: 0 0 0 0;
  }
  
`
export const MyCorrectionsEdit = styled.div`
  font-weight: 500;
  font-size: calc(5px + 11 * ((100vw - 320px) / 1600));
  line-height: calc(8px + 16 * ((100vw - 320px) / 1600));
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #868594;
  width: calc(7px + 263 * ((100vw - 320px) / 1600));
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;

   span {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #f701a5;
    display: inline-block;
    margin-right: calc(0px + 10 * ((100vw - 320px) / 1600));
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
  
`
export const MyCorrectionsBox = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 2.5%;
  width: calc(30px + 188 * ((100vw - 320px) / 1600));
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 1px;
    height: calc(20px + 10 * ((100vw - 320px) / 1600));
    background-color: #ebedf5;
    top: 50%;
    -webkit-transform: translate(0%, -50%);
    -ms-transform: translate(0%, -50%);
    transform: translate(0%, -50%);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
  
`
export const MyCorrectionsIcon = styled.div`
  height: calc(8px + 16 * ((100vw - 320px) / 1600));
  width: calc(8px + 16 * ((100vw - 320px) / 1600));
  margin-right: calc(-5px + 25 * ((100vw - 320px) / 1600));
`
export const MyCorrectionsDesc = styled.div`
  font-size: calc(6px + 10 * ((100vw - 320px) / 1600));
  line-height: 140%;
  color: #0076ff;
  padding-left: calc(0px + 30 * ((100vw - 320px) / 1600));
`
export const MyCorrectionsAction = styled.div`
  font-size: calc(7px + 9 * ((100vw - 320px) / 1600));
  line-height: 140%;
`
export const ProjectsHeader = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
`
export const ProjectsList = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`
export const ProjectsListItem = styled.div`
  min-width: calc(70px + 115 * ((100vw - 320px) / 1600));
  padding: calc(5px + 15 * ((100vw - 320px) / 1600));
  margin-right: calc(5px + 7 * ((100vw - 320px) / 1600));
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  background: #ffffff;
  -webkit-box-shadow: 0 2px 7px rgba(14, 11, 42, 0.02);
  box-shadow: 0 2px 7px rgba(14, 11, 42, 0.02);
  border-radius: 15px;
  
  &:last-child {
    margin: 0 0 0 0;
  }
`
export const ProjectsListBody = styled.div``
export const ProjectsListLabel = styled.div`
  font-weight: 500;
  font-size: calc(9px + 5 * ((100vw - 320px) / 1600));
  line-height: calc(9px + 12 * ((100vw - 320px) / 1600));
  margin-bottom: calc(0px + 5 * ((100vw - 320px) / 1600));
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #868594;
`
export const ProjectsListIcon = styled.div`
  width: calc(8px + 22 * ((100vw - 320px) / 1600));
  height: calc(8px + 22 * ((100vw - 320px) / 1600));
  margin-right: calc(0px + 15 * ((100vw - 320px) / 1600));
`
export const ProjectsListMetrics = styled.div`
  font-family: "Gilroy",sans-serif;
  font-weight: 600;
  font-size: calc(7px + 15 * ((100vw - 320px) / 1600));
  line-height: calc(7px + 19 * ((100vw - 320px) / 1600));
  color: #0e0b2a;
  
  & sup {
    font-size: calc(5px + 7 * ((100vw - 320px) / 1600));
    line-height: calc(5px + 9 * ((100vw - 320px) / 1600));
    color: #f701a5;
  }
`
export const TitleH2 = styled.h2`
  font-weight: 500;
  font-size: calc(14px + 10 * ((100vw - 320px) / 1600));
  line-height: calc(14px + 22 * ((100vw - 320px) / 1600));
  letter-spacing: 0.065em;
  text-transform: uppercase;
  
`

export const MyCorrectionsTitle = styled(TitleH2)`
  margin-bottom: calc(10px + 20 * ((100vw - 320px) / 1600));
`