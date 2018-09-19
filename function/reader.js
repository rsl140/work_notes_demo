
/**
 * vue upload控件处理文件为base64
 * file 文件
 */
function fileToBase64 (file) {
  var reader = new FileReader()
  reader.readAsDataURL(file.raw)
  const _this = this
  reader.onload = function () {
    console.log(reader.result)
  }
  reader.onerror = function (error) {
    console.log('Error: ', error)
  }
  return reader.result
}

/**
 * base64处理后放入formdate
 * data2blob方法在public.js中
 */
const mimes = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  psd: 'image/photoshop'
}

function fileToFormData (file) {
  var uploadDatas = new FormData()
  const imgtype = fileToBase64(file).split(',')[0]
  let back = imgtype.split(';')[0]
  back = back.split('/')[1]
  const mime = mimes[back]
  uploadDatas.append('head_pic', data2blob(fileToBase64(file), mime), 'img' + '.' + back)
}
