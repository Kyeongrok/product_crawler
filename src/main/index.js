import {app} from 'electron';
import createMainWindow from './createMainWindow';
import setAppMenu from './setAppMenu';
import showOpenFileDialog from './showOpenFileDialog'
import conformaParse from '../parser/conforamaParse';
import digitecParse from '../parser/digitecParse';


let mainWindow = null;

const parseDigitec = () => {
  console.log('entered into parseDigitec');
  digitecParse.parse()
    .then(text => mainWindow.sendText(JSON.stringify(text)))
    .catch((error) => {
      console.log(error);
    });
  console.log('finish');
}

const parseConforma = () => {
  console.log('entered into parseConforma');
  conformaParse.parse()
    .then(text => {
      const jsonString = JSON.stringify(text);
      console.log(jsonString);
      mainWindow.sendText(jsonString);
    })
    .catch((error) => {
      console.log(error);
    });
}

const openFile = () => {
  showOpenFileDialog()
    .then(text => mainWindow.sendText(text))
    .catch((error) => {
      console.log(error);
    });
}

const printHello = () => {
  let hello = {'hello': 'kyeongrok'};

  mainWindow.sendText(JSON.stringify(hello));
}

// const digitecService = () => digitecParser.parse();

app.on('ready', () => {
  mainWindow = createMainWindow();
  setAppMenu({printHello, openFile, parseDigitec, parseConforma});
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
