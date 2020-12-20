<template>
  <div class="sidebar">
    <el-button
      style="margin-left: 18px;"
      @click="changeLabel"
      :label="isCollapse"
      type="text"
    >{{isCollapse? '展开' : '收起'}}</el-button>
    <el-menu
      :default-active="$route.path"
      active-text-color="#cb1235"
      class="el-menu-vertical-demo"
      @select="clickMenu"
      :collapse="isCollapse"
    >
      <el-menu-item index="/ProcurementGroupHome" v-if="hasQx('aph2_tender_ZXCGXZ-QX-M10')">
        <i class="el-icon-menu"></i>
        <span slot="title">添加专项采购小组</span>
      </el-menu-item>
      <el-menu-item index="/ExecutionSheetHome" v-if="hasQx('aph2_tender_CGZXDZD-QX-M10')">
        <i class="el-icon-menu"></i>
        <span slot="title" style="    line-height: 16px;
    height: 14px;
    display: inline-block;
    margin-top: -14px;">成本预算和集中/专<br>项采购执行单制定</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">招标处理</span>
        </template>
        <el-menu-item index="/documentApprovalHome" v-if="hasQx('aph2_tender_ZBWJSD-QX-M10')">
          <i class="el-icon-menu"></i>
          <span slot="title">招标文件审定</span>
        </el-menu-item>
        <el-menu-item index="/candidateHome" v-if="hasQx('aph2_tender_ZBHXRSD-QX-M10')">
          <i class="el-icon-menu"></i>
          <span slot="title">投标候选人审定</span>
        </el-menu-item>
        <el-menu-item index="/guaranteeAmount" v-if="hasQx('aph2_tender_BZJJNQR-QX-M10')">
          <i class="el-icon-menu"></i>
          <span slot="title">保证金缴纳确认</span>
        </el-menu-item>
        <el-menu-item index="/bidIssuing" v-if="hasQx('aph2_tender_FCZBWJ-QX-M10')">
          <i class="el-icon-menu"></i>
          <span slot="title">发出招标文件</span>
        </el-menu-item>
        <el-menu-item index="/Answering" v-if="hasQx('aph2_tender_ZBWJDY-QX-M10')">
          <i class="el-icon-menu"></i>
          <span slot="title">招标文件答疑</span>
        </el-menu-item>
        <el-menu-item index="/returnBid" v-if="hasQx('aph2_tender_ZTBHB-QX-M10')">
          <i class="el-icon-menu"></i>
          <span slot="title">回标</span>
        </el-menu-item>
        <el-menu-item index="/technicalBid" v-if="hasQx('aph2_tender_KJSB-QX-M10')">
          <i class="el-icon-menu"></i>
          <span slot="title">开技术标</span>
        </el-menu-item>
        <el-menu-item index="/technicalBid2" v-if="hasQx('aph2_tender_PJSB-QX-M10')">
          <i class="el-icon-menu"></i>
          <span slot="title">评技术标</span>
        </el-menu-item>
        <el-menu-item index="/businessBid" v-if="hasQx('aph2_tender_KSWB-QX-M10')">
          <i class="el-icon-menu"></i>
          <span slot="title">开商务标</span>
        </el-menu-item>
        <el-menu-item index="/businessBid2" v-if="hasQx('aph2_tender_PSWB-QX-M10')">
          <i class="el-icon-menu"></i>
          <span slot="title">评商务标</span>
        </el-menu-item>
        <el-menu-item index="/bidReport" v-if="hasQx('aph2_tender_ZHPGBG-QX-M10')">
          <i class="el-icon-menu"></i>
          <span slot="title">综合评标报告</span>
        </el-menu-item>
        <el-menu-item index="/winBidApproval" v-if="hasQx('aph2_tender_ZBSD-QX-M10')">
          <i class="el-icon-menu"></i>
          <span slot="title">中标审定</span>
        </el-menu-item>
      </el-submenu>

      <!-- <el-menu-item index="/supplierLogin">
        <i class="el-icon-menu"></i>
        <span slot="title">供应商登录</span>
      </el-menu-item>
      <el-menu-item index="/startBid">
        <i class="el-icon-menu"></i>
        <span slot="title">投标</span>
      </el-menu-item>
      -->
      <el-menu-item index="/bidProgressQuery" v-if="hasQx('aph2_tender_ZBJZCX-QX-M10')">
        <i class="el-icon-menu"></i>
        <span slot="title">招标进展查询</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.component("side-bar", {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      path: ""
      // isCollapse: false,
    };
  },
  methods: {
    clickMenu(e) {
      if(this.$route.path == e){
        this.$router.push({ path: '/demo2'});
        setTimeout(() => {
          this.$router.push({ path: e });
        },50)
      } else {
        this.$router.push({ path: e });
      }
    },
    changeLabel() {
      this.$emit("closeSidebar");
    },
    hasQx(value){
      if(!this.$store.state.userInfo) return false;
      var userInfo = JSON.parse(this.$store.state.userInfo);
        var a = 0;
        for(var i = 0; i<userInfo.permissionList.length; i++){
          if(value == userInfo.permissionList[i]){
            a++;
            break;
          } else {
            a = 0;
          }
        }
        if(a>0){
          return true;
        } else {
          return false;
        }
    },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.sidebar {
  width: 100%;
  /* min-width: 200px; */
  height: 100%;
  background: #263238;
  text-align: left;
}
.sidebar .el-menu {
  border-right: none;
  background: #263238;
}
.sidebar .el-menu--collapse {
  width: auto;
}
.el-menu-item {
  color: rgba(255, 255, 255, 0.75);
}
.el-menu-item:hover {
  color: #fff;
  background: rgb(24, 31, 35);
  /* background: #c7000b; */
}
.el-menu-item.is-active {
  color: #fff !important;
  background: #c7000b;
}
.el-menu-item:focus {
  color: #fff !important;
  background: #c7000b;
}
.el-submenu__title{
  color: rgba(255, 255, 255, 0.75);
}
.el-submenu.is-active .el-submenu__title{
  color: #fff !important;
  background: #c7000b;
}
.el-submenu.is-active .el-submenu__title{
      border-bottom-color: #fff;
}
.el-submenu__title:hover{
  color: #fff;
  background: rgb(24, 31, 35);
}
.el-menu--vertical{
  /* background: #263238; */
}
.el-menu--vertical .el-menu-item:hover{
  color: #fff;
}
.el-menu--vertical .el-menu-item{
  color: #000;
}
/* .sidebar .el-tooltip{
  text-align: center;
  padding: 0!important;
} */
</style>
