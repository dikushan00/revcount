import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";
import store, {AppStateType} from "./redux/store-redux";
import {init} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import {Page403} from "./components/statusPages/Page403";
import {Page404} from "./components/statusPages/Page404";
import {LayOut} from "./layouts/LayOut";
import {Login} from "./components/auth/login/Login";
import {SignUp} from "./components/auth/signUp/SignUp";
import './App.css';

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector((state: AppStateType) => state.app.initialized);

  React.useEffect(() => {
    dispatch(init());
  }, []);

  if (!initialized) {
    return <Preloader theme/>;
  }
  return (
      <>
        <Switch>
          <Route path="/login" render={() => <Login/>}/>
          <Route path="/sign-up" render={() => <SignUp/>}/>
          <Route path="/403" render={() => <Page403/>}/>
          <Route path="/404" render={() => <Page404/>}/>
          <Route path="/" render={() => <LayOut/>}/>
          <Route path="*" render={() => <Page404/>}/>
        </Switch>
      </>
  );
}

export const MyApp = () => {
  return <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
      </BrowserRouter>
};
