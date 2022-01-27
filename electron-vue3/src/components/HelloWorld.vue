<template>
  <div class="hello">
    <div class="mb10">
      <el-input class="mr10 w40" v-model="saveStoreName" placeholder="storeName"></el-input>
      <el-input class="mr10 w40" v-model="saveStoreVal" placeholder="storeVal"></el-input>
      <el-button class="mr10 w10" @click="saveStore">saveStore</el-button>
    </div>
    <div class="mb10">showGetStore:{{showGetStore}}</div>
    <div class="mb10">
      <el-input class="mr10 w40" v-model="getStoreName" placeholder="getStoreName"></el-input>
      <el-input class="mr10 w40" v-model="getStoreCallBackName" placeholder="getStoreCallBackName"></el-input>
      <el-button class="mr10 w10" @click="getStore">getStore</el-button>
    </div>
    <div class="mb10">
      <el-button class="mr10 w10" @click="about">about</el-button>
      <el-button class="mr10 w40" @click="openBaidu">在默认浏览器中打开百度</el-button>
    </div>
    <div class="mb10">
      fromMainDate:{{fromMainDate}}
    </div>
  </div>
</template>

<script>
const ipc = window.ipc
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      saveStoreName: '',
      saveStoreVal: '',
      getStoreName: '',
      getStoreCallBackName: '',
      showGetStore: '',
      fromMainDate: ''
    }
  },
  created () {
    try {
      ipc.on('ping', (e, f) => {
        this.fromMainDate = f
      })
    } catch (error) {

    }
  },
  methods: {
    openBaidu () {
      try {
        ipc.send('open-url', 'https://www.baidu.com')
      } catch (error) {

      }
    },
    about () {
      try {
        ipc.send('about')
      } catch (error) {

      }
    },
    saveStore () {
      try {
        ipc.send('saveStore', { storeName: this.saveStoreName, val: this.saveStoreVal })
      } catch (error) {
      }
    },
    getStore () {
      try {
        ipc.send('getStore', { storeName: this.getStoreName, callBackName: this.getStoreCallBackName })
        ipc.on(this.getStoreCallBackName, (e, f) => {
          console.log(f)
          this.showGetStore = f
        })
      } catch (error) {
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.mr10 {
  margin-right: 10px;
}

.mb10 {
  margin-bottom: 10px;
}

.w40 {
  width: 40%;
}

.w10 {
  width: 10%;
}
</style>
