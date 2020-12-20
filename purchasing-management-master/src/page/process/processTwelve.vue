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
          <!-- <el-form-item label="合同类型：" prop="age" style="width: 34%;margin:15px 0;">
            <el-select v-model="saveFileData.contractType" placeholder="请选择">
              <el-option
                v-for="item in contractType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>-->
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
          <el-form-item style="width: 60%;margin:0;"></el-form-item>
          <el-form-item label="推荐中标人：" style="width: 34%;margin:0;">
            <span>{{bidWinPeople}}</span>
          </el-form-item>
          <el-form-item label="综合评标报告：" prop="age" style="width: 56%;margin:0;">
            <a
              :href="zhpbFileData.TENDERCOMPILEDREPORTURL"
              target="_blank"
            >{{zhpbFileData.TENDERCOMPILEDREPORTNAME}}</a>
          </el-form-item>
        </el-form>
      </div>
      <h3>定标信息</h3>
      <el-table
        :data="dbTableList"
        ref="dbTableListS"
        @selection-change="handleSelectionChange"
        size="mini"
        :row-key="getRowKey"
        border
        style="width: 100%"
      >
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="SUPPLIER_NAME" label="单位名称"></el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="nodeName"
          label="资质等级/品牌"
          width="180"
        ></el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="投标总金额（元）">
          <template slot-scope="scope">
            <span
              :title="scope.row.TENDER_BUSINESS_QUOTATION_REMARK"
              v-if="scope.row.TENDER_BUSINESS_QUOTATION != 0"
            >{{scope.row.TENDER_BUSINESS_QUOTATION}}</span>
            <span
              v-if="scope.row.TENDER_BUSINESS_QUOTATION == 0"
            >— {{scope.row.TENDER_BUSINESS_QUOTATION_REMARK}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="80PX"
          show-overflow-tooltip
          prop="COMPILED_REPORT_SCORE"
          label="评标得分"
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
                  v-model="scope.row.TENDER_TARGET_AMOUNT"
                ></el-input>
                <el-input
                  :disabled="ifAlready"
                  size="mini"
                  placeholder="备注信息"
                  :title="scope.row.TENDER_TARGET_AMOUNT_REMARK"
                  style="float: left; width:52%; margin-left: 3%;"
                  type="text"
                  v-model="scope.row.TENDER_TARGET_AMOUNT_REMARK"
                ></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="综合排名">
          <template slot-scope="scope">
            <!-- <el-form size="mini" :model="scope.row" label-width="10" class="demo-ruleForm">
              <el-form-item
                :rules="[
      { required: true, message: '请输入综合排名', trigger: 'blur' }]"
                prop="TENDER_TARGET_REM"
              >
                <el-input
                  :disabled="ifAlready"
                  style="float: left; width:52%;"
                  size="mini"
                  type="text"
                  v-model="scope.row.TENDER_TARGET_REM"
                ></el-input>
              </el-form-item>
            </el-form>-->
            <span>{{scope.row.TENDER_TARGET_REM}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top: 12px;" class="fj">
        <el-col :span="3">
          <span style="margin-top: 12px;">中标通知书</span>
        </el-col>
        <el-col :span="8">
          <el-upload
            style="float: left;width:100%;text-align: left;"
            class="upload-demo"
            :disabled="ifAlready"
            :action="actionUrl"
            :before-upload="beforeUploadFn"
            :on-preview="(value)=> previewFn(value)"
            :on-success="(value) => uploadSuccess(value, 'f2')"
            :on-remove="(value)=> removeFn(value)"
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
  </div>
</template>
<script type="text/babel">
import Vue from "vue";
import base from "@/api/base";
export default Vue.component("process-twelve", {
  data() {
    return {
      selsectArr: [],
      sso_sessionid: this.$store.state.sso_sessionid,
      contractType: [],
      saveFileData: {
        targetCode: "",
        tenderWinStartDate: "",
        tenderWinEndDate: "",
        contractType: "",
        contractSignDate: "",
        strategicAgreementFileCode: "",
        tenderWinFileCode: "",
        target: [],
        insertType: "",
        tenderFileCode: "",
        tenderWinCode: ""
      },
      bidInfo: {
        tenderName: "",
        tenderNumber: ""
      },
      dbTableList: [],
      actionUrl:
        base.uploadUrl + "?sso_sessionid=" + this.$store.state.sso_sessionid,
      zhpbFileList: [],
      zhpbFileData: {
        name: "",
        TENDERCOMPILEDREPORTNAME: "",
        TENDERCOMPILEDREPORTURL: "",
        TENDERCOMPILEDREPORTCODE: ""
      },
      zlxyFileList: [],
      zlxyFileData: {
        name: ""
      },
      zbtzsFileList: [],
      zbtzsFileData: {
        name: ""
      },
      tenderWinCode: "",
      bidWinPeople: "",
      ifAlready: false,
      choseWin: ''
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
      this.$route.query.already == "tenderWinPublishSubmit" ||
      this.$route.query.already == "tenderLost"
    ) {
      this.ifAlready = true;
    } else {
      this.ifAlready = false;
    }
    if (this.$route.query.ifProcess) {
      this.ifAlready = true;
    }
    if (
      this.$route.query.approveStatus &&
      this.$route.query.approveStatus != "STOP"
    ) {
      this.ifAlready = true;
    }
    this.infoSearch();
    this.getWinBider();
  },
  beforeDestroy() {},
  methods: {
    getWinBider() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular.getWinBider(this.sso_sessionid, params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.bidWinPeople = res.data.data.linList[0].supplierName;
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
      } else if (type == "f3") {
        // this.saveFileData.bidWinningFileInfo = res.data[0].fileCode;
      }
    },
    removeFn(value) {
      this.$message.info("删除文件后，请进行保存，否则删除失效！");
      this.saveFileData.tenderWinFileCode = "";
    },
    previewFn(value) {
      window.open(value.TENDERWINFILEURL);
    },
    exceedFn() {
      this.$message.error("最多上传一个附件");
    },
    // tenderType
    tenderType() {
      if (this.saveFileData.tenderType == "1") {
        return "战略直委";
      } else if (this.saveFileData.tenderType == "2") {
        return "非战略直委";
      } else if (this.saveFileData.tenderType == "3") {
        return "议标";
      } else if (this.saveFileData.tenderType == "4") {
        return "邀请招标";
      } else {
        return "";
      }
    },
    getRowKey(row) {
      return row.TENDER_CANDIDATE_LINE_CODE;
    },
    toggleSelection(rows) {
      if (rows.length != 0) {
        this.$nextTick(function() {
          rows.forEach(row => {
            this.$refs.dbTableListS.toggleRowSelection(row);
          });
        });
      }
    },
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$message.error("只能勾选一个中标单位！");
        this.$refs.dbTableListS.toggleRowSelection(val[val.length - 1]);
      }
      this.choseWin = '';
      if(val.length>0){
        this.choseWin = val[0].TENDER_CANDIDATE_LINE_CODE;
      }
    },
    async saveFn1() {
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
        this.$message.error("请选择拟预计合同签订时间！");
        return false;
      }
      if(!this.choseWin){
        this.$message.error("请勾选中标单位！");
        return false;
      } else {
        this.saveFileData.target = [];
        for (var m = 0; m < this.dbTableList.length; m++) {
          if(this.choseWin == this.dbTableList[m].TENDER_CANDIDATE_LINE_CODE){
            this.saveFileData.target.push({
              tenderTargetAmount: this.dbTableList[m].TENDER_TARGET_AMOUNT,
              tenderTargetAmountRemark: this.dbTableList[m].TENDER_TARGET_AMOUNT_REMARK,
              tenderCandidateLine: this.dbTableList[m].TENDER_CANDIDATE_LINE_CODE,
              tenderTargetRem: this.dbTableList[m].TENDER_TARGET_REM
            });
          }
        }
      }
      if (
        this.saveFileData.target[0].tenderTargetAmount == 0 ||
        !this.saveFileData.target[0].tenderTargetAmount ||
        this.saveFileData.target[0].tenderTargetAmount == "—"
      ) {
        if(!this.saveFileData.target[0].tenderTargetAmountRemark){
          this.$message.error("请维护正确的中标信息！");
          return false;
        } else {
          this.saveFileData.target[0].tenderTargetAmount = 0;
        }
      } else if(isNaN(this.saveFileData.target[0].tenderTargetAmount)){
        this.$message.error("请输入正确的中标金额！");
        return false;
      }
      var a = 0;
      // for (var m = 0; m < this.dbTableList.length; m++) {
      //   if (!this.dbTableList[m].TENDER_TARGET_AMOUNT) {
      //     this.$message.error("中标金额不能为空，可以输入0！");
      //     return false;
      //   }
      //   if (this.dbTableList[m].TENDER_TARGET_AMOUNT == "—") {
      //     this.dbTableList[m].TENDER_TARGET_AMOUNT = 0;
      //   } else if (isNaN(this.dbTableList[m].TENDER_TARGET_AMOUNT)) {
      //     this.$message.error("请输入正确的中标金额！");
      //     return false;
      //   }
      //   if (
      //     this.dbTableList[m].TENDER_TARGET_AMOUNT == 0 &&
      //     !this.dbTableList[m].TENDER_TARGET_AMOUNT_REMARK
      //   ) {
      //     a++;
      //   }
      // }
      if (a > 0) {
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
        await this.saveFn();
      }
    },
    saveFn() {
      // var isTrue = 0;
      // for (var i = 0; i < this.dbTableList.length; i++) {
      //   for (var i2 = 0; i2 < this.dbTableList.length; i2++) {
      //     if (i != i2) {
      //       if (
      //         this.dbTableList[i].TENDER_TARGET_REM ==
      //         this.dbTableList[i2].TENDER_TARGET_REM
      //       ) {
      //         isTrue++;
      //       }
      //     }
      //   }
      // }
      // this.saveFileData.target = [];
      // if (isTrue == 0) {
      //   for (var i = 0; i < this.dbTableList.length; i++) {
      //     if (this.dbTableList[i].TENDER_TARGET_REM == 1) {
      //       this.saveFileData.target.push({
      //         tenderTargetAmount: this.dbTableList[i].TENDER_TARGET_AMOUNT,
      //         tenderTargetAmountRemark: this.dbTableList[i]
      //           .TENDER_TARGET_AMOUNT_REMARK,
      //         tenderCandidateLine: this.dbTableList[i]
      //           .TENDER_CANDIDATE_LINE_CODE,
      //         tenderTargetRem: this.dbTableList[i].TENDER_TARGET_REM
      //       });
      //     }
      //   }
      // } else {
      //   this.$message.error("请填写正确排名，不可重复，不可空缺！");
      //   return false;
      // }
      if (!this.saveFileData.tenderWinFileCode) {
        this.$message.error("请上传中标通知书！");
        return false;
      }
      this.ifAlready = true;
      this.saveFileData.tenderFileCode = this.tenderFileCode;
      this.saveFileData.tenderWinCode = this.tenderWinCode;
      this.$api.modular
        .saveTenderWin(this.sso_sessionid, this.saveFileData)
        .then(res => {
          this.ifAlready = false;
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.tenderWinCode = res.data.message;
              this.$message.success("保存成功！");
              this.infoSearch();
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
    },
    // 查询
    infoSearch() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular
        .getWinByTenderFileCode(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.selsectArr = [];
              this.zbtzsFileList = [];
              for (var i = 0; i < res.data.data.length; i++) {
                if (
                  res.data.data[i].TENDER_TARGET_AMOUNT == 0 ||
                  !res.data.data[i].TENDER_TARGET_AMOUNT
                ) {
                  res.data.data[i].TENDER_TARGET_AMOUNT = "—";
                }
                if (!res.data.data[i].TENDER_TARGET_REM) {
                  res.data.data[i].TENDER_TARGET_REM = i + 1;
                }
                if (res.data.data[i].TENDER_WIN_START_DATE) {
                  this.selsectArr.push(res.data.data[i]);
                  if (res.data.data[i].TENDER_WIN_FILE_CODE) {
                    this.zbtzsFileData.name =
                      res.data.data[i].TENDERWINFILENAME;
                    this.zbtzsFileData.TENDERWINFILENAME =
                      res.data.data[i].TENDERWINFILENAME;
                    this.zbtzsFileData.TENDER_WIN_FILE_CODE =
                      res.data.data[i].TENDER_WIN_FILE_CODE;
                    this.zbtzsFileData.TENDERWINFILEURL =
                      res.data.data[i].TENDERWINFILEURL;
                    this.zbtzsFileList.push(this.zbtzsFileData);
                    this.saveFileData.tenderWinFileCode =
                      res.data.data[i].TENDER_WIN_FILE_CODE;
                  }
                  if (res.data.data[i].TENDER_WIN_START_DATE) {
                    this.saveFileData.tenderWinStartDate = this.commonFn.formatDate(
                      res.data.data[i].TENDER_WIN_START_DATE
                    );
                  }
                  if (res.data.data[i].TENDER_WIN_END_DATE) {
                    this.saveFileData.tenderWinEndDate = this.commonFn.formatDate(
                      res.data.data[i].TENDER_WIN_END_DATE
                    );
                  }
                  if (res.data.data[i].CONTRACT_SIGN_DATE) {
                    this.saveFileData.contractSignDate = this.commonFn.formatDate(
                      res.data.data[i].CONTRACT_SIGN_DATE
                    );
                  }
                }
              }
              this.dbTableList = res.data.data;
              this.toggleSelection(this.selsectArr);
              if (res.data.data[0].TENDERCOMPILEDREPORTNAME) {
                this.zhpbFileData.name =
                  res.data.data[0].TENDERCOMPILEDREPORTNAME;
                this.zhpbFileData.TENDERCOMPILEDREPORTNAME =
                  res.data.data[0].TENDERCOMPILEDREPORTNAME;
                this.zhpbFileData.TENDERCOMPILEDREPORTCODE =
                  res.data.data[0].TENDERCOMPILEDREPORTCODE;
                this.zhpbFileData.TENDERCOMPILEDREPORTURL =
                  res.data.data[0].TENDERCOMPILEDREPORTURL;
                this.zhpbFileList.push(this.zhpbFileData);
              }
              if (res.data.data[0].STRATEGICAGREEMENTFILENAME) {
                this.zlxyFileData.name =
                  res.data.data[0].STRATEGICAGREEMENTFILENAME;
                this.zlxyFileData.STRATEGICAGREEMENTFILENAME =
                  res.data.data[0].STRATEGICAGREEMENTFILENAME;
                this.zlxyFileData.strategicAgreementFileCode =
                  res.data.data[0].STRATEGIC_AGREEMENT_FILE_CODE;
                this.zlxyFileData.STRATEGICAGREEMENTFILEURL =
                  res.data.data[0].STRATEGICAGREEMENTFILEURL;
                this.zlxyFileList.push(this.zlxyFileData);
                this.saveFileData.strategicAgreementFileCode =
                  res.data.data[0].STRATEGIC_AGREEMENT_FILE_CODE;
              }
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
