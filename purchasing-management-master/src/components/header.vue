<template>
  <div class="header">
    <span class="logo">{{msg}}</span>
    <span class="myCenter">
      <el-dropdown trigger="click" @command="handleCommand" szie="mini">
        <span class="el-dropdown-link">
          {{userName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="out">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </div>
</template>

<script>
import Vue from "vue";
import base from '../api/base';
export default Vue.component("page-header", {
  data() {
    return {
      msg: "APH2.0-招投标管理系统",
      userName: ""
    };
  },
  mounted() {
    setTimeout(() => {
      var userInfo = JSON.parse(this.$store.state.userInfo);
      this.userName = userInfo.realName;
    }, 2000);
  },
  methods: {
    handleCommand(command) {
      if(command == 'out'){
        sessionStorage.removeItem('sso_sessionid');
        setTimeout(()=>{
          window.location.href = base.logoutUrlCas;
        }, 40)
        setTimeout(()=>{
          window.open(base.logoutUrl);
        }, 20)
        // window.location.href =  base.logoutUrl;
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  width: 100%;
  min-width: 1200px;
  margin: 0 auto;
  height: 44px;
  background: #37474f;
  border-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.header span {
  font-size: 16px;
  color: #f1f1f1;
  line-height: 44px;
  text-align: left;
  margin-left: 20px;
  float: left;
}

.header .myCenter {
  float: right;
  height: 44px;
  margin-right: 1%;
  cursor: pointer;
}
</style>
