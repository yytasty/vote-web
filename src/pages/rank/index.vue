<template>
  <div class="coverBox">
    <div class="rankList" :style="`opacity:${isShow ? 1 : 0}`">
      <div class="top">
        <div class="msg">排行榜</div>
        <!-- <div class="topList">
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
        </div> -->
      </div>
      <div id="echarts" style="width: 100%; height: 600px"></div>
      <!-- <div class="list" v-if="list.length>3">
        <el-card class="item" v-for="item in list.slice(3)" :key="item.id">
          <div class="itemInfo">
            <div class="rank">{{item.sort}}</div>
            <div class="name">{{item.name}}</div>
            <div class="minute">
              {{item.score}} 分
            </div>
          </div>
        </el-card>
      </div> -->
      <audio
        src="https://downsc.chinaz.net/Files/DownLoad/sound1/202210/y1289.wav"
        autoplay="autoplay"
        loop="loop"
      ></audio>
    </div>
    <div class="box" v-show="!isShow && showTime">
      <!-- 精彩即将呈现 ... -->
      <h2>5</h2>
    </div>
    <div class="handle" v-if="!showTime">
      <el-button type="primary" @click="animation">结算</el-button>
    </div>
  </div>
</template>

<script setup>
  import * as echarts from 'echarts';
  import { inject, ref, onMounted, watch } from 'vue';

  const { router, fetch } = inject('global');

  const list = ref([]);
  const loading = ref(false);
  const isShow = ref(false); // 是否展示全部数据
  const showTime = ref(false); // 是否开启倒计时
  const maxNum = ref(0); // 最大值

  function getList() {
    loading.value = true;
    fetch
      .get('/app/vote/v2')
      .then((res) => {
        list.value = res.data;
        list.value.map((v) => {
          if (v.score > maxNum.value) {
            maxNum.value = v.score;
          }
        });

        maxNum.value =
          Math.floor(maxNum.value) + 35 - Math.floor(maxNum.value % 5);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  // 设置图表
  function setEcharts(hasRank) {
    var chartDom = document.getElementById('echarts');
    var myChart = echarts.init(chartDom);
    var option;
    if (hasRank) {
      list.value.sort((a, b) => a.sort - b.sort);
    }
    option = {
      xAxis: [
        {
          type: 'category',
          data: list.value.map((v) => v.name),
        },
        hasRank
          ? {
              type: 'category',
              data: list.value.map((v) => `第 ${v.sort} 名`),
              axisLine: {
                show: false, // X轴 网格线 颜色类型的修改
              },
              axisLabel: {
                // X轴线 标签修改
                textStyle: {
                  color: '#c45656', //坐标值得具体的颜色
                  fontSize: 16,
                  fontWeight: 600,
                },
              },
              axisTick: {
                // X轴线 刻度线
                show: false,
              },
            }
          : {},
      ],
      yAxis: {
        type: 'value',
        max: maxNum.value,
      },
      series: [
        {
          data: list.value.map((v) => v.score),
          type: 'bar',
          // animationDelay:function(i){
          //   return i * 100
          // },
          animationDuration: 8000,
          animationDurationUpdate: hasRank
            ? undefined
            : function (i) {
                return i * 100000;
              },
          // showBackground: true,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' },
          ]),
          // color: '#000',
          itemStyle: hasRank
            ? {
                //上方显示数值
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: {
                      //数值样式
                      color: 'black',
                      fontSize: 16,
                    },
                  },
                },
              }
            : undefined,
        },
      ],
    };
    option && myChart.setOption(option);
    if (!hasRank) {
      setTimeout(() => {
        setEcharts(true);
      }, 11000);
    }
  }

  let NUMBER = 1;
  let COUNT = 5;
  let COLORS = ['#8c00ff', '#006bff', '#4fff00', '#ffb800', '#ff0000'];
  let timer = null;
  watch(
    () => isShow.value,
    () => {
      if (isShow.value) {
        setEcharts();
      }
    }
  );
  function animation() {
    showTime.value = true;
    let h2 = document.querySelector('h2');
    h2.style.display = 'block';
    timer = setInterval(() => {
      COUNT--;
      NUMBER++;
      if (COUNT >= 0) {
        h2.classList.remove('active');
        setTimeout(() => {
          let num = Math.floor(Math.random() * 5);
          h2.innerText = COUNT;
          h2.style.color = COLORS[num];
          h2.classList.add('active');
        }, 100);
      } else {
        isShow.value = true;
        clearInterval(timer);
      }
    }, 1000);
  }

  onMounted(() => {
    getList();
  });
</script>

<style lang="less" scoped>
  .coverBox {
    background-color: #c6e2ff;
  }
  .rankList {
    font-size: 20px;
    padding: 10px 20px;
    transition: all 1s;
    background-color: #c6e2ff;
    min-height: 100vh;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
    }
    .top {
      text-align: center;
      // height: 220px;
      .msg {
        text-align: center;
        font-size: 30px;
        font-weight: 600;
        padding-top: 30px;
        color: palevioletred;
      }
      .topList {
        position: relative;
        margin-top: 10px;
        .one {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          .name {
            font-size: 30px;
            padding-bottom: 10px;
          }
        }
        .two {
          position: absolute;
          top: 40px;
          left: 0;
          .name {
            font-size: 24px;
            padding-bottom: 10px;
          }
        }
        .three {
          position: absolute;
          top: 40px;
          right: 0;
          .name {
            font-size: 24px;
            padding-bottom: 10px;
          }
        }
        .img {
          width: 40px;
        }
      }
    }
    .list {
      .item {
        margin: 10px 0;
      }
      .itemInfo {
        padding: 10px 0;
        display: flex;
        align-items: center;
        .name {
          margin: 0 20px 0 40px;
          font-size: 22px;
          flex: 1;
        }
      }
    }
  }

  .handle {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .box {
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    text-align: center;
  }
  h2 {
    font-size: 300px;
    color: red;
    text-align: center;
  }
  h2.active {
    animation: count 0.5s;
  }
  @keyframes count {
    from {
      transform: scale(0.1);
      opacity: 1;
    }
    to {
      transform: scale(3.5);
      opacity: 0;
      display: none;
    }
  }
</style>
