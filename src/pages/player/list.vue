<template>
  <div class="playerList">
    <div class="search">
      <el-input v-model="searchValue" @keydown.enter="getList" placeholder="输入名称" :prefix-icon="Search" clearable />
      <el-button type="primary" @click="getList" :loading="loading">搜索</el-button>
    </div>
    <div class="itemList" v-loading="loading">
      <draggable v-model="list" item-key="id" handle=".handleMove">
        <template #item="{element, index}">
          <div class="item">
            <div class="handleMove">
              <el-icon><Expand /></el-icon>
            </div>
            <div class="img" @click="handleEdit(element)">
              <el-avatar size="large"> {{element.name.substring(0,1)}} </el-avatar>
            </div>
            <div class="bottom">
              <div class="left">
                <div class="name">{{element.name}}</div>
                <div class="number">{{index+1}} 号</div>
              </div>
              <div class="right">
                <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  :title="`你确定要删除${element.name}吗？`"
                  @confirm="handleDelete(element)"
                >
                  <template #reference>
                    <el-button type="danger" >删除</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </div>
          </div>
        </template>
      </draggable>
      <div class="item" @click="jumpAddPlayer">
        <div class="img" style="display:flex;justify-content: center;align-items:center;font-size: 32px;">
            <el-icon><Plus /></el-icon>
        </div>
        <div class="bottom" style="justify-content: center;line-height: 40px;">
          添加选手
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

const searchValue = ref('')
const loading = ref(false)
const list = ref([])

// 改变排序
watch(()=>list.value,()=>{
  changeIndex()
})


// 获取选手列表
function getList(){
  loading.value = true
  fetch.get('/admin/contestant',{params:{
    name: searchValue.value
  }}).then(res=>{
    if(res.data){
      list.value = res.data
    }
  }).catch(err=>{
    ElMessage.error(err.msg || '获取失败！')
    
  }).finally(()=>{
    loading.value = false
  })
}

// 更新选手排名
function changeIndex(){
  fetch.post('/admin/contestant/sort', list.value.map(v=>v.id))
}

// 点击删除
function handleDelete(item){
  fetch.delete(`/admin/contestant/${item.id}`).then(res=>{
    getList()
  })
}

// 跳转添加选手页面
function jumpAddPlayer(){
  router.push('/player/add')
}

// 点击了修改
function handleEdit(item){
  router.push(`/player/add?id=${item.id}`)
}


onMounted(()=>{
  getList()
})


</script>

<style lang="less" scoped>
.playerList {
  height: 100vh;
  overflow-y: auto;
  width: 100vw;
  font-size: 14px;
  .search{
    display: flex;
    position: sticky;
    top: 0;
    background-color: #fff;
    box-shadow: 0 0 5px #ddd;
    padding : 10px;
    z-index: 30;
    .el-button{
      margin-left: 10px;
    }
  }
  .itemList{
    overflow: hidden;
    margin-bottom: 40px ;
    .item{
      float: left;
      width: calc(50% - 20px);
      margin: 10px;
      overflow: hidden;
      box-shadow: 0 0 5px #ccc;
      border-radius: 5px;
      height: calc(50vw + 40px);
      position: relative;
      .handleMove{
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 20;
        font-size: 20px;
      }
      .img{
        height: calc(50vw - 20px);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-avatar{
          background-color: rgb(105, 105, 247);
          font-size: 20px;
        }
      }
      .bottom{
        display: flex;
        padding: 10px;
        align-items:flex-end;
        justify-content: space-between;
        .left{
          text-align: left;
        }
      }
    }
  }
}
</style>
