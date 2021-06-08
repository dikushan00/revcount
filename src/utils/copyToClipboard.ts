
export const copyTextToClipboard = (text: string | number, setIsCopied: (n: boolean) => void) => {
    setIsCopied(true)
    navigator.clipboard.writeText(text.toString())
}