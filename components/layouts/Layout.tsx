import React from "react";
import {MainLayOut} from "./MainLayOut";
import {AuthLayout} from "./AuthLayout";
import Preloader from "../common/preloader/Preloader";
import {useSelector} from "react-redux";
import {AppStateType} from "../../src/redux/store-redux";

export const Layout: React.FC<{ title: string, layoutId?: 1 | 2, isProjectSideBarMode?: boolean }> = ({
                                                                                                          layoutId = 1,
                                                                                                          title,
                                                                                                          isProjectSideBarMode,
                                                                                                          children
                                                                                                      }) => {

    const initialized = useSelector((state: AppStateType) => state.app.initialized);

    let CurrentLayout = MainLayOut
    if (layoutId === 2)
        CurrentLayout = AuthLayout

    if (!initialized) {
        return <Preloader theme/>;
    }
    return <CurrentLayout title={title} isProjectSideBarMode={isProjectSideBarMode}>
         {children}
    </CurrentLayout>
}