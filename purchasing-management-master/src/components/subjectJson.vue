<template>
  <div class="subjectJsonData" v-if="subjectJsonData.isShow">
    <el-dialog
      title="科目列表"
      :visible.sync="subjectJsonData.isShow"
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
export default Vue.component("subject-json", {
  props: {
    subjectJsonData: {
      type: Object,
      default: {
        isShow: false,
        projectCode: ''
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
        label: "subjectName"
      },
      choseVal: {},
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    subjectJsonData: {
      handler(newVal, oldVal) {
        var that = this;
        if (newVal.isShow) {
          this.showList(newVal.projectCode)
        }
      },
      deep: true
    }
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
      this.subjectJsonData.isShow = false;
      this.filterText = "";
    },
    sureFn() {
      if (this.choseVal.children.length == 0) {
        this.$emit("subjectJsonFn", this.choseVal);
        this.subjectJsonData.isShow = false;
        this.filterText = "";
      } else {
        this.$message.error("需要制定到末级科目");
      }
    },
    choseNode(v) {
      if(!v) return false;
      this.choseVal = v;
    },
    showList(value) {
      var params = {
        projectCode: value
      };
      this.$api.modular
        .getSubjectTreeJson(this.sso_sessionid, params)
        .then(res => {
          if (res.data.data.returnCode == -1) {
            this.data = [];
          } else {
            this.data = res.data.data.data[0];
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
