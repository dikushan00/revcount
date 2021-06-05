import React from 'react'
import {Page404} from "../../components/statusPages/Page404";
import {MainPage} from "../../components/MainPage/MainPage";
import {config} from "../../config";
import {Project} from "../../components/projects/Project";

//routes for app
export const routers = [
    {
        path: "/projects",
        render: <Project />,
        layoutId: 1,
        exact: true
    },
    {
        path: "/",
        render: <MainPage />,
        layoutId: 1,
        exact: true
    },
    {
        path: "*",
        render: <Page404/>,
        layoutId: config.layoutIds.allWidth,
        exact: false
    },
]