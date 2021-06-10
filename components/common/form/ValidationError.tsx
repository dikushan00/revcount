import React, { PropsWithChildren } from 'react'

type PropsType = {
    children?: PropsWithChildren<any>
}
//validation error text wrapper
export const ValidationError:React.FC<PropsType> = ({children}) => {
    return <p className = "val_error">
            {children ? children : "This field is required"}
        </p>
}
