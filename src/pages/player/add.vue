<template>
  <div class="addPlayer">
    <!-- <div class="img">
      <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="img" :src="img" class="avatar" />
        <div class="addIcon" v-else>
          <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
          <div class="msg">上传图片</div>
        </div>
      </el-upload>
    </div> -->
    <div class="name" v-loading="loading">
      <el-form  >
        <el-form-item label="选手名称：">
          <el-input v-model="name" />
        </el-form-item>
      </el-form>
    </div>
    <el-divider />
    <div class="handle">
      <el-button type="primary" @click="handleSubmit" :loading="loading"
      :disabled="name.length==0||name.length>30">确定</el-button>
    </div>
  </div>
</template>

<script setup>
import { inject, ref,onMounted  } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const { router, fetch, message } = inject('global')

const img = ref('')
const name = ref('')
const id = ref('')
const loading = ref(false)

// 点击提交
function handleSubmit(){
  if(id.value){
    loading.value = true
    fetch.put('/admin/contestant',{name:name.value, id: id.value}).then(res=>{
      console.log('修改成功')
      router.go(-1)
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      loading.value = false
    })
    return 
  }
  loading.value = true
  fetch.post('/admin/contestant',{name:name.value}).then(res=>{
    console.log('添加成功')
    router.go(-1)
  }).catch(err=>{
    console.log(err)
  }).finally(()=>{
    loading.value = false
  })
}

// 获取详情
function getInfo(id){
  loading.value = true
  fetch.get(`/admin/contestant/${id}`
  ).then(res=>{
    if(res.data?.id){
      name.value = res.data.name
    }
  }).catch(err=>{
    console.log(err)
  }).finally(()=>{
    loading.value = false
  })
}

onMounted(()=>{
  const route = useRoute()
  id.value = route.query.id
  if(id.value){
    getInfo(id.value)
  }
})

</script>

<style lang="less" scoped>
.addPlayer {
  .img{
    text-align: right;
    padding: 20px 20px 0 20px;
    .avatar-uploader .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .avatar-uploader /deep/ .el-upload {
      border: 1px solid #999;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader /deep/ .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .addIcon{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 178px;
      height: 178px;
      .el-icon.avatar-uploader-icon{
        font-size: 28px;
        margin-bottom: 10px;
      }
    }
  }
  .name{
    padding: 20px 20px 0 20px;
  }
  .handle{
    padding: 0 20px;
    .el-button{
      width: 100%;
    }
  }
}

</style>
