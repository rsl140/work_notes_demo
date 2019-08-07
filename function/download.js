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