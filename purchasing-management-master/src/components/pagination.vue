<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.component("pagination-z", {
  props: {
    fromWhere: {
        type: String,
        default: ''
    },
    total: {
        type: Number,
        default: 100
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 10
    };
  },
  methods: {
    // 分页事件
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit('fatherMethod', val, this.pageSize);
    },
    handleSizeChange(val) {
        this.pageSize = val;
      this.$emit('fatherMethod', this.currentPage, val);
    }
  },
  mounted() {
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.block{
  height: 32px;
}
.el-pagination{
  border: 1px solid #ccc;
    width: auto;
    float: right;
    background: #fff;
    padding: 0;
    margin-right: 1%;
}
.el-pagination .el-pager li{
    border-right: 1px solid rgb(214, 199, 199)!important;
    margin: 0!important;
    border-radius: 0!important;
    background-color: #fff!important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #cb1235!important;
}
.el-pagination.is-background .btn-prev{
  border-right: 1px solid #ccc;
}
.el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next{
  margin: 0;
  background-color: #fff;
}
.el-pagination__total{
  margin: 0;
  padding: 0 6px;
      border-right: 1px solid #ccc;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover{
  color: #cb1235;
}
.el-pagination.is-background .el-pager li:not(.disabled).active:hover{
  color: #fff;
}
</style>
