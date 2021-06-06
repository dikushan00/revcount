import React from 'react';
import {FilledButton} from "../components/common/blocks/buttons/FilledButton";
import {MainLayOut} from "../components/layouts/MainLayOut";

export default function Project() {
    return <MainLayOut title={"Project"}>
        <div className="projects">
            <div className="projects__header">
                <FilledButton>Add new correction<span>+</span></FilledButton>
                <ul className="projects__list projects-list">
                    <li className="projects-list__item projects-list__item--deadline">
                        <div className="projects-list__icon">
                            <picture>
                                <source srcSet={"/img/projects/flame.svg"} type="image/webp"/>
                                <img src={"/img/projects/flame.svg"} alt="flame"/></picture>
                        </div>
                        <div className="projects-list__body">
                            <div className="projects-list__label">
                                Deadline
                            </div>
                            <div className="projects-list__metrics">
                                21 d. <sup>+3 d.</sup>
                            </div>
                        </div>
                    </li>
                    <li className="projects-list__item projects-list__item--edits">
                        <div className="projects-list__icon">
                            <picture>
                                <source srcSet={"/img/projects/free.svg"} type="image/webp"/>
                                <img src={"/img/projects/free.svg"} alt="free"/>
                            </picture>
                        </div>
                        <div className="projects-list__body">
                            <div className="projects-list__label">
                                Free edits
                            </div>
                            <div className="projects-list__metrics">
                                4 h.
                            </div>
                        </div>
                    </li>
                    <li className="projects-list__item projects-list__item--balance">
                        <div className="projects-list__icon">
                            <picture>
                                <source srcSet={"/img/projects/credit-card.svg"} type="image/webp"/>
                                <img src={"/img/projects/credit-card.svg"} alt="credit-card"/>
                            </picture>
                        </div>
                        <div className="projects-list__body">
                            <div className="projects-list__label">
                                Balance
                            </div>
                            <div className="projects-list__metrics">
                                1 329 $
                            </div>
                        </div>
                        <div className="projects-list__add">
                            +
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div className="my-corrections">
            <h2 className="my-corrections__title title">
                My corrections
            </h2>
        </div>
    </MainLayOut>

}
