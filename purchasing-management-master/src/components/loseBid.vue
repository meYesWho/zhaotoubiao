<template>
  <div></div>
</template>

<script>
import Vue from "vue";
import base from '../api/base';
export default Vue.component("lose-bid", {
  data() {
    return {
    };
  },
  mounted() {
      
  },
  methods: {
    handleCommand(command) {
      if(command == 'out'){
        window.localStorage.clear();
        window.location.href = base.logoutUrl;
      }
    }
  }
});
</script>

<style scoped>

</style>
