<template>
  <div class="increaseSupplier" v-if="supplierData.isShow">
    <el-dialog
      title="选择供应商"
      :visible.sync="supplierData.isShow"
      width="800px"
      append-to-body
      top="5vh"
      class="dialogBox"
      @close="closePeople"
      close-on-click-modal
      show-close
    >
      <el-form :model="searchData">
        <el-form-item label="供应商名称">
          <el-input size="mini" v-model="searchData.supplierName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商类别">
          <el-input
            size="mini"
            v-model="searchData.categoryName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="服务类型">
          <el-input
            size="mini"
            v-model="searchData.servecategoryNames"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="flaot: right;">
          <el-button size="mini" type="primary" @click="chaxunFn">查询</el-button>
          <el-button size="mini" type="primary" @click="resetChaxun">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="xmlb">
        <el-table
          size="mini"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          :data="supplierList"
          border
          max-height="300"
          :row-key="getRowKey"
          ref="supplierList"
          @selection-change="selectFn"
        >
          <el-table-column fixed  :selectable="checkSelectable" :reserve-selection="true" type="selection" width="40" align="center"></el-table-column>
          <el-table-column fixed label="序号" type="index" align="center"></el-table-column>
          <el-table-column prop="supplierNumber" label="供应商编号" width="130" align="center"></el-table-column>
          <el-table-column prop="supplierName" label="供应商名称" width="150"></el-table-column>
          <el-table-column prop="categoryName" label="供应商类别" width="120"></el-table-column>
          <el-table-column prop="staffName" label="服务类型"></el-table-column>
          <el-table-column prop="companyRankName" label="供应商星级" width="120"></el-table-column>
          <el-table-column label="创建日期" width="100" align="center">
            <template slot-scope="scope">
              {{createdDate(scope.row)}}
            </template>
          </el-table-column>
          <el-table-column prop="staffName" label="企业类别"></el-table-column>
          <el-table-column prop="cooperateStatusName" label="合作状态"></el-table-column>
        </el-table>
      </div>

      <pagination-z :total="total" :fromWhere="fromWhere" @fatherMethod="fatherMethod"></pagination-z>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closePeople">取 消</el-button>
        <el-button size="mini" type="primary" @click="setValue">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.component("increase-supplier", {
  props: {
    supplierData: {
      type: Object,
      default: {
        isShow: false,
        selectArr: [],
        dataList: [],
        type: ''
      }
    }
  },
  watch: {
    supplierData: {
      handler(newVal, oldVal) {
        var that = this;
        if (newVal.isShow) {
          that.selectList = newVal.selectArr;
          that.chaxunFn();
          if (that.selectList) {
            that.toggleSelection(that.selectList);
          }
        }
      },
      deep: true
    }
  },
  data() {
    return {
      sso_sessionid: this.$store.state.sso_sessionid,
      searchData: {
        token: "93388744142ea9fdb65e742b6d7805d8",
        pageNum: 1,
        pageSize: 10,
        supplierName: "",
        categoryName: "",
        servecategoryNames: "",
        supplierCode: ""
      },
      fromWhere: 'supplier',
      searchList: [],
      selectList: [],
      total: 0,
      supplierList: []
    };
  },

  mounted() {
    this.chaxunFn();
  },
  methods: {
    
    checkSelectable(row){
      if(this.supplierData.dataList.length>0){
        for(var i = 0; i<this.supplierData.dataList.length; i++){
          if(this.supplierData.dataList[i].supplierCode == row.supplierCode){
            return false;
          }
        }
        return true;
      } else {
        return true;
      }
    },
    createdDate(row){
      return this.commonFn.formatDate(
        row.createdDate.time
      );
    },
    fatherMethod(page, size) {
      this.searchData.pageSize = size;
      this.searchData.pageNum = page;
      this.chaxunFn();
    },
    resetChaxun(){
      this.searchData = {
        token: "93388744142ea9fdb65e742b6d7805d8",
        pageNum: 1,
        pageSize: 10,
        supplierName: "",
        categoryName: "",
        servecategoryNames: "",
        supplierCode: ""
      },
      this.chaxunFn();
    },
    chaxunFn() {
      var that = this;
      that.$api.modular
        .getSupplierByMaterialCateGory(that.sso_sessionid, that.searchData)
        .then(res => {
          // 执行某些操作
          if (res.status == 200) {
            // that.searchList = res.data.data;
            if(res.data.returnCode == 0){
              that.supplierList = res.data.data;
              that.total = Number(res.data.count);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
              this.$message.error(res.message);
            }
        });
    },
    closePeople() {
      this.supplierData.isShow = false;
      this.$refs.supplierList.clearSelection();
    },
    setValue() {
      if(this.selectList.length == 0){
        this.$message.error('不能为空！');
        return false;
      }
      if(this.supplierData.type == 'only'){
        if(this.selectList.length != 1){
          this.$message.error('中标人只能选择一个！');
          return false;
        }
      }
      this.$emit(
        "supplierDataFn",
        this.selectList
      );
      this.supplierData.isShow = false;
      this.$refs.supplierList.clearSelection();
    },

    getRowKey(row) {
      return row.supplierCode;
    },
    // 选中
    selectFn(v) {
      if(v.length > 1){
        for(var a = 0; a<v.length; a++){
          for(var b = 0; b<v.length; b++){
            if(a != b){
              if(v[a].supplierCode == v[b].supplierCode){
                this.$message.error('已选供应商重复！');
                var arr = [];
                arr.push(v[v.length-1]);
                this.toggleSelection(arr);
                return false;
              }
            }
          }
        }
      }
      this.selectList = v;
    },
    // 手动选中  回显
    toggleSelection(rows) {
      if (rows.length != 0) {
        this.$nextTick(function() {
          rows.forEach(row => {
            this.$refs.supplierList.toggleRowSelection(row);
          });
        });
      } else {
        // this.$refs.grouppeopleList.clearSelection();
      }
    },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dialogBox .el-form-item {
  width: 22%;
  float: left;
  margin-left: 3%;
}

.dialogBox .el-input {
  width: 50% !important;
}
</style>
