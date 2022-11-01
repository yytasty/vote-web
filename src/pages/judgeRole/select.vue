<template>
  <div class="scoreList">
    <div class="title">请选择角色</div>
    <div class="itemList" v-loading="loading">
      <div class="item" v-for="element in list" :key="element.id">
        <div class="top">
          <!-- <div class="handleMove">
            <el-icon><Expand /></el-icon>
          </div> -->
          <div class="left">{{element.name}}</div>
          <div class="right"></div>
        </div>
        <div class="bottom">
          <div></div>
          <!-- <el-button type="primary" link @click="handleEdit(element)">编辑</el-button> -->
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            :title="`你确定要选中${element.name}吗？`"
            @confirm="handleSelect(element)"
          >
            <template #reference>
              <el-button type="primary" >选中</el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted, watch } from 'vue'
import { Search, Plus, Expand } from '@element-plus/icons-vue'
import draggable from 'vuedraggable'
const { router, fetch } = inject('global')

const loading = ref(false)
const list = ref([])


// 获取列表
function getList(){
  loading.value = true
  fetch.get('/app/judgeRole').then(res=>{
    if(res.data){
      list.value = res.data
    }
  }).catch(err=>{

  }).finally(()=>{
    loading.value = false
  })
}


// 点击选择
function handleSelect(item){
  loading.value = true
  fetch.post(`/app/vote/chooseJudgeRole?judgeRoleId=${item.id}`).then(res=>{
    if(res.data){
      ElMessage.success('选中成功')
      localStorage.setItem('judgeId',res.data.judgeId)
      localStorage.setItem('judgeRoleId',res.data.judgeRoleId)
      jumpVote()
    }
  }).catch(err=>{

  }).finally(()=>{
    loading.value = false
  })
}

// 跳转投票页面
function jumpVote(){
  router.push('/vote/list')
}

if(localStorage.getItem('judgeRoleId')){
  jumpVote()
}

onMounted(()=>{
  getList()
})


</script>

<style lang="less" scoped>
.scoreList {
  height: 100vh;
  overflow-y: auto;
  width: 100vw;
  font-size: 14px;
  .title{
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color:palevioletred;
    padding: 10px;
  }
  .itemList{
    overflow: hidden;
    margin-bottom: 40px ;
    .item{
      margin: 10px;
      position: relative;
      padding: 20px 20px 20px 20px;
      box-shadow:  var(--el-box-shadow-light);
      border-radius: 4px;
      border: 1px solid #ddd;
      .handleMove{
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 20;
        font-size: 20px;
      }
      .top{
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
      }
      .bottom{
        display: flex;
        justify-content: space-between;
      }
    }
    .add{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 26px;
      margin: 10px;
    }
  }
}
</style>
