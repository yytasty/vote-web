<template>
  <div class="rankList" :style="`opacity:${isShow?1:0}`">
    <div class="top">
      <div class="msg">排行榜</div>
      <div class="topList">
        <div class="one topItem" v-if="list[0]">
          <img src="../../../public/皇冠1.png" alt="" class="img" />
          <div class="rank">{{list[0]?.sort}}</div>
          <div class="name">{{list[0]?.name}}</div>
          <div class="minute">
            {{list[0]?.score}} 分
          </div>
        </div>
        <div class="two topItem" v-if="list[1]">
          <img src="../../../public/皇冠2.png" alt="" class="img" />
          <div class="rank">{{list[1]?.sort}}</div>
          <div class="name">{{list[1]?.name}}</div>
          <div class="minute">
            {{list[1]?.score}} 分
          </div>
        </div>
        <div class="three topItem" v-if="list[2]">
          <img src="../../../public/皇冠3.png" alt="" class="img" />
          <div class="rank">{{list[2]?.sort}}</div>
          <div class="name">{{list[2]?.name}}</div>
          <div class="minute">
            {{list[2]?.score}} 分
          </div>
        </div>
      </div>
    </div>
    <div class="list" v-if="list.length>3">
      <el-card class="item" v-for="item in list.slice(3)" :key="item.id">
        <div class="itemInfo">
          <div class="rank">{{item.sort}}</div>
          <div class="name">{{item.name}}</div>
          <div class="minute">
            {{item.score}} 分
          </div>
        </div>
      </el-card>
    </div>
    <audio src="https://downsc.chinaz.net/Files/DownLoad/sound1/202210/y1289.wav"  autoplay="autoplay">
    </audio>
  </div>
  <div class="box" v-show="!isShow">
    精彩即将呈现 ...
    <h2 >42</h2>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'

const { router, fetch } = inject('global')

const list = ref([])
const loading = ref(false)
const isShow = ref(false) // 是否展示全部数据


function getList(){
  loading.value = true
  fetch.get('/app/vote').then(res=>{
    list.value= res.data
  }).finally(()=>{
    loading.value = false
  })
}

let NUMBER = 1;
let COUNT = 42;
let COLORS = ['#8c00ff', '#006bff', '#4fff00', '#ffb800', '#ff0000'];
let timer = null;
function animation(){
  let h2 = document.querySelector('h2')
  h2.style.display = 'block';
  timer = setInterval(() => {
    COUNT--;
    NUMBER++;
    if (COUNT >= 0) {
      h2.classList.remove('active');
      setTimeout(() => {
        let num = Math.floor(Math.random()*5);
        h2.innerText = COUNT;
        h2.style.color = COLORS[num];
        h2.classList.add('active');
      }, 100);
    } else {
      isShow.value = true
      clearInterval(timer);
    }
  }, 1000);
}

onMounted(()=>{
  getList()
  animation()
})
</script>

<style lang="less" scoped>
.rankList {
  font-size: 20px;
  padding: 10px 20px;
  transition: all 1s;
  .avatar{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
  }
  .top{
    text-align: center;
    height: 220px;
    .msg{
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      color:palevioletred;
    }
    .topList{
      position: relative;
      margin-top: 10px;
      .one{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        .name{
          font-size: 30px;
          padding-bottom: 10px;
        }
      }
      .two{
        position: absolute;
        top: 40px;
        left: 0;
        .name{
          font-size: 24px;
          padding-bottom: 10px;
        }
      }
      .three{
        position: absolute;
        top: 40px;
        right: 0;
        .name{
          font-size: 24px;
          padding-bottom: 10px;
        }
      }
      .img{
        width: 40px;
      }
    }
  }
  .list{
    .item{
      margin: 10px 0;
    }
    .itemInfo{
      padding: 10px 0;
      display:flex;
      align-items: center;
      .name{
        margin: 0 20px 0 40px;
        font-size: 22px;
        flex: 1;
      }
    }
  }
}

.box{
  position: fixed;
  top: 50%;
  transform: translate(-50%,-50%);
  left: 50%;
  text-align: center;
}
h2{
  font-size:300px;
  color:red;
  text-align:center;
}
h2.active{
  animation:count .5s;
}
@keyframes count {
  from {
    transform: scale(.1);
    opacity: 1;
  }
  to {
    transform: scale(3.5);
    opacity: 0;
    display:none;
  }
}
</style>
