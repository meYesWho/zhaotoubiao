<template>
  <div class="defendSheet">
    <h3>{{ifCompanyName()}}成本预算和集中/专项采购执行单 {{itemInfo.planVision}}</h3>
    <p>
      项目：{{itemInfo.projectName}} &nbsp;&nbsp;编制单位：{{itemInfo.plStaOrgname}}
      &nbsp;&nbsp;编制人：{{itemInfo.plStaName}} &nbsp;&nbsp;编制日期：{{itemInfo.createdDate}}
      &nbsp;&nbsp;单位：元
      &nbsp;&nbsp;状态：{{sheetStatus}}
    </p>
    <div class="btnGroup">
      <el-button
        style="float:right;margin-left:10px;margin-bottom: 15px;"
        size="mini"
        @click="back"
      >返回</el-button>
      <div>
        <el-button
          v-if="have666"
          size="mini"
          type="primary"
          @click="changeTender"
        >修改</el-button>
        <div v-if="!ifshenhezhong" style="display: inline-block;margin-right: 8px;">
          <el-button
            v-if="hasQx('aph2_tender_CGZXDZD-QX-C11')"
            size="mini"
            type="primary"
            @click="addSheet"
          >添加招标项</el-button>
          <el-button
            v-if="hasQx('aph2_tender_CGZXDZD-QX-C14')"
            size="mini"
            type="primary"
            @click="changeTender"
          >修改</el-button>
          <el-button
            v-if="hasQx('aph2_tender_CGZXDZD-QX-C12')"
            size="mini"
            type="primary"
            @click="delBtn"
          >删除</el-button>
          <el-button
            v-if="hasQx('aph2_tender_CGZXDZD-QX-C23')"
            size="mini"
            type="primary"
            @click="examinationFn('first')"
          >招标项审定</el-button>
        </div>
        <el-button
          v-if="hasQx('aph2_tender_CGZXDZD-QX-C45')"
          size="mini"
          type="primary"
          @click="exportExcel"
        >导出</el-button>
      </div>
    </div>
    <el-table
      :data="tenderList"
      border
      @selection-change="choseFn"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      style="width: 98%;margin: 20px auto; color: #cb1235;"
      max-height="550"
      :row-style="rowStyleFn"
      :disabled="ifshenhezhong"
    >
      <el-table-column :selectable="selectInit" fixed type="selection" align="center"></el-table-column>
      <el-table-column fixed type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column
        align="center"
        prop="tenderProjectName"
        label="项目名称"
        show-overflow-tooltip
        width="180"
      >
        <template slot-scope="scope">
          <span
            @click="tolook(scope.row)"
            style="cursor: pointer;color:blue;"
          >{{scope.row.tenderProjectName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="levelOneName" label="一级分项" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="levelTwoName" label="二级分项" width="110" show-overflow-tooltip></el-table-column>
      <el-table-column prop="tenderName" label="招标名称" width="110" show-overflow-tooltip></el-table-column>
      <el-table-column label="招标形式" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.tenderType == '1'">战略直委</span>
          <span v-if="scope.row.tenderType == '2'">非战略直委</span>
          <span v-if="scope.row.tenderType == '3'">议标</span>
          <span v-if="scope.row.tenderType == '4'">邀请招标</span>
        </template>
      </el-table-column>
      <el-table-column prop="planBudgetYear" align="center" label="年份"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.firstApproveStatus">未提交</span>
          <span v-if="scope.row.firstApproveStatus == 'submit'">提交</span>
          <span v-if="scope.row.firstApproveStatus == 'PASS'">完成</span>
          <span v-if="scope.row.firstApproveStatus == 'STOP'">终止</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="planVision" label="版本"></el-table-column>
      <el-table-column prop="procurementDate" label="采购启动时间" width="120" align="center"></el-table-column>
      <el-table-column prop="technicalDate" label="技术要求提供时间" width="140" align="center"></el-table-column>
      <el-table-column prop="planTargetDate" label="计划定标时间" width="120" align="center"></el-table-column>
      <el-table-column prop="executiveDepartment" label="执行部门"></el-table-column>
      <el-table-column prop label="专项采购组责任人" width="140" align="center">
        <template slot-scope="scope">
          <span>{{getNameOnly(scope.row.procurementPrincipal)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="专项采购组执行人" width="140" align="center">
        <template slot-scope="scope">
          <span>{{getNameOnly(scope.row.procurementExecutve)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="定标总金额" width="100" align="center"></el-table-column>
      <el-table-column prop="budgetAmount" label="计划预算余额" width="120" align="center"></el-table-column>
      <el-table-column
        prop="budgetMonth"
        show-overflow-tooltip
        label="预算月份"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{budgetMonthVal(scope.row.budgetMonth)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="定标日期">
        <template slot-scope="scope">
          <span>{{tenderWinDate(scope.row.tenderWinDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="economicMemberName"
        show-overflow-tooltip
        label="经济组成员"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{getName(scope.row.economicMember)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="technicalMemberName"
        show-overflow-tooltip
        label="技术组成员"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{getName(scope.row.technicalMember)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
        align="center"
        v-if="itemInfo.whereType != 'fromName'"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="invalidByTender(scope.row)">作废</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加招标项组件 -->
    <add-sheet
      :addSheetObj="addSheetObj"
      :itemInfo="itemInfo"
      :tenderCode="tenderCode"
      @saveOk="saveOk"
    ></add-sheet>
    <!-- <pagination-z :total="total" :fromWhere="fromWhere" @fatherMethod="fatherMethod"></pagination-z> -->
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      tenderList: [],
      total: 0,
      fromWhere: "defendSheet",
      addSheetObj: {
        isShow: false,
        moneyUnit: "",
        type: ""
      },
      sso_sessionid: this.$store.state.sso_sessionid,
      itemInfo: {},
      choseData: [],
      tenderCodeArr: "",
      tenderCode: {},
      ifshenhezhong: false,
      sheetStatus: "待提交",
      sdyear: "",
      have666: false
    };
  },
  mounted() {
    // var itemInfoStr = sessionStorage.getItem("itemInfoSetv");
    // if (itemInfoStr && !this.$route.query.itemInfo) {
    //   this.itemInfo = JSON.parse(itemInfoStr);
    // } else {
    //   // sessionStorage.setItem("itemInfoSetv", this.$route.query.itemInfo);
    //   this.itemInfo = JSON.parse(this.$route.query.itemInfo);
    // }
    this.itemInfo = JSON.parse(this.$route.query.itemInfo);
    console.log(this.itemInfo)
    this.itemInfo.createdDate = this.commonFn.formatDate(
      this.itemInfo.createdDate
    );
    this.sdyear = this.itemInfo.budgetYear;
    if (this.itemInfo.moneyUnit == 1) {
      this.itemInfo.moneyUnit = "元";
    } else if (this.itemInfo.moneyUnit == 2) {
      this.itemInfo.moneyUnit = "千元";
    } else if (this.itemInfo.moneyUnit == 3) {
      this.itemInfo.moneyUnit = "万元";
    } else if (this.itemInfo.moneyUnit == 4) {
      this.itemInfo.moneyUnit = "百万元";
    }
    this.addSheetObj.moneyUnit = this.itemInfo.moneyUnit;
    this.chaxunFn();
    if (this.itemInfo.whereType == "fromName") {
      this.ifshenhezhong = true;
      this.sheetStatus = "查看";
    } else if (this.itemInfo.whereType == "fromStatus"){
      if (this.itemInfo.firstApproveStatus == "PASS") {
        this.ifshenhezhong = true;
        this.sheetStatus = "审定通过";
        return false;
      } else if (this.itemInfo.firstApproveStatus == "STOP") {
        this.ifshenhezhong = false;
        this.sheetStatus = "审定已终止";
        return false;
      } else if (this.itemInfo.firstApproveStatus == "BACK") {
        this.ifshenhezhong = false;
        this.sheetStatus = "初审已退回";
        return false;
      } else if (this.itemInfo.firstApproveStatus) {
        this.ifshenhezhong = true;
        this.sheetStatus = "审定中";
        return false;
      } else {
        this.sheetStatus = "待审定";
        this.ifshenhezhong = false;
        return false;
      }
    } else if(this.itemInfo.whereType == "have666"){
      this.ifshenhezhong = true;
      this.have666 = true;
      this.sheetStatus = "特殊操作";
    } else if(!this.itemInfo.whereType){
      if (this.itemInfo.firstApproveStatus == 'submit') {
        this.$message.info('存在审批中数据，无法新增');
        this.ifshenhezhong = true;
        this.sheetStatus = "审定中";
        return false;
      } else if (this.itemInfo.firstApproveStatus == 'BACK') {
        this.$message.info('存在审批中数据，无法新增');
        this.ifshenhezhong = true;
        this.sheetStatus = "审定中";
        return false;
      } 
    } 
  },

  beforeDestroy() {
    // sessionStorage.removeItem("itemInfoSetv");
  },
  methods: {
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    async invalidByTender(row) {
      this.$confirm("确认作废?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.invalidByTender2(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    invalidByTender2(row) {
      var params = {
        tenderCode: row.tenderCode
      };
      this.$api.modular
        .invalidByTender(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success("作废成功！");
              this.chaxunFn();
            } else {
              this.$message.error(res.data.message);
            }
          }
        });
    },
    back() {
      this.$router.go(-1);
    },
    tolook(row) {
      this.addSheetObj.type = "look";
      this.tenderCode = row;
      this.addSheetObj.isShow = true;
    },
    chaxunFn() {
      if (this.itemInfo.whereType == "fromName") {
        if (this.ifCompanyName2()) {
          this.getTenderList({ companyCode: this.itemInfo.companyCode });
        } else {
          this.getTenderList({ companyCode: this.itemInfo.projectCode });
        }
        this.ifshenhezhong = true;
      } else if (this.itemInfo.whereType == "fromStatus") {
        // this.getTenderList({ planCode: this.itemInfo.planCode });
        // this.getTenderList({ projectCode: this.itemInfo.projectCode });
        this.getTenderByProjectCode({
          projectCode: this.itemInfo.projectCode,
          approveHeadCode: this.itemInfo.planCode
        });
      } else {
        this.getTenderList({ projectCode: this.itemInfo.projectCode });
      }
    },
    getName(value) {
      if (value) {
        var a1 = value.split(",");
        var arr = [];
        for (var i = 0; i < a1.length; i++) {
          var a2 = a1[i].split(":");
          arr.push(a2[2]);
        }
        return arr.join();
      } else {
        return "";
      }
    },
    tenderWinDate(date) {
      if (date) {
        var a = this.commonFn.formatDate(date);
        return a;
      } else {
        return "";
      }
    },
    getNameOnly(value) {
      if (value) {
        var arr = value.split(":");
        return arr[2];
      } else {
        return "";
      }
    },
    ifCompanyName() {
      if (isNaN(Number(this.itemInfo.projectCode))) {
        return this.itemInfo.projectName;
      } else {
        return this.itemInfo.companyName;
      }
    },
    ifCompanyName2() {
      if (isNaN(Number(this.itemInfo.projectCode))) {
        return false;
      } else {
        return true;
      }
    },
    budgetMonthVal(val) {
      if(!val) return false;
      var a = val.split(",");
      var arr = [];
      for (var i = 0; i < a.length; i++) {
        arr.push(a[i] + "月");
      }
      var str = arr.join(",");
      return str;
    },
    // 分页组件回调方法
    fatherMethod(page, size) {
      var that = this;
      //   that.getList(that.sso_sessionid, that.projectCode);
    },
    // 保存招标项成功回调
    saveOk() {
      this.chaxunFn();
    },
    rowStyleFn({ row, rowIndex }) {
      if (row.firstApproveStatus == "PASS") {
        return "color: #666";
      }
    },
    selectInit(row, index) {
      if(this.have666){
        return true;
      } else {
        if (row.firstApproveStatus && row.firstApproveStatus != "STOP") {
          return false;
        } else {
          return true;
        }
      }
    },
    // 获取采购计划和招标项信息-根据project获取招标项信息
    getTenderByProjectCode(code) {
      this.$api.modular
        .getTenderByProjectCode(this.sso_sessionid, code)
        .then(res => {
          // 执行某些操作
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              if (res.data.data.length > 0) {
                this.tenderList = res.data.data;
                this.itemInfo.planVision = res.data.data[0].planVision;
                var orgnameList = res.data.data[0].plStaOrgname.split("-");
                this.itemInfo.plStaOrgname =
                  orgnameList[orgnameList.length - 3] +
                  "-" +
                  orgnameList[orgnameList.length - 2];
                this.itemInfo.plStaName = res.data.data[0].plStaName;
              } else {
                return false;
              }
              for (var i = 0; i < res.data.data.length; i++) {
                if (!res.data.data[i].tenderCode) {
                  this.tenderList.splice(i, 1);
                }
              }
              if (this.tenderList.length == 0) return false;
              for (var i = 0; i < this.tenderList.length; i++) {
                this.tenderList[
                  i
                ].designDrawingsDate = this.commonFn.formatDate(
                  this.tenderList[i].designDrawingsDate
                );
                this.tenderList[i].technicalDate = this.commonFn.formatDate(
                  this.tenderList[i].technicalDate
                );
                this.tenderList[i].planTargetDate = this.commonFn.formatDate(
                  this.tenderList[i].planTargetDate
                );
                this.tenderList[i].procurementDate = this.commonFn.formatDate(
                  this.tenderList[i].procurementDate
                );
                this.tenderList[i].signContractDate = this.commonFn.formatDate(
                  this.tenderList[i].signContractDate
                );
                this.tenderList[i].arrivalDate = this.commonFn.formatDate(
                  this.tenderList[i].arrivalDate
                );
              }
              // if (this.tenderList.length > 0) {
              //   this.sdyear = this.tenderList[0].budgetYear.substring(0, 4);
              // }
              // this.itemInfo.planVision = res.data.data[0].planVision;
              this.itemInfo.projectName = this.tenderList[0].tenderProjectName;
              this.itemInfo.firstApproveStatus = this.tenderList[0].firstApproveStatus;
              this.itemInfo.createdDate = this.commonFn.formatDate(
                this.tenderList[0].createdDate
              );
              // this.itemInfo.projectCode = this.tenderList[0].tenderProjectCode;
              this.ifCompanyName();
              sessionStorage.setItem(
                "itemInfoSetv",
                JSON.stringify(this.itemInfo)
              );
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
          // this.total = res.data.count;
        });
    },
    // 获取招标项列表
    getTenderList(code) {
      this.$api.modular.getTenderList(this.sso_sessionid, code).then(res => {
        // 执行某些操作
        if (res.status == 200) {
          if (res.data.returnCode == -1) {
            this.$message.error("数据错误");
          } else {
            var orgnameList = res.data.data[0].plStaOrgname.split("-");
            this.itemInfo.planVision = res.data.data[0].planVision;
            var orgnameList = res.data.data[0].plStaOrgname.split("-");
            this.itemInfo.plStaOrgname =
              orgnameList[orgnameList.length - 3] +
              "-" +
              orgnameList[orgnameList.length - 2];
            this.itemInfo.plStaName = res.data.data[0].plStaName;
            this.tenderList = [];
            for (var d = 0; d < res.data.data.length; d++) {
              if(res.data.data[d].tenderProjectName){
                 this.tenderList.push(res.data.data[d]);
              }
            }
            // this.tenderList = res.data.data;
            for (var i = 0; i < this.tenderList.length; i++) {
              this.tenderList[i].designDrawingsDate = this.commonFn.formatDate(
                this.tenderList[i].designDrawingsDate
              );
              this.tenderList[i].technicalDate = this.commonFn.formatDate(
                this.tenderList[i].technicalDate
              );
              this.tenderList[i].planTargetDate = this.commonFn.formatDate(
                this.tenderList[i].planTargetDate
              );
              this.tenderList[i].procurementDate = this.commonFn.formatDate(
                this.tenderList[i].procurementDate
              );
              this.tenderList[i].signContractDate = this.commonFn.formatDate(
                this.tenderList[i].signContractDate
              );
              this.tenderList[i].arrivalDate = this.commonFn.formatDate(
                this.tenderList[i].arrivalDate
              );
            }
            // if (this.tenderList.length > 0) {
            //   this.sdyear = this.tenderList[0].budgetYear.substring(0, 4);
            // }
          }
        }
        // this.total = res.data.count;
      });
    },
    // 点击添加按钮
    addSheet() {
      this.addSheetObj.isShow = true;
      this.addSheetObj.type = "add";
    },
    // 删除招标项
    async delBtn() {
      if (this.tenderCodeArr == "") {
        this.$message({
          type: "error",
          message: "请选择具体招标项"
        });
      } else {
        var row = this.tenderCodeArr;
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            await this.delBtnFn(row);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    delBtnFn(row) {
      this.$api.modular
        .delByHenderCode(this.sso_sessionid, row)
        .then(res => {
          if (res.data.returnCode == -1) {
            this.$message({
              type: "error",
              message: res.data.message
            });
          } else {
            this.chaxunFn();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "错误！"
          });
        });
    },
    // 列表多选 状态改变事件
    choseFn(v) {
      this.choseData = v;
      var arr = [];
      for (var i = 0; i < v.length; i++) {
        arr.push("'" + v[i].tenderCode + "'");
      }
      this.tenderCodeArr = arr.join(",");
    },
    // 点击修改按钮
    changeTender() {
      if (this.choseData.length == 1) {
        if(this.choseData[0].tenderCode){
          this.tenderCode = this.choseData[0];
          this.addSheetObj.isShow = true;
          this.addSheetObj.type = "change";
        } else {
          this.$message.error("获取招标信息有误！");
        }
        
      } else {
        this.$message.error("请选择单个文件进行修改！");
      }
    },
    // 招标项审定按钮
    async examinationFn(type) {
      if (this.tenderList.length == 0) {
        this.$message.error("招标项不能为空！");
        return false;
      }
      if (
        this.tenderList[0].firstApproveStatus != "STOP" &&
        this.tenderList[0].firstApproveStatus
      ) {
        this.$message.error("待审订招标项不能为空！");
        return false;
      }
      var params = {};
      var title = "";
      if (type == "first") {
        title = "确定发起审定？";
        params = {
          approveHeadCode: this.itemInfo.planCode,
          approveRequestCode: "50013A",
          approveTitle:
            "关于" +
            this.itemInfo.projectName +
            this.sdyear +
            "年" +
            "《成本预算和集中/专项采购执行单》的审定",
          approveContent:
            "根据统计" +
            this.itemInfo.projectName +
            this.sdyear +
            "年" +
            "《成本预算和集中/专项采购执行单》，现申请对《成本预算和集中/专项采购执行单》进行审定，并对其招标工作进行立项，详见附表。",
          approveType: "first"
        };
      }
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.examinationFnTo(type, params);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    examinationFnTo(type, params) {
      this.$api.modular.getApprove(this.sso_sessionid, params).then(res => {
        if (res.status == 200) {
          this.ifshenhezhong = true;
          this.sheetStatus = "审核中";
          //       this.chaxunFn();
          // this.$api.modular
          //   .planAdd(this.sso_sessionid, this.itemInfo)
          //   .then(res => {
          //     // 执行某些操作
          //     var len = res.data.data.length - 1;
          //     if (res.data.returnCode == 0 && len > -1) {
          //       this.itemInfo = res.data.data[0];
          //       sessionStorage.setItem(
          //         "itemInfoSetv",
          //         JSON.stringify(this.itemInfo)
          //       );
          //       this.chaxunFn();
          //     } else {
          //       this.$message.error("数据有误！");
          //     }
          //   });
          window.open(res.data);
        }
      });
    },
    exportExcel() {
      if (this.tenderList.length == 0) {
        this.$message.error("招标项不能为空！");
        return false;
      }
      if (
        this.tenderList[this.tenderList.length - 1].firstApproveStatus != "PASS"
      ) {
        this.$message.error("招标项未完成审定，不可导出！");
        return false;
      }
      var params = {
        exportExcel: "exportExcel",
        projectCode: this.itemInfo.projectCode
      };
      this.$api.modular.exportExcel(this.sso_sessionid, params).then(res => {
        window.location.href = res.config.url;
      });
    }
  }
};
</script>

<style scoped>
.defendSheet {
  width: 98% !important;
  margin: 0 auto !important;
  background-color: #fff !important;
  padding-bottom: 20px;
  padding-top: 15px;
}
.defendSheet h3,
.defendSheet p {
  margin: 0;
  text-align: left;
  margin-left: 1%;
}
.defendSheet p {
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 16px;
}
.btnGroup {
  text-align: right;
  margin-right: 10px;
}
</style>
