<template>
  <div id="app">
    <keep-alive> <router-view v-if="$route.meta.keepAlive"></router-view> </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

html,
body {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}

#app {
  background: #f8f8f8;
  width: 100%;
  height: 100%;
}
.max-750 {
  #app {
    width: 750px;
    margin: 0 auto;
  }
}
</style>
