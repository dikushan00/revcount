import React from 'react'
//@ts-ignore
import styled from "styled-components"
import {CommonBlockWrapper} from "./CommonBlockWrapper";

type PropsType = {
    hoverColor?: string
    className: string
    title?: string
    onCLick?: () => void
}
//custom icon
export const CommonIcon: React.FC<PropsType> = ({title, className, onCLick}) => {
    const Icon = styled.i`
      color: #000;
      cursor: pointer;

      &:hover {
        color: #4c0ab8;
      }
    `
    return (
        <CommonBlockWrapper>
            <span onClick={onCLick}>
                <Icon title={title} className={className}/>
            </span>
        </CommonBlockWrapper>
    )
}
