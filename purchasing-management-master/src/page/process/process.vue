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
        <h2 @click="aaaa">{{title[active]}}</h2>
      </div>
      <div style="margin-top: 20px;" v-if="!typeChange">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step :status="statusList[0]" @click.native="lookFn(0)" title="招标文件"></el-step>
          <el-step :status="statusList[1]" @click.native="lookFn(1)" title="投标候选人审定"></el-step>
          <el-step :status="statusList[2]" @click.native="lookFn(2)" title="投标保证金缴纳"></el-step>
          <el-step :status="statusList[3]" @click.native="lookFn(3)" title="发标"></el-step>
          <el-step :status="statusList[4]" @click.native="lookFn(4)" title="招标文件答疑"></el-step>
          <el-step :status="statusList[5]" @click.native="lookFn(5)" title="回标"></el-step>
          <el-step :status="statusList[6]" @click.native="lookFn(6)" title="开技术标"></el-step>
          <el-step :status="statusList[7]" @click.native="lookFn(7)" title="评技术标"></el-step>
          <el-step :status="statusList[8]" @click.native="lookFn(8)" title="开商务标"></el-step>
          <el-step :status="statusList[9]" @click.native="lookFn(9)" title="评商务标"></el-step>
          <el-step :status="statusList[10]" @click.native="lookFn(10)" title="综合评标报告"></el-step>
          <el-step :status="statusList[11]" @click.native="lookFn(11)" title="中标审定"></el-step>
        </el-steps>
      </div>
      <div style="margin-top: 20px;" v-if="typeChange">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step :status="statusList[0]" title="招标文件"></el-step>
          <el-step :status="statusList[11]" title="中标审定"></el-step>
        </el-steps>
      </div>
      <el-divider></el-divider>

      <process-one :ifDisabled="ifDisabled[0]" @changeType="changeType" v-if="active == 0" ref="processOne"></process-one>
      <process-two :ifDisabled="ifDisabled[1]" v-if="active == 1" ref="processTwo"></process-two>
      <process-three :ifDisabled="ifDisabled[2]" v-if="active == 2" ref="processThree"></process-three>
      <process-fore :ifDisabled="ifDisabled[3]" v-if="active == 3" ref="processFour"></process-fore>
      <process-five :ifDisabled="ifDisabled[4]" v-if="active == 4" ref="processFive"></process-five>
      <process-six :ifDisabled="ifDisabled[5]" v-if="active == 5" ref="processSix"></process-six>
      <process-seven :ifDisabled="ifDisabled[6]" v-if="active == 6" ref="processSeven"></process-seven>
      <process-eight :ifDisabled="ifDisabled[7]" v-if="active == 7" ref="processEight"></process-eight>
      <process-nine :ifDisabled="ifDisabled[8]" v-if="active == 8" ref="processNine"></process-nine>
      <process-ten :ifDisabled="ifDisabled[9]" v-if="active == 9" ref="processTen"></process-ten>
      <process-eleven :ifDisabled="ifDisabled[10]" v-if="active == 10" ref="processEleven"></process-eleven>
      <process-twelve :ifDisabled="ifDisabled[11]" v-if="active == 11" ref="processTwelve"></process-twelve>
    </el-dialog>
  </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      type: 1,
      sso_sessionid: this.$store.state.sso_sessionid,
      dialogVisible: true,
      active: 0,
      typeChange: false,
      step: 1,
      ifDisabled: [false, false, false],
      title: [
        "编制招标文件",
        "投标候选人审定",
        "投标保证金缴纳",
        "发标",
        "招标文件答疑",
        "回标",
        "开技术标",
        "评技术标",
        "开商务标",
        "评商务标",
        "综合评标报告",
        "中标审定"
      ],
      statusList: [
        "process",
        "wait",
        "wait",
        "process",
        "wait",
        "wait",
        "process",
        "wait",
        "wait",
        "wait",
        "wait",
        "wait"
      ],
      statusValue: 10,
      obj: {},
      tenderFileCode: ""
    };
  },
  mounted() {
    // var active = sessionStorage.getItem("activeVal");
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
    // if (active) {
    //   this.active = Number(active);
    // } else {
    //   this.active = Number(this.$route.query.active);
    //   sessionStorage.setItem("activeVal", this.$route.query.active);
    // }
    this.active = Number(this.$route.query.active);
    if(this.$route.query.type){
      this.type = this.$route.query.type;
    } else {
      this.type = 2;
    }
  },
  beforeDestroy() {
    // sessionStorage.removeItem('activeVal');
  },
  methods: {
    changeType(type){
      if(type == '1' || type == '2'){
        this.typeChange = true;
      } else {
        this.typeChange = false;
      }
    },
    aaaa() {
      this.statusList[3] = "finish";
    },
    getStatusValueFn(index, className) {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      var ifProcess = true;
      if(className == 'process'){
        ifProcess = 'process';
      } else {
        ifProcess = true;
      }
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
              var href = this.commonFn.routerProcess(
                this.obj,
                index,
                this,
                this.type,
                ifProcess,
                "",
                num,
                status
              );
            //   debugger
            // window.location.href = href;
            // window.location.reload()
        // this.commonFn.routerProcess(this.obj, index, this, 2, true);
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
      } else if (num == 2) {
        if (status == "tenderBulletinRelease") {
          return false;
        } else {
          return true;
        }
      } else if (num == 3) {
        if (status == "tenderBailSubmit") {
          return true;
        } else {
          return false;
        }
      } else if (num == 4) {
        if (status == "tenderFileRelease") {
          return true;
        } else {
          return false;
        }
      } else if (num == 5) {
        if (status == "tenderFileAnswer") {
          return true;
        } else {
          return false;
        }
      } else if (num == 6) {
        if (status == "tenderOverReturn") {
          return true;
        } else {
          return false;
        }
      } else if (num == 7) {
        if (status == "tenderCompleteOpenTechnical") {
          return true;
        } else {
          return false;
        }
      } else if (num == 8) {
        if (status == "openEvaluationTechnical") {
          return false;
        } else {
          return true;
        }
      } else if (num == 9) {
        if (status == "tenderCompleteOpenBusiness") {
          return true;
        } else {
          return false;
        }
      } else if (num == 10) {
        if (status == "completeEvaluationBusiness") {
          return true;
        } else {
          return false;
        }
      } else if (num == 11) {
        if (status == "tenderCompiledReportSubmit") {
          return true;
        } else {
          return false;
        }
      } else if (num == 12) {
        if (status == "tenderCompiledReportSubmit" || status == "tenderWinTemporary" || status == "tenderWinApproveSTOP") {
          return false;
        } else {
          return true;
        }
      }
    },
    lookFn(index) {
      if (index >= this.statusValue) {
      } else {
        this.getStatusValueFn(index, this.statusList[index]);
        // this.active = num;
        // this.ifDisabled[num] = true;
      }
    }
  }
};
</script>
<style>
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
  font-size: 13px;
}
.el-upload-list {
  width: 60%;
  float: right;
}
</style>
