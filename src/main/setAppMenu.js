import { app, Menu, BrowserWindow } from "electron";

function setAppMenu(options) {
  const template = [
    {
      label: "File",
      submenu: [
        { label: "printHello", click: () => options.printHello() },
        { label: "Open", accelerator: "CmdOrCtrl+O", click: () => options.openFile() },
        { label: "Save", accelerator: "CmdOrCtrl+S", click: () => options.saveFile() },
        { label: "Save As...", click: () => options.saveAsNewFile() },
        { label: "Export PDF", click: () => options.exportPDF() }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          label: "Toggle DevTools",
          accelerator: "Alt+Command+I",
          click: () => BrowserWindow.getFocusedWindow().toggleDevTools()
        }
      ]
    }
  ];
  if (process.platform === "darwin" ) {
    template.unshift(
      {
        label: "MarkdownEditor",
        submenu: [
          { label: "Quit", accelerator: "CmdOrCtrl+Q", click: () => app.quit() }
        ]
      }
    );
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
export default setAppMenu;
