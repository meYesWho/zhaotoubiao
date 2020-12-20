<template>
  <div>
    <el-form
      :inline="true"
      size="mini"
      label-width="120px"
      :model="searchDataCp"
      @change="formChange"
      class="demo-form-inline fileSearch"
    >
      <el-form-item label="招标项目名称：">
        <el-input
          @change="formChange"
          clearable
          v-model="searchDataCp.tenderName"
          placeholder="招标项目名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="招标编号：">
        <el-input
          @change="formChange"
          clearable
          v-model="searchDataCp.tenderNumber"
          placeholder="招标编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="招采方式：" prop="tenderType">
        <el-select
          clearable
          @change="formChange"
          filterable
          size="mini"
          placeholder="请选择"
          v-model="searchDataCp.tenderType"
          class="widthseven"
        >
          <el-option
            v-for="item in tenderTypeList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
        <!-- <el-input @change="formChange" clearable v-model="searchDataCp.tenderType" placeholder="招标方式"></el-input> -->
      </el-form-item>
      <el-form-item label="业务单元：">
        <el-input
          class="xl el-input--mini"
          @focus="showTree"
          clearable
          :readonly="true"
          @change="formChange"
          v-model="searchDataCp.commName"
          placeholder="业务单元"
        ></el-input>
      </el-form-item>
    </el-form>
    <related-items ref="related_items" :relatedItems="relatedItems" @setItemName="setItemName"></related-items>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.component("search-form", {
  data() {
    return {
      searchDataCp: {
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commName: "", // 业务单元
        commCode: "" // 业务单元
      },
      relatedItems: {
        // 选择项目参数
        isShow: false
      },

      tenderTypeList: [
        {
          label: "战略直委",
          id: "1"
        },
        {
          label: "非战略直委",
          id: "2"
        },
        {
          label: "议标",
          id: "3"
        },
        {
          label: "邀请招标",
          id: "4"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    // 选择项目弹窗
    showTree() {
      this.relatedItems.isShow = true;
      this.relatedItems.type = "two";
      var that = this;
      that.$nextTick(() => {
        that.$refs.related_items.choseNode(that.projectInfo);
      });
    },
    resetFn() {
      this.searchDataCp = {
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commName: "", // 业务单元
        commCode: "" // 业务单元
      };
    },
    formChange() {
      this.$emit("searchFormFn", this.searchDataCp);
      //   if (v == "") {
      //     this.searchDataCp.projectCode = "";
      //   }
    },
    // 选择项目回调函数
    setItemName(value) {
      this.searchDataCp.commName = value.costCenterName;
      this.searchDataCp.commCode = value.costCenterCode;
      this.$emit("searchFormFn", this.searchDataCp);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fileSearch {
  text-align: left;
  margin-bottom: 20px;
}
.fileSearch .el-form-item {
  width: 32%;
  margin-bottom: 0;
  margin-top: 15px;
  margin-left: 20px;
}
</style>
