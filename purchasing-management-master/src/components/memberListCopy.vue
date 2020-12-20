<template>
  <div class="memberListVal" v-if="memberListCopy.isShow">
    <el-dialog
      title="执行人分配列表"
      :visible.sync="memberListCopy.isShow"
      width="800px"
      append-to-body
      top="6vh"
      class="dialogBox"
      @close="closePeople"
      close-on-click-modal
      show-close
    >
      <el-form :model="searchData" @submit.native.prevent>
        <el-form-item label="姓名">
          <el-input size="mini" v-model="searchData.groupPersonName" @keyup.enter.native="chaxunFn" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="chaxunFn">查询</el-button>
          <el-button size="mini" type="primary" @click="resetFn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="xmlb">
        <el-table
          size="mini"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          :data="searchList"
          border
          :row-key="getRowKey"
          ref="grouppeopleList"
          @selection-change="selectFn"
        >
          <el-table-column :reserve-selection="true" type="selection" width="50"></el-table-column>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="groupPersonName" label="姓名"></el-table-column>
        </el-table>
      </div>

      <!-- <pagination-z :total="total" :fromWhere="fromWhere" @fatherMethod="fatherMethod"></pagination-z> -->
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closePeople">取 消</el-button>
        <el-button size="mini" type="primary" @click="setValue" :disabled="jinzhiClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import axiostest from "axios";
import { Loading } from "element-ui";
export default Vue.component("member-listCopy", {
  props: {
    memberListCopy: {
      type: Object,
      default: {
        isShow: false,
        type: "",
        isleader: false,
        selectArr: [],
        tenderProjectCode: ""
      }
    },
    fromWhere: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchData: {
        page: 1,
        max: 10,
        groupPersonName: "",
        groupPersonBy: "",
        projectCode: '',
        groupCode: ''
      },
      sso_sessionid: this.$store.state.sso_sessionid,
      defaultProps: {
        children: "children",
        label: "segmentDesc"
      },
      choseVal: {},
      selectVal: "",
      selectValName: "",
      searchList: [],
      total: 0,
      jkSaveData: {
        leaders: "",
        deputyHeads: "",
        members: ""
      },
      selectList: [],
      jinzhiClick: true,
      source: null
    };
  },
  watch: {
    memberListCopy: {
      handler(newVal, oldVal) {
        var that = this;
        if (newVal.isShow) {
          that.selectList = newVal.selectArr;
          if (that.selectList) {
            that.toggleSelection(that.selectList);
          }
          this.searchData = {
            page: 1,
            max: 10,
            groupPersonName: "",
            groupPersonBy: "",
            projectCode: newVal.tenderProjectCode,
            groupCode: ''
          };
          this.searchList = [];
          this.chaxunFn();
        }
      },
      deep: true
    }
  },

  mounted() {},
  methods: {
    fatherMethod(page, size) {
      this.searchData.max = size;
      this.searchData.page = page;
      this.chaxunFn();
    },
    resetFn(){
      this.searchData.groupPersonName = '';
      this.searchData.page = 1;
      this.searchData.max = 10;
      this.chaxunFn();
    },
    chaxunFn() {
      if (this.memberListCopy.isShow) {
        this.jinzhiClick = true;
        var loading = Loading.service({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
      }
      // this.source = axiostest.CancelToken.source();
      var that = this;
      that.searchData.page = 1;
      that.$api.modular
        .getGroupNameByCode(
          that.sso_sessionid,
          that.searchData
          // this.source.token
        )
        .then(res => {
          if (res.status == 200) {
            that.searchList = res.data.data;
            if (loading) {
              loading.close();
            }
            this.jinzhiClick = false;
            that.total = res.data.pages.dataNumber;
            // that.toggleSelection(that.searchList, that.selectList);
          } else {
            this.$message.error("请求超时！");
          }
        })
        .catch(res => {
          if (loading) {
            loading.close();
          }
        });
    },
    toggleSelection(rows) {
      if (rows.length != 0) {
        this.$nextTick(function() {
          rows.forEach(row => {
            this.$refs.grouppeopleList.toggleRowSelection(row);
          });
        });
      } else {
        // this.$refs.grouppeopleList.clearSelection();
      }
    },
    closePeople() {
      // this.source.cancel();
      this.$refs.grouppeopleList.clearSelection();
      this.memberListCopy.isShow = false;
    },
    setValue() {
      if (!this.selectList) {
        this.$message.error("请至少选择选择一位职员！");
        return false;
      }
      if (this.selectList.length == 0 || !this.selectList) {
        this.$message.error("请至少选择选择一位职员！");
        return false;
      }
      var list = [];
      for(var i in this.selectList){
        for(var j in this.searchList){
          if(this.selectList[i].groupPersonBy == this.searchList[j].groupPersonBy){
            list.push(this.selectList[i]);
          }
        }
      }
      this.selectFn(list);
      if (this.memberListCopy.isleader) {
        if (this.selectList.length == 1) {
          this.$emit(
            "memberListCopyFn",
            this.selectList,
            this.selectVal,
            this.selectValName
          );
          this.memberListCopy.isShow = false;
        } else {
          this.$message.error("当前级别只可选择一位职员！");
        }
      } else {
        this.$emit(
          "memberListCopyFn",
          this.selectList,
          this.selectVal,
          this.selectValName
        );
        console;
        this.memberListCopy.isShow = false;
      }
      //   this.$refs.grouppeopleList.clearSelection();
    },

    getRowKey(row) {
      return row.groupPersonBy;
    },
    selectFn(v) {
      this.selectList = v;
      var arr = [];
      var arr2 = [];
      for (var i = 0; i < v.length; i++) {
        var groupPersonBy = v[i].groupPersonBy || '-1';
        arr.push(v[i].groupCode + ":" + groupPersonBy + ":" + v[i].groupPersonName);
        arr2.push(v[i].groupPersonName);
      }
      this.selectVal = arr.toString();
      this.selectValName = arr2.toString();
    },
    choseNode(v) {
      this.choseVal = v;
    },
    // 合并数组
    MergeArray(arr1, arr2) {
      var _arr = new Array();
      for (var i = 0; i < arr1.length; i++) {
        _arr.push(arr1[i]);
      }
      for (var i = 0; i < arr2.length; i++) {
        var flag = true;
        for (var j = 0; j < arr1.length; j++) {
          if (arr2[i] == arr1[j]) {
            flag = false;
            break;
          }
        }
        if (flag) {
          _arr.push(arr2[i]);
        }
      }
      return _arr;
    }
  }
});
</script>

<style scoped>
.dialogBox .el-form-item {
  width: 20%;
  float: left;
  margin-left: 28px;
  margin-bottom: 12px;
}
.dialogBox .el-input {
  width: 66% !important;
}
</style>
