<template>
  <div class="ProcurementGroup rightArea">
    <h1>添加专项采购小组</h1>
    <related-items ref="related_items" :relatedItems="relatedItems" @setItemName="setItemName"></related-items>
    <el-form :inline="true" class="demo-form-inline" id="myPanel" style="text-align:left;">
      <el-form-item label="公司/项目" v-if="hasQx('aph2_tender_ZXCGXZ-QX-C19')">
        <el-input
          class="xl el-input--mini"
          @focus="showTree"
          clearable
          :readonly="true"
          @change="xmchange"
          v-model="projectName"
          placeholder
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="hasQx('aph2_tender_ZXCGXZ-QX-C19')" type="primary" size="mini" @click="onSubmit">查询</el-button>
        <el-button v-if="hasQx('aph2_tender_ZXCGXZ-QX-C51')" type="primary" size="mini" @click="resetBtn">重置</el-button>
        <el-button v-if="hasQx('aph2_tender_ZXCGXZ-QX-C11')" type="primary" size="mini" @click="addgroup">添加专项采购组</el-button>
        <el-button v-if="hasQx('aph2_tender_ZXCGXZ-QX-C14')" type="primary" size="mini" @click="changeGropu">修改</el-button>
        <el-button v-if="hasQx('aph2_tender_ZXCGXZ-QX-C12')" type="primary" size="mini" @click="delectFn">删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="peopleList"
      border
      size="mini"
      tooltip-effect="dark"
      style="width: 98%; margin: 0 auto;margin-top:20px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="50"></el-table-column>
      <el-table-column align="center" label="序号" width="60" type="index"></el-table-column>
      <el-table-column prop="projectName" label="公司/项目名称" width="360"></el-table-column>
      <el-table-column prop="leaderName" label="采购组组长" width="120"></el-table-column>
      <el-table-column prop="deputyHeadName" label="采购组副组长" width="120"></el-table-column>
      <el-table-column prop="memberName" label="采购组成员" width></el-table-column>
    </el-table>
    <pagination-z :total="total" :fromWhere="fromWhere" @fatherMethod="fatherMethod"></pagination-z>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      relatedItems: {
        // 选择项目参数
        isShow: false,
        currentKey: ""
      },
      fromWhere: "ProcurementGroupHome",
      searchData: {
        projectCode: "",
        size: 10,
        page: 1
      },
      projectName: "",
      projectInfo: {},
      total: 0,
      searchVal: "",
      peopleList: [],
      multipleSelection: "",
      selectionArr: [],
      sso_sessionid: this.$store.state.sso_sessionid,
      count: 0
    };
  },
  mounted() {
    var sso_sessionid = this.$store.state.sso_sessionid;
    this.getList(sso_sessionid, this.searchData);
  },
  methods: {
    hasQx(value){
      return this.commonFn.hasQx(value, this);
    },
    // 获取列表
    getList(sso_sessionid, projectCode) {
      this.$api.modular.getListByObj(sso_sessionid, projectCode).then(res => {
        // 执行某些操作
        if (res.status == 200) {
          this.peopleList = res.data.data;
          if(isNaN(Number(res.data.count))){
            this.total = 0;
          } else {
            this.total = Number(res.data.count);
          }
        } else {
          this.$message.error("错了哦，这是一条错误消息");
        }
      });
    },
    // 查询
    onSubmit() {
      var that = this;
      this.searchData.size = 10;
      this.searchData.page = 1;
      that.getList(that.sso_sessionid, that.searchData);
    },
    // 分页回调函数
    fatherMethod(page, size) {
      this.searchData.size = size;
      this.searchData.page = page;
      this.getList(this.sso_sessionid, this.searchData);
    },
    // 选择项目回调函数
    setItemName(value) {
      this.projectName = value.costCenterName;
      this.searchData.projectCode = value.costCenterCode;
      this.relatedItems.currentKey = value.costCenterCode;
      this.projectInfo = value;
    },
    // 重置
    resetBtn() {
      var that = this;
      that.searchVal = "";
      that.projectName = "";
      that.searchData = {
        projectCode: "",
        size: 10,
        page: 1
      };
      that.getList(that.sso_sessionid, that.searchData);
    },
    // 删除
    async delectFn() {
      var row = this.multipleSelection;
      if (row) {
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
      } else {
        this.$message.error("请选择小组后再删除");
      }
    },
    delBtnFn(row) {
      this.$api.modular
        .deleteGroup(this.sso_sessionid, row)
        .then(res => {
          if(res.data.returnCode == 0){
            var arr = row.split(',');
            if(this.peopleList.length == arr.length){
              if(this.searchData.page>1){
                this.searchData.page = this.searchData.page-1;
              }
            }
            this.getList(this.sso_sessionid, this.searchData);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
        });
    },
    // 添加小组
    addgroup() {
      this.$router.push({ path: "/addgroup" });
    },
    // 修改小组
    changeGropu() {
      var that = this;
      if (that.selectionArr.length != 1) {
        that.$message.error("请选择单个小组进行修改！");
      } else {
        var val = JSON.stringify(that.selectionArr[0]);
        this.$router.push({ name: "addgroup", params: { value: val } });
      }
    },
    // 多选选中事件
    handleSelectionChange(val) {
      var arr = [];
      this.selectionArr = val;
      for (var i = 0; i < val.length; i++) {
        arr.push(val[i].groupHeadCode);
      }
      this.multipleSelection = arr.toString();
    },
    // 选择项目弹窗
    showTree() {
      this.relatedItems.isShow = true;
      this.relatedItems.type = 'two';
      var that = this;
      that.$nextTick(() => {
        that.$refs.related_items.choseNode(that.projectInfo);
      });
    },
    xmchange(v) {
      if (v == "") {
        this.searchData.projectCode = "";
      }
    }
  }
};
</script>

<style scoped>
.ProcurementGroup {
  background: #fff;
  width: 98%;
  margin: 0 auto;
  padding-bottom: 20px;
}
.el-form--inline .el-form-item {
  vertical-align: middle;
  margin: 10px;
}
</style>
