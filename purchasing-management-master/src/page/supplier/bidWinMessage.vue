<template>
  <div style="background: #fff;padding-bottom:2px;">
        <supplier-header></supplier-header>
    <div class="main">
      <div class="suppierListTitle">
        <span>中标公告</span>
      </div>
      <el-table :data="tenderWinList" size="small" class="tableMain" border>
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="TENDER_NAME" label="招标项名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="SUPPLIER_NAME" label="中标单位名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="date" label="中标时间" width="180" align="center">
          <template slot-scope="scope">
            <span>{{dateFn(scope.row.TENDER_WIN_DATE)}}</span>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        class="fenye"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      currentPage: 1,
      tableData3: [],
      tenderWinList: [],
      tenderWinListData: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    };
  },
  mounted() {
    this.tenderWinListFn();
  },
  methods: {
    tenderWinListFn(){
      this.$api.modular.tenderWinList(this.tenderWinListData).then(res => {
        if(res.status == 200){
          if(res.data.returnCode == 0){
            this.total = Number(res.data.count);
            this.tenderWinList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      })
    },
    handleSizeChange(val) {
      this.tenderWinListData.pageSize = val;
      this.tenderWinListFn();
    },
    handleCurrentChange(val) {
      this.tenderWinListData.pageNum = val;
      this.tenderWinListFn();
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
    },
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
.fenye{
  margin-top: 20px;
}
</style>
