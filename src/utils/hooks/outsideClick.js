import React from 'react'

//hook to hide popup when click outside of his body
export const useOutsideAlerter = (ref, hideBlock) => {
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (ref?.current && !ref.current?.contains(event.target)) {
                hideBlock()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
};