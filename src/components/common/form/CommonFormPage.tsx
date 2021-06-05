import React from "react"
import {Controller, useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Button, Input, message, Select} from "antd";
import {ValidationError} from "./ValidationError";

const Option = Select.Option

type PropsType = {

}
export const CommonFormPage:React.FC<PropsType> = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const {handleSubmit, errors, control} = useForm()

    const onSubmit = (obj: any) => {
        // obj && MapAPI.createCommonItem("fields", obj).then((res) => {
        //     if (res) {
        //         if(res.error) {
        //             message.error(res.error)
        //         } else {
        //             // dispatch();
        //             message.success({ content: 'Успешно!', key: "updatable", duration: 2 });
        //             setTimeout(() => {
        //                 history.push("/fields")
        //             }, 600)
        //         }
        //     }
        // }).catch(error => {
        //     error && message.error("Ошибка!")
        // })
    }
    const openMessage = () => {
        message.loading({ content: 'Загрузка...', key: "updatable"});
    };

    return <>
        <h2>Добавить</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{padding: "15px"}}>
            <div className="input-group">
                <label className={"inputLabel label"} htmlFor="">
                    Название
                </label>
                <Controller as={<Input/>} name={"name"} control={control} rules={{required: true}}/>
                {errors.name && (
                    <ValidationError>Это поле обязательно</ValidationError>
                )}
            </div>
            <div className="input-group">
                <Button onClick={openMessage}>
                    Добавить
                </Button>
            </div>
        </form>
    </>
}