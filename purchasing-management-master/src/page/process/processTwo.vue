<template>
  <div style="padding: 0 15px;">
    <div class="processTwo2">
      <bidInfo-title :bidInfo="bidInfo"></bidInfo-title>
      <!-- <h3>招标项目信息</h3>
      <div>
        <el-form label-position="right" size="mini" label-width="150px">
          <el-row class="base-form">
            <el-col :span="9">
              <el-form-item label="招标编号：">
                <span style="margin-left: 10px;width: 50%">{{processTwoInfo.tenderNumber}}</span>
              </el-form-item>
            </el-col>

            <el-col :span="15">
              <el-form-item label="招标项目：">
                <span style="margin-left: 10px;width: 50%">{{processTwoInfo.tenderName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>-->
      <div style="text-align: right;margin: 10px 0;">
        <el-button size="mini" :disabled="isShending" type="primary" @click="increaseSupplier">增加供应商</el-button>
        <el-button size="mini" :disabled="isShending" type="primary" @click="delCandidate">删除</el-button>
      </div>
      <h3 @click="changeTest">选择投标候选人</h3>

      <el-table
        @selection-change="tableSearchFn"
        :data="candidateList"
        size="mini"
        border
        style="width: 100%"
      >
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="supplierName" label="投标单位名称"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="contactPerson" label="联系人"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="telephone" label="联系人方式"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="companyRankName" label="供应商星级"></el-table-column>
      </el-table>
    </div>
    <el-divider></el-divider>
    <div style="text-align: center">
      <el-button size="mini" :disabled="isShending" type="primary" @click="loseBid">流标</el-button>
      <el-button size="mini" @click="cancelFn">关闭</el-button>
      <el-button size="mini" :disabled="isShending" type="primary" @click="saveFn">保存</el-button>
      <el-button size="mini" :disabled="isShending" type="primary" @click="approveFn">投标候选人审定</el-button>
    </div>
    <increase-supplier :supplierData="supplierData" @supplierDataFn="supplierDataFn"></increase-supplier>
  </div>
</template>
<script type="text/babel">
import Vue from "vue";
import { mapGetters } from "vuex";
export default Vue.component("process-two", {
  data() {
    return {
      candidateList: [], // 显示出来的
      candidateList2: [], // 接口返回的
      selectionList: [], // 勾选
      supplierData: {
        isShow: false,
        selectArr: [],
        dataList: []
      },
      processTwoInfo: {},
      candidateLineCode: "",
      isShending: false,
      sso_sessionid: this.$store.state.sso_sessionid,
      bidInfo: {
        tenderName: "",
        tenderNumber: ""
      }
    };
  },
  mounted() {
    this.processTwoInfo = JSON.parse(this.$route.query.obj)[0];
    if (
      this.processTwoInfo.approveStatus == "STOP" ||
      !this.processTwoInfo.approveStatus
    ) {
      this.isShending = false;
    } else {
      this.isShending = true;
    }
    if(this.processTwoInfo.TENDER_SCHEDULE_STATUS == 'tenderCandidateTemporary'
      || this.processTwoInfo.TENDER_SCHEDULE_STATUS == 'CandidateTemporary'
      || this.processTwoInfo.TENDER_SCHEDULE_STATUS == 'tenderBulletinRelease'
      || this.processTwoInfo.TENDER_SCHEDULE_STATUS == 'tenderFileApprovePASS'){
        this.isShending = false;
    } else {
      if(this.processTwoInfo.TENDER_SCHEDULE_STATUS){
        this.isShending = true;
      }
    }
    if(this.$route.query.already == 'tenderLost'){
      this.isShending = true;
    }
    if (this.$route.query.ifProcess) {
      this.isShending = true;
    }
    this.bidInfo.tenderNumber = this.$route.query.tenderNumber;
    this.bidInfo.tenderName = this.$route.query.tenderName;
    this.getCandidateLineList();
  },
  beforeDestroy() {},
  methods: {
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
        tenderFileCode: this.processTwoInfo.tenderFileCode
      };
      this.$api.modular
        .tenderLoseByCandidate(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.isShending = true;
              this.$message.success('流标完成！');
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
    changeTest() {
      this.$store.commit("increment");
      var c = this.$store.getters.testFn;
    },
    // 选择回显
    supplierDataFn(arr) {
      this.candidateList = [];
      this.supplierData.selectArr = arr;
      this.candidateList = arr.concat(this.candidateList2);
    },
    getCandidateLineList() {
      var params = {
        tenderFileCode: this.processTwoInfo.tenderFileCode
      };
      this.$api.modular
        .getCandidateLineList(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.candidateList2 = res.data.data;
              this.supplierData.dataList = res.data.data;
              this.supplierDataFn([]);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    cancelFn() {
      // this.$router.push("/candidateHome");
      window.location.href = "about:blank";
      window.close();
    },
    // 保存按钮
    saveFn() {
      // tenderCandidateHeadSave
      var selectArr1 = this.supplierData.selectArr;
      var selectArr = this.candidateList;
      if (selectArr1.length == 0) {
        this.$message.error("请先增加供应商！");
        return false;
      } else {
        var arr = [];
        for (var i = 0; i < selectArr.length; i++) {
          arr.push(selectArr[i].supplierCode + ":" + selectArr[i].supplierName);
        }
      }
      this.isShending = true;
      var params = {
        supplierCode: arr.toString(),
        tenderFileCode: this.processTwoInfo.tenderFileCode
      };
      this.$api.modular
        .tenderCandidateHeadSave(this.sso_sessionid, params)
        .then(res => {
          this.isShending = false;
          if (res.status == 200) {
            this.processTwoInfo.TenderCandidateHeadCode = res.data.message;
            this.$message.success("暂存成功！");
            this.getCandidateLineList();
          }
        });
    },
    async approveFn() {
      if (this.candidateList.length > 0) {
        var a = 0;
        for (var i = 0; i < this.candidateList.length; i++) {
          if (!this.candidateList[i].tenderFileCode) {
            a++;
          }
        }
        if (a > 0) {
          this.$message.error("请先保存供应商候选人");
          return false;
        } else {
          this.$confirm("确认发起审定?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(async () => {
              await this.approveCandiFn();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
        }
      } else {
        this.$message.error("请先维护供应商候选人！");
        return false;
      }
    },
    approveCandiFn() {
      var params = {
        approveHeadCode: this.processTwoInfo.TenderCandidateHeadCode,
        approveRequestCode: "50013D",
        approveTitle: "关于" + this.processTwoInfo.tenderName + "的投标候选人审定",
        approveContent:
          "依据" +
          this.processTwoInfo.budgetYear.toString().substring(0, 4) +
          "年《成本预算和集中/专项采购执行单》招标计划，现申请对" +
          this.processTwoInfo.tenderName +
          "50013D" +
          "进行投标候选人审定"
      };
      this.$api.modular
        .approveByTenderCandidate(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            setTimeout(() => {
              window.location.href = "about:blank";
              window.close();
            }, 100);
            window.open(res.data);
          }
        });
    },
    // 表格勾选事件
    tableSearchFn(v) {
      this.selectionList = v;
      var arr = [];
      for (var i = 0; i < this.selectionList.length; i++) {
        arr.push("'" + this.selectionList[i].tenderCandidateLineCode + "'");
      }
      this.candidateLineCode = arr.join(",");
    },
    // 增加供应商
    increaseSupplier() {
      this.supplierData.isShow = true;
    },
    // 删除
    async delCandidate() {
      if (this.candidateLineCode == "") {
        this.$message({
          type: "error",
          message: "请选择投标候选人"
        });
      } else {
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            await this.delCandidateFn();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    delCandidateFn() {
      if (
        this.selectionList.length > 0 &&
        this.supplierData.selectArr.length > 0
      ) {
        for (var t = this.supplierData.selectArr.length - 1; t > -1; t--) {
          for (var i = this.selectionList.length - 1; i > -1; i--) {
            if (
              this.selectionList[i].supplierCode ==
              this.supplierData.selectArr[t].supplierCode
            ) {
              if (this.supplierData.selectArr.length > 0) {
                this.supplierData.selectArr.splice(t, 1);
              }
              if (this.selectionList.length > 0) {
                this.selectionList.splice(i, 1);
              }
              break;
            }
          }
        }
      }
      this.supplierDataFn(this.supplierData.selectArr);
      if (this.selectionList.length == 0) {
        this.$message.success("删除成功！");
        return false;
      }
      this.tableSearchFn(this.selectionList);
      var params = {
        candidateLineCode: this.candidateLineCode
      };
      this.$api.modular.delByLineCode(this.sso_sessionid, params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.$message.success("删除成功！");
            this.getCandidateLineList();
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
<style scoped>
</style>
