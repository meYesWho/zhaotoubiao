<template>
  <div class="levelCodeName" v-if="levelCodeName.isShow">
    <el-dialog
      title="分项信息列表"
      :visible.sync="levelCodeName.isShow"
      width="800px"
      append-to-body
      close-on-click-modal
      show-close
    >
      <div class="xmlb">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree
          class="filter-tree"
          :data="data"
          accordion
          :props="defaultProps"
          style="margin-top: 15px;max-height: 200px;overflow:auto;"
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
export default Vue.component("levelCode-name", {
  props: {
    levelCodeName: {
      type: Object,
      default: {
        isShow: false
      }
    }
  },
  data() {
    return {
      filterText: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "levelName"
      },
      choseVal: {},
      sso_sessionid: this.$store.state.sso_sessionid
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    levelCodeName: {
      handler(newVal, oldVal) {
        var that = this;
        if (newVal.isShow) {
          this.getLevelCodeAndName();
        }
      },
      deep: true
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.levelName.indexOf(value) !== -1;
    },
    cancelFn() {
      this.levelCodeName.isShow = false;
    },
    sureFn() {
      if (this.choseVal.levelCode) {
        this.$emit("levelCodeNameFn", this.choseVal);
        this.levelCodeName.isShow = false;
      } else {
        this.$message.error("请选择分项！");
      }
    },
    choseNode(value) {
      if (value.levelFatherNum == 0) {
        this.choseVal = [];
      } else if (value.levelFatherNum.indexOf(".") == -1) {
        var levelOne = this.data[value.levelFatherNum - 1];
        var levelTwo = value;
        levelOne.levelTwo = levelTwo;
        this.choseVal = levelOne;
      } else {
        var indexArr = value.levelFatherNum.split(".");
        var levelOne = this.data[indexArr[0] - 1];
        var levelTwo = this.data[indexArr[0] - 1].children[indexArr[1] - 1];
        levelTwo.levelThree = value;
        levelOne.levelTwo = levelTwo;
        this.choseVal = levelOne;
      }
    },
    getLevelCodeAndName() {
      var params = {
        levelInfo: ""
      };
      this.$api.modular
        .getLevelCodeAndName(this.sso_sessionid, params)
        .then(res => {
          // 执行某些操作
          this.data = res.data;
          // this.total = res.data.count;
        });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
