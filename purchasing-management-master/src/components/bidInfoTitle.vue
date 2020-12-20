<template>
  <div>
    <h3>招标项目信息</h3>
    <div>
      <el-form label-position="right" size="mini" label-width="150px">
        <el-row class="base-form" type="flex">
          <el-col :span="9">
            <el-form-item label="招标编号：">
              <span style="margin-left: 10px;width: 50%">{{bidInfo.tenderNumber}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="15">
            <el-form-item label="招标项目：">
              <span style="margin-left: 10px;width: 50%">{{bidInfo.tenderName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import base from "../api/base";
export default Vue.component("bidInfo-title", {
  props: {
    bidInfo: {
      type: Object,
      default: {
        tenderNumber: "",
        tenderName: ""
      }
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
});
</script>

<style scoped>
</style>
