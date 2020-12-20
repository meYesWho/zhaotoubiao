<template>
  <header>
    <img src="../../static/images/logo.png" class="logo" />
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="/supplierIndex" class>网站首页</el-menu-item>
      <el-menu-item index="/bidFunMessage">招标公告</el-menu-item>
      <el-menu-item index="/bidWinMessage">中标公告</el-menu-item>
    </el-menu>
    <div class="userInfo" v-if="userInfo.SUPPLIER_NAME">
      <span>欢迎，{{userInfo.SUPPLIER_NAME}}</span>
      <el-button
      size="mini"
          @click="supplierLogout"
          style="display: inline-block;float: right;margin-left:12px;margin-top:24px;"
          type="primary"
        >退出登录</el-button>
    </div>
  </header>
</template>

<script>
import Vue from "vue";
import base from "../api/base";
export default Vue.component("supplier-header", {
  props: {
    loginSucc: {
      type: Boolean,
      default: false
    }
  },
  watch: {
      loginSucc(newVal, oldVal){
          if(newVal){
              this.userInfo = JSON.parse(sessionStorage.getItem("supplierLoginInfo"));
          }
      }
  },
  data() {
    return {
      userInfo: {}
    };
  },
  mounted() {
    if (sessionStorage.getItem("supplierLoginInfo")) {
      this.userInfo = JSON.parse(sessionStorage.getItem("supplierLoginInfo"));
    } else {
      this.userInfo = {};
    }
  },
  methods: {
    handleSelect(e) {
      var t = new Date().getTime();
      var path = e + "?t=" + t;
      this.$router.push({ path: path });
    },
    
    supplierLogout() {
      sessionStorage.removeItem("supplierLoginInfo");
      this.$router.push({
        path: "/supplierIndex"
      });
    },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  width: 1170px;
  margin: 0 auto;
  height: 80px;
}
.logo {
  float: left;
  margin-left: 20px;
}
.el-menu-demo {
  float: left;
  height: 80px;
  line-height: 80px;
  margin-left: 110px;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item {
  height: 80px;
  line-height: 80px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #cf001b;
  background: none;
  color: #3e3e3e !important;
}.userInfo{
  float: right;
  line-height: 80px;
}
.userInfo span{
  font-size: 14px;
}
</style>
