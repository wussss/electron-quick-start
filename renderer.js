// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { ipcRenderer } = require('electron')
const Timer = require('timer.js')
function startWork() {
    const workTimer = new Timer({
        ontick: (ms) => {
            updateTime(ms)
        },
        onend: () => {
            notification()
        }
    })
    workTimer.start(3)
}
function updateTime(ms) {
    const timerContainer = document.getElementById('timer-container')
    const s = Math.floor(ms / 1000)
    timerContainer.innerText = s
}
async function notification() {
    const res = await ipcRenderer.invoke('work-notification')
    console.log(res)
    if (res === 'rest') {
        setTimeout(() => {
            alert('休息')
        }, 1000)
    } else if (res === 'work') {
        startWork()
    }
}
startWork()