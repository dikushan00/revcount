import {BorderedButton, Btn} from "../components/styled/buttons/Buttons";
import React from "react";
import {CreateNewProjectModal} from "../components/projects/addProject/CreateNewProjectModal";
import {JoinProjectModal} from "../components/projects/modals/JoinProjectModal";
import {
    MainBlock,
    MainButtons,
    MainImages,
    MainSection,
    MainText,
    MainTitle
} from "../components/styled/mainPage/components";
import {Layout} from "../components/layouts/Layout";

export default function Home() {

    const [isModalMode, setIsModalMode] = React.useState({
        createProject: false,
        joinProject: false
    })

    return <Layout title={"Revcount"} isProjectSideBarMode={false}>
        <MainSection>
            <MainBlock>
                <MainTitle>
                    Hello! You don't have any projects
                </MainTitle>
                <MainText>
                    To get started, you need to create a project or join an existing one
                </MainText>
                <MainButtons>
                    <Btn onClick={() => setIsModalMode(state => ({...state, createProject: true}))}> Create a new
                        project
                    </Btn>
                    <BorderedButton onClick={() => setIsModalMode(state => ({...state, joinProject: true}))}>Join
                        project</BorderedButton>
                </MainButtons>
            </MainBlock>
            <MainImages>
                <picture>
                    <source srcSet={"/img/main/illustration.svg"} type="image/webp"/>
                    <img src={"/img/main/illustration.svg"} alt="illustration"/>
                </picture>
            </MainImages>
        </MainSection>

        {
            isModalMode.createProject &&
            <CreateNewProjectModal hideBlock={() => setIsModalMode(state => ({...state, createProject: false}))}/>
        }
        {
            isModalMode.joinProject &&
            <JoinProjectModal hideBlock={() => setIsModalMode(state => ({...state, joinProject: false}))}/>
        }
    </Layout>
}

