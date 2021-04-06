const { app, BrowserWindow, ipcMain } = require('electron')





function createWindow() {
    const win = new BrowserWindow({
        x: 1000,
        y: 0,
        width: 800,
        height: 800,
        frame: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        skipTaskbar: true, // 任务栏不显示
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: __dirname + "/preload.js"
        }
    })
    win.setAlwaysOnTop(true, "pop-up-menu", 1)
    win.on('close', (event) => {
        event.preventDefault();

    });
    win.loadFile('dist/index.html')


    ipcMain.on("hide", () => {
        win.hide();
        let win2 = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                preload: __dirname + "/preload.js"
            }
        })
        win.setMenuBarVisibility(false);
        win2.loadFile('dist/index2.html')
    })

}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})