/*
 * @Author: rsl
 * @Date: 2019-08-07
 * @LastEditors: rsl
 * @LastEditTime: 2019-08-07
 * @Description: 创建隐藏的可下载链接
 */

 function download (name, url) {
  const eleLink = document.createElement('a')
    // 文件名
    eleLink.download = name
    eleLink.style.display = 'none'
    eleLink.target = '_blank'

    // 文件地址
    eleLink.href = url
    // 触发点击
    document.body.appendChild(eleLink)
    eleLink.click()
    // 然后移除
    document.body.removeChild(eleLink)
 }


// 参考 https://juejin.cn/post/6844904069958467592#heading-16
/**
 * 下载文件
 * @param {String} path - 下载地址/下载请求地址。
 * @param {String} name - 下载文件的名字/重命名（考虑到兼容性问题，最好加上后缀名）
 */
export function downloadFile (path, name) {
  const xhr = new XMLHttpRequest()
  xhr.open('get', path)
  xhr.responseType = 'blob'
  xhr.send()
  xhr.onload = function () {
    if (this.status === 200 || this.status === 304) {
      // 如果是IE10及以上，不支持download属性，采用msSaveOrOpenBlob方法，但是IE10以下也不支持msSaveOrOpenBlob
      if ('msSaveOrOpenBlob' in navigator) {
        navigator.msSaveOrOpenBlob(this.response, name)
        return
      }
      // const blob = new Blob([this.response], { type: xhr.getResponseHeader('Content-Type') });
      // const url = URL.createObjectURL(blob);
      const url = URL.createObjectURL(this.response)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }
}
