<template>
  <div class="rightArea">
    <div class="mengceng" v-if="mengcengShow" @click="resetListBtn"></div>
    <h1>开商务标</h1>
    <search-form ref="searchForms" @searchFormFn="searchFormFn"></search-form>
    <div class="groupBtn">
      <el-button v-if="hasQx('aph2_tender_KSWB-QX-C19')" size="mini" type="primary" @click="searchListBtn">查询</el-button>
      <el-button v-if="hasQx('aph2_tender_KSWB-QX-C19')" size="mini" type="primary" @click="resetListBtn">重置</el-button>
      <el-button v-if="hasQx('aph2_tender_KSWB-QX-C11')" size="mini" type="primary" @click="kai">开商务标</el-button>
    </div>
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="businessBidList"
      border
      size="mini"
      tooltip-effect="dark"
      style="width: 98%; margin: 0 auto;"
      @selection-change="tableSearchFn"
    >
      <el-table-column align="center" type="selection" width="50"></el-table-column>
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="commName" label="业务单元" show-overflow-tooltip></el-table-column>
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
            <span v-if="!scope.row.tenderScheduleStatus">待开商务标(流标)</span>
            <span v-if="scope.row.tenderScheduleStatus == 'tenderOpenBusiness'">开商务标(流标)</span>
            <span v-if="scope.row.tenderScheduleStatus == 'completeEvaluationTechnical'">完成评技术标评标报告(流标)</span>
            <span v-if="scope.row.tenderScheduleStatus == 'tenderCompleteOpenBusiness'">完成开商务标(流标)</span>
            <span v-if="scope.row.tenderScheduleStatus == 'completeTenderBusinessNegotiation'">完成商务谈判(流标)</span>
            <span v-if="scope.row.tenderScheduleStatus == 'openEvaluationBusiness'">启动评商务标(流标)</span>
            <span v-if="scope.row.tenderScheduleStatus == 'completeEvaluationBusiness'">完成评商务标(流标)</span>
          </div>
          <div v-if="scope.row.tenderFileStatus != 'lost'">
              <span v-if="scope.row.tenderScheduleStatus == 'tenderLost'">流标</span>
            <span v-if="!scope.row.tenderScheduleStatus">待开商务标</span>
            <span v-if="scope.row.tenderScheduleStatus == 'tenderOpenBusiness'">开商务标</span>
            <span v-if="scope.row.tenderScheduleStatus == 'completeEvaluationTechnical'">完成评技术标评标报告</span>
            <span v-if="scope.row.tenderScheduleStatus == 'tenderCompleteOpenBusiness'">完成开商务标</span>
            <span v-if="scope.row.tenderScheduleStatus == 'completeTenderBusinessNegotiation'">完成商务谈判</span>
            <span v-if="scope.row.tenderScheduleStatus == 'openEvaluationBusiness'">启动评商务标</span>
            <span v-if="scope.row.tenderScheduleStatus == 'completeEvaluationBusiness'">完成评商务标</span>
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
      businessBidData: {
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commCode: "", // 业务单元
        page: 1,
        size: 10
      },
      businessBidList: [],
      fromWhere: "businessBid",
      sso_sessionid: this.$store.state.sso_sessionid,
      total: 0,
      selectList: [],
      mengcengShow: false,
    };
  },
  mounted() {
    this.getOpenBusinessList(this.businessBidData);
  },
  methods: {
    hasQx(value){
      return this.commonFn.hasQx(value, this);
    },
    // 搜索表单回调
    searchFormFn(obj) {
      Object.assign(this.businessBidData, obj);
    },
    //  表格勾选事件
    tableSearchFn(arr) {
      this.selectList = arr;
    },
    // 分页回调函数
    fatherMethod(page, size) {
      this.businessBidData.page = page;
      this.businessBidData.size = size;
      this.getOpenBusinessList(this.businessBidData);
    },
    // 查询按钮
    searchListBtn() {
      this.businessBidData.page = 1;
      this.getOpenBusinessList(this.businessBidData);
    },
   //  重置
    resetListBtn() {
      this.businessBidData = {
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commCode: "", // 业务单元
        page: 1,
        size: 10
      };
      this.$refs.searchForms.resetFn();
        this.mengcengShow = false;
      this.getOpenBusinessList(this.businessBidData);
    },
    // 查询
    getOpenBusinessList(params) {
      this.$api.modular
        .getOpenBusinessList(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.businessBidList = res.data.data;
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

    // 开商务标
    kai() {
      if (this.selectList.length != 1) {
          this.$message.error("请选择单个项目");
          return false;
        }
        var params = {
          tenderFileCode: this.selectList[0].tenderFileCode
        };
        this.$api.modular
          .getScheduleMax(this.sso_sessionid, params)
          .then(res => {
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
                    8,
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
                      this.getOpenBusinessList(this.businessBidData);
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
      // this.commonFn.routerProcess(this.selectList, 8, this);
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
