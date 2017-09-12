import {app} from 'electron';
import createMainWindow from './createMainWindow';
import setAppMenu from './setAppMenu';
import digitecParser from '../parser/digitecParse';

let mainWindow = null;

const printHello = () => {
  let hello = 'hello ' + 'kyeongrok';
  mainWindow.sendText(hello);
}

const digitecService = () => digitecParser.parse();

app.on('ready', () => {
  mainWindow = createMainWindow();
  setAppMenu({printHello, digitecService});
});

app.on('window-all-closed', () => {
  mainWindow = null;
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', (_e, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    mainWindow = createMainWindow();
  }
});
