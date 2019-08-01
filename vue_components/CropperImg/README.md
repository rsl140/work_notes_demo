# CropperImg

## Cropper的使用方法
安装`npm install vue-cropper --save`

## 使用
``` html
import CropperImg from './index'
<cropper-img :editVisible="courseEditVisible" @modalClose="courseModalClose" :title="'更换封面'" :width="'40vw'" :img="imageUrl" @submit="courseHandleChange" :appToBody="true"></cropper-img>
```