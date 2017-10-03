'use strict';

var electron = require('electron');

var app = electron.app,
    BrowserWindow = electron.BrowserWindow,
    Menu = electron.Menu;


var mainWindow = void 0;
var addWindow = void 0;

app.on('ready', function () {

    mainWindow = new BrowserWindow({});

    process.platform === 'darwin' ? mainWindow.loadURL('file://' + __dirname + '/main.html') : mainWindow.loadURL('file://' + __dirname + '\\main.html');
    // if (process.platform === 'win32') {
    //     mainWindow.loadURL(`file://${__dirname}\\main.html`);
    // }
    // else {
    //     mainwindow.loadURL(`file://${__dirname}/main.html`);
    // }

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
}

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
//# sourceMappingURL=index.js.map