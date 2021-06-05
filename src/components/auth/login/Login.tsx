import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {message} from "antd";
import {AppStateType} from "../../../redux/store-redux";
import {LoginType} from "../../../types/UserTypes";
import {ValidationError} from "../../common/form/ValidationError";

export const Login = () => {
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch()
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const [activeMode, setActiveMode] = React.useState(null as {
        id: number, isActive: boolean
    }[] | null)

    const onSubmit = (obj: LoginType) => {
        if(!errors.email && !errors.password) {
            openMessage()
            // obj && AuthAPI.login(obj).then((res) => {
            //     if (res) {
            //         if (res.error) {
            //             message.error(res.error)
            //         } else {
            //             //set new info about user to state
            //             dispatch(actionsAuth.setNewAuth(res.access_token, true, res.roles, res.id))
            //             localStorage.setItem("client_token", res.access_token)
            //         }
            //     }
            // }).catch(error => {
            //     error && message.error("Ошибка!")
            // })
        }
    };

    if (isAuth) {
        return <Redirect to={"/"}/>;
    }

    let dayText = "Доброго времени суток";
    let dayTime = new Date().getHours()

    //Text title depending on time
    if (dayTime >= 6 && dayTime < 12) dayText = "Доброе утро"
    if (dayTime >= 12 && dayTime < 18) dayText = "Добрый день"
    if (dayTime >= 18 && dayTime < 22) dayText = "Добрый вечер"
    if (dayTime >= 22 && dayTime < 6) dayText = "Доброй ночи"

    const openMessage = () => {
        message.loading({content: 'Загрузка...', key: "updatable"});
    };

    //toggle active inputs to animate labels
    const toggleActiveMode = (id: number) =>
        setActiveMode(state => {
            if (state) {
                let isExist = state.some((input: any) => input.id === id)
                if (isExist)
                    return state.map(input => {
                        if (input.id === id)
                            return {id: input.id, isActive: !input.isActive}
                        return input
                    })
                else {
                    return [...state, {id: id, isActive: true}]
                }
            } else
                return [{id: id, isActive: true}]
        })

    return (
        <div className="login">
            <div className="container login_container">
                <div className="login_modal col-md-9">
                    <h1 className="login_title">{dayText}!</h1>
                    <form className="col-sm-9" onSubmit={handleSubmit(onSubmit)}>
                        {
                            loginInputs.map((item, index) => {
                                return <div key={index} className="row row_input">
                                    <div className="input-field col s6 input_field_added">
                                        <span className="login_icon_bg">
                                          <i className={item.iconClassName}/>
                                        </span>
                                        <input
                                            id={item.name}
                                            className={"login_input"}
                                            type={item.type || "text"}
                                            name={item?.name}
                                            ref={register({required: true})}
                                            autoComplete="off"
                                            onFocus={(e) => {
                                                !e.target.value && toggleActiveMode(item.id)
                                            }}
                                            onBlur={(e) => {
                                                !e.target.value && toggleActiveMode(item.id)
                                            }}
                                        />
                                        <label htmlFor={item.name} className={activeMode
                                            ? activeMode?.filter(active => active.id === item.id)[0]?.isActive
                                                ? "login_label active"
                                                : "login_label"
                                            : "login_label"}>
                                            {item.title}
                                        </label>
                                    </div>
                                    {
                                        errors[item.name] && <ValidationError>Это поле обязательно!</ValidationError>

                                    }
                                </div>
                            })
                        }
                        <div className="row">
                            <button
                                type="submit"
                                className="waves-effect waves-light btn-small orange login_btn"
                                style={{color: "#fff"}}
                            >
                                Войти
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const loginInputs = [
    {
        id: 1,
        title: "Email",
        type: "email",
        name: "email",
        placeholder: "Email",
        iconClassName: "fas fa-user-alt login_icon"
    },
    {
        id: 2,
        title: "Пароль",
        type: "password",
        name: "password",
        placeholder: "Пароль",
        iconClassName: "fas fa-lock login_icon"
    },
]
