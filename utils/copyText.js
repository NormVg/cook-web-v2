// utils/copy.js
export async function copyText(text) {
  // modern API
  if (process.client && navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.error("Clipboard API failed", err)
    }
  }

  // fallback
  try {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.style.position = "fixed"
    textarea.style.opacity = "0"
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    const success = document.execCommand("copy")
    document.body.removeChild(textarea)
    return success
  } catch (err) {
    console.error("Fallback copy failed", err)
    return false
  }
}
