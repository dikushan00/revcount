import React from "react";
import {Route, Switch} from "react-router-dom";
import {MainLayOut} from "./MainLayOut";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store-redux";
import {routers} from "../common/routers/routers";
import {Header} from "../components/header/Header";
import {Sidebar} from "../components/sidebars/Sidebar";
import {SidebarRight} from "../components/sidebars/SidebarRight";

//Layout component
export const LayOut = () => {
    //is login auth
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    if (!isAuth) {
        //if isAuth === false redirect to login page
        // return <Redirect to={"/login"}/>;
    }

    return <div className={"wrapper"}>
        <Sidebar/>
        <main
            className="page"
        >
            <Switch>
                {
                    routers.map((item, index) => {
                        let CurrentLayOut = MainLayOut;

                        return <Route path={item.path} exact={item.exact}
                                      key={index}
                                      render={() => <CurrentLayOut>{item.render}</CurrentLayOut>}
                        />
                    })
                }
            </Switch>
        </main>
    </div>
}
