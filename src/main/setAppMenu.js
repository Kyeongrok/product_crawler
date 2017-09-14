import { app, Menu, BrowserWindow } from 'electron';

function setAppMenu(options) {
  const template = [
    {
      label: 'File',
      submenu: [
        { label: 'reload', accelerator: 'Ctrl+r', click: () => options.reloadWindow() }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle DevTools',
          accelerator: 'Alt+l',
          click: () => BrowserWindow.getFocusedWindow().toggleDevTools()
        }
      ]
    }
  ];
  if (process.platform === 'darwin' ) {
    template.unshift(
      {
        label: 'MarkdownEditor',
        submenu: [
          { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() }
        ]
      }
    );
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
export default setAppMenu;
