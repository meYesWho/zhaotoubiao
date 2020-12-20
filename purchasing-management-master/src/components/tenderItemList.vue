<template>
  <div class="tenderItemList" v-if="tenderItemList.isShow">
    <el-dialog
      title="招标项列表"
      :visible.sync="tenderItemList.isShow"
      width="800px"
      append-to-body
      class="dialogBox"
      @close="closePeople"
      close-on-click-modal
      show-close
    >
      <el-form :model="searchData"  @submit.native.prevent>
        <el-form-item label="招标名称" style="margin-left:18px;">
          <el-input size="mini" v-model="searchData.tenderName" @keyup.enter.native="chaxunFn" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="招标编号" style="margin-left:18px;">
          <el-input size="mini" v-model="searchData.tenderNumber" @keyup.enter.native="chaxunFn" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="招标范围" style="margin-left:18px;">
          <el-input size="mini" v-model="searchData.contractDemand" @keyup.enter.native="chaxunFn" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item style="width: 18%;margin-left:20px;">
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
          max-height="200"
          :row-key="getRowKey"
          ref="grouppeopleList"
          @selection-change="selectFn"
        >
          <el-table-column :reserve-selection="true" type="selection" width="50"></el-table-column>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column show-overflow-tooltip prop="projectName" label="公司"></el-table-column>
          <el-table-column show-overflow-tooltip prop="tenderName" label="招标名称"></el-table-column>
          <el-table-column show-overflow-tooltip prop="tenderNumber" label="招标编号"></el-table-column>
          <el-table-column prop="contractDemand" label="招标范围">
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
          <el-table-column prop="tenderStatus" label="招标状态" width="136"></el-table-column>
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
import { Loading } from "element-ui";
export default Vue.component("tender-itemList", {
  props: {
    tenderItemList: {
      type: Object,
      default: {
        isShow: false,
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
        page: 1,
        size: 10,
        planCode: "",
        tenderNumber: "",
        tenderName: "",
        contractDemand: ""
      },
      sso_sessionid: this.$store.state.sso_sessionid,
      defaultProps: {
        children: "children",
        label: "segmentDesc"
      },
      selectVal: "",
      selectValName: "",
      searchList: [],
      total: 0,
      jkSaveData: {
        leaders: "",
        deputyHeads: "",
        members: ""
      },
      selectList: []
    };
  },
  watch: {
    tenderItemList: {
      handler(newVal, oldVal) {
        var that = this;
        if (newVal.isShow) {
          that.selectList = newVal.selectArr;
          that.toggleSelection(that.selectList);
          this.searchData = {
            page: 1,
            size: 10,
            planCode: "",
            tenderNumber: "",
            tenderName: "",
            contractDemand: ""
          };
          this.chaxunFn();
        }
      },
      deep: true
    }
  },

  mounted() {},
  methods: {
    fatherMethod(page, size) {
      this.searchData.size = size;
      this.searchData.page = page;
      this.chaxunFn();
    },
    resetFn() {
      this.searchData = {
        page: 1,
        size: 10,
        planCode: "",
        tenderNumber: "",
        tenderName: "",
        contractDemand: ""
      };
      this.chaxunFn();
    },
    chaxunFn() {
      var that = this;
      that.$api.modular
        .getTenderByPage(that.sso_sessionid, that.searchData)
        .then(res => {
          // 执行某些操作
          if (res.status == 200 && res.data.returnCode == 0) {
            that.searchList = res.data.data;
            that.total = Number(res.data.count);
          }
        });
    },
    toggleSelection(rows) {
      //   return false;
      if (rows) {
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
      this.tenderItemList.isShow = false;
      this.$refs.grouppeopleList.clearSelection();
    },
    setValue() {
      if (!this.selectList) {
        this.$message.error("请至少选择一个项目！");
        return false;
      }
      if (this.selectList.length == 0 || !this.selectList) {
        this.$message.error("请至少选择一个项目！");
        return false;
      }
      if (this.selectList.length > 1) {
        this.$message.error("最多选择一个项目！");
        return false;
      }
      this.$emit(
        "tenderItemListFn",
        this.selectList,
        this.selectVal,
        this.selectValName
      );
      this.tenderItemList.isShow = false;
      //   this.$refs.grouppeopleList.clearSelection();
    },

    getRowKey(row) {
      return row.tenderCode;
    },
    selectFn(v) {
      this.selectList = v;
      //   var arr = [];
      //   var arr2 = [];
      //   for (var i = 0; i < v.length; i++) {
      //     arr.push(v[i].staffCode + ":" + v[i].staffName);
      //     arr2.push(v[i].staffName);
      //   }
      //   this.selectVal = arr.toString();
      //   this.selectValName = arr2.toString();
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dialogBox .el-form-item {
  width: 24%;
  float: left;
  margin-left: 28px;
}

.dialogBox .el-input {
  width: 54% !important;
}
</style>
