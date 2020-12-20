<template>
  <div class="rightArea">
    <h1>保证金缴纳确认</h1>
    <search-form ref="searchForms" @searchFormFn="searchFormFn"></search-form>
    <div class="groupBtn">
      <el-button
        v-if="hasQx('aph2_tender_BZJJNQR-QX-C19')"
        size="mini"
        type="primary"
        @click="searchListBtn"
      >查询</el-button>
      <el-button
        v-if="hasQx('aph2_tender_BZJJNQR-QX-C19')"
        size="mini"
        type="primary"
        @click="resetListBtn"
      >重置</el-button>
      <el-button
        v-if="hasQx('aph2_tender_BZJJNQR-QX-C30')"
        size="mini"
        type="primary"
        @click="whCandidate"
      >保证金缴纳确认</el-button>
      <!-- <el-button size="mini" type="primary" @click="backBail">保证金退回确认</el-button> -->
    </div>
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="tenderBailList"
      border
      size="mini"
      tooltip-effect="dark"
      style="width: 98%; margin: 0 auto;"
      @selection-change="tableSearchFn"
    >
      <el-table-column align="center" type="selection" width="50"></el-table-column>
      <el-table-column label="序号" width="50" type="index" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="commName" label="业务单元"></el-table-column>
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
      <el-table-column label="招标状态">
        <template slot-scope="scope">
          <div v-if="scope.row.tenderFileStatus == 'lost'">
            <span v-if="scope.row.tenderScheduleStatus == 'tenderLost'">流标</span>
            <span
              v-if="scope.row.tenderScheduleStatus == 'tenderCandidateApprovePASS'"
            >投标候选人审定完成(流标)</span>
            <span v-if="scope.row.tenderScheduleStatus == 'tenderBailDraft'">保证金缴纳待确认(流标)</span>
            <span v-if="scope.row.tenderScheduleStatus == 'tenderBailSubmit'">保证金缴纳已确认(流标)</span>
            <span v-if="scope.row.tenderScheduleStatus == 'CandidateTemporary'">投标候选人暂存(流标)</span>
          </div>
          <div v-if="scope.row.tenderFileStatus != 'lost'">
            <span v-if="scope.row.tenderScheduleStatus == 'tenderLost'">流标</span>
            <span v-if="scope.row.tenderScheduleStatus == 'tenderCandidateApprovePASS'">投标候选人审定完成</span>
            <span v-if="scope.row.tenderScheduleStatus == 'tenderBailDraft'">保证金缴纳待确认</span>
            <span v-if="scope.row.tenderScheduleStatus == 'tenderBailSubmit'">保证金缴纳已确认</span>
            <span v-if="scope.row.tenderScheduleStatus == 'CandidateTemporary'">投标候选人暂存</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination-z :total="total" :fromWhere="fromWhere" @fatherMethod="fatherMethod"></pagination-z>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guaranteeAmountData: {
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commCode: "", // 业务单元
        page: 1,
        size: 10
      },
      tenderBailList: [],
      selectList: [],
      fromWhere: "tenderBail",
      sso_sessionid: this.$store.state.sso_sessionid,
      total: 10,
      tenderBailCodes: ""
    };
  },
  mounted() {
    this.getTenderByBail(this.guaranteeAmountData);
  },
  methods: {
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    // 搜索表单回调
    searchFormFn(obj) {
      Object.assign(this.guaranteeAmountData, obj);
    },
    //  表格勾选事件
    tableSearchFn(v) {
      this.selectList = v;
      if (v.length == 0) return false;
      var arr = [];
      for (var i = 0; i < v.length; i++) {
        arr.push("'" + v[i].tenderCode + "'");
      }
      this.tenderBailCodes = arr.join(",");
    },
    // 分页回调函数
    fatherMethod(page, size) {
      this.guaranteeAmountData.page = page;
      this.guaranteeAmountData.size = size;
      this.getTenderByBail(this.guaranteeAmountData);
    },
    // 查询按钮
    searchListBtn() {
      this.guaranteeAmountData.page = 1;
      this.getTenderByBail(this.guaranteeAmountData);
    },
    //  重置
    resetListBtn() {
      this.guaranteeAmountData = {
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commCode: "", // 业务单元
        page: 1,
        size: 10
      };
      this.$refs.searchForms.resetFn();
      this.getTenderByBail(this.guaranteeAmountData);
    },
    // 查询
    getTenderByBail(params) {
      this.$api.modular
        .getTenderByBail(this.sso_sessionid, params)
        .then(res => {
          this.tenderBailList = res.data.data;
          this.total = Number(res.data.count);
        })
        .catch(() => {});
    },
    // 退回
    backBail() {
      // var params = {
      //   tenderBailCodes: this.tenderBailCodes
      // }
      // this.$api.modular
      //   .tenderBailBack(this.sso_sessionid, params)
      //   .then(res => {
      //   })
      this.whCandidate("T");
    },
    // 保证金缴纳确认
    whCandidate(type) {
      // this.commonFn.routerProcess(this.selectList, 2, this);
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
              var status = res.data.data[0].TENDER_SCHEDULE_STATUS;
              var num = res.data.data[0].TENDER_ROW_NUM;
              if (num > 5) {
                num = num - 1;
              }
              var href = this.commonFn.routerProcess(
                this.selectList,
                2,
                this,
                type,
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
                  this.getTenderByBail(this.guaranteeAmountData);
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
</style>
