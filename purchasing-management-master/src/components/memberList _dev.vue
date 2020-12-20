<template>
  <div class="memberListVal" v-if="memberListVal.isShow">
    <el-dialog
      title="职员列表"
      :visible.sync="memberListVal.isShow"
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
          <el-input
            size="mini"
            v-model="searchData.staName"
            @keyup.enter.native="chaxunFn(searchData)"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="公司">
          <el-input size="mini" v-model="searchData.structureName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input size="mini" v-model="searchData.departmentName" auto-complete="off"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button size="mini" type="primary" @click="chaxunFn(searchData)">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="xmlb">
        <el-table
          size="mini"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          :data="showBigList"
          border
          :row-key="getRowKey"
          ref="grouppeopleList"
          @selection-change="selectFn"
        >
          <el-table-column
            :selectable="checkSelectable"
            :reserve-selection="true"
            type="selection"
            width="50"
          ></el-table-column>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="staffName" label="姓名"></el-table-column>
          <el-table-column prop="companyCodeValueDesc" label="公司"></el-table-column>
          <el-table-column prop="departmentName" label="部门"></el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
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
export default Vue.component("member-list", {
  props: {
    memberListVal: {
      type: Object,
      default: {
        isShow: false,
        type: "",
        isleader: false,
        selectArr: []
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
        token: "93388744142ea9fdb65e742b6d7805d8",
        page: 1,
        max: 10,
        staName: "",
        staffNumber: "",
        departmentName: "",
        structureName: "",
        username: ""
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
      source: null,
      selectArea: [],
      showBigList: [],
      showBigListBF: [],
      currentPage: 1,
      pageSize:10,
    };
  },
  watch: {
    memberListVal: {
      handler(newVal, oldVal) {
        var that = this;
        if (newVal.isShow) {
          that.selectList = newVal.selectArr;
          if (that.selectList) {
            that.toggleSelection(that.selectList);
            var len = that.selectList.length;
            for (var i = 0; i < len; i++) {
              this.searchList = [];
              var searchData = {
                token: "93388744142ea9fdb65e742b6d7805d8",
                page: 1,
                max: 10,
                staName: that.selectList[i].staffName,
                staffNumber: "",
                departmentName: "",
                structureName: "",
                username: that.selectList[i].username
              };
              this.chaxunFn(searchData, true);
            }
          } else {
            this.selectList = [];
          }
        }
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    AfterChangeData() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;
      let list = this.showBigListBF.slice(start, end);
      this.showBigList = [];
      this.showBigList = list;
    },
    checkSelectable(row) {
      if (row.username == "") {
        return false;
      } else {
        return true;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.AfterChangeData();
    },
    chaxunFn(searchData, first) {
      if (this.memberListVal.isShow) {
        this.jinzhiClick = true;
      }
      searchData.page = 1;
      this.$api.modular
        .getStaffListByName(this.sso_sessionid, searchData)
        .then(res => {
          if (res.status == 200) {
            this.searchList = [];
            this.searchList = res.data;
            var lenS = this.selectList.length;
            var lenS2 = this.searchList.length;
            if (first) {
              if (lenS > 0 && lenS2 > 0) {
                var arr = [];
                for (var s = 0; s < lenS; s++) {
                  for (var s2 = 0; s2 < lenS2; s2++) {
                    if (
                      this.selectList[s].username ==
                      this.searchList[s2].username
                    ) {
                      arr.push(this.searchList[s2]);
                    }
                  }
                }
                this.searchList = [];
                this.searchList = arr;
              }
              this.showBigListBF = this.showBigListBF.concat(this.searchList);
            } else {
              // this.selectList = this.showBigList;

              if (this.showBigListBF.length > 0 && this.selectList.length > 0) {
                for (var d = this.showBigListBF.length - 1; d > -1; d--) {
                  for (var x = this.selectList.length - 1; x > -1; x--) {
                    if (
                      this.showBigListBF[d].username ==
                      this.selectList[x].username
                    ) {
                      this.selectList[x] = this.showBigListBF[d];
                    }
                  }
                }
              }
              this.showBigListBF = [];
              if (lenS2 > 0 && lenS > 0) {
                for (var i = lenS - 1; i > -1; i--) {
                  if (this.searchList.length > 0) {
                    for (var j = lenS2 - 1; j > -1; j--) {
                      if (
                        this.selectList[i].username ==
                        this.searchList[j].username
                      ) {
                        this.searchList.splice(j, 1);
                      }
                    }
                  }
                }
              }

              this.showBigListBF = this.selectList.concat(this.searchList);
            }
            this.jinzhiClick = false;
            this.total = res.data.length;
            this.AfterChangeData();
          } else {
            this.$message.error("请求超时！");
          }
        })
        .catch(res => {
          // if (loading) {
          //   loading.close();
          // }
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
      this.showBigList = [];
      this.showBigListBF = [];
      this.$refs.grouppeopleList.clearSelection();
      this.memberListVal.isShow = false;
    },
    setValue() {
      this.$emit(
        "memberList",
        this.selectList,
        this.selectVal,
        this.selectValName
      );
      this.showBigList = [];
      this.showBigListBF = [];
      this.memberListVal.isShow = false;
    },

    getRowKey(row) {
      if (row.username == "") {
        return row.staffNumber;
      } else {
        return row.username;
      }
    },
    selectFn(v) {
      this.selectList = v;
      var arr = [];
      var arr2 = [];
      for (var i = 0; i < v.length; i++) {
        arr.push(v[i].username + ":" + v[i].staffName);
        arr2.push(v[i].staffName);
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
