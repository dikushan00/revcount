import {MainLayOut} from "../components/layouts/MainLayOut";
import {FilledButton} from "../components/common/blocks/buttons/FilledButton";
import {BorderedButton} from "../components/common/blocks/buttons/BorderedButton";
import React from "react";
import {CreateNewProjectModal} from "../components/projects/addProject/CreateNewProjectModal";
import {JoinProjectModal} from "../components/projects/modals/JoinProjectModal";

export default function Home() {

    const [isModalMode, setIsModalMode] = React.useState({
        createProject: false,
        joinProject: false
    })

    return <MainLayOut title={"Revcount"} isProjectSideBarMode={false}>
        <section className="main">
            <div className="main__block">
                <h1 className="main__title">
                    Hello! You don't have any projects
                </h1>
                <p className="main__text">
                    To get started, you need to create a project or join an existing one
                </p>
                <div className="main__buttons">
                    <FilledButton
                        onClick={() => setIsModalMode(state => ({...state, createProject: true}))}
                    > Create a
                        new project</FilledButton>
                    <BorderedButton
                        onClick={() => setIsModalMode(state => ({...state, joinProject: true}))}
                    >Join project</BorderedButton>
                </div>
            </div>
            <div className="main__images">
                <picture>
                    <source srcSet={"/img/main/illustration.svg"} type="image/webp"/>
                    <img src={"/img/main/illustration.svg"} alt="illustration"/>
                </picture>
            </div>
        </section>

        {
            isModalMode.createProject &&
            <CreateNewProjectModal hideBlock={() => setIsModalMode(state => ({...state, createProject: false}))}/>
        }
        {
            isModalMode.joinProject &&
            <JoinProjectModal hideBlock={() => setIsModalMode(state => ({...state, joinProject: false}))}/>
        }
    </MainLayOut>
}
