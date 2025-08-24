const chat = document.getElementById('chat')

/**
 * Message object:
 * {
 *   message: String,
 *   type : 'error' | 'alert' | 'chat' | 'capture'
 * }
 */

export function Add({ type, message }) {
    const m = document.createElement('div')
    m.classList.add((type ? type : 'chat').toLowerCase(), 'message')

    m.innerHTML = `
        <span class="msg-text">${message}</span>
    `

    chat.appendChild(m)

    // Auto scroll to bottom
    chat.scrollTop = chat.scrollHeight
}
