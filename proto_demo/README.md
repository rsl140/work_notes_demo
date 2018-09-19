# proto_demo

> proto demo 如果觉得有用 请各位大佬点个赞 谢谢

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 下载protobuf编译器
[下载地址](https://repo1.maven.org/maven2/com/google/protobuf/protoc/) (我下载的是3.40版)
[github下载地址](https://github.com/protocolbuffers/protobuf/releases)
根据需求下载。
> 不下载的话 编译不了文件！！！！！

## 配置环境变量
解压 `protoc-3.5.1-osx-x86_64.zip`
Mac 配置环境变量 `vi ~/.bash_profile` 使其配置生效`source ~/.bash_profile`

``` bash
#protobuf
export PROTOBUF_HOME=/Users/Javen/Documents/dev/java/protobuf/protoc-3.5.1-osx-x86_64
export PATH=$PATH:$PROTOBUF_HOME/bin
```
Window 将bin添加到path 即可 例如:`D:\protobuf\protoc-3.5.1-win32\bin`

[参考地址](https://www.jianshu.com/p/e63082e9188d)

## 插件
> * [element-ui](https://github.com/ElemeFE/element) - 饿了么UI

> * [google-protobuf](https://github.com/protocolbuffers/protobuf/tree/master/js) - 谷歌protobuf插件

## proto目录说明
> * `src/assets/proto/awesome.proto` 为编辑文件
>
> * `src/assets/proto/awesome_pb.js` 为`protobuf编译器`编译后自动生成的文件，引用的就是这个文件
>
> * `src/assets/proto/proto-bat.bat` 为windows下的批处理。进入目录后双击生成最新`awesome_pb.js`

## 具体参考
[segmentfault文章](https://segmentfault.com/a/1190000015402524)
