import { app } from "electron";
import createMainWindow from "./createMainWindow";
import setAppMenu from "./setAppMenu";
import showSaveAsNewFileDialog from "./showSaveAsNewFileDialog";
import createFileManager from "./createFileManager";
import showOpenFileDialog from "./showOpenFileDialog";
import createPDFWindow from "./createPDFWindow";
import showExportPDFDialog from "./showExportPDFDialog";

let mainWindow = null;
let fileManager = null;

app.on("ready", () => {
  mainWindow = createMainWindow();
  fileManager = createFileManager();
  const options = { openFile, saveFile, saveAsNewFile, exportPDF, printHello };
  setAppMenu(options);
});

app.on("window-all-closed", () => {
  mainWindow = null;
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", (_e, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    mainWindow = createMainWindow();
  }
});

let printHello = () => console.log("hello");

let saveAsNewFile = () => {
  return Promise.all([ showSaveAsNewFileDialog(), mainWindow.requestText() ])
    .then(([filePath, text]) => fileManager.saveFile(filePath, text))
    .catch((error) => {
      console.log(error);
    });
}

let openFile = () => {
  showOpenFileDialog()
    .then((filePath) => fileManager.readFile(filePath))
    .then((text) => mainWindow.sendText(text))
    .catch((error) => {
      console.log(error);
    });
}

let saveFile = () => {
  if (!fileManager.filePath) {
    saveAsNewFile();
  }
  mainWindow.requestText()
    .then((text) => fileManager.overwriteFile(text))
    .catch((error) => {
      console.log(error);
    });
}



let exportPDF = () => {
  Promise.all([ showExportPDFDialog(), mainWindow.requestText() ])
    .then(([filePath, text]) => {
      const pdfWindow = createPDFWindow(text);
      pdfWindow.on("RENDERED_CONTENTS", () => {
        pdfWindow.generatePDF()
          .then((pdf) => fileManager.writePdf(filePath, pdf))
          .then(() => pdfWindow.close())
          .catch((error) => {
            console.log(error);
            pdfWindow.close();
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
