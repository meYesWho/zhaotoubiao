<template>
  <div class="rightArea">
    <h1>投标候选人审定</h1>
    <search-form ref="searchForms" @searchFormFn="searchFormFn"></search-form>
    <div class="groupBtn">
      <el-button
        v-if="hasQx('aph2_tender_ZBHXRSD-QX-C19')"
        size="mini"
        type="primary"
        @click="searchListBtn"
      >查询</el-button>
      <el-button
        v-if="hasQx('aph2_tender_ZBHXRSD-QX-C19')"
        size="mini"
        type="primary"
        @click="resetListBtn"
      >重置</el-button>
      <el-button
        v-if="hasQx('aph2_tender_ZBHXRSD-QX-C14')"
        size="mini"
        type="primary"
        @click="whCandidate"
      >维护投标候选人</el-button>
      <el-button
        v-if="hasQx('aph2_tender_ZBHXRSD-QX-C23')"
        size="mini"
        type="primary"
        @click="approveCandi"
      >投标候选人审定</el-button>
    </div>
    <div class="sqlist">
      <el-table
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        :data="candidateList"
        border
        size="mini"
        tooltip-effect="dark"
        style="width: 98%; margin: 0 auto;overflow: inherit;"
        @selection-change="tableSearchFn"
        :row-class-name="tableRowClassName"
        :cell-class-name="hoverClassFn"
      >
        <!-- :selectable="selectInit" -->
        <el-table-column align="center" type="selection" width="50"></el-table-column>
        <el-table-column label="序号" width="50" type="index" align="center"></el-table-column>
        <el-table-column prop="commName" show-overflow-tooltip label="业务单元" width="220"></el-table-column>
        <el-table-column label="审定状态" align="center" width="100px">
          <template slot-scope="scope">
            <el-button type="default" size="mini" v-if="!scope.row.statusDesc">未起件</el-button>
            <button
              class="btnClass btnClass_bjz"
              type="default"
              size="mini"
              v-if="scope.row.statusDesc == '编制中'"
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
              class="btnClass btnClass_yzz"
              type="default"
              size="mini"
              v-if="scope.row.statusDesc == '已终止'"
              slot="reference"
            >{{scope.row.statusDesc}}</button>
            <button
              class="btnClass btnClass_yth"
              type="default"
              size="mini"
              v-if="scope.row.statusDesc == '已退回'"
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
                <div class="clickClass" style="display: block;">
                  <span style="float:left;">审定：</span>
                  <p
                    style="margin-left: 40px; margin-top: -17px;"
                    @click="numberClick(scope.row)"
                  >{{scope.row.approveNumber}}</p>
                </div>
                <span style="display: block;">加急：{{scope.row.approveUrgent == "Y" ? '是' : '否'}}</span>
                <span style="display: block;">状态：【{{scope.row.statusDesc}}】</span>
                <div class="lineDiv"></div>
                <span style="display: block;" class="h">当前审批人：{{scope.row.assigneeName}}</span>
                <span style="display: block;" class="h">下一审批环节：{{scope.row.nextTaskName}}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="tenderName" label="招标项目名称"></el-table-column>
        <el-table-column prop="tenderNumber" label="招标编号" show-overflow-tooltip width="180"></el-table-column>
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
        <el-table-column prop="confirmStatus" label="招标状态" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.tenderFileStatus == 'lost'">
              <span v-if="scope.row.tenderScheduleStatus == 'tenderLost'">流标</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderFileApprovePASS'">招标文件审定完成(流标)</span>
              <span v-if="scope.row.tenderScheduleStatus == 'CandidateTemporary'">投标候选人暂存(流标)</span>
              <span
                v-if="scope.row.tenderScheduleStatus == 'tenderCandidateApproveSTOP'"
              >投标候选人审定终止(流标)</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderBulletinRelease'">招标公告已发布(流标)</span>
              <span
                v-if="scope.row.tenderScheduleStatus == 'tenderCandidateApproveSubmit'"
              >投标候选人审定中(流标)</span>
              <span
                v-if="scope.row.tenderScheduleStatus == 'tenderCandidateApproveBACK'"
              >投标候选人审定退回(流标)</span>
              <span
                v-if="scope.row.tenderScheduleStatus == 'tenderCandidateApprovePASS'"
              >投标候选人审定完成(流标)</span>
            </div>
            <div v-if="scope.row.tenderFileStatus != 'lost'">
              <span v-if="scope.row.tenderScheduleStatus == 'tenderLost'">流标</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderFileApprovePASS'">招标文件审定完成</span>
              <span v-if="scope.row.tenderScheduleStatus == 'CandidateTemporary'">投标候选人暂存</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderCandidateApproveSTOP'">投标候选人审定终止</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderBulletinRelease'">招标公告已发布</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderCandidateApproveSubmit'">投标候选人审定中</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderCandidateApproveBACK'">投标候选人审定退回</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderCandidateApprovePASS'">投标候选人审定完成</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination-z :total="total" :fromWhere="fromWhere" @fatherMethod="fatherMethod"></pagination-z>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import base from "@/api/base";
export default {
  data() {
    return {
      candidateSearchData: {
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commCode: "", // 业务单元
        page: 1,
        size: 10
      },
      candidateList: [],
      fromWhere: "documentApprovalHome",
      sso_sessionid: this.$store.state.sso_sessionid,
      total: 0,
      selectList: [],
      candidateLineCode: ""
    };
  },
  mounted() {
    this.getTenderByCandidateList(this.candidateSearchData);
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
      Object.assign(this.candidateSearchData, obj);
    },
    //  表格勾选事件
    tableSearchFn(v) {
      this.selectList = v;
      var arr = [];
      for (var i = 0; i < v.length; i++) {
        arr.push("'" + v[i].candidateCode + "'");
      }
      this.candidateLineCode = arr.join(",");
    },
    ifOnly(type) {
      var len = this.selectList.length;
      if (len == 0) {
        return false;
      } else {
        if (type == 2) {
          if (len > 1) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
    },
    // 分页回调函数
    fatherMethod(page, size) {
      this.candidateSearchData.page = page;
      this.candidateSearchData.size = size;
      this.getTenderByCandidateList(this.candidateSearchData);
    },
    // 查询按钮
    searchListBtn() {
      this.candidateSearchData.page = 1;
      this.getTenderByCandidateList(this.candidateSearchData);
    },
    //  重置
    resetListBtn() {
      this.candidateSearchData = {
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commCode: "", // 业务单元
        commName: "", // 业务单元
        page: 1,
        size: 10
      };
      this.$refs.searchForms.resetFn();
      this.getTenderByCandidateList(this.candidateSearchData);
    },
    // 查询
    getTenderByCandidateList(params) {
      this.$api.modular
        .getTenderByCandidateList(this.sso_sessionid, params)
        .then(res => {
          this.candidateList = res.data.data;
          this.total = Number(res.data.count);
        })
        .catch(() => {});
    },
    tableRowClassName: function(row, index) {
      // if (row.row.tenderScheduleStatus == 'tenderFileApprovePASS') {
      //   return 'hidden_row';
      // }
      // return '';
    },
    // 维护投标候选人
    whCandidate() {
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
              var href = this.commonFn.routerProcess(
                this.selectList,
                1,
                this,
                "",
                "",
                "",
                num,
                status
              );
              var winObj = window.open(href, "_blank");
              var loop = setInterval(() => {
                if (winObj.closed) {
                  clearInterval(loop);
                  // this.resetListBtn();
                  this.getTenderByCandidateList(this.candidateSearchData);
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
    },
    // 发起审定
    async approveCandi() {
      if (this.ifOnly(2)) {
        if (
          !this.selectList[0].approveStatus ||
          this.selectList[0].approveStatus == "STOP"
        ) {
          var nextTaskName = "";
          if (!this.selectList[0].nextTaskName) {
            nextTaskName = "";
          } else {
            nextTaskName = this.selectList[0].nextTaskName;
          }
          if (!this.selectList[0].TenderCandidateHeadCode) {
            this.$message.error("请先生成候选人信息！");
            return false;
          }
        } else {
          if (this.selectList[0].approveStatus == "PASS") {
            this.$message.error("投标候选人已审定完成，不能再次发起审定！");
          } else {
            this.$message.error("投标候选人审批中，不能再次发起审定！");
          }

          return false;
        }
      } else {
        this.$message.error("请选择且仅选择一个候选人！");
        return false;
      }
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
    },
    approveCandiFn(row) {
      if (row) {
        row = row;
      } else {
        row = this.selectList[0];
      }
      var params = {
        approveHeadCode: row.TenderCandidateHeadCode,
        approveRequestCode: "50013D",
        approveTitle: "关于" + row.tenderName + "的投标候选人审定",
        approveContent:
          "依据" +
          row.budgetYear.toString().substring(0, 4) +
          "年《成本预算和集中/专项采购执行单》招标计划，现申请对" +
          row.tenderName +
          "50013D" +
          "进行投标候选人审定"
      };
      this.$api.modular
        .approveByTenderCandidate(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            window.open(res.data);
          }
        });
    },

    numberClick(row) {
      var url = base.approveUrl + row.approveCode;
      window.open(url);
    }
  }
};
</script>
<style>
.el-table .hidden_row {
  display: none !important;
}
</style>
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
.popoverClass {
  font-size: 12px;
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
  margin-left: 40px;
  margin-top: -22px;
}
.sqlist .hoverClass button:hover {
  cursor: pointer;
}
.sqlist .hoverClass .cell:hover .btnClass + .el_Popver {
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
