import React from 'react'

type PropsType = {
    modalBodyRef?: React.Ref<HTMLDivElement>
    className?: CustomPopupClassNameType
}

type CustomPopupClassNameType = "popup__invite" | "popup__create" | "popup__invitation" | "popup__join" | "popup__team" | "popup__payment"

export const CustomPopup: React.FC<PropsType> = (props) => {
    return <>
        <section className="popup__sec">
            <div className={"popup show active " + (props.className ? props.className : "")}>
                <div className="popup__content">
                    <div ref={props.modalBodyRef} className="popup__body">
                        {props.children}
                    </div>
                </div>
            </div>
        </section>

        <style jsx global>{`
          body {
            overflow: hidden;
          }
        `}</style>
    </>
}
