const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  '_platform',
  process.platform
)

/**
* 通信方法挂载到window对象上
* 在渲染进程中使用:
* <script>
* window.ipc.on('pong', (e, f) => console.log(e, f))
* window.ipc.send('ping', val)
* </script>
*/
contextBridge.exposeInMainWorld('ipc', {
  send: (channel, ...args) => ipcRenderer.send(channel, ...args),
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  on: (channel, listener) => {
    ipcRenderer.on(channel, listener)
  }
})
