/**
 * @description: 函数防抖(就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间)
 * @param {fun} func 函数
 * @param {Number} delay 延迟执行毫秒数
 * @param {Boolean} immediate true 表立即执行，false 表非立即执行
 * @return: 执行函数
 */
export function debounce (func, delay, immediate) {
  let timeout

  return function () {
    const context = this
    const args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, delay)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, delay)
    }
  }
}
/**
 * @description: 函数节流(续触发事件但是在 n 秒中只执行一次函数)
 * @param {fun} func 函数
 * @param {Number} delay 延迟执行毫秒数
 * @return: 执行函数
 */
export function throttle (func, delay) {
  let timer = null
  let startTime = Date.now()

  return function () {
    const curTime = Date.now()
    const remaining = delay - (curTime - startTime)
    const context = this
    const args = arguments

    clearTimeout(timer)
    if (remaining <= 0) {
      func.apply(context, args)
      startTime = Date.now()
    } else {
      timer = setTimeout(func, remaining)
    }
  }
}
