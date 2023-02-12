<template>
  <div id="app">
    <div class="container">
      <router-view :user.sync="user"/>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        user:{}
      }
    },
  }
</script>
<style lang="scss">
  #app{
    font-family: 'Roboto';
    font-style: normal;
  }
  h3{
    margin: 0;
  }
  .container {
    max-width: 900px;
    padding: 0 15px;
    margin: 0 auto;
  }
</style>
