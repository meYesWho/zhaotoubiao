<template>
  <div style="background: #fff;padding-bottom:2px;">
    <supplier-header></supplier-header>
    <div class="main">
      <div class="suppierListTitle">
        <span>招标公告</span>
      </div>
      <div class="searchMain">
        <el-form :inline="true" :model="tenderFileListData" size="small" class="searchDataFrom">
          <el-form-item label="招标名称">
            <el-input v-model="tenderFileListData.tenderName" placeholder="招标信息"></el-input>
          </el-form-item>
          <el-form-item label="招标类别">
            <el-select v-model="tenderFileListData.itemScoreCode" placeholder="招标类别">
              <el-option
                v-for="item in options"
                :key="item.itemScoreCode"
                :label="item.itemScoreName"
                :value="item.itemScoreCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">搜索</el-button>
            <el-button type="primary" @click="onSearch('reset')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tenderFileList" size="small" class="tableMain" border>
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column label="招标名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="cursor: pointer;color:blue;" @click="lookDetail(scope.row)">{{scope.row.TENDER_NAME}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布日期" width="140" align="center">
          <template slot-scope="scope">
            <span>{{dateFn(scope.row.RELEASEDATE)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="报名截止日期" width="140" align="center">
          <template slot-scope="scope">
            <span>{{dateFn(scope.row.SUBMIT_TENDER_DOCUMENT_END)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ITEM_SCORE_NAME" label="招标类别" align="center">
        </el-table-column>
      </el-table>
      <el-pagination
        class="fenye"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <gg-detail :detailData='detailData'></gg-detail>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      currentPage4: 4,
      searchData: {
        type: "",
        info: ""
      },
      detailData: {
        isShow: false,
        code: ''
      },
      tenderFileList: [],
      tenderFileListData: {
        pageNum: 1,
        pageSize: 10,
        tenderFileCode: '',
        tenderName: '',
        itemScoreCode: ''
      },
      total: 0,
      userInfo: {},
      options: [],
    };
  },
  mounted() {
    this.tenderFileListFn();
    this.getItemScoreLook();
    this.userInfo = JSON.parse(sessionStorage.getItem('supplierLoginInfo'));
  },
  methods: {
    getItemScoreLook(){
      this.$api.modular.getItemScoreLook().then(res => {
        if(res.status == 200){
          if(res.data.returnCode == 0){
            this.options = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      })
    },
    tenderFileListFn(){
      this.$api.modular.tenderFileList(this.tenderFileListData).then(res => {
        if(res.status == 200){
          if(res.data.returnCode == 0){
            this.tenderFileList = res.data.data;
            this.total = Number(res.data.count);
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      })
    },
    lookDetail(row){
      if (!this.userInfo) {
        this.$message({
          message: "请先登录！",
          type: 'error'
        });
        return false;
      }
      this.detailData.isShow = true;
      this.detailData.code = row.TENDER_FILE_CODE;
    },
    handleSizeChange(val) {
      this.tenderFileListData.pageSize = val;
      this.tenderFileListFn();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.tenderFileListData.pageNum = val;
      this.tenderFileListFn();
    },
    onSearch(v) {
      if(v == 'reset'){
        this.tenderFileListData = {
          pageNum: 1,
          pageSize: 10,
          tenderFileCode: '',
          tenderName: '',
          itemScoreCode: ''
        }
      }
      this.tenderFileListFn();
    },
    dateFn(date){
      return this.formatDate(date);
    },
    formatDate(value) {
      if (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        let h = date.getHours();
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes();
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds();
        s = s < 10 ? "0" + s : s;
        return y + "-" + MM + "-" + d;
      } else {
        return "";
      }
    }
  }
};
</script>
<style>
.main {
  width: 900px;
  margin: 20px auto;
}
.suppierListTitle {
  height: 42px;
  line-height: 42px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  font-size: 14px;
}
.suppierListTitle span {
  background-color: #cf001b;
  color: #fff;
  float: left;
  height: 42px;
  padding: 0 20px;
}
.tableMain {
  margin-top: 20px;
}
.fenye {
  text-align: right;
  margin-top: 15px;
}
.el-pager li.active,
.el-pager li:hover,
.el-pagination button:hover,
.el-select-dropdown__item.selected {
  color: #cf001b;
}
.el-pagination__sizes .el-input .el-input__inner:hover,
.el-select .el-input.is-focus .el-input__inner {
  border-color: #cf001b;
}
.el-select .el-input__inner:focus{
    border-color: #cf001b;
}
.el-input__inner:focus {
  border-color: #cf001b;
}
.el-pager li:hover {
  cursor: pointer;
}
.searchDataFrom{
    float: left;
    margin-top:20px;
}
</style>
