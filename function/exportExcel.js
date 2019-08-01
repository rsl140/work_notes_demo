/*
 * @Author: rsl
 * @Date: 2019-08-01
 * @LastEditors: rsl
 * @LastEditTime: 2019-08-01
 * @Description: axios 从后台接收数据流后导出excel
 */

/**
 * @description:导出excel（axios要设置responseType: 'arraybuffer' || ‘blob'）
 * @res {arraybuffer} 后台的返回数据文件流
 * @name {String}下载的文件名
 * @return:
 */
function DownloadFileStream (res, name) {
  const _URL = window.URL || window.webkitURL
  const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const objectUrl = _URL.createObjectURL(blob)
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.style.display = 'none'
  a.href = objectUrl
  a.download = name
  a.click()
  document.body.removeChild(a) // 下载完成移除元素
  _URL.revokeObjectURL(objectUrl) // 释放blob
}