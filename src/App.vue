<template>
  <router-view></router-view>
</template>

<script setup>
  import { provide } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from './plugin/axios';
  const router = useRouter();

  provide('global', {
    fetch: axios,
    router,
  });
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  #app {
    /* max-width: 800px; */
    margin: 0 auto;
  }
</style>
