<template>
  <div style="padding: 20px 15px;background:#fff;">
    <div class="processTwo2">
      <!-- <bidInfo-title :bidInfo="bidInfo"></bidInfo-title> -->
      <h3>投标候选人信息</h3>
      
      <div style="height: 40px;">
        <a class="linkLook" @click="toApprove2">查看招标文件审定信息</a>
        <a class="linkLook" @click="toApprove1">查看执行单审定信息</a>
      </div>
      <el-table
        :data="candidateList"
        size="mini"
        border
        style="width: 100%"
      >
        <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
        <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="supplierName" label="投标单位名称"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="contactPerson" label="联系人"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="telephone" label="联系人方式"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="companyRankName" label="供应商星级"></el-table-column>
      </el-table>
    </div>
 </div>
</template>
<script type="text/babel">
import Vue from "vue";
import base from "@/api/base";
import { mapGetters } from "vuex";
export default ({
  data() {
    return {
      candidateList: [], // 显示出来的
      processTwoInfo: {},
      tenderApproveCode: '',
      tenderFileApproveCode: '',
    };
  },
  mounted() {
    var urlV = window.location.href;
    var pathS = urlV.indexOf('headCode=');
    if(pathS != -1){
      var headCode = urlV.substring(pathS+9, urlV.length);
    } else {
      this.$message.error('数据有误，请核实后重新进入页面！');
      // var headCode = "cfb9c0a0-efb1-4161-be2b-5273bad15f7a";
    }
    this.getCandidateHeadList(headCode);
  },
  methods: {
    toApprove1(){
      var url = base.approveUrl + this.tenderApproveCode;
      window.open(url);
    },
    toApprove2(){
      var url = base.approveUrl + this.tenderFileApproveCode;
      window.open(url);
    },
    getCandidateHeadList(headCode) {
      var params = {
        headCode: headCode
      };
      this.$api.modular
        .getCandidateHeadList(params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.candidateList = res.data.data.list;
              this.tenderApproveCode = res.data.data.tenderApproveCode;
              this.tenderFileApproveCode = res.data.data.tenderFileApproveCode;
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
  }
});
</script>
<style scoped>

.processTwo2 h3 {
  font-size: 16px;
  text-align: center;
  margin: 0;
  /* margin-bottom: 20px; */
}
.linkLook{
  float: right;
  border: 1px solid #1e88e5;
  background: none;
  font-size: 12px;
  padding: 3px 8px;
  margin-top: 8px;
  border-radius: 4px;
  margin-right: 8px;
  color: #1e88e5;
  text-decoration: none;
}
.linkLook:hover{
  cursor: pointer;
}
</style>
