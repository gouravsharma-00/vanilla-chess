const nuke = new Audio('./public/images/assets/nuke-sound.mp3')

export function PlaySound(type) {
    nuke.currentTime = 0;
    nuke.play();
}