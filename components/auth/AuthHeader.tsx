import React from 'react';
import Link from "next/link";
import {
    SignUpContentContainer,
    SignUpHeader,
    SignUpHeaderButton, SignUpHeaderItem, SignUpHeaderLink, SignUpHeaderList,
    SignUpHeaderLogo,
    SignUpHeaderLogoLink
} from "../styled/signUp/components";
import {ImgWrapper} from "../common/blocks/ImgWrapper";

export const AuthHeader = () => {
    return <SignUpHeader className="header-signup">
        <SignUpContentContainer>
            <SignUpHeaderLogo>
                <Link href="/">
                    <SignUpHeaderLogoLink>
                        <ImgWrapper path={"/img/icons/logo.svg"}/>
                    </SignUpHeaderLogoLink>
                </Link>
            </SignUpHeaderLogo>
            <div className="header-signup__menu menu">
                <div className="header-signup__icon icon-menu">
                    <span/>
                    <span/>
                    <span/>
                </div>
                <nav className="header-signup__body">
                    <SignUpHeaderList>
                        {
                            headerNavItems.map((item, index) => {
                                return <SignUpHeaderItem key={index}>
                                    <Link href={item.link}>
                                        <SignUpHeaderLink>{item.title}</SignUpHeaderLink>
                                    </Link>
                                </SignUpHeaderItem>
                            })
                        }
                    </SignUpHeaderList>
                </nav>
            </div>
            <Link href={"/sign-up"}>
                <a>
                    <SignUpHeaderButton>Sign up</SignUpHeaderButton>
                </a>
            </Link>
        </SignUpContentContainer>
    </SignUpHeader>
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
