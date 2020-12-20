<template>
  <div class="relatedItems" v-if="relatedItems.isShow">
    <el-dialog
      title="项目列表"
      :visible.sync="relatedItems.isShow"
      width="800px"
      append-to-body
      close-on-click-modal
      show-close
    >
      <div class="xmlb">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" @change="filterChange"></el-input>
        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          :default-expand-all="false"
          :accordion="true"
          style="margin-top: 15px"
          highlight-currents
          node-key="costCenterCode"
          @node-click="choseNode"
          :filter-node-method="filterNode"
          ref="tree"
        ></el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelFn">取 消</el-button>
        <el-button size="mini" type="primary" @click="sureFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.component("related-items", {
  props: {
    relatedItems: {
      type: Object,
      default: {
        isShow: false,
        currentKey: "",
        costCenterCode: "",
        filterText: "",
        type: "",
        execution: ''
      }
    }
  },
  data() {
    return {
      sso_sessionid: this.$store.state.sso_sessionid,
      filterText: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "costCenterName"
      },
      choseVal: {},
      costCenterName: 0
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    relatedItems: {
      handler(newVal, oldVal) {
        if (newVal.isShow) {
          this.showList();
        }
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.segmentDesc.indexOf(value) !== -1;
    },
    filterChange(v) {
      // this.$refs.tree.filter(v);
    },
    cancelFn() {
      this.relatedItems.isShow = false;
      this.filterText = "";
    },
    sureFn() {
      if (this.choseVal.costCenterCode) {
        if(this.relatedItems.execution == 'fct'){
          this.choseVal.execution = 'fct';
        } else {
          this.choseVal.execution = 's';
        }
        this.$emit("setItemName", this.choseVal);
        this.relatedItems.isShow = false;
        this.filterText = "";
      } else {
        if (this.relatedItems.type == "onlyTwo") {
          this.$message.error("请选择公司！");
        } else {
          this.$message.error("请选择项目！");
        }
      }
    },
    choseNode(v) {
      if (!v) return false;
      if (v.children) {
        if (this.relatedItems.type == "all") {
          this.choseVal = v;
        } else if (this.relatedItems.type == "two") {
          if (v.children.length > 0) {
            if (v.children[0].children.length == 0) {
              this.choseVal = v;
            } else {
              this.choseVal = {};
            }
          } else {
            this.choseVal = v;
          }
        } else if (this.relatedItems.type == "only") {
          if (v.children.length > 0) {
            this.choseVal = {};
          } else {
            this.choseVal = v;
          }
        } else if (this.relatedItems.type == "onlyTwo") {
          if (v.children.length > 0) {
            if (v.children[0].children.length == 0) {
              this.choseVal = v;
            } else {
              this.choseVal = {};
            }
          } else {
            this.choseVal = {};
          }
        }
      } else {
        this.choseVal = {};
      }
    },
    showList() {
      var costCenterCode;
      if (!this.relatedItems.costCenterCode) {
        costCenterCode = "";
      } else {
        costCenterCode = this.relatedItems.costCenterCode;
      }
      var params = {
        userName: this.$store.state.userName,
        costCenterCode: costCenterCode
      };
      this.$api.modular
        .getCostCenterTreeJson(this.sso_sessionid, params)
        .then(res => {
          if (res.data.data.returnCode == -1) {
            this.data = [];
          } else {
            this.data = res.data.data.data[0][0].children;
          }
        });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.xmlb .el-tree {
  max-height: 200px !important;
  overflow: auto;
}
</style>
