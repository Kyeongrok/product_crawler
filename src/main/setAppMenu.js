import { app, Menu, BrowserWindow } from 'electron';

function setAppMenu(options) {
  const template = [
    {
      label: 'File',
      submenu: [
        { label: 'digitec', click: () => options.parseDigitec() },
        { label: 'conforma', click: () => options.parseConforma() }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle DevTools',
          accelerator: 'Alt+Command+I',
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
