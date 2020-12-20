<template>
  <div class="approval">
      <p>aaaaaaaaaaaaaa</p>
      <iframe :src="iframeUrl" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  data () {
    return {
       iframeUrl: '' 
    }
  },
  created(){
      this.iframeUrl = this.$route.query.iframeUrl;
  }
}
</script>

<style scoped>
</style>
