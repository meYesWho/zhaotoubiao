<template>
  <div class="rightArea">
    <h1>投标</h1>
    <el-form
      size="mini"
      :inline="true"
      label-width="100px"
      :model="startBidSearch"
      class="demo-form-inline"
    >
      <el-form-item label="招标项名称" style="float: left;">
        <el-input
          maxlength="10"
          style="display: inline-block;float: left;width:56%"
          v-model="startBidSearch.tenderName"
          placeholder="选择项目"
        ></el-input>
        <el-button
          style="display: inline-block;float: left;margin-left:10px;"
          type="primary"
          @click="searchFn"
        >查询</el-button>
        <el-button
          style="display: inline-block;float: left;margin-left:10px;"
          type="primary"
          @click="resetFn"
        >重置</el-button>
      </el-form-item>
      <el-form-item label="供应商名称：" style="float: right;">
        <span style="float:left;">{{supplierInfo.supplierName}}</span>
        <el-button
          @click="supplierLogout"
          style="display: inline-block;float: left;margin-left:10px;"
          type="primary"
        >退出登录</el-button>
      </el-form-item>
      <div style="clear: both"></div>
    </el-form>
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="mini"
      :data="bidList"
      border
      @selection-change="selectionFn"
      style="width: 98%;margin:0 auto;"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" align="center" width="52"></el-table-column>
      <el-table-column prop="TENDER_NAME" label="招标公告名称" width="210"></el-table-column>
      <el-table-column prop="TENDER_NUMBER" label="招标项目编号" width="210"></el-table-column>
      <!-- <el-table-column prop="s" label="状态" align="center" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.TENDER_STATUS == 'overReturn'">完成回标</span>
        </template>
      </el-table-column>-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini" @click="lookFn(scope.row, scope.$index)">查看招标文件</el-button> -->
          <el-button type="primary" size="mini" @click="downLoad(scope.row)">下载招标文件</el-button>
          <el-button type="primary" size="mini" @click="toBid(scope.row, scope.$index, 't')">投标</el-button>
          <el-button type="primary" size="mini" @click="toBid(scope.row, scope.$index, 'l')">查看投标信息</el-button>
          <el-button type="primary" size="mini" @click="thanks(scope.row, scope.$index)">感谢信</el-button>
        </template>
      </el-table-column>
    </el-table>
    <thanks-info :thanksInfo="thanksInfo"></thanks-info>
    <p>重要提示：投标文件上传完成后，投标人要下载投标文件并打开确认文件是否正常，避免开标过程中出现因投标文件损坏等异常而造成废标的情况。</p>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      // sso_sessionid: this.$store.state.sso_sessionid,
      startBidSearch: {
        tenderName: "",
        supplierCode: ""
      },
      bidList: [],
      selectList: [],
      supplierInfo: {},
      thanksInfo: {
        isShow: false,
        tenderName: "某某公司",
        supplierName: "某某招标项",
        date: "2019-10-01"
      }
    };
  },
  mounted() {
    this.supplierInfo = JSON.parse(sessionStorage.getItem("supplierInfo"));
    this.startBidSearch.supplierCode = this.supplierInfo.supplierCode;
    this.getTenderSubmitList();
  },
  beforeDestroy() {},
  methods: {
    thanks(row, index) {
      this.thanksInfo = {
        isShow: true,
        supplierName: row.SUPPLIER_NAME,
        tenderName: row.TENDER_NAME,
        date: "2019-10-01"
      }
    },
    downLoad(row) {
      if (row.SERVICE_FILE_CODE) {
        window.open(row.FILEURL);
      } else {
        this.$message.error("暂无招标文件");
      }
    },
    selectionFn(arr) {
      this.selectList = arr;
    },
    searchFn() {
      this.getTenderSubmitList();
    },
    supplierLogout() {
      sessionStorage.removeItem("supplierInfo");
      this.$router.push({
        path: "/supplierLogin"
      });
    },
    resetFn() {
      this.startBidSearch.tenderName = "";
      this.getTenderSubmitList();
    },
    getTenderSubmitList() {
      this.$api.modular.getTenderSubmitList(this.startBidSearch).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.bidList = res.data.data;
          } else {
            that.$message.error(res.data.message);
          }
        } else {
          that.$message.error(res.message);
        }
      });
    },
    // 投标
    toBid(row, index, type) {
      // if (this.selectList.length != 1) {
      //   this.$message.error("请选择且只能选择一个招标文件!");
      //   return false;
      // }
      this.$router.push({
        path: "/startBid2",
        query: {
          tenderFileCode: row.TENDER_FILE_CODE,
          tenderCandidateLineCode: row.TENDER_CANDIDATE_LINE_CODE,
          tenderName: row.TENDER_NAME,
          type: type
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
