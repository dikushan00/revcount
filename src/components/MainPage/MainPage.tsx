import React from 'react';
import illustrationImg from "../../assets/img/main/illustration.svg";
import {FilledButton} from "../common/blocks/buttons/FilledButton";
import {BorderedButton} from "../common/blocks/buttons/BorderedButton";
import {CreateNewProjectModal} from "../projects/addProject/CreateNewProjectModal";
import {JoinProjectModal} from "../projects/JoinProjectModal";

export const MainPage = () => {

    const [isModalMode, setIsModalMode] = React.useState({
        createProject: false,
        joinProject: false
    })

    return <>
        <section className="main">
            <div className="main__block">
                <h1 className="main__title">
                    Hello! You don't have any projects
                </h1>
                <p className="main__text">
                    To get started, you need to create a project or join an existing one
                </p>
                <div className="main__buttons">
                    <FilledButton onClick={() => setIsModalMode(state => ({...state, createProject: true}))}> Create a
                        new project</FilledButton>
                    <BorderedButton onClick={() => setIsModalMode(state => ({...state, joinProject: true}))}>Join
                        project</BorderedButton>
                </div>
            </div>
            <div className="main__images">
                <picture>
                    <source srcSet={illustrationImg} type="image/webp"/>
                    <img src={illustrationImg} alt="illustration"/>
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
    </>
};