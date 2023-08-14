// 鼠标模拟触屏纵向滚动指令
export default {
  bind (el, binding) {
    // 绑定指令时的初始化操作
    let isDragging = false
    let startY

    const start = (e) => {
      e.preventDefault()
      startY = e.clientY
      isDragging = true
    }

    const move = (e) => {
      if (!isDragging) return
      e.preventDefault()
      const tempy = e.clientY
      el.scrollBy(0, startY - tempy)
      startY = tempy
    }

    const end = (e) => {
      if (!isDragging) return
      e.preventDefault()
      const tempy = e.clientY
      el.scrollBy(0, startY - tempy)
      isDragging = false
    }

    el.addEventListener('mousedown', start, false)
    el.addEventListener('mousemove', move, false)
    el.addEventListener('mouseup', end, false)

    // 移除监听器
    el.__cleanup = () => {
      el.removeEventListener('mousedown', start)
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseup', end)
    }

    document.addEventListener('mouseup'/* 'touchend'*/, function (ev) {
      isDragging = false
    }, false)
  },
  unbind (el) {
    // 清理监听器
    if (el.__cleanup) {
      el.__cleanup()
      delete el.__cleanup
    }
  }
}


// 使用方法

// 在 main.js（或你的入口文件）中注册指令：

// import mouseMove from '@/directives/mouseMove.js'
// Vue.directive('mouse-move', mouseMove)

// 使用
// <div v-mouse-move>
//   <p>1111</p>
//   <p>1111</p>
//   <p>1111</p>
//   <p>1111</p>
//   <p>1111</p>
// </div>