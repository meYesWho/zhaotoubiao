<template>
  <div style="padding: 0 15px;" class="process">
    <el-dialog
      :visible.sync="dialogVisible"
      modal-append-to-body
      custom-class="fullDialog"
      fullscreen
      :modal="false"
      :show-close="false"
    >
      <div class="title">
        <h2>{{title[active]}}</h2>
      </div>
      <div style="margin-top: 20px;">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step :status="statusList[0]" @click.native="lookFn(0)" title="招标文件"></el-step>
          <el-step :status="statusList[1]" @click.native="lookFn(1)" title="中标审定"></el-step>
        </el-steps>
      </div>
      <el-divider></el-divider>
      <process-one :ifDisabled="ifDisabled[0]" v-if="active == 0" ref="processOne"></process-one>
      <zwWinBid-main :ifDisabled="ifDisabled[1]" v-if="active == 1" ref="processTwelve"></zwWinBid-main>
      
    </el-dialog>
  </div>
</template>
<script type="text/babel">
import Vue from "vue";
import base from "@/api/base";
export default {
  data() {
    return {
      title: [
        "编制招标文件",
        "中标审定"
      ],
      statusList: [],
      dialogVisible: true,
      active: 0,
      sso_sessionid: this.$store.state.sso_sessionid,
      step: 1,
      ifDisabled: [false, false, false],
      statusList: [
        "process",
        "wait",
      ],
      statusValue: 2,
      obj: {},
      tenderFileCode: ""
    };
  },
  mounted() {
    this.active = Number(this.$route.query.active);
    if (this.$route.query.obj) {
      this.obj = JSON.parse(this.$route.query.obj);
    }
    if (this.$route.query.tenderFileCode) {
      this.tenderFileCode = this.$route.query.tenderFileCode;
    }
    if (this.$route.query.num) {
      this.statusValue = this.$route.query.num;
      var statusList2 = [];
      for (var i = 0; i < this.statusValue; i++) {
        statusList2.push("success");
      }
      if (this.ifFn(this.statusValue, this.$route.query.status)) {
        statusList2[Number(this.statusValue) - 1] = "success";
      } else {
        statusList2[Number(this.statusValue) - 1] = "process";
      }
      statusList2[this.active] = "finish";
    } else {
      this.statusValue = 1;
    }
    if (this.active == 0) {
      if(this.statusValue == 1){
        this.statusList = ['process']
      } else {
        this.statusList = statusList2;
      }
      
    } else {
      this.statusList = statusList2;
    }
  },
  methods: {
    getStatusValueFn(index) {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular.getScheduleMax(this.sso_sessionid, params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            if (res.data.data.length > 0) {
              var num = res.data.data[0].TENDER_ROW_NUM;
              var status = res.data.data[0].TENDER_SCHEDULE_STATUS;
              if (num > 5) {
                num = num - 1;
              }
              this.statusValue = res.data.data[0].TENDER_ROW_NUM;
              for (var i = 0; i < this.statusValue; i++) {
                this.statusList[i] = "success";
              }
              this.statusList[this.active] = "finish";
              if(this.ifFn(res.data.data[0].TENDER_ROW_NUM, res.data.data[0].TENDER_SCHEDULE_STATUS)){
                this.statusList[Number(res.data.data[0].TENDER_ROW_NUM)-1] = 'success';
              } else {
                this.statusList[Number(res.data.data[0].TENDER_ROW_NUM)-1] = 'process';
              }
              var href = this.commonFn.zwRouterProcess(
                this.obj,
                index,
                this,
                '',
                true,
                "",
                num,
                status
              );
            // window.location.href = href;
            // window.location.reload()
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },
    ifFn(num, status) {
      if (num == 1) {
        if (status == "tenderFileApprovePASS") {
          return true;
        } else {
          return false;
        }
      } else if (num == 12) {
        if (status == "TenderCompiledReportSubmit") {
          return false;
        } else {
          return true;
        }
      }
    },
    lookFn(index) {
      if (index >= this.statusValue) {
      } else {
        this.getStatusValueFn(index);
        // this.commonFn.zwRouterProcess(this.obj, index, this, '', true);
      }
    }
  }
};
</script>
<style>
.process1 .el-form--inline .el-form-item__content {
  width: 50%;
}

.process1 .search-form-inline .el-form-item {
  width: 25%;
  margin: 0;
}

.process1 h3 {
  font-size: 14px;
  text-align: left;
  background-color: #ececec;
  padding: 10px 20px;
  margin: 14px 0;
}
/* .process1 .el-input--mini .el-input__inner {
  padding: 0;
  padding-left: 30px;
} */
.process1 .el-form-item__content {
  text-align: left;
}
.lineInput {
  width: 40px;
}
.lineInput .el-input__inner {
  border: none;
  border-bottom: 1px solid #c0c4cc;
  border-radius: 0;
  padding: 0;
  text-align: center;
  height: 28px;
}
.fileDiv {
  width: 70px;
  height: 24px;
  overflow: hidden;
  background: #cb1235;
  float: left;
  margin-top: 9px;
  margin-left: 12px;
  border-radius: 5px;
  position: relative;
}
.fileDiv span {
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: 24px;
  width: 100%;
  height: 24px;
  display: block;
}
.fileDiv input {
  width: 100%;
  height: 100%;
  opacity: 0;
  border: none;
  position: absolute;
  left: 0;
  top: 0;
}

.aDiv a:hover {
  cursor: pointer;
}

.p12 .el-upload {
  float: left;
}
.p12 .el-upload-list {
  float: left;
  margin-top: -4px;
  margin-left: 6px;
}
.p12 #printMe .el-form-item--mini.el-form-item {
  margin-bottom: 20px;
}
.p12 .el-form-item--mini.el-form-item {
  margin-bottom: 0;
}
.p12 .el-form-item__error {
  float: left;
  width: 34%;
  position: static;
  margin-top: 8px;
  margin-left: 4px;
}
</style>

<style scoped>
.process {
  background: #cb1235;
}
/* .process .fullDialog {
  background: #f1f1f1 !important;
} */
.process .title {
  margin-top: -60px;
}
.process .title h2 {
  font-size: 14px;
  text-align: left;
  background-color: #ececec;
  padding: 10px 20px;
  color: #666;
  margin: 0px;
}
.process h3 {
  font-size: 14px;
  text-align: left;
  background-color: #ececec;
  padding: 10px 20px;
  margin: 14px 0;
}
.el-step__title {
  font-size: 14px;
}
.el-upload-list {
  width: 60%;
  float: right;
}
</style>
