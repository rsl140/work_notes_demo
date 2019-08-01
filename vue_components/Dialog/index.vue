<template>
  <el-dialog
    :top="'5vh'"
    :title="title"
    :visible.sync="addVisible"
    :width="width"
    :before-close="modalClose"
    :append-to-body="appToBody"
    :fullscreen="fullscreen"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <!-- v-el-drag-dialog -->
    <div class="dialog-style">
      <slot></slot>
    </div>
    <span slot="footer" class="dialog-footer" v-if="footerShow">
      <slot name="dialogfooter"></slot>
      <el-button v-if="confirmShow" type="primary" @click="confirm" size="small" :disabled="confirmDisabled">确 定</el-button>
      <el-button v-if="cancelShow" @click="cancel" size="small">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
// import elDragDialog from '@/directive/el-dragDialog' // 拖动组件根据vue-element-admin

export default {
  name: 'Dialog',
  // directives: { elDragDialog },
  data () {
    return {
      addVisible: false
    }
  },
  created () {
    this.addVisible = this.flag
  },
  props: {
    flag: {
      type: Boolean,
      default: false,
      required: false
    },
    title: {
      type: String,
      default: '编辑',
      required: false
    },
    width: {
      type: String,
      default: '',
      required: false
    },
    footerShow: {
      type: Boolean,
      default: true,
      required: false
    },
    appToBody: {
      type: Boolean,
      default: false,
      required: false
    },
    confirmDisabled: {
      type: Boolean,
      default: false,
      required: false
    },
    confirmShow: {
      type: Boolean,
      default: true,
      required: false
    },
    cancelShow: {
      type: Boolean,
      default: true,
      required: false
    },
    fullscreen: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    modalClose () {
      this.$emit('modalClose')
      this.addVisible = false
    },
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-style {
  max-height: 70vh;
  overflow: auto;
}
</style>

