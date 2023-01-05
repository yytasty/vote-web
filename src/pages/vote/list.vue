<template>
  <div class="voteList" v-loading="loading">
    <el-card class="item" v-for="(item, index) in list" :key="item.id">
      <div class="itemInfo">
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="num">序号：{{ index + 1 }}</div>
        </div>
        <div>
          <div class="currentScore">
            {{ item.currentScore ? item.currentScore + '分' : '' }}
          </div>
          <el-button class="handle" @click="handle(item)" type="primary"
            >评分</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
  import { inject, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';

  const { router, fetch } = inject('global');
  const list = ref([]);
  const loading = ref(false);

  // 点击评分
  function handle(item) {
    router.push(`/vote/addMinute?id=${item.id}&name=${item.name}`);
  }

  function getList() {
    loading.value = true;
    fetch
      .get(`/app/contestant/v3`, {
        params: {
          phone: localStorage.getItem('phone2'),
          judgeRoleId: localStorage.getItem('judgeRoleId'),
        },
      })
      .then((res) => {
        list.value = res.data || [];
        // if(res.data?.judgeId){
        //   if(localStorage.getItem('judgeId')){
        //     return
        //   }
        //   localStorage.setItem('judgeId', res.data?.judgeId)
        // }
      })
      .finally(() => {
        loading.value = false;
      });
  }

  onMounted(() => {
    if (!localStorage.getItem('phone2')) {
      router.push('/login');
      return;
    }
    getList();
  });
</script>

<style lang="less" scoped>
  .voteList {
    font-size: 14px;
    min-height: 200px;
    .item {
      margin: 16px;
      .itemInfo {
        display: flex;
        .info {
          flex: 1;
          .name {
            font-size: 16px;
            font-weight: 600;
            padding-bottom: 10px;
          }
        }
        .currentScore {
          text-align: center;
          padding-bottom: 10px;
        }
      }
    }
  }
</style>
