import Link from "next/link";
import {ImgWrapper} from "../common/blocks/ImgWrapper";
import React from "react";

export const SocialNetworksSignUp = () => {
    return <ul className="signup__box">
        <li className="signup__item">
            <Link href="/">
                <a>
                    <ImgWrapper path={"/img/icons/apple.svg"} />
                </a>
            </Link>
        </li>
        <li className="signup__item">
            <Link href="/">
                <a>
                    <ImgWrapper path={"/img/icons/google.svg"} />
                </a>
            </Link>
        </li>
        <li className="signup__item">
            <Link href="/">
                <a>
                    <ImgWrapper path={"/img/icons/facebook.svg"} />
                </a>
            </Link>
        </li>
    </ul>
}