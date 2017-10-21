import {app} from 'electron';
import createMainWindow from './createMainWindow';
import setAppMenu from './setAppMenu';
import conformaParse from '../parser/conforamaParser';
import digitecParser from '../parser/digitecParser';
import altronParser from '../parser/altronParser';
import melectronicsParser from '../parser/melectronicsParser';
import brackParser from '../parser/brackParser';
import microspotParser from '../parser/microspotParser';
import {ipcMain} from 'electron';

let mainWindow = null;

const parserMap = {
  'Digitec': digitecParser,
  'Conforma': conformaParse,
  'Altron': altronParser,
  'Brack': brackParser,
  'Melectronics': melectronicsParser,
  'Microspot': microspotParser
};

const printHello = () => {
  let hello = {'hello': 'kyeongrok'};
  mainWindow.sendText(JSON.stringify(hello));
}


const reloadWindow = () => mainWindow.reloadWindow();

app.on('ready', () => {
  ipcMain.on('REQUEST_EVENT', (_e, eventName) => {
    console.log('app.on', eventName);
    console.log(parserMap[eventName]);
    const parser = parserMap[eventName];
    parser.parse()
      .then(text => {
        console.log(text);
        mainWindow.sendText(JSON.stringify(text))
      })
      .catch((error) => {
        console.log(error);
      });
  });

  mainWindow = createMainWindow();
  setAppMenu({printHello, reloadWindow});
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
