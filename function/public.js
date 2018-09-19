const publicjs = {}

/* int 转数组 */
publicjs.intToArray = intData => {
  const byteArray = [0, 0, 0, 0]

  for (var index = byteArray.length - 1; index >= 0; index--) {
    var byte = intData & 0xff
    byteArray[index] = byte
    intData = (intData - byte) / 256

    return byteArray
  }
}

/* 数字转ByteArray */
publicjs.intToByteArray = intData => {
  const lenArray = new Uint8Array(4)

  lenArray[0] = intData >>> 24
  lenArray[1] = intData >>> 16
  lenArray[2] = intData >>> 8
  lenArray[3] = intData

  return lenArray
}

/* ByteArray转数字 */
publicjs.byteArrayToInt = byteArray => {
  let value = 0
  for (let i = 0; i < byteArray.length; i++) {
    value = value * 256 + byteArray[i]
  }
  return value
}

/**
 * database64文件格式转换为2进制
 *
 * @param  {[String]} data dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
 * @param  {[String]} mime [description]
 * @return {[blob]}      [description]
 */
publicjs.data2blob = (data, mime) => {
  data = data.split(',')[1]
  data = window.atob(data)
  var ia = new Uint8Array(data.length)
  for (var i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i)
  }
  // canvas.toDataURL 返回的默认格式就是 image/png
  return new Blob([ia], {
    type: mime
  })
}


export default publicjs