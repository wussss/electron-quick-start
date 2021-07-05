const { app, BrowserWindow, Notification, ipcMain } = require('electron')
const path = require('path')
let win // 定义全局变量，避免被垃圾回收
app.on('ready', () => {
  win = new BrowserWindow({
    titie: '番茄钟',
    width: 300,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false, //是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本
      nodeIntegration: true, // electron新版本默认禁止node，也就是没法在渲染进程引入nodejs中的模块
      devTools: true // 默认不打开开发者工具
    }
  })
  win.loadFile('./index.html')
  win.webContents.openDevTools({ mode: 'bottom' })
  handleIPC()
})
function handleIPC() {
  ipcMain.handle('work-notification', () =>
    new Promise((resolve, reject) => {
      const notification = new Notification({
        title: '任务结束',
        body: '是否开始休息？',
        hasReply: true,
        replyPlaceholder: '休息',
        closeButtonText: '继续工作'
      })
      notification.show()

      notification.on('reply', () => {
        resolve('rest')
      })
      notification.on('close', () => {
        resolve('work')
      })
    })
  )
}
