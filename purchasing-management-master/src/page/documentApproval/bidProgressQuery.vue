<template>
  <div class="rightArea">
    <h1 style="margin-bottom: 20px;">招标进展查询</h1>
    <el-form
      :inline="true"
      size="mini"
      label-width="120px"
      :model="processQueryData"
      class="demo-form-inline p13"
    >
      <el-form-item label="人员姓名">
        <el-input v-model="processQueryData.personName" placeholder="人员姓名"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input
          class="xl el-input--mini"
          maxlength="0"
          @focus="showTree"
          readonly
          placeholder="请点选"
          v-model="processQueryData.companyName"
        ></el-input>
      </el-form-item>
      <el-form-item label="招标形式">
        <!-- <el-input v-model="processQueryData.tenderType" placeholder="招标形式"></el-input> -->
        <el-select v-model="processQueryData.tenderType" placeholder="请选择">
          <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="招标项名称">
        <el-input v-model="processQueryData.tenderName" placeholder="招标项名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="float: left;" size="mini" type="primary" @click="searchListBtn">查询</el-button>
        <el-button style="float: left;" size="mini" type="primary" @click="resetBtn">重置</el-button>
        <el-button style="float: left;" size="mini" type="primary" @click="exportExcel">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="processQueryList"
      border
      size="mini"
      tooltip-effect="dark"
      style="width: 98%; margin: 0 auto;"
    >
      <!-- <el-table-column align="center" type="selection" width="50"></el-table-column> -->
      <el-table-column align="center" fixed label="序号" width="50" type="index"></el-table-column>
      <el-table-column fixed
        align="center"
        prop="COST_CENTER_NAME"
        label="公司名称"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column fixed align="center" label="招标项" width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <span
            v-if="scope.row.TENDER_SCHEDULE_STATUS != 'NO'"
            style="color: blue; cursor:pointer;"
            @click="toItem(scope.row)"
          >{{scope.row.TENDER_NAME}}</span>
          <span
            v-if="scope.row.TENDER_SCHEDULE_STATUS == 'NO'"
            style="color: blue; cursor:pointer;"
            @click="sheetToLook(scope.row)"
          >{{scope.row.TENDER_NAME}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed align="center" prop="TENDER_SCHEDULE_STATUS" label="状态" width="130px">
        <template slot-scope="scope">
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'NO'">招标待执行</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderWinPublishSubmit'">中标公告发布</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderWinApprovePASS'">中标审定完成</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderWinApproveSTOP'">中标审定终止</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderWinApproveSubmit'">中标审定中</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderWinTemporary'">中标审定暂存</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderCompiledReportSubmit'">综合评标报告提交</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'completeEvaluationBusiness'">完成评商务标</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'openEvaluationBusiness'">启动评商务标</span>
          <span
            v-if="scope.row.TENDER_SCHEDULE_STATUS == 'completeTenderBusinessNegotiation'"
          >完成商务谈判</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderCompleteOpenBusiness'">完成开商务标</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderOpenBusiness'">开商务标</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'completeEvaluationTechnical'">完成评技术标评标报告</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'submitEvaluationTechnical'">提交评技术标报告</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'openEvaluationTechnical'">启动评技术标</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderCompleteOpenTechnical'">完成开技术标</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderOpenTechnical'">开技术标</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderOverReturn'">完成回标</span>
          <div v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderLost'">
            <span>{{lostReturn(scope.row.TENDER_ROW_NUM)}}</span>
          </div>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderFileAnswer'">招标答疑文件完成答疑</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderFileRelease'">招标文件已发布</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderFileApproveSubmit'">招标文件审定中</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderFileSaveTemporary'">招标文件暂存</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderFileApproveBACK'">招标文件退回</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderFileApprovePASS'">招标文件审定完成</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderBulletinRelease'">招标公告已发布</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderCandidateTemporary'">投标候选人暂存</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'CandidateTemporary'">投标候选人暂存</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderCandidateApproveSubmit'">投标候选人审定中</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderCandidateApproveBACK'">投标候选人审定退回</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderCandidateApprovePASS'">投标候选人审定完成</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderBailDraft'">保证金缴纳待确认</span>
          <span v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderBailSubmit'">保证金缴纳已确认</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="采购启动时间" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.PROCUREMENT_DATE">{{formatDate(scope.row.PROCUREMENT_DATE)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="计划定标时间" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.PLAN_TARGET_DATE">{{formatDate(scope.row.PLAN_TARGET_DATE)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="要求进场时间" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.ARRIVAL_DATE">{{formatDate(scope.row.ARRIVAL_DATE)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="INFO" label="进展情况" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.TENDER_SCHEDULE_STATUS == 'tenderLost'">
            <span>流标</span>
          </div>
          <div v-if="scope.row.TENDER_SCHEDULE_STATUS != 'tenderLost'">
            <span>{{infoFn(scope.row.INFO, scope.row.TENDER_TYPE)}}</span>
            <span>{{scope.row.DAYS}}天</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="PROCUREMENT_EXECUTVE" label="执行人" width="60"></el-table-column>
      <el-table-column align="center" prop="ECONOMIC_MEMBER" label="经济组" width="160"></el-table-column>
      <el-table-column align="center" prop="TECHNICAL_MEMBER" label="技术组" width="160"></el-table-column>
      <!-- <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" style="color: blue; cursor:pointer;" @click="toItem(scope.row.TENDER_FILE_CODE)">查看采购执行单</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <add-sheet :addSheetObj="addSheetObj" :itemInfo="itemInfo" :tenderCode="tenderCode"></add-sheet>
    <pagination-z :total="total" :fromWhere="fromWhere" @fatherMethod="fatherMethod"></pagination-z>
    <related-items ref="related_items" :relatedItems="relatedItems" @setItemName="setItemName"></related-items>
  </div>
</template>

<script>
export default {
  data() {
    return {
      processQueryData: {
        personName: "",
        tenderName: "",
        tenderType: "",
        companyName: "",
        segment: "",
        page: 1,
        size: 10
      },
      processQueryList: [],
      fromWhere: "documentApprovalHome",
      sso_sessionid: this.$store.state.sso_sessionid,
      total: 0,
      relatedItems: {
        isShow: false,
        type: "two"
      },
      projectInfo: {},
      options: [
        {
          label: "战略直委",
          id: "1"
        },
        {
          label: "非战略直委",
          id: "2"
        },
        {
          label: "议标",
          id: "3"
        },
        {
          label: "邀请招标",
          id: "4"
        }
      ],
      tenderCode: {},
      itemInfo: {},
      addSheetObj: {
        isShow: false,
        moneyUnit: "元",
        type: "look"
      }
    };
  },
  mounted() {
    this.tenderScheduleReport();
  },
  methods: {
    exportExcel() {
      var params = {
        exportExcel: "exportExcel",
        personName: this.processQueryData.personName,
        companyName: this.processQueryData.companyName,
        tenderName: this.processQueryData.tenderName,
        segment: this.processQueryData.segment,
        tenderType: this.processQueryData.tenderType,
      };
      this.$api.modular.tenderScheduleReportExcel(this.sso_sessionid, params).then(res => {
        window.location.href = res.config.url;
      });
    },
    formatDate(date) {
      return this.commonFn.formatDate(date);
    },
    lostReturn(num){
      if(num == 1) {
        return '招标文件（流标）';
      } else if(num == 2) {
        return '投标候选人（流标）';
      } else if(num == 3) {
        return '投标保证金（流标）';
      } else if(num == 4) {
        return '发布招标文件（流标）';
      } else if(num == 5) {
        return '招标文件答疑（流标）';
      } else if(num == 6) {
        return '投标（流标）';
      } else if(num == 7) {
        return '回标（流标）';
      } else if(num == 8) {
        return '开技术标（流标）';
      } else if(num == 9) {
        return '评技术标（流标）';
      } else if(num == 10) {
        return '开商务标（流标）';
      } else if(num == 11) {
        return '评商务标（流标）';
      } else if(num == 12) {
        return '综合评标报告（流标）';
      } else if(num == 13) {
        return '中标审定（流标）';
      } else{
        return '流标';
      }
    },
    resetBtn() {
      this.processQueryData = {
        personName: "",
        tenderName: "",
        tenderType: "",
        companyName: "",
        segment: "",
        page: 1,
        size: 10
      };
      this.tenderScheduleReport();
    },
    infoFn(info, type) {
      if (info == "0") {
        return info + '%';
      }
      // var jd = Number(info.substr(0, 3));
      var jd = info;
      if (type != "1" && type != "2") {
        if (jd >= 98) {
          return "100%";
        } else {
          return info + '%';
        }
      } else {
        if (jd > 50) {
          return "100%";
        } else {
          return "50%";
        }
      }
    },
    sheetToLook(row) {
      this.addSheetObj.type = "look";
      this.tenderCode = { tenderCode: row.TENDER_CODE };
      this.addSheetObj.isShow = true;
    },
    // 弹窗 start
    showTree() {
      this.relatedItems.isShow = true;
      this.$nextTick(() => {
        this.$refs.related_items.choseNode(this.projectInfo);
      });
    },
    // 项目组件调用父元素方法
    setItemName(value) {
      this.processQueryData.companyName = value.costCenterName;
      this.projectInfo = value;
      if (!isNaN(Number(value.costCenterCode))) {
        var code = value.segment.substring(
          0,
          value.segment.indexOf("_" + value.costCenterCode)
        );
        this.processQueryData.segment = code;
      } else {
        this.processQueryData.segment = value.segment;
      }
    },
    // 分页回调函数
    fatherMethod(page, size) {
      this.processQueryData.page = page;
      this.processQueryData.size = size;
      this.tenderScheduleReport();
    },
    // 查询按钮
    searchListBtn() {
      this.processQueryData.page = 1;
      this.tenderScheduleReport();
    },
    // 查询
    tenderScheduleReport() {
      this.$api.modular
        .tenderScheduleReport(this.sso_sessionid, this.processQueryData)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              if (res.data.data.length > 0) {
                for (var i = 0; i < res.data.data.length; i++) {
                  if (res.data.data[i].PROCUREMENT_EXECUTVE) {
                    var arr1 = res.data.data[i].PROCUREMENT_EXECUTVE.split(":");
                    res.data.data[i].PROCUREMENT_EXECUTVE = arr1[2];
                    var ECO1 = res.data.data[i].ECONOMIC_LEADER.split(":");
                    var ECO2 = res.data.data[i].ECONOMIC_MEMBER.split(",");
                    var ECOArr = [];
                    var ifHave = false;
                    for (var i2 = 0; i2 < ECO2.length; i2++) {
                      var ECOArr2 = ECO2[i2].split(":");
                      if (ECO1[0] == ECOArr2[0]) {
                        ifHave = true;
                      }
                      ECOArr.push(ECOArr2[2]);
                    }
                    if (!ifHave) {
                      ECOArr.push(ECO1[2]);
                    }
                    res.data.data[i].ECONOMIC_MEMBER = ECOArr.join();
                    var TECArr = [];
                    var TEC1 = res.data.data[i].TECHNICAL_LEADER.split(":");
                    var TEC2 = res.data.data[i].TECHNICAL_MEMBER.split(",");
                    var ifHave2 = false;
                    for (var i3 = 0; i3 < TEC2.length; i3++) {
                      var TECArr2 = TEC2[i3].split(":");
                      if (TEC1[0] == TECArr2[0]) {
                        ifHave2 = true;
                      }
                      TECArr.push(TECArr2[2]);
                    }
                    if (!ifHave2) {
                      TECArr.push(TEC1[2]);
                    }
                    res.data.data[i].TECHNICAL_MEMBER = TECArr.join();
                  }
                }
              }
            } else {
              this.$message.error(res.data.message);
              return false;
            }
          }
          this.processQueryList = res.data.data;
          this.total = Number(res.data.count);
        });
    },

    toItem(row) {
      var num = row.TENDER_ROW_NUM;
      row.tenderName = row.TENDER_NAME;
      row.tenderNumber = row.TENDER_NUMBER;
      row.tenderFileCode = row.TENDER_FILE_CODE;
      row.tenderScheduleStatus = row.TENDER_SCHEDULE_STATUS;
      var arr = [];
      arr.push(row);
      if (num > 5) {
        num = num - 2;
      } else {
        num = num - 1;
      }
      if (row.TENDER_TYPE == "1" || row.TENDER_TYPE == "2") {
        var href = this.commonFn.zwRouterProcess(
          arr,
          num,
          this,
          "jz",
          true,
          "",
          num + 1,
          row.TENDER_SCHEDULE_STATUS
        );
        var winObj = window.open(href, "_blank");
        var loop = setInterval(() => {
          if (winObj.closed) {
            clearInterval(loop);
            this.tenderScheduleReport();
            // this.resetBtn();
          }
        }, 1000);
      } else {
        var href = this.commonFn.routerProcess(
          arr,
          num,
          this,
          "jz",
          true,
          "",
          num + 1,
          row.TENDER_SCHEDULE_STATUS
        );
        var winObj = window.open(href, "_blank");
        var loop = setInterval(() => {
          if (winObj.closed) {
            clearInterval(loop);
            // this.resetBtn();
          }
        }, 1000);
      }
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
.p13 .el-form-item--mini.el-form-item {
  float: left;
  width: 32%;
}
</style>
