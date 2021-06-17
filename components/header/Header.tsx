import Link from "next/link";
import {useSelector} from "react-redux";
import {AppStateType} from "../../src/redux/store-redux";
import React from "react";
import {copyTextToClipboard} from "../../src/utils/copyToClipboard";
import {ImgWrapper} from "../common/blocks/ImgWrapper";

export const Header = () => {

    const profile = useSelector((state: AppStateType) => state.profile.profile)
    const [isCopied, setIsCopied] = React.useState(false)

    const copyText = (text: string | number) => {
        copyTextToClipboard(text.toString(), setIsCopied)
    }

    return <header className="header">
        <div className="header__menu menu">
            <div className="menu__icon icon-menu">
                <span/>
                <span/>
                <span/>
            </div>
            <nav className="menu__body">
                <ul className="menu__list">
                    <li className="menu__item">
                        <Link href="/">
                            <a className="menu__link">Owerview</a>
                        </Link>
                    </li>
                    <li className="menu__item">
                        <Link href="/">
                            <a className="menu__link">Milestone</a>
                        </Link>
                    </li>
                    <li className="menu__item">
                        <Link href="/">
                            <a className="menu__link">Payment</a>
                        </Link>
                    </li>
                    <li className="menu__item">
                        <Link href="/">
                            <a className="menu__link">
                                Contacts <span className="menu__link-span">3</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="header__registration">
            <div className="header__indexer">
                your invite id - {profile?.inviteId}
            </div>
            <span onMouseLeave={() => isCopied && setIsCopied(false)}
                  onClick={() => profile?.inviteId && copyText(profile?.inviteId)}
                  className="header__registration-icon">
                <span className="tooltip">
                    <ImgWrapper path={"/img/icons/copyTextIcon.svg"}/>
                    <span className={"tooltiptext"}>
                        {isCopied ? "Copied!" : "Copy"}
                    </span>
                </span>
            </span>
            <Link href="/">
                <a className="header__user">
                    {profile?.avatar
                        ? <img src={profile?.avatar} alt="profile ava"/>
                        : <DefaultProfileAvatar/>}
                </a>
            </Link>
        </div>
    </header>
}

export const DefaultProfileAvatar = () => {
    return <ImgWrapper path={"/img/icons/avatar.svg"}/>
}
export const CopyTextClipboardIcon = () => {
    return <ImgWrapper path={"/img/icons/copyTextIcon.svg"}/>
}