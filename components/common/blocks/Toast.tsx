import React from 'react';

export const useToast = () => {
    const show = (content: string, type: "error" | "success" = "error", duration: number = 2000) => {
        let x = document.getElementById("snackbar");

        // Add the "show" class to DIV
        if (x) {
            x.innerText = content
            x.className = "show " + type;

            // After 3 seconds, remove the show class from DIV
            setTimeout(function () {
                if (x)
                    x.className = x.className.replace("show", "");
            }, duration);
        }
    }

    return {show}
}

export const Toast = () => <div id="snackbar"/>
