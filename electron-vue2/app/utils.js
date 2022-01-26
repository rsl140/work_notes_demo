const { dialog, ipcMain, shell } = require('electron')
const Store = require('electron-store')
const store = new Store()
const info = require('../package.json')
// const path = require('path')

const Utils = {
  ipcOn: () => {
    ipcMain.on('open-url', (event, url) => {
      shell.openExternal(url)
    })

    ipcMain.on('about', (event) => {
      dialog.showMessageBox({
        title: 'test',
        message: 'test',
        detail: `Version: ${info.version}`
      })
    })

    // 通用方法用于保存本地数据
    ipcMain.on('saveStore', (event, { storeName, val }) => {
      store.set(storeName, val)
    })

    // 通用方法用于读取本地数据
    ipcMain.on('getStore', (event, { storeName, callBackName }) => {
      console.log(storeName, callBackName)
      event.sender.send(callBackName, { [storeName]: store.get(storeName) })
    })
  }
}
module.exports = Utils
