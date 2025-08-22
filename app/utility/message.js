export default function Message(message) {
    const message = document.createElement('dialog');

    message.innerHTML = `
    `

    document.body.appendChild(message)
    message.showModel();

    document.getElementById('message-close').addEventListener('click', () => {
        message.close()
        document.body.removeChild(message);
    })
}