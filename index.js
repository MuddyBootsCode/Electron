const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {

    mainWindow = new BrowserWindow({});

    process.platform === 'darwin' ? mainWindow.loadURL(`file://${__dirname}/main.html`) :
        mainWindow.loadURL(`file://${__dirname}\\main.html`);
    // if (process.platform === 'win32') {
    //     mainWindow.loadURL(`file://${__dirname}\\main.html`);
    // }
    // else {
    //     mainwindow.loadURL(`file://${__dirname}/main.html`);
    // }

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add New Todo'
    });
    process.platform === 'darwin' ? addWindow.loadURL(`file://${__dirname}/add.html`) :
        addWindow.loadURL(`file://${__dirname}\\add.html`);
}

const menuTemplate = [

    {
        label: 'File',
        submenu: [
            { label: 'New Todo',
                click() { createAddWindow()}
            },
            {
              label: 'Quit',
              accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
              click() {
                app.quit();
              }

            }
        ]
    }
];

if (process.platform === 'darwin'){
    menuTemplate.unshift({});
}