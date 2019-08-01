<template>
  <div class="content-container">
    <dialog v-if="editVisible" :flag="editVisible" @modalClose="modalClose" :title="title" :width="width" :footerShow="false">
      xxxxx
    </dialog>
  </div>
</template>

<script>
import Dialog from './index'

export default {
  name: 'DialogDemo',
  components: {
    Dialog
  },
  created () {
    this.addVisible = this.editVisible
  },
  props: {
    editVisible: {
      type: Boolean,
      default: false,
      required: false
    },
    title: {
      type: String,
      default: '',
      required: false
    },
    width: {
      type: String,
      default: '',
      required: false
    },
    editValues: {
      type: [Array, Object],
      default: function () {
        return []
      },
      required: false
    }
  },
  watch: {
  },
  filters: {
  },
  data () {
    return {
      addVisible: false
    }
  },
  mounted () {
  },
  methods: {
    getList () {},
    // 当前组件弹窗logic start
    modalClose () {
      this.$emit('modalClose')
      this.addVisible = false
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
