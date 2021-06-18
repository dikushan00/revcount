import styled from "styled-components";

export const SideBarPage = styled.div`
  border-left: 1px solid #ebedf5;
  width: 24.7%;

  @media screen and (max-width: 1200px) {
    width: 26%;
  }
`
export const SidebarAside = styled.aside`
  background-color: #fff;
  height: 100vh;
  -webkit-box-shadow: 0px 0px 15px rgba(24, 46, 122, 0.03);
  box-shadow: 0px 0px 15px rgba(24, 46, 122, 0.03);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 15.625%;
  position: fixed;
  left: 0;
  top: 0;
`
export const SidebarHeader = styled.div`
  min-height: calc(50px + 60 * ((100vw - 320px) / 1600));
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 13%;
  border-bottom: 1px solid #f2f5f9;
`
export const SidebarLogo = styled.div`
  width: calc(70px + 108 * ((100vw - 320px) / 1600));
`
export const SidebarContent = styled.div`
  padding-top: 32px;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
`
export const SidebarActions = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: calc(15px + 45 * ((100vw - 320px) / 1600));
  margin-bottom: calc(10px + 23 * ((100vw - 320px) / 1600));
`
export const SidebarFooter = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-bottom: calc(10px + 25 * ((100vw - 320px) / 1600));
  margin-top: 20px;
`
export const SidebarBlockInvitation = styled.div`
  padding-top: calc(10px + 18 * ((100vw - 320px) / 1600));

  .block-sidebar__item {
    margin-bottom: calc(5px + 12 * ((100vw - 320px) / 1600));
  }
`
export const SidebarBlockItem = styled.div`
`
export const SidebarLogoLink = styled.a`
`
export const TeamProject = styled.div`
  padding: calc(-10px + 50 * ((100vw - 320px) / 1600));
  border-bottom: 1px solid #ebedf5;
`
export const TeamProjectHeader = styled.div`
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
export const TeamProjectLabel = styled.h4`
  font-weight: 500;
  font-size: calc(10px + 4 * ((100vw - 320px) / 1600));
  line-height: calc(10px + 11 * ((100vw - 320px) / 1600));
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #868594;
`
export const TeamProjectsList = styled.ul`
  margin-top: calc(15px + 15 * ((100vw - 320px) / 1600));
`
export const TeamProjectsItem = styled.li`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-family: "Gilroy";
  margin-bottom: calc(10px + 5 * ((100vw - 320px) / 1600));
  font-weight: 500;
  font-size: calc(12px + 4 * ((100vw - 320px) / 1600));
  line-height: 140%;

  &:last-child {
    margin: 0 0 0 0;
  }
`
export const TeamProjectsRole = styled.div`
  color: #868594;
`
export const TeamProjectsName = styled.div`
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

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
    top: -6px;
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
export const Notices = styled.div`
  padding: calc(-10px + 50 * ((100vw - 320px) / 1600));
`
export const NoticesLabel = styled.h4`
  font-weight: 500;
  font-size: calc(10px + 4 * ((100vw - 320px) / 1600));
  line-height: calc(10px + 11 * ((100vw - 320px) / 1600));
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #868594;
`
export const NoticesList = styled.ul`
  margin-top: calc(5px + 20 * ((100vw - 320px) / 1600));
`
export const NoticesItem = styled.li`
  margin-bottom: calc(5px + 15 * ((100vw - 320px) / 1600));
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;

  &:last-child {
    margin: 0 0 0 0;
  }
`
export const NoticesText = styled.div`
  max-width: 260px;
  font-size: calc(10px + 4 * ((100vw - 320px) / 1600));
  line-height: calc(10px + 11 * ((100vw - 320px) / 1600));
`
export const NoticesTime = styled.div`
  margin-left: calc(5px + 20 * ((100vw - 320px) / 1600));
  font-size: calc(10px + 4 * ((100vw - 320px) / 1600));
  line-height: 140%;
  color: #868594;
`