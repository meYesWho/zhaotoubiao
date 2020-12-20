<template>
  <div class="rightArea">
    <div class="mengceng" v-if="mengcengShow" @click="resetListBtn"></div>
    <h1>中标审定</h1>
    <search-form ref="searchForms" @searchFormFn="searchFormFn"></search-form>
    <div class="groupBtn">
      <el-button
        v-if="hasQx('aph2_tender_ZBSD-QX-C19')"
        size="mini"
        type="primary"
        @click="searchListBtn"
      >查询</el-button>
      <el-button
        v-if="hasQx('aph2_tender_ZBSD-QX-C19')"
        size="mini"
        type="primary"
        @click="resetListBtn"
      >重置</el-button>
      <el-button
        v-if="hasQx('aph2_tender_ZBSD-QX-C23')"
        size="mini"
        type="primary"
        @click="winBidFn"
      >中标审定</el-button>
      <el-button
        v-if="hasQx('aph2_tender_ZBSD-QX-C47')"
        size="mini"
        type="primary"
        @click="winBidReportFn"
      >发布中标公告</el-button>
      <el-button
        v-if="hasQx('aph2_tender_ZBSD-QX-C71')"
        size="mini"
        type="primary"
        @click="cancelWinBidReportFn"
      >取消发布中标公告</el-button>
    </div>
    <div class="sqlist">
      <el-table
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        :data="winBidList"
        border
        size="mini"
        tooltip-effect="dark"
        style="width: 98%; margin: 0 auto; overflow: inherit;"
        @selection-change="tableSearchFn"
        :cell-class-name="hoverClassFn"
      >
        <el-table-column align="center" type="selection" width="50"></el-table-column>
        <el-table-column label="序号" width="50" type="index" align="center"></el-table-column>
        <el-table-column prop="commName" label="业务单元" show-overflow-tooltip></el-table-column>
        <el-table-column label="审定状态" align="center" width="100px">
          <template slot-scope="scope">
            <el-button type="default" size="mini" v-if="!scope.row.approveStatus">未起件</el-button>
            <button
              class="btnClass btnClass_bjz"
              type="default"
              size="mini"
              v-if="scope.row.statusDesc == '编制中'"
              slot="reference"
            >{{scope.row.statusDesc}}</button>
            <button
              class="btnClass btnClass_yzz"
              type="default"
              size="mini"
              v-if="scope.row.statusDesc == '已终止'"
              slot="reference"
            >{{scope.row.statusDesc}}</button>
            <button
              class="btnClass btnClass_yth"
              size="mini"
              v-if="scope.row.statusDesc == '已退回'"
              slot="reference"
            >{{scope.row.statusDesc}}</button>
            <button
              class="btnClass btnClass_spz"
              type="default"
              size="mini"
              v-if="scope.row.statusDesc == '审批中'"
              slot="reference"
            >{{scope.row.statusDesc}}</button>
            <button
              class="btnClass btnClass_yqh"
              type="default"
              size="mini"
              v-if="scope.row.statusDesc == '已取回'"
              slot="reference"
            >{{scope.row.statusDesc}}</button>
            <button
              class="btnClass btnClass_ytg"
              type="success"
              size="mini"
              v-if="scope.row.statusDesc == '已通过'"
              slot="reference"
            >{{scope.row.statusDesc}}</button>
            <div class="el_Popver">
              <div class="popoverClass">
                <div class="jtCss"></div>
                <div class="clickClass">
                  <span style="float:left;">审定：</span>
                  <p style="margin-left: 40px; margin-top: -17px;" @click="numberClick(scope.row)">{{scope.row.approveNumber}}</p>
                </div>
                <span>加急：{{scope.row.approveUrgent == "Y" ? '是' : '否'}}</span>
                <span>状态：【{{scope.row.statusDesc}}】</span>
                <div class="lineDiv"></div>
                <span class="h" style="width:100%;">当前审批人：{{scope.row.assigneeName}}</span>
                <span class="h">下一审批环节：{{scope.row.nextTaskName}}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="tenderName" label="招标项目名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tenderNumber" label="招标编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contractDemand" label="招标范围" width="100">
        <template slot-scope="scope">
          <p v-if="scope.row.contractDemand.length<6">{{scope.row.contractDemand}}</p>
          <el-popover
           v-if="scope.row.contractDemand.length>5"
            placement="top"
            popper-class="fw"
            trigger="hover"
            :content="scope.row.contractDemand">
            <p style="width:100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
              slot="reference"
            >{{scope.row.contractDemand}}</p>
          </el-popover>
        </template>
      </el-table-column>
        <el-table-column label="招标方式">
          <template slot-scope="scope">
            <span v-if="scope.row.tenderType == '1'">战略直委</span>
            <span v-if="scope.row.tenderType == '2'">非战略直委</span>
            <span v-if="scope.row.tenderType == '3'">议标</span>
            <span v-if="scope.row.tenderType == '4'">邀请招标</span>
          </template>
        </el-table-column>
        <el-table-column label="招标状态">
          <template slot-scope="scope">
            <div v-if="scope.row.tenderFileStatus == 'lost'">
              
              <span v-if="scope.row.tenderScheduleStatus == 'tenderCompiledReportSubmit'">综合评标报告提交(流标)</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderWinTemporary'">中标审定暂存(流标)</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderFileApprovePASS'">招标文件审定完成(流标)</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderWinApproveSubmit'">中标审定中(流标)</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderWinApproveSTOP'">中标审定退回(流标)</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderWinApproveBACK'">中标审定终止(流标)</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderWinPublishSubmit'">中标公告发布(流标)</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderLost'">流标</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderWinApprovePASS'">中标审定完成(流标)</span>
              <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderWinApprovePASS'">中标审定完成(流标)</span>
            
            </div>
            <div v-if="scope.row.tenderFileStatus != 'lost'">
              <span v-if="scope.row.tenderScheduleStatus == 'tenderCompiledReportSubmit'">综合评标报告提交</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderWinTemporary'">中标审定暂存</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderFileApprovePASS'">招标文件审定完成</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderWinApproveSubmit'">中标审定中</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderWinApproveSTOP'">中标审定退回</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderWinApproveBACK'">中标审定终止</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderWinPublishSubmit'">中标公告发布</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderLost'">流标</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderWinApprovePASS'">中标审定完成</span>
              <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderWinApprovePASS'">中标审定完成</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog align="center" title="发布中标公示" width="800px" :visible.sync="tenderWinPublishShow">
      <el-row type="flex" class="GSrow">
        <el-col class="titleCol" :span="5">招标名称：</el-col>
        <el-col :span="7">{{winBidFabu.tenderName}}</el-col>
        <el-col class="titleCol" :span="5">中标单位：</el-col>
        <el-col :span="7">{{winBidFabu.supplierName}}</el-col>
      </el-row>
      <el-row type="flex" class="GSrow">
        <el-col class="titleCol" :span="5">项目地点：</el-col>
        <el-col :span="7">{{winBidFabu.tenderProjectAddress}}</el-col>
        <el-col class="titleCol" :span="5">中标范围：</el-col>
        <el-col :span="7">{{winBidFabu.tenderFileRange}}</el-col>
      </el-row>
      <el-row type="flex" class="GSrow">
        <el-col class="titleCol" :span="5">中标时间：</el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="winBidGsDate"
            type="date"
            style="width: 94%"
            size="mini"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <el-col class="titleCol" :span="5">招标人：</el-col>
        <el-col :span="7">{{winBidFabu.tenderFileTenderer}}</el-col>
      </el-row>
      <el-row type="flex" class="GSrow">
        <el-col class="titleCol" :span="5">评标委员会名单：</el-col>
        <el-col :span="7">{{winBidFabu.economicMemberStr}}</el-col>
        <el-col class="titleCol" :span="5">中标监督电话：</el-col>
        <el-col :span="7">{{winBidFabu.antiFraudPhone}}</el-col>
      </el-row>
      <!-- <div>
        <el-checkbox style="float:left; margin-top: 10px;" v-model="noWinThanks">发送未中标感谢信</el-checkbox>
      </div>-->
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelFn">关闭</el-button>
        <el-button size="mini" type="primary" @click="saveThanks">发送未中标感谢信</el-button>
        <el-button size="mini" type="primary" @click="changeDate">修改中标时间</el-button>
        <el-button size="mini" type="primary" @click="saveWin">发布公告</el-button>
      </div>
    </el-dialog>
    <pagination-z :total="total" :fromWhere="fromWhere" @fatherMethod="fatherMethod"></pagination-z>
  </div>
</template>

<script>
import base from "@/api/base";
export default {
  data() {
    return {
      winBidData: {
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commCode: "", // 业务单元
        page: 1,
        size: 10
      },
      winBidList: [],
      fromWhere: "bidReport",
      sso_sessionid: this.$store.state.sso_sessionid,
      total: 0,
      selectList: [],
      tenderWinPublishShow: false,
      noWinThanks: false,
      winBidGsDate: "",
      winBidFabu: {},
      mengcengShow: false
    };
  },
  mounted() {
    this.getWinByTender(this.winBidData);
  },
  methods: {
    hoverClassFn(row) {
      if (row.columnIndex == 3) {
        return "hoverClass";
      } else {
        return "";
      }
    },
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    // 搜索表单回调
    searchFormFn(obj) {
      Object.assign(this.winBidData, obj);
    },
    //  表格勾选事件
    tableSearchFn(v) {
      this.selectList = v;
    },
    toApproval(row) {
      var params = {
        approveHeadCode: row.tenderWinCode,
        approveRequestCode: "50013E",
        approveTitle: "关于" + row.tenderName + "进行中标审定",
        approveContent:
          "依据《成本预算和集中/专项采购执行单》招标计划，现申请对" +
          row.tenderName +
          "50013E" +
          "招标进行中标审定"
      };
      this.$api.modular
        .approveByTenderCandidate(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            this.mengcengShow = true;
            window.open(res.data);
          }
        });
    },
    // 分页回调函数
    fatherMethod(page, size) {
      this.winBidData.page = page;
      this.winBidData.size = size;
      this.getWinByTender(this.winBidData);
    },
    // 查询按钮
    searchListBtn() {
      this.winBidData.page = 1;
      this.getWinByTender(this.winBidData);
    },
    //  重置
    resetListBtn() {
      this.winBidData = {
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commCode: "", // 业务单元
        page: 1,
        size: 10
      };
      this.$refs.searchForms.resetFn();
      this.mengcengShow = false;
      this.getWinByTender(this.winBidData);
    },
    // 查询
    getWinByTender(params) {
      this.$api.modular
        .getWinByTender(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.winBidList = res.data.data;
              this.total = Number(res.data.count);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {});
    },

    // 中标审定
    winBidFn() {
      if (this.selectList.length != 1) {
        this.$message.error("请选择单个项目");
        return false;
      }
      var params = {
        tenderFileCode: this.selectList[0].tenderFileCode
      };
      this.$api.modular.getScheduleMax(this.sso_sessionid, params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            if (res.data.data.length > 0) {
              var num = res.data.data[0].TENDER_ROW_NUM;
              var status = res.data.data[0].TENDER_SCHEDULE_STATUS;
              if (num > 5) {
                num = num - 1;
              }

              if (
                this.selectList[0].tenderType == 1 ||
                this.selectList[0].tenderType == 2
              ) {
                var href = this.commonFn.zwRouterProcess(
                  this.selectList,
                  11,
                  this,
                  "",
                  "",
                  "",
                  num,
                  status
                );
              } else {
                var href = this.commonFn.routerProcess(
                  this.selectList,
                  11,
                  this,
                  "",
                  "",
                  "",
                  num,
                  status
                );
              }
              var winObj = window.open(href, "_blank");
              var loop = setInterval(() => {
                if (winObj.closed) {
                  clearInterval(loop);
                  // this.resetListBtn();
                  this.getWinByTender(this.winBidData);
                }
              }, 1000);
            } else {
              this.$message.error(res.data.message);
              return false;
            }
          } else {
            this.$message.error(res.data.message);
            return false;
          }
        } else {
          this.$message.error(res.message);
          return false;
        }
      });
      // this.commonFn.routerProcess(this.selectList, 11, this);
    },
    numberClick(row) {
      var url = base.approveUrl + row.approveCode;
      window.open(url);
    },
    async cancelWinBidReportFn() {
      if (this.selectList.length != 1) {
        this.$message.error("请选择一个中标文件！");
        return false;
      }
      if (this.selectList[0].approveStatus != "PASS") {
        this.$message.error("请审定完成后再进行发布！");
        return false;
      }
      this.$confirm("确认发起审定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.cancelPrport();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    cancelPrport() {
      var params = {
        tenderWinCode: this.selectList[0].tenderWinCode,
        tenderFileCode: this.selectList[0].tenderFileCode
      };
      this.$api.modular
        .cancelTenderWinPublish(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success("取消成功！");
              this.getWinByTender(this.winBidData);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    // 发布中标公告
    winBidReportFn() {
      if (this.selectList.length != 1) {
        this.$message.error("请选择一个中标文件！");
        return false;
      }
      if (this.selectList[0].approveStatus != "PASS") {
        this.$message.error("请审定完成后再进行发布！");
        return false;
      }
      this.tenderWinPublishShow = true;
      var params = {
        tenderWinCode: this.selectList[0].tenderWinCode,
        tenderFileCode: this.selectList[0].tenderFileCode
      };
      this.$api.modular
        .getTenderWinPublish(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.winBidFabu = res.data.data[0];
              this.economicMember();
              if (this.winBidFabu.tenderWinDate) {
                this.winBidGsDate = this.commonFn.formatDate(
                  this.winBidFabu.tenderWinDate
                );
              } else {
                this.winBidGsDate = "";
              }
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    economicMember() {
      if (this.winBidFabu.economicMember) {
        var arr = this.winBidFabu.economicMember.split(",");
        var arr2 = [];
        for (var i = 0; i < arr.length; i++) {
          var a = arr[i].split(":");
          arr2.push(a[2]);
        }
        var str = arr2.join(",");
        this.winBidFabu.economicMemberStr = str;
      } else {
        this.winBidFabu.economicMemberStr = "";
      }
    },
    saveThanks() {
      var params = {
        tenderFileCode: this.winBidFabu.tenderFileCode,
        tenderCandidateLineCodeWin: this.winBidFabu.tenderCandidateLineCode,
        tenderName: this.winBidFabu.tenderName,
        noticeContent: this.winBidFabu.tenderName
      };
      this.$api.modular.saveNoticeAll(this.sso_sessionid, params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.$message.success("发送成功！");
          } else {
            this.$message.error(res.data.message);
            return false;
          }
        } else {
          this.$message.error(res.message);
          return false;
        }
      });
    },
    changeDate() {
      var params = {
        tenderWinCode: this.selectList[0].tenderWinCode,
        tenderWinDate: this.winBidGsDate
      };
      this.$api.modular.updateWinDate(this.sso_sessionid, params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.$message.success("修改成功！");
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },
    saveWin() {
      var params = {
        tenderWinCode: this.selectList[0].tenderWinCode,
        tenderFileCode: this.selectList[0].tenderFileCode,
        tenderWinDate: this.winBidGsDate
      };
      this.$api.modular
        .submitTenderWinPublish(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success("发送成功！");
              this.tenderWinPublishShow = false;
              this.getWinByTender(this.winBidData);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    cancelFn() {
      this.tenderWinPublishShow = false;
    }
  }
};
</script>

<style scoped>
.fileSearch {
  text-align: left;
  margin-bottom: 20px;
}
.fileSearch .el-form-item {
  width: 32%;
  margin-bottom: 0;
  margin-top: 15px;
  margin-left: 20px;
}
.groupBtn {
  text-align: right;
  padding-right: 1%;
  margin-bottom: 20px;
}
.GSrow {
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
  border-top: none;
}
.el-dialog__body .GSrow:first-child {
  border-top: 1px solid #ccc;
}
.GSrow .el-col {
  border-left: 1px solid #ccc;
  text-align: left;
  line-height: 20px;
  padding: 6px 0;
  padding-left: 10px;
}
.GSrow .el-col.titleCol {
  text-align: right;
  padding-left: 0;
}
.GSrow .el-col:first-child {
  border-left: none;
}
.popoverClass {
  width: auto;
}
.popoverClass span {
  font-size: 12px;
  color: #666;
  line-height: 20px;
  display: block;
}
.popoverClass span.h {
  color: #999;
}
.popoverClass .clickClass {
  height: 20px;
  background: none;
  line-height: 1;
  margin: 0;
}
.clickClass span {
  display: inline-block;
}
.clickClass .el-button--text {
  margin: 0;
  padding: 0;
  width: 190px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
<style>
.sqlist .el-table .hoverClass .cell {
  position: relative;
  overflow: inherit;
}
.el_Popver {
  min-width: 240px;
  position: absolute;
  top: -50px;
  left: 92%;
  z-index: 2007;
  background: #fff;
  border: 1px solid #ebeef5;
  padding: 10px;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  word-break: break-all;
  display: none;
}
.sqlist .popoverClass .clickClass {
  height: 20px;
  background: none;
  line-height: 1;
  margin: 0;
}
.sqlist .clickClass span {
  display: inline-block;
}
.sqlist .clickClass p:hover {
  cursor: pointer;
}
.sqlist .clickClass p {
  margin: 0;
  padding: 0;
  width: auto;
  overflow: hidden;
  white-space: nowrap;
  line-height: 20px;
  text-overflow: ellipsis;
  color: #1e88e5;
  float: left;
}
.sqlist .hoverClass button:hover {
  cursor: pointer;
}
.sqlist .hoverClass .cell:hover .btnClass+.el_Popver {
  display: block;
}
.sqlist .el-table__body-wrapper {
  overflow: inherit;
}
.jtCss {
  margin-left: -23px;
  margin-top: 44px;
  float: left;
  width: 0 !important;
  height: 0 !important;
  border-width: 6px;
  border-style: solid;
  border-color: transparent #fff transparent transparent;
  background: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.popoverClass div.lineDiv {
  width: 100%;
  height: 1px;
  background: #999;
  margin: 6px 0;
}
</style>
