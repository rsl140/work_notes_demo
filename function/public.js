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

/**
 * protobuf拼接为uint8后转为blob流发送
 * @param {*} protobuf 上传的数据
 */
publicjs.sendMessageToBack = (protobuf) => {
  const pbLength = publicjs.intToByteArray(protobuf.length)

  const buffer = new ArrayBuffer(protobuf.length + 4)
  const uint8 = new Uint8Array(buffer)
  uint8.set(pbLength, 0)
  uint8.set(protobuf, 4)
  // 转为blob流
  const uploadDatas = new FormData()
  var blob = new Blob([uint8], {
    type: 'application/octet-stream'
  })

  uploadDatas.append('protobuf', blob)
  return uploadDatas
}

/**
 * blob流回传后通过arrybuffer解析为Uint8Array 返回
 * @param {*} res 返回值
 */
publicjs.getMessageFromBack = res => {
  const dataView = new DataView(res.data)
  const uint8 = new Uint8Array(dataView.byteLength)

  // 遍历返回arrybuffer存为Uint8Array
  for (let index = 0; index < dataView.byteLength; index++) {
    uint8[index] = dataView.getUint8(index)
  }

  const pbLengthGet = uint8.slice(0, 4)
  const portobuff = uint8.slice(8)

  const respone = {
    length: pbLengthGet,
    data: portobuff
  }

  return respone
}

/**
 * 数组对象排序(sort方法重写)
 * @param {*} prop 排序的对象
 * @param {Boolean} time 是否为时间格式
 * useing: obj.sort(this.publicjs.compare('createtime', true))
 */
publicjs.compare = (prop, time) => {
  return function (obj1, obj2) {
      let val1 = obj1[prop]
      let val2 = obj2[prop]
      if (time) {
        // 如果是时间格式
        if (moment(val1).isBefore(val2)) {
          return 1
        } else if (moment(val1).isAfter(val2)) {
          return -1
        } else {
            return 0
        }
      } else {
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1)
          val2 = Number(val2)
        }
        if (val1 < val2) {
            return -1
        } else if (val1 > val2) {
            return 1
        } else {
            return 0
        }
      }

  }
}

export default publicjs