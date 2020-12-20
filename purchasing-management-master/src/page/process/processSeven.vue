<template>
  <div>
    <bidInfo-title :bidInfo="bidInfo"></bidInfo-title>
    <h3>开技术标信息</h3>
    <el-table :data="ReturnList" size="mini" border style="width: 100%">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
      <el-table-column align="left" show-overflow-tooltip prop="supplierName" label="供方名称"></el-table-column>
      <el-table-column align="center" label="技术标附件">
        <template slot-scope="scope">
          <div v-if="scope.row.technologyFileCode">
            <a :href="scope.row.technologyFileUrl" target="_blank">下载附件</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商务标附件">
        <template slot-scope="scope">
          <span v-if="scope.row.businessFileCode">已上传</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createdDate" label="开标时间">
        <template slot-scope="scope">
          <span>{{createdDateFn(scope.row.createdDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="tenderStatus" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.tenderScheduleStatus == 'openEvaluationTechnical'">启动评技术标</span>
          <span v-if="scope.row.tenderScheduleStatus == 'tenderCompleteOpenTechnical'">完成开技术标</span>
          <span v-if="scope.row.tenderScheduleStatus == 'tenderOpenTechnical'">开技术标</span>
          <span v-if="scope.row.tenderScheduleStatus == 'tenderOverReturn'">完成回标</span>
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div style="text-align: center">
      <el-button size="mini" :disabled="ifAlready" type="primary" @click="loseBid">流标</el-button>
      <el-button size="mini" @click="cancelFn">关闭</el-button>
      <el-button
        size="mini"
        :disabled="ifAlready"
        type="primary"
        @click="completeOpenTechnical"
      >完成开技术标</el-button>
    </div>
  </div>
</template>
<script type="text/babel">
import Vue from "vue";
export default Vue.component("process-seven", {
  data() {
    return {
      sso_sessionid: this.$store.state.sso_sessionid,
      ReturnList: [],
      tenderFileCode: "",
      ifAlready: false,
      bidInfo: {
        tenderName: "",
        tenderNumber: ""
      }
    };
  },
  mounted() {
    this.tenderFileCode = this.$route.query.tenderFileCode;
    if (this.$route.query.already == "tenderCompleteOpenTechnical" || this.$route.query.already == "tenderLost") {
      this.ifAlready = true;
    } else {
      this.ifAlready = false;
    }
    if (this.$route.query.ifProcess) {
      this.ifAlready = true;
    }
    this.bidInfo.tenderNumber = this.$route.query.tenderNumber;
    this.bidInfo.tenderName = this.$route.query.tenderName;
    this.openTechnical();
  },
  beforeDestroy() {
    sessionStorage.removeItem("openTechnical");
  },
  methods: {
    // 获取列表
    openTechnical() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular.openTechnical(this.sso_sessionid, params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.ReturnList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },
    createdDateFn(val) {
      return this.commonFn.formatDate(val);
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
        .tenderLoseByOpenTechnical(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success("流标完成！");;
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
    // 完成
    completeOpenTechnical() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.ifAlready = true;
      this.$api.modular
        .completeOpenTechnical(this.sso_sessionid, params)
        .then(res => {
          this.ifAlready = false;
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success("完成开技术标！");
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
    }
  }
});
</script>
<style>
</style>
