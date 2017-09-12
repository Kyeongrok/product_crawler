import { app } from "electron";
import createMainWindow from "./createMainWindow";
import setAppMenu from "./setAppMenu";

let mainWindow = null;
let fileManager = null;

const printHello = () => {
  let hello = "hello " + "kyeongrok";
  mainWindow.sendText(hello);
}

const digitecService = () => mainWindow.sendText("digitecService");

app.on("ready", () => {
  mainWindow = createMainWindow();
  setAppMenu({ printHello, digitecService });
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


