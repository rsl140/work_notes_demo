<!--
@param:
	tableData: 表格数据列表
	tableKey: 表格对应名称和关键字
	isExpand: 是否显示展开行(true or false)
	isExpandOne: 展开行是否只显示一行(true of false)
	isSelect: 是否显示勾选框(true or false)
	isIndex: 是否显示索引列(true or false)
	fixedHeight: 固定高度
	@sub param
		operate: 是否使用template模板(true or false)
		name: 对应列名
		value: 对应列的关键字
		width: 宽度
		minWidth: 最小宽度
		fixed: 是否固定列(left or right)
		sortable: 是否启用排序(tur or false or 'custom'=>服务器排序)
@method:
	CellClick: 表格点击
	sortChange: 排序
	SelectChange: 勾选变化
	handleExpandRow: 展开行
@example
<sl-table :tableData="tableData" :tableKey="tableKey">
	<template slot="option" slot-scope="scope">
		<el-button size="small" type="text" @click="handleRowEdit(scope.$index,scope.row)">编辑</el-button>
	</template>
</sl-table>
tableKey: [{
	operate:false,
	name: 'ID',
	value: 'Id'
},{
	operate: false,
	name: '名称',
	value: 'name'
},{
	operate: false,
	name: '排序',
	value: 'sort'
},{
	operate: true,
	name: '操作',
	value: 'option'
}]
 -->

<template>
	<div class="sl-table">
		<el-table :data="tableData" :border="borderShow" ref="raw_table"
		:stripe="stripeShow"
    :show-header="showHeader"
    size="mini"
    :header-row-style="{border: '1px #ddd solid'}"
    :header-cell-style="{ backgroundColor: '#e9e9e9',fontSize: '12px', fontWeight: '700', color: '#444', borderRight: '1px #ddd solid'}"
		:height="fixedHeight"
		@cell-click="CellClick"
		@sort-change="sortChange"
		@selection-change="handleSelectionChange"
		@expand-change="handleExpandRow" >
		<!-- expand -->
			<el-table-column v-if="isExpand" type="expand" :show-overflow-tooltip="true">
				<template slot-scope="scope">
					<slot name="expand" :$index="scope.$index" :row="scope.row"></slot>
				</template>
			</el-table-column>

		<!-- selection -->
			<el-table-column v-if="isSelect" type="selection" width="60" align="center" :show-overflow-tooltip="true"></el-table-column>

		<!-- index -->
			<el-table-column v-if="isIndex" type="index" width="50" align="center" :show-overflow-tooltip="true"></el-table-column>

		<!-- table head -->
			<el-table-column v-for="(data,key) in tableKey"
			:key="key"
			:align="data.align ? data.align : 'center'"
			v-if="!data.operate"
			:prop="data.value"
			:label="data.name"
			:width="data.width"
			:min-width="data.minWidth"
			:fixed="data.isfixed"
			:sortable="data.sortable"
			:show-overflow-tooltip="true"></el-table-column>

		<!-- oparation -->
			<el-table-column v-else
			:label="data.name"
			:prop="data.value"
			:align="data.align ? data.align : 'center'"
			:width="data.width"
			:min-width="data.minWidth"
			:fixed="data.isfixed"
			:sortable="data.sortable"
      :show-overflow-tooltip="true">
				<template slot-scope="scope">
					<slot :name="data.value" :$index="scope.$index" :row="scope.row"></slot><!-- 对应slot name -->
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
  name: 'dofarTable',
  data () {
    return {}
  },
  // props:['tableData','tableKey','isSelect','fixedHeight','defaultSort','isExpand','isIndex','isExpandOne'],
  props: {
    tableData: {
      type: [Array, Object],
      required: true
    },
    tableKey: {
      type: Array,
      required: true
    },
    isSelect: {
      type: Boolean,
      required: false
    },
    isExpand: {
      type: Boolean,
      required: false
    },
    isExpandOne: {
      type: Boolean,
      required: false
    },
    isIndex: {
      type: Boolean,
      required: false
    },
    fixedHeight: {
      type: [Number, String],
      required: false
    },
    borderShow: {
      type: Boolean,
      required: false,
      default: true
    },
    stripeShow: {
      type: Boolean,
      required: false,
      default: true
    },
    showHeader: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    sortChange (argu) {
      this.$emit('sortChange', argu)
    },
    CellClick (row, col, cell) {
      // console.log(row,col,cell)
      this.$emit('CellClick', { row, col, cell })
    },
    handleSelectionChange (list) {
      this.$emit('SelectChange', list)
    },
    handleExpandRow (row, expandRows) {
      // console.log(row,expandRows)
      if (this.isExpandOne) {
        this.$refs.raw_table.store.states.expandRows =
          expandRows.length !== 0 ? [row] : []
      }
      //   if(this.isExpand && this.isExpandOne){
      //  this.$refs.raw_table.store.states.expandRows = expanded ? [row] : []
      // }
    }
  }
}
</script>

<style>
.sl-table .cell {
  padding: 0;
}
.sl-table .cell > span {
  word-break: normal;
  margin: 0 !important;
}

</style>
