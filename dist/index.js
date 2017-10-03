'use strict';

var electron = require('electron');

var app = electron.app,
    BrowserWindow = electron.BrowserWindow,
    Menu = electron.Menu,
    ipcMain = electron.ipcMain;


var mainWindow = void 0;
var addWindow = void 0;

app.on('ready', function () {

    mainWindow = new BrowserWindow({});

    process.platform === 'darwin' ? mainWindow.loadURL('file://' + __dirname + '/main.html') : mainWindow.loadURL('file://' + __dirname + '\\main.html');

    mainWindow.on('closed', function () {
        return app.quit();
    });

    var mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add New Todo'
    });
    process.platform === 'darwin' ? addWindow.loadURL('file://' + __dirname + '/add.html') : addWindow.loadURL('file://' + __dirname + '\\add.html');

    addWindow.on('closed', function () {
        return addWindow = null;
    });
}

ipcMain.on('todo:add', function (event, todo) {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();
});

var menuTemplate = [{
    label: 'File',
    submenu: [{ label: 'New Todo',
        click: function click() {
            createAddWindow();
        }
    }, {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click: function click() {
            app.quit();
        }
    }]
}];

if (process.platform === 'darwin') {
    menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'Developer',
        submenu: [{
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
            click: function click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }]
    });
}
//# sourceMappingURL=index.js.map