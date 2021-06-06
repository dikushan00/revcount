import {Controller} from "react-hook-form";
// import {ValidationError} from "./ValidationError";
// import React, {CSSProperties} from "react";
// import {DatePicker, Input, InputNumber, Select} from "antd";
// import moment from "moment";
//
// //Custom form inputs for minimize and reuse it
// interface InputTextProps {
//     name: string
//     formHook?: UseFormMethods
//     title: string
//     type?: string
//     isRequired?: boolean
//     disabled?: boolean
//     isStrictValue?: boolean
//     isFormMode?: boolean
//     defaultValue?: string | number | null | any[] | any
//     value?: string | number
//     placeholder?: string
//     divStyle?: CSSProperties
//     setState?: (n: any) => void
// }
//
// export const CustomInputText: React.FC<InputTextProps> = ({
//                                                               name,
//                                                               type = "text",
//                                                               title,
//                                                               defaultValue = null,
//                                                               placeholder = null,
//                                                               isRequired = true,
//                                                               isStrictValue = false,
//                                                               value = null,
//                                                               disabled = false,
//                                                               formHook
//                                                           }) => {
//
//     return <div className="input-group">
//         <label className={"label"} htmlFor={name}>{title}</label>
//         {isStrictValue
//             ? <Input disabled={disabled} id={name} value={value ? value : defaultValue ? defaultValue : ""}
//                      placeholder={placeholder || title}/>
//             :
//             <Controller
//                 as={<Input type={type} id={name} disabled={disabled} placeholder={placeholder || title}/>}
//                 defaultValue={defaultValue}
//                 name={name}
//                 control={formHook?.control}
//                 rules={{required: isRequired}}
//             />}
//         {
//             formHook?.errors[name] && (
//                 <ValidationError>Это поле обязательно!</ValidationError>
//             )
//         }
//     </div>
// }
//
// interface InputNumberType extends InputTextProps {
//     min?: number
// }
//
// export const CustomInputNumber: React.FC<InputNumberType> = ({
//                                                                  name,
//                                                                  type = "text",
//                                                                  title,
//                                                                  min = 0,
//                                                                  defaultValue = null,
//                                                                  isRequired = true,
//                                                                  disabled = false,
//                                                                  formHook
//                                                              }) => {
//
//     return <div className="input-group">
//         <label className={"label"} htmlFor={name}>{title}</label>
//         <Controller
//             as={<InputNumber style={{width: "100%"}} min={min} type={type} id={name} disabled={disabled}
//                              placeholder={title}/>}
//             defaultValue={defaultValue}
//             name={name}
//             control={formHook?.control}
//             rules={{required: isRequired}}
//         />
//         {
//             formHook?.errors[name] && (
//                 <ValidationError>Это поле обязательно!</ValidationError>
//             )
//         }
//     </div>
// }
//
// interface SelectProps extends InputTextProps {
//     options: any[] | null
//     setSelectedItemId?: (n: number) => void
//     setSelectedItemIds?: (n: number[]) => void
//     onClear?: any
//     label?: string
//     allowClear?: boolean
//     value?: string
//     optionValue?: string
//     mode?: "multiple" | "tags" | undefined
// }
//
// export const CustomSelect: React.FC<SelectProps> = ({
//                                                         name,
//                                                         title,
//                                                         defaultValue = null,
//                                                         allowClear = false,
//                                                         isRequired = true,
//                                                         isFormMode = true,
//                                                         formHook,
//                                                         label = "name",
//                                                         placeholder = null,
//                                                         value = null,
//                                                         optionValue = "id",
//                                                         options = [],
//                                                         setSelectedItemId,
//                                                         onClear,
//                                                         mode = undefined
//                                                     }) => {
//
//     const [selectOptions, setSelectOptions] = React.useState(null as any[] | null)
//
//     React.useEffect(() => {
//         let validOptions = options && options.map(item => ({label: item[label], value: item[optionValue]}))
//         setSelectOptions(validOptions)
//     }, [options])
//
//     return <div className="input-group">
//         <label htmlFor="">{title}</label>
//         {selectOptions && isFormMode ? <Controller
//                 render={({onChange, value}) => {
//                     return <Select
//                         placeholder={placeholder || title}
//                         onChange={(e) => {
//                             onChange(e);
//                             setSelectedItemId && setSelectedItemId(e);
//                         }}
//                         options={selectOptions || []}
//                         value={value}
//                         mode={mode}
//                         onClear={onClear}
//                         allowClear = {allowClear}
//                         optionLabelProp={optionValue}
//                     />
//                 }
//                 }
//                 defaultValue={defaultValue || null}
//                 rules={{required: isRequired}}
//                 control={formHook?.control}
//                 name={name}
//             />
//
//             : <Select
//                 placeholder={title}
//                 onChange={(e) => {
//                     setSelectedItemId && setSelectedItemId(+e);
//                 }}
//                 value={defaultValue || ""}
//                 mode={mode}
//                 allowClear = {allowClear}
//                 onClear={onClear}
//                 options={selectOptions || []}
//             />}
//     </div>
// }
// export const CustomInputDatePicker: React.FC<InputTextProps> = ({
//                                                                     name,
//                                                                     title,
//                                                                     defaultValue = null,
//                                                                     isRequired = true,
//                                                                     disabled = false,
//                                                                     formHook
//                                                                 }) => {
//
//     return <div className="input-group">
//         <label className={"label"} htmlFor={name}>{title}</label>
//         <Controller
//             as={<DatePicker style={{width: "100%"}} id={name} disabled={disabled} placeholder={title}/>}
//             defaultValue={defaultValue}
//             name={name}
//             control={formHook?.control}
//             rules={{required: isRequired}}
//         />
//         {
//             formHook?.errors[name] && (
//                 <ValidationError>Это поле обязательно!</ValidationError>
//             )
//         }
//     </div>
// }
//
// export const CustomDatePicker: React.FC<InputTextProps> = ({
//                                                                name,
//                                                                title,
//                                                                defaultValue = null,
//                                                                isRequired = true,
//                                                                formHook,
//                                                            }) => {
//
//     return <div className={"input-group"}>
//         <label className={"label"} htmlFor={name}>
//             {title}
//         </label>
//         <Controller as={
//             <DatePicker style={{width: "100%"}}/>
//         }
//                     defaultValue={defaultValue ? moment(defaultValue) : null}
//                     name={name}
//                     rules={{required: isRequired}}
//                     control={formHook?.control}/>
//         {formHook?.errors.sowingDate &&
//         <ValidationError>Это поле обязательно</ValidationError>}
//     </div>
// }
// export const CustomColorPicker: React.FC<InputTextProps> = ({
//                                                                 value,
//                                                                 formHook,
//                                                                 divStyle = {},
//                                                                 name,
//                                                                 defaultValue = "",
//                                                                 setState
//                                                             }) => {
//     return <div className="input-group" style={divStyle}>
//         <label className={"label"} htmlFor="code">Цвет</label>
//         <div style={{display: "flex"}}>
//             <Controller render={({onChange, value}) => <input value={value} style={{
//                 width: "51px",
//                 height: "40px"
//             }} onChange={e => {
//                 onChange(e.target.value)
//                 setState && setState(e.target.value)
//             }}
//                                                               type="color"
//             />} name={name} control={formHook?.control}
//                         defaultValue={defaultValue}/>
//
//             <Input value={value} disabled placeholder={"Выберите цвет"}/>
//         </div>
//     </div>
// }
//
// interface CustomFormItemType extends InputTextProps {
//     Component: Element
// }
//
// export const CustomFormItemWrap: React.FC<CustomFormItemType> = ({
//                                                                      formHook,
//                                                                      divStyle = {},
//                                                                      name,
//                                                                      defaultValue,
//                                                                      Component,
//                                                                      placeholder = null,
//                                                                      title = ""
//                                                                  }) => {
//     return <div className="input-group" style={divStyle}>
//         <label className={"label"} htmlFor="code">{title}</label>
//         <div style={{display: "flex"}}>
//             {/*@ts-ignore*/}
//             <Controller as={<Component placeholder={placeholder || title}/>} name={name} control={formHook?.control}
//                         defaultValue={defaultValue}/>
//         </div>
//     </div>
// }