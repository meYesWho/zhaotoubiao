<template>
  <div style="padding: 0 15px;" class="process1 p12" ref="process1">
    <div>
      <bidInfo-title :bidInfo="bidInfo"></bidInfo-title>
      <h3>定标信息</h3>
      <div>
        <el-form
          :model="saveFileData"
          ref="numberValidateForm"
          label-width="196px"
          size="mini"
          :inline="true"
          style="text-align: left;"
          class="demo-ruleForm"
        >
          <el-form-item label="拟开工时间：" prop="age" style="width: 34%;margin:0;">
            <el-date-picker
              v-model="saveFileData.tenderWinStartDate"
              type="date"
              :disabled="ifAlready"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="拟竣工时间：" prop="age" style="width: 34%;margin:0;">
            <el-date-picker
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :disabled="ifAlready"
              v-model="saveFileData.tenderWinEndDate"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="预计合同签订时间：" prop="age" style="width: 34%;margin:15px 0;">
            <el-date-picker
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :disabled="ifAlready"
              v-model="saveFileData.contractSignDate"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <h3>定标信息</h3>
      <el-button
        size="mini"
        style="float:left; margin-bottom:15px;"
        @click="addWinBidUser"
        type="primary"
        v-if="supplierData.dataList.length == 0"
      >添加</el-button>
      <el-table :data="supplierData.dataList" size="mini" border style="width: 100%">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="单位名称" width="210">
          <template slot-scope="scope">
            <el-input
              max-length="0"
              :disabled="ifAlready"
              size="mini"
              v-model="scope.row.supplierName"
              @focus="choseSupp"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="nodeName"
          label="资质等级/品牌"
          width="180"
        ></el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="中标金额(元)">
          <template slot-scope="scope">
            <el-form size="mini" :model="scope.row" label-width="10" class="demo-ruleForm">
              <el-form-item>
                <el-input
                  :disabled="ifAlready"
                  size="mini"
                  style="float: left; width:42%;"
                  type="text"
                  v-model="scope.row.tenderWinAmount"
                ></el-input>
                <!-- </el-form-item>
                <el-form-item>-->
                <el-input
                  :disabled="ifAlready"
                  size="mini"
                  style="float: left; width:52%;margin-left:3%;"
                  type="text"
                  placeholder="备注信息"
                  v-model="scope.row.tenderTargetAmountRemark"
                ></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top: 12px;" class="fj">
        <el-col :span="3">
          <span style="margin-top: 12px;">战略协议</span>
        </el-col>
        <el-col :span="21">
          <el-upload
            style="float: left;width:100%;text-align: left;"
            class="upload-demo"
            :action="actionUrl"
            :disabled="ifAlready"
            :on-preview="(value)=> previewFn(value)"
            :before-upload="beforeUploadFn"
            :on-success="(value) => uploadSuccess(value, 'f1')"
            :on-remove="(value)=> removeFn(value, 'f1')"
            :on-exceed="exceedFn"
            :file-list="zlxyFileList"
            :limit="1"
            :multiple="false"
          >
            <el-button :disabled="ifAlready" size="mini" type="primary">上传</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row style="margin-top: 12px;" class="fj">
        <el-col :span="3">
          <span style="margin-top: 12px;">中标通知书</span>
        </el-col>
        <el-col :span="21">
          <el-upload
            style="float: left;width:100%;text-align: left;"
            class="upload-demo"
            :disabled="ifAlready"
            :action="actionUrl"
            :on-preview="(value)=> previewFn(value)"
            :before-upload="beforeUploadFn"
            :on-success="(value) => uploadSuccess(value, 'f2')"
            :on-remove="(value)=> removeFn(value, 'f2')"
            :on-exceed="exceedFn"
            :limit="1"
            :file-list="zbtzsFileList"
            :multiple="false"
          >
            <el-button :disabled="ifAlready" size="mini" type="primary">上传</el-button>
          </el-upload>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div style="text-align: center">
      <el-button size="mini" type="primary" :disabled="ifAlready" @click="loseBid">流标</el-button>
      <el-button size="mini" @click="cancelFn">关闭</el-button>
      <el-button size="mini" :disabled="ifAlready" type="primary" @click="saveFn1">保存</el-button>
      <el-button size="mini" :disabled="ifAlready" type="primary" @click="toApprove">中标审定</el-button>
    </div>
    <increase-supplier :supplierData="supplierData" @supplierDataFn="supplierDataFn"></increase-supplier>
  </div>
</template>
<script type="text/babel">
import Vue from "vue";
import base from "@/api/base";
export default Vue.component("zwWinBid-main", {
  data() {
    return {
      sso_sessionid: this.$store.state.sso_sessionid,
      contractType: [],
      suppName: "",
      saveFileData: {
        tenderWinStartDate: "",
        tenderWinEndDate: "",
        contractType: "",
        contractSignDate: "",
        strategicAgreementFileCode: "",
        tenderWinFileCode: "",
        target: [],
        insertType: "",
        tenderFileCode: "",
        supplierCode: ""
      },
      supplierData: {
        isShow: false,
        selectArr: [],
        dataList: [
          {
            supplierCode: "",
            supplierName: "",
            tenderWinAmount: "",
            tenderTargetAmountRemark: ""
          }
        ],
        type: "only"
      },
      bidInfo: {
        tenderName: "",
        tenderNumber: ""
      },
      actionUrl:
        base.uploadUrl + "?sso_sessionid=" + this.$store.state.sso_sessionid,
      zlxyFileList: [],
      zbtzsFileList: [],
      zlxyFileData: {
        name: ""
      },
      zbtzsFileData: {
        name: ""
      },
      tenderWinCode: "",
      bidWinPeople: "",
      ifAlready: false
    };
  },
  mounted() {
    this.bidInfo.tenderNumber = this.$route.query.tenderNumber;
    this.bidInfo.tenderName = this.$route.query.tenderName;
    this.tenderFileCode = this.$route.query.tenderFileCode;
    this.tenderWinCode = this.$route.query.other;
    if (
      this.$route.query.already == "tenderWinApprovePASS" ||
      this.$route.query.already == "tenderWinApproveSubmit" ||
      this.$route.query.already == "tenderWinPublishSubmit"
    ) {
      this.ifAlready = true;
    } else {
      this.ifAlready = false;
    }
    if (this.$route.query.ifProcess) {
      this.ifAlready = true;
    }
    this.getWinIsUnusualByCode();
  },
  methods: {
    choseSupp() {
      this.supplierData.isShow = true;
    },
    // 选择回显
    supplierDataFn(arr) {
      this.supplierData.dataList[0].supplierName = arr[0].supplierName;
      this.supplierData.dataList[0].supplierCode = arr[0].supplierCode;
    },
    addWinBidUser() {
      this.supplierData.dataList.push({});
    },
    getWinIsUnusualByCode() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular
        .getWinIsUnusualByCode(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              if (res.data.data[0].tenderWinStartDate) {
                this.saveFileData.tenderWinStartDate = this.commonFn.formatDate(
                  res.data.data[0].tenderWinStartDate
                );
              }
              if (res.data.data[0].tenderWinEndDate) {
                this.saveFileData.tenderWinEndDate = this.commonFn.formatDate(
                  res.data.data[0].tenderWinEndDate
                );
              }
              if (res.data.data[0].contractSignDate) {
                this.saveFileData.contractSignDate = this.commonFn.formatDate(
                  res.data.data[0].contractSignDate
                );
              }
              if (res.data.data[0].tenderWinFileCode) {
                this.zbtzsFileList.push({
                  name: res.data.data[0].tenderWinFileName,
                  fileUrl: res.data.data[0].tenderWinFileUrl,
                  fileCode: res.data.data[0].tenderWinFileCode
                });
                this.saveFileData.tenderWinFileCode =
                  res.data.data[0].tenderWinFileCode;
              }
              if (res.data.data[0].strategicAgreementFileCode) {
                this.zlxyFileList.push({
                  name: res.data.data[0].strategicAgreementFileName,
                  fileUrl: res.data.data[0].strategicAgreementFileUrl,
                  fileCode: res.data.data[0].strategicAgreementFileCode
                });
                this.saveFileData.strategicAgreementFileCode =
                  res.data.data[0].strategicAgreementFileCode;
              }
              if (res.data.data[0].tenderTargetAmount == 0) {
                res.data.data[0].tenderTargetAmount = "—";
              }
              this.supplierData.dataList[0].supplierName =
                res.data.data[0].supplierName;
              this.supplierData.dataList[0].supplierCode =
                res.data.data[0].supplierCode;
              this.supplierData.dataList[0].tenderWinAmount =
                res.data.data[0].tenderTargetAmount;
              if (res.data.data[0].tenderTargetAmountRemark) {
                this.supplierData.dataList[0].tenderTargetAmountRemark =
                  res.data.data[0].tenderTargetAmountRemark;
              } else {
                this.supplierData.dataList[0].tenderTargetAmountRemark = "";
              }

              this.saveFileData.strategicAgreementFileCode =
                res.data.data[0].strategicAgreementFileCode;
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    // 上传
    beforeUploadFn(file) {
      if (!this.commonFn.beforeUpload(file, this)) return false;
    },
    uploadSuccess(res, type) {
      if (type == "f1") {
        this.saveFileData.strategicAgreementFileCode =
          res.data[0].serviceFileCode;
      } else if (type == "f2") {
        this.saveFileData.tenderWinFileCode = res.data[0].serviceFileCode;
      }
      // this.saveFileData.strategicAgreementFileCode =
      //     res.data[0].serviceFileCode;
    },

    removeFn(value, type) {
      this.$message.info("删除文件后，请进行保存，否则删除失效！");
      if (type == "f1") {
        this.saveFileData.strategicAgreementFileCode = "";
      } else if (type == "f2") {
        this.saveFileData.tenderWinFileCode = "";
      }
    },
    previewFn(value) {
      window.open(value.fileUrl);
    },
    exceedFn() {
      this.$message.error("最多上传一个附件");
    },
    async saveFn1() {
      this.saveFileData.tenderFileCode = this.tenderFileCode;
      if (!this.saveFileData.tenderWinStartDate) {
        this.$message.error("请选择拟开工时间！");
        return false;
      }
      if (!this.saveFileData.tenderWinEndDate) {
        this.$message.error("请选择拟竣工时间！");
        return false;
      }
      var st = new Date(this.saveFileData.tenderWinStartDate).getTime();
      var et = new Date(this.saveFileData.tenderWinEndDate).getTime();
      if (st >= et) {
        this.$message.error("拟开工、拟竣工时间不合理！");
        return false;
      }
      if (!this.saveFileData.contractSignDate) {
        this.$message.error("请选择预计合同签订时间！");
        return false;
      }
      if(!this.supplierData.dataList[0].supplierCode){
        this.$message.error("中标单位不能为空！");
        return false;
      }
      if (this.supplierData.dataList[0].tenderWinAmount) {
        if (isNaN(this.supplierData.dataList[0].tenderWinAmount)) {
          if (this.supplierData.dataList[0].tenderWinAmount != "—") {
            this.$message.error("请填写正确的中标金额！");
            return false;
          } else {
            this.supplierData.dataList[0].tenderWinAmount = 0;
          }
        }
      } else {
        this.$message.error("中标金额不能为空，可以输入0！");
        return false;
      }
      if (
        this.supplierData.dataList[0].tenderWinAmount == 0 &&
        !this.supplierData.dataList[0].tenderTargetAmountRemark
      ) {
        this.$confirm(
          "金额为0，并且未维护备注信息的情况下,继续保存将视为放弃，放弃的后果候选人将无法作为中标单位，是否继续?",
          "提示",
          {
            confirmButtonText: "继续",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(async () => {
            await this.saveFn();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else {
        this.saveFn();
      }
    },
    saveFn() {
      if (this.supplierData.dataList[0].tenderTargetAmountRemark) {
        var str =
          this.supplierData.dataList[0].supplierCode +
          ":" +
          this.supplierData.dataList[0].supplierName +
          ":" +
          this.supplierData.dataList[0].tenderWinAmount +
          ":" +
          this.supplierData.dataList[0].tenderTargetAmountRemark;
      } else {
        var str =
          this.supplierData.dataList[0].supplierCode +
          ":" +
          this.supplierData.dataList[0].supplierName +
          ":" +
          this.supplierData.dataList[0].tenderWinAmount;
      }
      if (!this.saveFileData.strategicAgreementFileCode) {
        this.$message.error("请上传战略协议附件！");
        return false;
      }

      if (!this.saveFileData.tenderWinFileCode) {
        this.$message.error("请上传中标通知书！");
        return false;
      }
      this.saveFileData.target = this.supplierData.dataList;
      this.saveFileData.supplierCode = str;
      this.saveFileData.tenderWinCode = this.tenderWinCode;
      this.ifAlready = true;
      this.$api.modular
        .saveCandidateLinByIsUnusual(this.sso_sessionid, this.saveFileData)
        .then(res => {
          this.ifAlready = false;
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.tenderWinCode = res.data.message;
              this.$message.success("保存成功！");
              // setTimeout(() => {
              //   window.location.href = "about:blank";
              //   window.close();
              // }, 1000);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    cancelFn() {
      window.location.href = "about:blank";
      window.close();
    },
    toApprove() {
      if (!this.tenderWinCode) {
        this.$message.error("请先保存定标信息！");
        return false;
      }
      this.$confirm("确认发起审定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.approveFn();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    approveFn() {
      var params = {
        approveHeadCode: this.tenderWinCode,
        approveRequestCode: "50013E",
        approveTitle: "关于" + this.bidInfo.tenderName + "进行中标审定",
        approveContent:
          "依据《成本预算和集中/专项采购执行单》招标计划，现申请对" +
          this.bidInfo.tenderName +
          "50013E" +
          "招标进行中标审定"
      };
      this.$api.modular
        .tenderWinApproveByCodeWin(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            setTimeout(() => {
              window.location.href = "about:blank";
              window.close();
            }, 100);
            window.open(res.data);
          }
        });
    },
    // 流标
    async loseBid() {
      this.$confirm("是否确认进行流标?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.loseBidY();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    loseBidY() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular
        .tenderLoseByWin(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success("流标完成！");
              setTimeout(() => {
                window.location.href = "about:blank";
                window.close();
              }, 1000);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    }
  }
});
</script>
<style>
.process1 .el-form--inline .el-form-item__content {
  width: 50%;
}

.process1 .search-form-inline .el-form-item {
  width: 25%;
  margin: 0;
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
