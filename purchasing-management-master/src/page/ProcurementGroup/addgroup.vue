<template>
  <div class="addgroup rightArea">
    <h1>{{title}}</h1>
    <el-form
      :inline="true"
      size="mini"
      label-width="100px"
      :label-position="labelPosition"
      :model="addGroupData"
      class="demo-form-inline"
    >
      <el-form-item label="选择项目">
        <el-input
          :readonly="true"
          size="mini"
          v-model="addGroupData.projectName"
          placeholder="选择项目"
        ></el-input>
        <el-button type="primary" size="mini" @click="chosePro">选择</el-button>
      </el-form-item>
      <el-form-item label="选择组长">
        <el-input :readonly="true" size="mini" v-model="addGroupData.leaderName" placeholder="选择组长"></el-input>
        <el-button type="primary" size="mini" @click="chosePeople('leaders')">选择</el-button>
      </el-form-item>
      <el-form-item label="选择副组长">
        <el-input
          :readonly="true"
          size="mini"
          v-model="addGroupData.deputyHeadName"
          placeholder="选择副组长"
        ></el-input>
        <el-button type="primary" size="mini" @click="chosePeople('deputyHeads')">选择</el-button>
      </el-form-item>
      <el-form-item label="选择组员">
        <el-input :readonly="true" size="mini" v-model="addGroupData.memberName" placeholder="选择组员"></el-input>
        <el-button type="primary" size="mini" @click="chosePeople('members')">选择</el-button>
      </el-form-item>
      <el-form-item class="btnGroup">
        <el-button size="mini" @click="goback">取消</el-button>
        <el-button type="primary" size="mini" @click="onSubmit">确定</el-button>
      </el-form-item>
      <div style="clear: both"></div>
    </el-form>

    <member-list ref="member_list" :memberListVal="memberListVal" @memberList="memberList"></member-list>
    <related-items ref="related_items" :relatedItems="relatedItems" @setItemName="setItemName"></related-items>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      sso_sessionid: this.$store.state.sso_sessionid,
      relatedItems: {
        isShow: false,
        currentKey: ""
      },
      memberListVal: {
        isShow: false,
        type: "",
        selectArr: [],
        isleader: false
      },
      fromWhere: "addgroup",
      labelPosition: "right",
      addGroupData: {
        projectName: "",
        leaderName: "",
        deputyHeadName: "",
        memberName: "",
        groupHeadCode: ""
      },
      jkSaveData: {
        projectCode: "",
        segment: "",
        leaders: "",
        deputyHeads: "",
        members: "",
        groupHeadCode: ""
      },
      projectInfo: {},
      choseObj: {},
      title: "添加专项采购小组"
    };
  },
  mounted() {
    var paramsValue = sessionStorage.getItem("paramsValue");
    if (paramsValue) {
      this.addGroupData = JSON.parse(paramsValue);
    } else {
      if (!this.$route.params.value) {
        this.jkSaveData.groupHeadCode = "";
      } else {
        sessionStorage.setItem("paramsValue", this.$route.params.value);
        this.addGroupData = JSON.parse(this.$route.params.value);
      }
    }
    if (this.$route.params.value || paramsValue) {
      this.title = "修改专项采购小组";
      this.jkSaveData.groupHeadCode = this.addGroupData.groupHeadCode;
      this.jkSaveData.projectCode = this.addGroupData.projectCode;
      this.jkSaveData.segment = this.addGroupData.segment;
      this.choseObj.leaders = [];
      this.choseObj.deputyHeads = [];
      this.choseObj.members = [];
      this.nameSplit(this.addGroupData.leaderBy, this.addGroupData.leaderName, 'leaders');
      this.nameSplit(this.addGroupData.deputyHeadBy, this.addGroupData.deputyHeadName, 'deputyHeads');
      this.nameSplit(this.addGroupData.memberBy, this.addGroupData.memberName, 'members');
    }
    this.selectVal = "";
    this.selectValName = "";
  },

  beforeDestroy() {
    sessionStorage.removeItem("paramsValue");
  },
  methods: {
    nameSplit(valueBy, valueName, type) {
        var valueByN = valueBy.split(",");
        var valueNameN = valueName.split(",");
        var newA = [];
      if (type == "leaders") {
        for (var i = 0; i < valueByN.length; i++) {
          this.choseObj.leaders.push({
            username: valueByN[i],
            staffName: valueNameN[i]
          });
          newA.push(valueByN[i] + ":" + valueNameN[i]);
        }
        this.jkSaveData.leaders = newA.toString();
      } else if (type == "deputyHeads") {
        for (var i = 0; i < valueByN.length; i++) {
          this.choseObj.deputyHeads.push({
            username: valueByN[i],
            staffName: valueNameN[i]
          });
          newA.push(valueByN[i] + ":" + valueNameN[i]);
        }
        this.jkSaveData.deputyHeads = newA.toString();
      } else if (type == "members") {
        for (var i = 0; i < valueByN.length; i++) {
          this.choseObj.members.push({
            username: valueByN[i],
            staffName: valueNameN[i]
          });
          newA.push(valueByN[i] + ":" + valueNameN[i]);
        }
        this.jkSaveData.members = newA.toString();
      }
    },
    // 返回
    goback() {
      this.$router.go(-1);
    },
    // 项目组件调用父元素方法
    setItemName(value) {
      this.addGroupData.projectName = value.costCenterName;
      this.jkSaveData.projectCode = value.costCenterCode;
      this.relatedItems.currentKey = value.costCenterCode;
      this.projectInfo = value;
      if (!isNaN(Number(value.costCenterCode))) {
        var code = value.segment.substring(
          0,
          value.segment.indexOf("_" + value.costCenterCode)
        );
        this.jkSaveData.segment = code;
      } else {
        this.jkSaveData.segment = value.segment;
      }
    },
    // 职员组件调用父元素方法
    memberList(selectArr, selectVal, selectValName) {
      if (this.memberListVal.type == "leaders") {
        this.jkSaveData.leaders = selectVal;
        this.addGroupData.leaderName = selectValName;
        this.choseObj.leaders = selectArr;
      } else if (this.memberListVal.type == "deputyHeads") {
        this.jkSaveData.deputyHeads = selectVal;
        this.addGroupData.deputyHeadName = selectValName;
        this.choseObj.deputyHeads = selectArr;
      } else if (this.memberListVal.type == "members") {
        this.jkSaveData.members = selectVal;
        this.addGroupData.memberName = selectValName;
        this.choseObj.members = selectArr;
      }
    },
    // 保存
    onSubmit() {
      var that = this;
      // return false
      that.$api.modular
        .groupSave(that.sso_sessionid, that.jkSaveData)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              if (that.jkSaveData.groupHeadCode != "") {
                that.$message.success("修改成功！");
              } else {
                that.$message.success("添加成功！");
              }
              that.goback();
            } else {
              that.$message.error(res.data.message);
            }
          } else {
            that.$message.error("添加失败！");
          }
        });
    },
    // 选择项目
    chosePro() {
      this.relatedItems.isShow = true;
      this.relatedItems.type = "two";
      var that = this;
      that.$nextTick(() => {
        that.$refs.related_items.choseNode(that.projectInfo);
      });
    },
    // 选择职员
    chosePeople(type) {
      this.memberListVal.type = type;
      if (type == "leaders") {
        this.memberListVal.selectArr = this.choseObj.leaders;
        this.memberListVal.isleader = true;
      } else if (type == "deputyHeads") {
        this.memberListVal.selectArr = this.choseObj.deputyHeads;
        this.memberListVal.isleader = true;
      } else if (type == "members") {
        this.memberListVal.selectArr = this.choseObj.members;
        this.memberListVal.isleader = false;
      }
      this.memberListVal.isShow = true;
    }
  }
};
</script>
<style scoped>
.addgroup {
  width: 98% !important;
  margin: 0 auto !important;
  background-color: #fff !important;
}
.addgroup .el-form--inline {
  padding-top: 20px;
  float: left;
}
.addgroup .el-form-item {
  width: 45%;
  float: left;
  text-align: left;
  margin-left: 10px;
}
.btnGroup {
  width: 78% !important;
  margin-top: 40px;
  text-align: right !important;
}
.addgroup .el-input {
  width: 82% !important;
}
</style>
