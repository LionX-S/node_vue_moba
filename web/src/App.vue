<template>
  <Navigate></Navigate>
  <div class="w-full h-full">
    <router-view></router-view>
  </div>
</template>

<script>
import Navigate from './components/Navigate.vue';
export default {
  name: 'App',
  components: {
    Navigate
  }
}
</script>

<style>

</style>
