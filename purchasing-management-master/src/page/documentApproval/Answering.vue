<template>
  <div class="rightArea">
    <div class="mengceng" v-if="mengcengShow" @click="resetListBtn"></div>
    <h1>招标文件答疑</h1>
    <search-form ref="searchForms" @searchFormFn="searchFormFn"></search-form>
    <div class="groupBtn">
      <el-button
        v-if="hasQx('aph2_tender_ZBWJDY-QX-C19')"
        size="mini"
        type="primary"
        @click="searchListBtn"
      >查询</el-button>
      <el-button
        v-if="hasQx('aph2_tender_ZBWJDY-QX-C19')"
        size="mini"
        type="primary"
        @click="resetListBtn"
      >重置</el-button>
      <el-button
        v-if="hasQx('aph2_tender_ZBWJDY-QX-C11')"
        size="mini"
        type="primary"
        @click="tenderAnswer"
      >招标文件答疑</el-button>
    </div>
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="answerList"
      border
      size="mini"
      tooltip-effect="dark"
      style="width: 98%; margin: 0 auto;"
      @selection-change="tableSearchFn"
    >
      <el-table-column align="center" type="selection" width="50"></el-table-column>
      <el-table-column label="序号" width="50" type="index" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="commName" label="业务单元"></el-table-column>
      <el-table-column show-overflow-tooltip prop="tenderName" label="招标项目名称"></el-table-column>
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
            <span v-if="scope.row.tenderScheduleStatus == 'tenderFileRelease'">招标文件已发布(流标)</span>
            <span v-if="!scope.row.tenderScheduleStatus">招标答疑文件待答疑(流标)</span>
            <span v-if="scope.row.tenderScheduleStatus == 'tenderFileAnswer'">招标答疑文件完成答疑(流标)</span>
          </div>
          <div v-if="scope.row.tenderFileStatus != 'lost'">
            <span v-if="scope.row.tenderScheduleStatus == 'tenderLost'">流标</span>
            <span v-if="scope.row.tenderScheduleStatus == 'tenderFileRelease'">招标文件已发布</span>
            <span v-if="!scope.row.tenderScheduleStatus">招标答疑文件待答疑</span>
            <span v-if="scope.row.tenderScheduleStatus == 'tenderFileAnswer'">招标答疑文件完成答疑</span>
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
      answerData: {
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commCode: "", // 业务单元
        page: 1,
        size: 10
      },
      answerList: [],
      fromWhere: "documentApprovalHome",
      sso_sessionid: this.$store.state.sso_sessionid,
      total: 0,
      selectList: [],
      tenderFileAnswer: false,
      mengcengShow: false
    };
  },
  mounted() {
    this.getTenderByAnswer(this.answerData);
  },
  methods: {
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    // 搜索表单回调
    searchFormFn(obj) {
      Object.assign(this.answerData, obj);
    },
    //  表格勾选事件
    tableSearchFn(arr) {
      this.selectList = arr;
    },
    // 分页回调函数
    fatherMethod(page, size) {
      this.answerData.page = page;
      this.answerData.size = size;
      this.getTenderByAnswer(this.answerData);
    },
    // 查询按钮
    searchListBtn() {
      this.answerData.page = 1;
      this.getTenderByAnswer(this.answerData);
    },
    //  重置
    resetListBtn() {
      this.answerData = {
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commCode: "", // 业务单元
        page: 1,
        size: 10
      };
      this.$refs.searchForms.resetFn();
      this.mengcengShow = false;
      this.getTenderByAnswer(this.answerData);
    },
    // 查询
    getTenderByAnswer(params) {
      this.$api.modular
        .getTenderByAnswer(this.sso_sessionid, params)
        .then(res => {
          this.answerList = res.data.data;
          this.total = Number(res.data.count);
        })
        .catch(() => {});
    },

    // 答疑
    tenderAnswer() {
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
                4,
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
                  this.getTenderByAnswer(this.answerData);
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
      // this.commonFn.routerProcess(this.selectList, 4, this);
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
