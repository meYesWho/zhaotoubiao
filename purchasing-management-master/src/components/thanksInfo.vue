<template>
  <el-dialog
      title="感谢信"
      :visible.sync="thanksInfo.isShow"
      width="600px"
      top="2vh"
      append-to-body
      @close="cancelFn"
      close-on-click-modal
      show-close
    >
    <div class="title">
      <p>致：<span>{{thanksInfo.supplierName}}</span></p>
    </div>
    <div class="main">
      <p>我司组织的<span>{{thanksInfo.tenderName}}</span>招投标工作，现已完成定标事宜，感谢贵司的积极参与及配合支持。贵司可申请办理投标保证金的退款事宜。</p>
      <p>希望在下一次招投标活动中再次合作，谢谢！</p>
      <div class="zhuyi">
        <span>退款事宜，需提供如下资料：</span>
        <span>1、投标保证金收据原件</span>
        <span>2、退款账号信息盖章原件（包括公司全称、开户行名称、开户行账号）</span>
      </div>
    </div>
    <div class="footer">
      <span>第一资产五个三工作中心</span>
      <span>签发<span>{{thanksInfo.supplierName}}</span></span>
      <span>{{date[0]}}年{{date[1]}}月{{date[2]}}日</span>
    </div>
    <div style="clear: both;"></div>
    </el-dialog>
</template>

<script>
import Vue from "vue";
export default Vue.component("thanks-info", {
  props: {
    thanksInfo: {
      type: Object,
      default: {
        isShow: false,
        tenderName: '',
        date: '',
      }
    }
  },
  data() {
    return {
      date: []
    };
  },
  mounted() {
    this.date = this.thanksInfo.date.split('-');
  },
  methods: {
    cancelFn(){
      this.thanksInfo.isShow = false;
    },
  }
});
</script>
<style scoped>
.title{
  border-bottom: 1px solid #999;
  float: left;
}
.title p{
  line-height: 1;
  padding: 0;
  margin: 2px;
}
.title span{
  color: red;
}
.main{
  width: 100%;
  float: left;
}
.main p{
  text-indent: 28px;
  margin: 0;
  line-height: 24px;
}
.main p:first-child{
  margin-top: 26px;
}
.main p span{
  border-bottom: 1px solid #999;
  padding: 0 8px;
  color: red;
}
.zhuyi{
  margin-top: 10px;
}
.zhuyi span{
  display: block;
  line-height: 28px;
  text-indent: 28px;
}
.footer{
  float: left;
  margin-left: 60%;
  margin-top: 30px;
}
.footer span{
  display: block;
  line-height: 26px;
}
.footer span span{
  border-bottom: 1px solid #999;
  padding: 0 8px;
  color: red;
  display: inline-block;
}
</style>
