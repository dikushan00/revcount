import React from "react";
import {MainLayOut} from "./MainLayOut";
import {AuthLayout} from "./AuthLayout";

export const Layout: React.FC<{ title: string, layoutId?: 1 | 2, isProjectSideBarMode?: boolean }> = ({
                                                                                                          layoutId = 1,
                                                                                                          title,
                                                                                                          isProjectSideBarMode,
                                                                                                          children
                                                                                                      }) => {
    let CurrentLayout = MainLayOut
    if (layoutId === 2)
        CurrentLayout = AuthLayout
    return <CurrentLayout title={title} isProjectSideBarMode={isProjectSideBarMode}>
         {children}
    </CurrentLayout>
}