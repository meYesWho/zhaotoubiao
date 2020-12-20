<template>
  <div>
    <bidInfo-title :bidInfo="bidInfo"></bidInfo-title>
    <h3>发标信息</h3>
    <div class="bidissuing">
      <el-row class="hang" type="flex">
        <el-col :span="4">
          <div class="lie lieTitle">关联招标项</div>
        </el-col>
        <el-col :span="8">
          <div class="lie">{{bidIssuing.tenderProjectName}}</div>
        </el-col>
        <el-col :span="4">
          <div class="lie lieTitle">项目位置</div>
        </el-col>
        <el-col :span="8">
          <div class="lie">{{bidIssuing.tenderProjectAddress}}</div>
        </el-col>
      </el-row>
      <el-row class="hang">
        <el-col :span="4">
          <div class="lie lieTitle">招标内容</div>
        </el-col>
        <el-col :span="8">
          <div class="lie overFlowStyle" :title="bidIssuing.tenderFileRange">{{bidIssuing.tenderFileRange}}</div>
        </el-col>
        <el-col :span="4">
          <div class="lie lieTitle">领取招标文件时间</div>
        </el-col>
        <el-col :span="8">
          <div class="lie">{{formatDate(bidIssuing.receiveFileDate)}}</div>
        </el-col>
      </el-row>
      <el-row class="hang">
        <el-col :span="4">
          <div class="lie lieTitle">提交疑问的时间截止</div>
        </el-col>
        <el-col :span="8">
          <div class="lie">{{formatDate(bidIssuing.submitQuestionEnd)}}</div>
        </el-col>
        <el-col :span="4">
          <div class="lie lieTitle">投标截止时间</div>
        </el-col>
        <el-col :span="8">
          <div class="lie">{{formatDate(bidIssuing.submitTenderDocumentEnd)}}</div>
        </el-col>
      </el-row>
      <!-- <el-row class="hang">
        <el-col :span="4">
          <div class="lie lieTitle">招标联系人</div>
        </el-col>
        <el-col :span="8">
          <div class="lie">{{bidIssuing.tenderFileTenderer}}</div>
        </el-col>
        <el-col :span="4">
          <div class="lie lieTitle">招标联系电话</div>
        </el-col>
        <el-col :span="8">
          <div class="lie">{{bidIssuing.tendereePhone}}</div>
        </el-col>
      </el-row>
      <el-row class="hang">
        <el-col :span="4">
          <div class="lie lieTitle">电子邮箱</div>
        </el-col>
        <el-col :span="8">
          <div class="lie">{{bidIssuing.tendereeEmail}}</div>
        </el-col>
        <el-col :span="4">
          <div class="lie lieTitle">中标监督电话</div>
        </el-col>
        <el-col :span="8">
          <div class="lie">{{bidIssuing.antiFraudPhone}}</div>
        </el-col>
      </el-row> -->
    </div>
    <div style="text-align: center">
      <el-button size="mini" :disabled="ifAlready" type="primary" @click="loseBid">流标</el-button>
      <el-button size="mini" @click="cancelFn">关闭</el-button>
      <el-button size="mini" type="primary" :disabled="ifAlready" @click="Submission">发布</el-button>
    </div>
  </div>
</template>
<script type="text/babel">
import Vue from "vue";
import base from "@/api/base";
export default Vue.component("process-fore", {
  data() {
    return {
      sso_sessionid: this.$store.state.sso_sessionid,
      bidIssuing: {},
      tenderFileCode: "",
      actionUrl:
        base.uploadUrl + "?sso_sessionid=" + this.$store.state.sso_sessionid,
      ifAlready: false,
      bidInfo: {
        tenderName: "",
        tenderNumber: ""
      }
    };
  },
  mounted() {
    this.tenderFileCode = this.$route.query.tenderFileCode;
    if (this.$route.query.already == "tenderFileRelease" || this.$route.query.already == "tenderLost") {
      this.ifAlready = true;
    } else {
      this.ifAlready = false;
    }
    if (this.$route.query.ifProcess) {
      this.ifAlready = true;
    }
    this.bidInfo.tenderNumber = this.$route.query.tenderNumber;
    this.bidInfo.tenderName = this.$route.query.tenderName;
    this.getTenderFileByCode();
  },
  beforeDestroy() {
    sessionStorage.removeItem("processFore");
  },
  methods: {
    downLoadFn() {
      var url =
        base.downLoadUrlT +
        "?sso_sessionid=" +
        this.sso_sessionid +
        "&tenderFileCode=" +
        this.tenderFileCode;
      window.open(url);
    },
    formatDate(date) {
      return this.commonFn.formatDate(date);
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
        .tenderLoseByRelease(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success("流标完成！");
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
    // 获取列表
    getTenderFileByCode() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular
        .getReleaseByCode(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              if (res.data.data.length > 0) {
                this.bidIssuing = res.data.data[0];
              }
            }
          }
        });
    },

    Submission() {
      this.ifAlready = true;
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular
        .tenderFileOnReport(this.sso_sessionid, params)
        .then(res => {
          this.ifAlready = false;
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success("发布成功！");
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
    }
  }
});
</script>
<style scope>
.bidissuing {
  border: 1px solid #e9e9e9;
  margin-bottom: 20px;
}
.bidissuing .hang {
  border-top: 1px solid #e9e9e9;
  /* height: 40px; */
  line-height: 40px;
}
.bidissuing .hang:first-child {
  border-top: none;
}
.bidissuing .hang .lie {
  border-left: 1px solid #e9e9e9;
  text-align: left;
  height: 100%;
  padding-left: 15px;
}
.bidissuing .hang .el-col:first-child .lie {
  border-left: none;
}
.bidissuing .hang .lieTitle {
  text-align: right;
  padding-right: 12px;
  height: 100%;
}
.el-upload-list {
  float: left;
}
.overFlowStyle{
  width: 94%;
  height: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  /* display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; */
  /* line-height: 20px; */
}
</style>
