// https://github.com/felixrieseberg/electron-code-editor

const { app, BrowserWindow } = require('electron')
const path = require('path')

// To install
// npm install --save electron or yarn add electron
//

let mainWindow;

app.on('ready', () => {
  const index = path.join(__dirname, 'index.html')
  // /Users/kelly/../index.html

  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file:///${index}`);
  // loadURL('file:///Users/kelly/../index.html')

  mainWindow.webContents.on('will-navigate', (e, url) => {
    e.preventDefault();
    console.log(`Tried to navigate to: ${url}`);

    mainWindow.webContents.send('navigate', url);
  });
  // Web Contents (any browser / window on Chrome has)
  // won't usually get as a Web Developer (but will get on Electron!)

});
