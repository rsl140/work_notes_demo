<template>
  <div>
    <el-row class="mb5">
      <el-col :span="24">请在控制台查看输出内容</el-col>
    </el-row>
    <el-button @click="protobufferTest">测试按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
    }
  },
  methods: {
    protobufferTest () {
      var message = new this.awesome.Person() // 调用Person对象  实例化
      // 赋值
      message.setId(23)
      message.setName('asd')
      // 序列化
      var bytes = message.serializeBinary()
      // 返回为对象
      var obj = message.toObject()

      console.log(bytes) // Uint8Array(7) [8, 23, 18, 3, 97, 115, 100]
      console.log(obj)
      // 反序列化
      var message2 = this.awesome.Person.deserializeBinary(bytes)

      console.log(message2)
      // 返回为对象
      console.log(message2.toObject())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mb5 {
  margin-bottom: 5px;
}
</style>
