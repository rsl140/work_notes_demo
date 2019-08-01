<template>
  <div class="tree-container">
    <el-container class="h w">
      <el-header style="height:41px;" class="tree-container-edit clearfix" v-if="editBarShow">
        <div class="fl">
          <slot name="chaptername"></slot>
        </div>
        <!-- <el-button type="text" icon="el-icon-circle-plus-outline" class="dofar-button-text" size="mini" @click="add" v-if="addButtonShow">添加</el-button>
        <el-button type="text" icon="el-icon-edit" class="dofar-button-text" size="mini" @click="edit" v-if="editButtonShow">修改</el-button> -->
        <el-button @click="refresh" class="p5 fr mt8" type="info" icon="el-icon-refresh" size="mini" plain v-if="refreshButtonShow"></el-button>
        <el-button @click="gotoEdit" class="p5 fr mt8" type="info" icon="el-icon-edit" size="mini" plain v-if="gotoEditPage">编辑</el-button>
        <el-upload style="margin-top: -4px;" class="p5 fr" action="" :multiple="true" :on-change="(file, fileList)=>{return treeUpload(file, fileList)}" :auto-upload="false" :show-file-list="false" v-if="uploadButtonShow">
          <el-button class="p5" type="info" icon="el-icon-upload2" size="mini" plain></el-button>
        </el-upload>
        <slot></slot>
      </el-header>
      <el-main class="h w" style="padding:0;background:#fff;">
        <el-scrollbar class="tree-scrollbar rest-tree">
          <el-tree
            :data="treeData"
            :node-key="nodeKey"
            :default-expand-all="defaultExpandAll"
            :default-expanded-keys="defaultExpandKeys"
            @node-drop="handleDrop"
            :draggable="draggableFlag"
            :props="treeProps"
            :load="loadNode"
            :lazy="isLazy"
            :indent="5"
            highlight-current
            @node-click="handleClick"
            @node-expand="expand"
            @node-collapse="collapse"
            @node-contextmenu="contextmenu"
            ref="tree"
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <el-tooltip effect="dark" :content="node.label" placement="top" :open-delay="20" :enterable="false">
                <span class="tree-label">{{ node.label }}</span>
              </el-tooltip>
              <span class="tree-edit">
                <el-tooltip effect="dark" content="添加下级" placement="top" :open-delay="20" :enterable="false">
                  <span class="card-button" @click="() => add(data)" v-if="addButtonShow">
                    <i style="color:#444;" class="el-icon-plus"></i>
                  </span>
                </el-tooltip>
                <el-tooltip v-if="data[nodeKey]" effect="dark" content="编辑" placement="top" :open-delay="20" :enterable="false">
                  <!-- 原位编辑 start -->
                  <span class="card-button" @click="() => edit(data)" v-if="editButtonShow && inSitu && !data['insitushow']">
                    <i style="color:#444;" class="el-icon-edit"></i>
                  </span>
                  <el-input v-if="editButtonShow && inSitu && data['insitushow']" v-model="data['insituvalue']"></el-input>
                  <!-- 原位编辑 end -->
                  <span class="card-button" @click="() => edit(data)" v-if="editButtonShow && !inSitu">
                    <i style="color:#444;" class="el-icon-edit"></i>
                  </span>
                </el-tooltip>
                <el-tooltip v-if="data[nodeKey] && delButtonShow" effect="dark" content="删除" placement="top" :open-delay="20" :enterable="false">
                  <span class="card-button" @click="() => del(data)" v-if="delButtonShow">
                    <i style="color:#444;" class="el-icon-delete"></i>
                  </span>
                </el-tooltip>
              </span>
            </span>
          </el-tree>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
export default {
  name: 'Tree',
  components: { Sticky },
  data () {
    return {
    }
  },
  created () {
  },
  props: {
    treeData: {
      type: [Array, Object],
      required: false
    },
    isLazy: {
      type: Boolean,
      default: false,
      required: false
    },
    addButtonShow: {
      type: Boolean,
      default: true,
      required: false
    },
    editButtonShow: {
      type: Boolean,
      default: true,
      required: false
    },
    delButtonShow: {
      type: Boolean,
      default: false,
      required: false
    },
    refreshButtonShow: {
      type: Boolean,
      default: true,
      required: false
    },
    uploadButtonShow: {
      type: Boolean,
      default: true,
      required: false
    },
    draggableFlag: {
      type: Boolean,
      default: false,
      required: false
    },
    defaultExpandAll: {
      type: Boolean,
      default: false,
      required: false
    },
    editBarShow: {
      type: Boolean,
      default: true,
      required: false
    },
    treeProps: {
      type: [Array, Object],
      required: false,
      default: function () {
        return {
          children: 'children',
          label: 'label'
        }
      }
    },
    nodeKey: {
      type: String,
      default: 'id',
      required: false
    },
    defaultExpandKeys: {
      type: [Array, Object],
      required: false,
      default: function () {
        return []
      }
    },
    gotoEditPage: {
      type: Boolean,
      default: false,
      required: false
    },
    // 原位编辑
    inSitu: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    add (data) {
      // const nodes = this.$refs.tree.getCurrentNode()
      const node = data[this.nodeKey] ? data : null
      this.$emit('add', node)
    },
    edit (data) {
      const node = data[this.nodeKey] ? data : null
      this.$emit('edit', node)
    },
    del (data) {
      const node = data[this.nodeKey] ? data : null
      this.$emit('del', node)
    },
    refresh () {
      this.$emit('refresh')
    },
    gotoEdit () {
      this.$emit('gotoEdit')
    },
    treeUpload (file, fileList) {
      this.$emit('treeUpload', { file, fileList })
    },
    handleDrop (node, end, side, event) {
      this.$emit('handleDrop', { node, end, side, event })
    },
    handleClick (obj, node, array) {
      this.$emit('handleClick', { obj, node, array })
    },
    loadNode (node, resolve) {
      this.$emit('loadNode', node, resolve)
    },
    expand (obj, node, data) {
      this.$emit('expand', obj)
    },
    collapse (obj, node, data) {
      this.$emit('collapse', obj)
    },
    contextmenu (event, data, node, self) {
      this.$emit('contextmenu', { event, data, node, self })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .tree {
    &-container {
      height: 100%;
      // margin-top: 5px;
      &-edit {
        padding: 0px 7px;
        // border-top: 1px solid $border;
        border-bottom: 1px solid $border;
        height: 41px;
        line-height: 37px;
        background: $gray;
      }
      .el-tree-node:hover>.el-tree-node__content:hover>.custom-tree-node>.tree-edit {
        display: block;
      }
      .el-tree-node .el-tree-node__content .custom-tree-node .tree-edit {
        display: none;
      }
      .is-current>.el-tree-node__content>.custom-tree-node .tree-edit {
        display: block;
      }
      .custom-tree-node {
        font-size: 12px;
        padding-right: 8px;
        width: 100%;
        position: relative;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        height: 26px;
      }
      .tree-label {
        overflow:hidden;
        text-overflow:ellipsis;
        width: 95%;
        height: 26px;
        line-height: 26px;
        white-space:nowrap;
        position: absolute;
        z-index: 4;
      }
      .tree-edit {
        position: absolute;
        background: #0669ea;
        right:0;
        z-index: 5;
        span {
          height: 26px;
          line-height: 26px;
        }
      }
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss">
.rest-tree .el-tree-node__content:hover, .rest-tree .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
  background-color: #0669ea;
  color: #fff;
}

</style>

