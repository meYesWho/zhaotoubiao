<template>
  <div class="defendSheet" style="padding-bottom:30px">
    <h3>{{ifCompanyName()}}成本预算和集中/专项采购执行单 {{itemInfo.planVision}}</h3>
    <p>
      项目：{{itemInfo.tenderProjectName}} &nbsp;&nbsp;编制单位：{{itemInfo.plStaOrgname}}
      &nbsp;&nbsp;编制人：{{itemInfo.plStaName}} &nbsp;&nbsp;编制日期：{{itemInfo.createdDate}}
      &nbsp;&nbsp;单位： 元
    </p>
    <el-table
      :data="tenderList"
      border
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      style="width: 98%;margin: 20px auto; color: #cb1235;"
      max-height="550"
      :row-style="rowStyleFn"
    >
      <!-- <el-table-column :selectable="selectInit" fixed type="selection" align="center"></el-table-column> -->
      <el-table-column fixed type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column align="center" label="项目名称" show-overflow-tooltip width="180">
        <template slot-scope="scope">
          <span @click="tolook(scope.row)" style="cursor: pointer;color:blue;">{{scope.row.tenderProjectName}}</span>
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
      <el-table-column prop="procurementDate" label="采购启动时间" width="120" align="center"></el-table-column>
      <el-table-column prop="technicalDate" label="技术要求提供时间" width="140" align="center"></el-table-column>
      <el-table-column prop="planTargetDate" label="计划定标时间" width="120" align="center"></el-table-column>
      <el-table-column prop="zip" label="执行部门"></el-table-column>
      <el-table-column prop="zip" label="专项采购组责任人" width="140" align="center"></el-table-column>
      <el-table-column prop="zip" label="专项采购组执行人" width="140" align="center"></el-table-column>
      <el-table-column prop="zip" label="定标总金额" width="100" align="center"></el-table-column>
      <el-table-column prop="budgetAmount" label="计划预算余额" width="120" align="center"></el-table-column>
      <el-table-column prop="zip" label="定标日期"></el-table-column>
      <el-table-column prop="zip" label="经济组成员" width="100" align="center"></el-table-column>
      <el-table-column prop="zip" label="技术组成员" width="100" align="center"></el-table-column>
    </el-table>
    <!-- 添加招标项组件 -->
    <add-sheet :addSheetObj="addSheetObj" :itemInfo="itemInfo" :tenderCode="tenderCode"></add-sheet>
    <!-- <pagination-z :total="total" :fromWhere="fromWhere" @fatherMethod="fatherMethod"></pagination-z> -->
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      sso_sessionid: this.$store.state.sso_sessionid,
      tenderList: [],
      total: 0,
      fromWhere: "defendSheet",
      projectCode: "",
      choseData: [],
      tenderCode: {},
      sdyear: "",
      itemInfo: {},
      addSheetObj: {
        isShow: false,
        moneyUnit: "",
        type: ""
      }
    };
  },
  mounted() {
    var urlV = window.location.href;
    var pathS = urlV.indexOf('headCode=');
    if(pathS != -1){
      var headCode = urlV.substring(pathS+9, urlV.length);
    } else {
      var headCode = '';
    }
    this.getTenderByApprove(headCode);
  },
  methods: {
    tolook(row) {
      this.addSheetObj.type = "look";
      this.tenderCode = row;
      this.addSheetObj.isShow = true;
    },
    ifCompanyName() {
      if (this.itemInfo) {
        if (isNaN(Number(this.itemInfo.tenderProjectCode))) {
          return this.itemInfo.tenderProjectName;
        } else {
          return this.itemInfo.planCompanyName;
        }
      }
    },
    rowStyleFn({ row, rowIndex }) {
      if (row.firstApproveStatus == "PASS") {
        return "color: #666";
      }
      if(!row.tenderName){
        return false;
      }
    },
    selectInit(row, index) {
      if (row.firstApproveStatus) {
        return false;
      } else {
        return true;
      }
    },
    // 获取采购计划和招标项信息-根据project获取招标项信息
    getTenderByApprove(headCode) {
      var params = {
        projectCode: "",
        headCode: headCode,
      };
      this.$api.modular
        .getTenderByApproveLook(params)
        .then(res => {
          // 执行某些操作
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              if(res.data.data.length>0){
                var orgnameList = res.data.data[0].plStaOrgname.split('-');
                this.itemInfo.plStaOrgname = orgnameList[orgnameList.length-3] + '-' + orgnameList[orgnameList.length-2];
                this.tenderList = res.data.data;
                this.itemInfo = res.data.data[0];
              } else {
                return false;
              }
              this.tenderList = [];
              for (var d = 0; d < res.data.data.length; d++) {
                if(res.data.data[d].tenderProjectName){
                  this.tenderList.push(res.data.data[d]);
                }
              }
              // if (!res.data.data[0].tenderCode) {
              //   this.tenderList.splice(0, 1);
              // }
              
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
              if (this.tenderList.length > 0) {
                this.sdyear = this.tenderList[0].budgetYear.substring(0, 4);
              }
              this.itemInfo.createdDate = this.commonFn.formatDate(
                this.itemInfo.createdDate
              );

              this.ifCompanyName();
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
          // this.total = res.data.count;
        });
    }
  }
};
</script>

<style scoped>
.defendSheet {
  position: fixed;
  left: 0;
  top: 0;
  width: 100% !important;
  height: 100%;
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
