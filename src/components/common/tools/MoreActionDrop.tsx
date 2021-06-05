import React from "react";
import {useOutsideAlerter} from "../../../utils/hooks/outsideClick";
import {CommonIcon} from "../blocks/CommonIcon";
import {CustomCommonPopup} from "../blocks/CustomCommonPopup";

type PropsType = {
    setShowActions: (n: boolean) => void
    showActions: boolean
    options: MoreActionOptionType[]
}

//popup with actions
export const MoreActionDrop: React.FC<PropsType> = ({
                                                        setShowActions,
                                                        showActions,
                                                        options
                                                    }) => {
    const moreActionRef = React.useRef(null)
    useOutsideAlerter(moreActionRef, setShowActions)
    return <div ref={moreActionRef} onClick={() =>
        //@ts-ignore
        setShowActions((e) => !e)}
                className={"moreActions"} style={{right: "-20px"}}>
        <i className="fas fa-ellipsis-v common_icon"/>
        {
            showActions && <CustomCommonPopup top={"35px"} right={"-5px"}>
                <div className="headerDropdown" style={{
                    display: showActions ? "block" : "none",
                    boxShadow: "none",
                    padding: 0,
                    position: "initial"
                }}>
                    {
                        options && options.map((item, index) => {
                            return <span key={index} className={"headerDropdownItem item_link " + (item.isDisabled === true ? "disabled" : "")} style={{display: "flex"}}
                                         onClick={!item.isDisabled ? item.callback : () => {}}>
                               {item.iconClassName && <CommonIcon title={item.title}
                                                                  className={item.iconClassName + " " + item.isDisabled && "disabled"}
                               />}
                                {!item.bodyTemplate && <span className="drop_title">{item.title}</span>}
                                {item.bodyTemplate && item.bodyTemplate()}
                             </span>
                        })
                    }
                </div>
            </CustomCommonPopup>}
    </div>
}
export type MoreActionOptionType = {
    title?: string;
    iconClassName?: string;
    callback: (n: any) => void,
    isDisabled?: boolean,
    bodyTemplate?: () => JSX.Element
}