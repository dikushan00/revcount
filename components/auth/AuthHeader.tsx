import React from 'react';
import Link from "next/link";

export const AuthHeader = () => {
    return <header className="header-signup">
        <div className="header-signup__content _container">
            <div className="header-signup__logo">
                <Link href="/">
                    <a className="header-signup__logo-link">
                        <picture>
                            <source srcSet={"/img/icons/logo.svg"} type="image/webp"/>
                            <img src={"/img/icons/logo.svg"} alt="logo"/>
                        </picture>
                    </a>
                </Link>
            </div>
            <div className="header-signup__menu menu">
                <div className="header-signup__icon icon-menu">
                    <span/>
                    <span/>
                    <span/>
                </div>
                <nav className="header-signup__body">
                    <ul className="header-signup__list">
                        {
                            headerNavItems.map((item, index) => {
                                return <li key={index} className="header-signup__item">
                                    <Link href={item.link}>
                                        <a className="header-signup__link">{item.title}</a>
                                    </Link>
                                </li>
                            })
                        }
                    </ul>
                </nav>
            </div>
            <Link href={"/sign-up"}>
                <a>
                    <button className="header-signup__btn">Sign up</button>
                </a>
            </Link>
        </div>
    </header>
}

const headerNavItems = [
    {
        title: "How it works",
        link: "/how-it-works"
    },
    {
        title: "Storytelling",
        link: "/storytelling"
    },
    {
        title: "Benefits",
        link: "/benefits"
    },
    {
        title: "Features",
        link: "/features"
    },
    {
        title: "More about payment",
        link: "/more-about-payment"
    },
]
