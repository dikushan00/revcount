import styled from "styled-components";

export const HeaderComponent = styled.header`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-left: calc(0px + 50 * ((100vw - 320px) / 1600));
  padding-right: calc(0px + 40 * ((100vw - 320px) / 1600));
  background-color: #f3f5f7;
  width: 100%;
  min-height: calc(50px + 60 * ((100vw - 320px) / 1600));
  border-bottom: 1px solid #ebedf5;
`
export const HeaderMenu = styled.div`
`
export const MenuBody = styled.nav`
`
export const MenuList = styled.ul`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
`
export const MenuItem = styled.li`
  margin-right: calc(1px + 31 * ((100vw - 320px) / 1600));

  &:last-child {
    margin: 0 0 0 0;
  }
`
export const MenuLink = styled.a`
  font-weight: 500;
  font-size: calc(12px + 8 * ((100vw - 320px) / 1600));
  line-height: calc(13px + 17 * ((100vw - 320px) / 1600));
  text-transform: uppercase;
  color: #868594;
  -webkit-transition: all 0.5s ease 0s;
  -o-transition: all 0.5s ease 0s;
  transition: all 0.5s ease 0s;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;


  &:hover {
    color: #0076ff;
  }

  &:hover .menu__link-span {
    background: #0076ff;
    color: #ffffff;
  }
`
export const HeaderRegistration = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

`
export const HeaderRegistrationIcon = styled.span`
  cursor: pointer;
  display: block;
  margin-left: calc(1px + 9 * ((100vw - 320px) / 1600));
  width: calc(12px + 4 * ((100vw - 320px) / 1600));
  height: calc(12px + 4 * ((100vw - 320px) / 1600));

  &:hover svg path {
    fill: #0076ff;
  }
`
export const HeaderIndexer = styled.div`
  font-weight: 500;
  font-size: calc(11px + 5 * ((100vw - 320px) / 1600));
  line-height: calc(12px + 12 * ((100vw - 320px) / 1600));
  text-transform: uppercase;
  color: #868594;

`
export const HeaderUser = styled.a`
  margin-left: calc(0px + 50 * ((100vw - 320px) / 1600));

  svg {
    width: calc(20px + 20 * ((100vw - 320px) / 1600));
    height: calc(20px + 20 * ((100vw - 320px) / 1600));
    -webkit-transition: all 0.4s ease 0s;
    -o-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
  }

  svg path {
    fill: #868594;
    -webkit-transition: all 0.4s ease 0s;
    -o-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
  }

  &:hover svg path {
    fill: #0076ff;
  }

`
export const Tooltip = styled.span`
  position: relative;
  display: inline-block;
  /*border-bottom: 1px dotted rgba(33,37,41,0.9);*/

  .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: rgba(33, 37, 41, 0.9);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }

  .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: rgba(33, 37, 41, 0.9);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }

  .tooltiptext {
    width: 120px;
    top: 100%;
    left: 50%;
    margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
  }

  .tooltiptext::after {
    content: " ";
    position: absolute;
    bottom: 100%; /* At the top of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent rgba(33, 37, 41, 0.9) transparent;
  }

  &:hover .tooltiptext {
    visibility: visible;
  }

`