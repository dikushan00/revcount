import Link from "next/link";
import {useSelector} from "react-redux";
import {AppStateType} from "../../src/redux/store-redux";
import React from "react";
import {copyTextToClipboard} from "../../src/utils/copyToClipboard";
import {ImgWrapper} from "../common/blocks/ImgWrapper";
import {
    HeaderComponent, HeaderIndexer,
    HeaderMenu,
    HeaderRegistration, HeaderRegistrationIcon, HeaderUser,
    MenuBody,
    MenuItem,
    MenuLink,
    MenuList, Tooltip
} from "../styled/header/components";

export const Header = () => {

    const profile = useSelector((state: AppStateType) => state.profile.profile)
    const [isCopied, setIsCopied] = React.useState(false)

    const copyText = (text: string | number) => {
        copyTextToClipboard(text.toString(), setIsCopied)
    }

    return <HeaderComponent>
        <HeaderMenu>
            <div className="menu__icon icon-menu">
                <span/>
                <span/>
                <span/>
            </div>
            <MenuBody>
                <MenuList>
                    <MenuItem>
                        <Link href="/">
                            <MenuLink>Owerview</MenuLink>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href="/">
                            <MenuLink>Milestone</MenuLink>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href="/">
                            <MenuLink>Payment</MenuLink>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href="/">
                            <MenuLink>
                                Contacts <span className="menu__link-span">3</span>
                            </MenuLink>
                        </Link>
                    </MenuItem>
                </MenuList>
            </MenuBody>
        </HeaderMenu>

        <HeaderRegistration>
            {profile?.inviteId && <>
                <HeaderIndexer>
                    your invite id - {profile?.inviteId}
                </HeaderIndexer>

                <HeaderRegistrationIcon onMouseLeave={() => isCopied && setIsCopied(false)}
                                        onClick={() => profile?.inviteId && copyText(profile?.inviteId)}>
                    <Tooltip>
                        <ImgWrapper path={"/img/icons/copyTextIcon.svg"}/>
                        <span className={"tooltiptext"}>
                        {isCopied ? "Copied!" : "Copy"}
                    </span>
                    </Tooltip>
                </HeaderRegistrationIcon>
            </>}
            <Link href="/">
                <HeaderUser>
                    {profile?.avatar
                        ? <ImgWrapper path={profile?.avatar}/>
                        : <DefaultProfileAvatar/>}
                </HeaderUser>
            </Link>
        </HeaderRegistration>
    </HeaderComponent>
}

export const DefaultProfileAvatar = () => {
    return <ImgWrapper path={"/img/icons/avatar.svg"}/>
}
export const CopyTextClipboardIcon = () => {
    return <ImgWrapper path={"/img/icons/copyTextIcon.svg"}/>
}