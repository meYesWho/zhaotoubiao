<template>
  <div>
    <bidInfo-title :bidInfo="bidInfo"></bidInfo-title>
    <h3 @click="overReturn">回标信息</h3>
    <el-table :data="ReturnList" size="mini" border style="width: 100%">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
      <el-table-column align="left" show-overflow-tooltip prop="supplierName" label="供方名称"></el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="isSubmit"
        label="是否回标"
        width="180"
      ></el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="tenderDate"
        label="回标时间"
        width="180"
      ></el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="tenderSubmitIp" label="回标IP"></el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="technologyScore"
        label="技术标附件"
        width="180"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.technologyFileCode">已上传</span>
          <span v-if="!scope.row.technologyFileCode">暂无附件</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="businessScore"
        label="商务标附件"
        width="180"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.businessFileCode">已上传</span>
          <span v-if="!scope.row.businessFileCode">暂无附件</span>
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div style="text-align: center">
      <el-button size="mini" :disabled="already" type="primary" @click="loseBid">流标</el-button>
      <el-button size="mini" @click="cancelFn">关闭</el-button>
      <el-button
        :disabled="already"
        size="mini"
        type="primary"
        @click="overReturn"
      >完成回标</el-button>
    </div>
  </div>
</template>
<script type="text/babel">
import Vue from "vue";
export default Vue.component("process-six", {
  data() {
    return {
      sso_sessionid: this.$store.state.sso_sessionid,
      ReturnList: [],
      tenderFileCode: "",
      already: false,
      bidInfo: {
        tenderName: "",
        tenderNumber: ""
      }
    };
  },
  mounted() {
    this.tenderFileCode = this.$route.query.tenderFileCode;
    if (this.$route.query.already == "tenderOverReturn" || this.$route.query.already == "tenderLost") {
      this.already = true;
    } else {
      this.already = false;
    }
    if (this.$route.query.ifProcess) {
      this.already = true;
    }
    this.bidInfo.tenderNumber = this.$route.query.tenderNumber;
    this.bidInfo.tenderName = this.$route.query.tenderName;
    this.getReturnList();
  },
  beforeDestroy() {
    sessionStorage.removeItem("returnBid");
  },
  methods: {
    // 获取列表
    getReturnList() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular.getReturnList(this.sso_sessionid, params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            if (res.data.data.length > 0) {
              for (var i = 0; i < res.data.data.length; i++) {
                res.data.data[i].tenderDate = this.commonFn.formatDate(
                  res.data.data[i].tenderDate
                );
              }
            }
            this.ReturnList = res.data.data;
          }
        }
      });
    },

    // 流标
    async loseBid() {
        this.$confirm("是否确认进行流标?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            await this.loseBidY();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      },
    loseBidY() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular
        .tenderLoseByReturn(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success("流标完成!");;
              setTimeout(() => {
                window.location.href = "about:blank";
                window.close();
              }, 1000);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    cancelFn() {
      window.location.href = "about:blank";
      window.close();
    },
    // 完成回标
    overReturn() {
      var cl = [];
      for(var i=0;i<this.ReturnList.length;i++){
        if(this.ReturnList[i].isSubmit == '否'){
          cl.push("'" + this.ReturnList[i].tenderCLCode + "'");
        }
      }
      var str = cl.join(',');
      // if(str == ''){
      //   this.$message.error('暂无投标信息！');
      //   return false;
      // }
      var params = {
        tenderFileCode: this.tenderFileCode,
        tenderCandidateLineCodeS: str
      };
      this.already = true;
      this.$api.modular.overReturn(this.sso_sessionid, params).then(res => {
      this.already = false;
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            if (res.data.message == "ok") {
              this.$message.success("完成回标!");
              setTimeout(() => {
                window.location.href = "about:blank";
                window.close();
              }, 1000);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },
    tableSearchFn(value) {
      this.selectionList = value;
    }
  }
});
</script>
<style>
</style>
