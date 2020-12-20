<template>
  <div>
    <bidInfo-title :bidInfo="bidInfo"></bidInfo-title>
    <h3>投标保证金缴纳信息</h3>
    <div></div>
    <el-table :data="moneyDataList" size="mini" border style="width: 100%">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="SUPPLIER_NAME" label="供方名称"></el-table-column>
      <el-table-column align="center" label="投标保证金金额(元)" width="140">
        <template slot-scope="scope">
          <span>{{scope.row.TENDER_BID_BOND*10000}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="TENDER_BAIL_CONFIRMATION_AMOUNT"
        label="确认金额(元)"
        width="130"
      >
        <template slot-scope="scope">
          <el-input
            size="mini"
            :disabled="ifAlready"
            v-model="scope.row.TENDER_BAIL_CONFIRMATION_AMOUNT"
            type="text"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="TENDER_BAIL_CONFIRMATION_DESCRIPTION"
        label="说明"
      >
        <template slot-scope="scope">
          <el-input
            size="mini"
            :disabled="ifAlready"
            v-model="scope.row.TENDER_BAIL_CONFIRMATION_DESCRIPTION"
            type="text"
          ></el-input>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" show-overflow-tooltip prop="operation_status" label="确认状态"></el-table-column> -->
      <el-table-column align="left" show-overflow-tooltip prop="file_code" label="上传附件">
        <!-- <el-input size="mini" type="file"></el-input> -->
        <template slot-scope="scope">
          <el-upload
            class="upload-demo"
            :action="actionUrl"
            :disabled="ifAlready"
            :on-preview="(value)=> previewFn(value, scope.row)"
            :data="uploadData"
            :on-remove="(res, fileList)=> removeFn(res, fileList, scope.$index)"
            :before-upload="beforeUploadFn"
            :on-success="(res, file, fileList)=> uploadSuccess(res, file, fileList, scope.$index)"
            :on-exceed="exceedFn"
            :file-list="scope.row.fileList"
            :multiple="true"
          >
            <el-button :disabled="ifAlready" size="mini" type="primary">点击上传</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column v-if="ifAlready" align="center" label="保证金退回" width="140">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="backBail(scope.row)">退回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top:20px;">
      <el-button size="mini" :disabled="ifAlready" type="primary" @click="loseBid">流标</el-button>
      <el-button size="mini" @click="cancelFn">关闭</el-button>
      <el-button size="mini" :disabled="ifAlready" type="primary" @click="Submission('draft')">暂存</el-button>
      <el-button size="mini" :disabled="ifAlready" type="primary" @click="Submission('submit')">提交</el-button>
    </div>
    <el-dialog
      append-to-body
      title="保证金退回"
      :close-on-click-modal="false"
      :visible.sync="backBailShow"
      @close="cancelBackBail"
    >
      <el-form :model="backBailData" size="mini" class="threeStyle">
        <el-form-item label="收款方" style="width: 100%;" label-width="100px">
          <span>{{backBailData.SUPPLIER_NAME}}</span>
        </el-form-item>
        <el-form-item label="退款金额" label-width="100px" style="float:left;width:50%;">
          <el-input style="width: 170px;" v-model="backBailData.TENDER_BAIL_CONFIRMATION_AMOUNT"></el-input>
        </el-form-item>
        <el-form-item label="退款时间" label-width="100px" style="float:left;width:50%;">
          <el-date-picker
            v-model="backBailData.TENDER_BAIL_BACK_DATE"
            type="date"
            style="width: 170px;"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="相关附件" label-width="100px" style="float:left;">
          <!-- 
          :disabled="backBailData.TENDER_BAIL_CONFIRMATION_STATUS == 'back'"-->
          <el-upload
            class="upload-demo"
            :action="uploadUrlBail"
            :on-preview="(value)=> previewFnBack(value)"
            :data="saveFileData"
            :on-remove="(file, fileList)=> removeFnBack(file, fileList)"
            :before-upload="beforeUploadFn"
            :on-success="(res, file, fileList)=> uploadSuccessBack(res, file, fileList)"
            :file-list="backBailData.BackFileList"
            :multiple="true"
          >
            <el-button :disabled="thTrue" size="mini" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <div style="clear:both"></div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelBackBail">取 消</el-button>
        <!-- 
        :disabled="backBailData.TENDER_BAIL_CONFIRMATION_STATUS == 'back'"-->
        <el-button :disabled="thTrue" size="mini" type="primary" @click="sureBackBail">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/babel">
import Vue from "vue";
import base from "@/api/base";
export default Vue.component("process-three", {
  data() {
    return {
      sso_sessionid: this.$store.state.sso_sessionid,
      moneyDataList: [],
      tenderFileCode: "",
      actionUrl:
        base.uploadUrl + "?sso_sessionid=" + this.$store.state.sso_sessionid,
      uploadUrlBail:
        base.uploadUrlBail +
        "?sso_sessionid=" +
        this.$store.state.sso_sessionid,
      ifAlready: false,
      thTrue: false,
      bidInfo: {
        tenderName: "",
        tenderNumber: ""
      },
      backBailShow: false,
      backBailData: {
        TENDER_BAIL_CONFIRMATION_AMOUNT: "",
        TENDER_BAIL_BACK_DATE: ""
      },
      saveFileData: {
        fileType: "tenderBailBack",
        headCode: ""
      },
      uploadData: {
        fileType: "tenderBailFile"
      }
    };
  },
  mounted() {
    this.tenderFileCode = this.$route.query.tenderFileCode;
    if (this.$route.query.already == "tenderBailSubmit" || this.$route.query.already == "tenderLost") {
      this.ifAlready = true;
      if(this.$route.query.already == "tenderLost"){
        this.thTrue = true;
      }
    } else {
      this.ifAlready = false;
    }
    if (this.$route.query.ifProcess) {
      this.ifAlready = true;
      this.thTrue = true;
    }
    this.bidInfo.tenderNumber = this.$route.query.tenderNumber;
    this.bidInfo.tenderName = this.$route.query.tenderName;
    this.getCandidateByTenderFileCode();
  },
  beforeDestroy() {
    sessionStorage.removeItem("processthree");
  },
  methods: {
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
        .tenderLoseByBail(this.sso_sessionid, params)
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
    cancelBackBail() {
      this.backBailShow = false;
      this.backBailData = {
        TENDER_BAIL_CONFIRMATION_AMOUNT: "",
        TENDER_BAIL_BACK_DATE: "",
        BackFileList: []
      };
    },
    sureBackBail() {
      if (!this.backBailData.TENDER_BAIL_CONFIRMATION_AMOUNT) {
        this.$message.error("请填写退回金额！");
        return false;
      }
      if (!this.backBailData.TENDER_BAIL_BACK_DATE) {
        this.$message.error("请选择退回日期！");
        return false;
      }
      if (this.backBailData.BackFileList.length == 0) {
        this.$message.error("请上传相关附件！");
        return false;
      }
      var params = {
        tenderBailCode: this.saveFileData.headCode,
        tenderBailBackDateStr: this.backBailData.TENDER_BAIL_BACK_DATE,
        tenderBailBackAmount: this.backBailData.TENDER_BAIL_CONFIRMATION_AMOUNT
      };
      this.$api.modular.tenderBailBack(this.sso_sessionid, params).then(res => {
        if (res.status && res.data.returnCode == 0) {
          this.$message.success("退回成功");
          this.backBailShow = false;
          // this.getCandidateByTenderFileCode();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 保证金退回
    backBail(row) {
      this.backBailShow = true;
      this.backBailData.SUPPLIER_NAME = row.SUPPLIER_NAME;
      this.saveFileData.headCode = row.TENDER_BAIL_CODE;
      var params = {
        tenderBailCode: row.TENDER_BAIL_CODE
      };
      this.$api.modular
        .getTenderBailBack(this.sso_sessionid, params)
        .then(res => {
          if (res.status && res.data.returnCode == 0) {
            if (!res.data.data[0].TENDER_BAIL_BACK_AMOUNT) {
              this.backBailData.TENDER_BAIL_CONFIRMATION_AMOUNT =
                res.data.data[0].TENDER_BAIL_CONFIRMATION_AMOUNT;
            } else {
              this.backBailData.TENDER_BAIL_CONFIRMATION_AMOUNT =
                res.data.data[0].TENDER_BAIL_BACK_AMOUNT;
            }
            this.backBailData.TENDER_BAIL_CONFIRMATION_STATUS =
              res.data.data[0].TENDER_BAIL_CONFIRMATION_STATUS;
            this.backBailData.TENDER_BAIL_BACK_DATE = this.commonFn.formatDate(
              res.data.data[0].TENDER_BAIL_BACK_DATE
            );
            this.backBailData.BackFileList = [];
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].FILE_NAME) {
                this.backBailData.BackFileList.push({
                  name: res.data.data[i].FILE_NAME,
                  FILE_CODE: res.data.data[i].SERVICE_FILE_CODE,
                  FILEPRIVEW: res.data.data[i].FILEPRIVEW
                });
              }
            }
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 上传
    uploadSuccessBack(res, file, fileList) {
      this.backBailData.BackFileList.push({
        name: res.data[0].fileName,
        FILE_CODE: res.data[0].serviceFileCode,
        FILEPRIVEW: ""
      });
    },
    previewFnBack(res) {
      if (res.name && res.FILEPRIVEW) {
        window.open(res.FILEPRIVEW);
      }
    },
    removeFnBack(file, fileList) {
      this.backBailData.BackFileList = fileList;
      var params = {
        serviceCode: ''
      }
      if(file.FILE_CODE){
        params.serviceCode = file.FILE_CODE;
      } else if(file.response){
        params.serviceCode = file.response.data[0].serviceFileCode;
      }
      this.$api.modular.delFileFn(this.sso_sessionid, params).then(res => {
        if (res.status == 200 && res.data.returnCode == 0) {

        } else {
          this.$message.error('删除有误！');
        }
      })
    },
    // 上传
    beforeUploadFn(file) {
      if (!this.commonFn.beforeUpload(file, this)) return false;
    },
    // 上传
    uploadSuccess(res, file, fileList, index) {
      var arr = [];
      for (var i = 0; i < fileList.length; i++) {
        if (fileList[i].response) {
          arr.push(fileList[i].response.data[0].serviceFileCode);
        } else if(fileList[i].FILE_CODE){
          arr.push(fileList[i].FILE_CODE);
        }
      }
      this.moneyDataList[index].FILE_CODE = arr.join(",");
    },
    // 删除文件
    removeFn(res, fileList, index) {
      this.$message.info('删除文件后，请进行保存，否则删除失效！');
      if (this.moneyDataList[index].FILE_CODE) {
        var arr = this.moneyDataList[index].FILE_CODE.split(",");
        if (res.response || res.FILE_CODE) {
          if (res.FILE_CODE) {
            var serviceFileCode = res.FILE_CODE;
          }
          if (res.response) {
            var serviceFileCode = res.response.data[0].serviceFileCode;
          }
          for (var i = 0; i < arr.length; i++) {
            if (serviceFileCode == arr[i]) {
              arr.splice(i, 1);
              break;
            }
          }
          this.moneyDataList[index].FILE_CODE = arr.join(",");
        }
      } else {
        // return false;
      }
    },
    exceedFn() {},
    previewFn(res, row) {
      if (res.FILE_CODE && res.FILEPRIVEW) {
        window.open(res.FILEPRIVEW);
      }
    },
    // 获取列表
    getCandidateByTenderFileCode() {
      var that = this;
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular
        .getCandidateByTenderFileCode(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              if (res.data.data.length > 0) {
                that.moneyDataList.push(res.data.data[0]);
                if (res.data.data[0].FILE_CODE) {
                  let arr0 = that.moneyDataList[0].FILE_CODE.split(",");
                  that.moneyDataList[0].fileList = [];
                  that.moneyDataList[0].fileList.push({
                    name: res.data.data[0].FILE_NAME,
                    FILE_CODE: arr0[0],
                    FILEPRIVEW: res.data.data[0].FILEPRIVEW
                  });
                }
              }
              var s = 0;
              var codeIndex = 0;
              for (var i = 0; i < res.data.data.length; i++) {
                if (i == res.data.data.length - 1) {
                  return false;
                }
                if (
                  res.data.data[i].SUPPLIER_CODE != res.data.data[i + 1].SUPPLIER_CODE
                ) {
                  s++;
                  that.moneyDataList.push(res.data.data[i + 1]);
                  that.moneyDataList[s].fileList = [];
                  codeIndex = 0;
                } else {
                  codeIndex++;
                }
                if (res.data.data[i + 1].FILE_CODE) {
                  let arr1 = that.moneyDataList[s].FILE_CODE.split(",");
                  that.moneyDataList[s].fileList.push({
                    name: res.data.data[i + 1].FILE_NAME,
                    FILE_CODE: arr1[codeIndex],
                    FILEPRIVEW: res.data.data[i + 1].FILEPRIVEW
                  });
                }
              }
            }
          }
        });
    },

    Submission(type) {
      if (this.moneyDataList.length == 0) {
        this.$message.error("保证金缴纳信息不能为空！");
        return false;
      }
      var params = [];
      for (var i = 0; i < this.moneyDataList.length; i++) {
        
        // if(type == 'submit'){
        //   if(!this.moneyDataList[i].TENDER_BAIL_CONFIRMATION_AMOUNT){
        //     this.$message.error("请输入确认金额！");
        //     return false;
        //   } else {
        //     if (
        //       this.moneyDataList[i].TENDER_BAIL_CONFIRMATION_AMOUNT != 0 &&
        //       this.moneyDataList[i].TENDER_BAIL_CONFIRMATION_AMOUNT != ""
        //     ) {
        //       if (!this.moneyDataList[i].FILE_CODE) {
        //         this.$message.error("已缴纳保证金的供应商‘附件’不能为空！");
        //         return false;
        //       }
        //     }
        //     if (
        //       isNaN(Number(this.moneyDataList[i].TENDER_BAIL_CONFIRMATION_AMOUNT))
        //     ) {
        //       this.$message.error("确认金额必须是数字！");
        //       return false;
        //     }
        //   }
        //   if(!this.moneyDataList[i].FILE_CODE){
        //     this.$message.error("请上传附件！");
        //     return false;
        //   }
        // }
        if (this.moneyDataList[i].TENDER_BAIL_CONFIRMATION_AMOUNT) {
          // if (
          //   this.moneyDataList[i].TENDER_BAIL_CONFIRMATION_AMOUNT != 0 &&
          //   this.moneyDataList[i].TENDER_BAIL_CONFIRMATION_AMOUNT != ""
          // ) {
          //   if (!this.moneyDataList[i].FILE_CODE) {
          //     this.$message.error("已缴纳保证金的供应商‘附件’不能为空！");
          //     return false;
          //   }
          // }
          if (
            isNaN(Number(this.moneyDataList[i].TENDER_BAIL_CONFIRMATION_AMOUNT))
          ) {
            this.$message.error("确认金额必须是数字！");
            return false;
          }
        } else {
          this.moneyDataList[i].TENDER_BAIL_CONFIRMATION_AMOUNT = 0;
        }
        // if (this.moneyDataList[i].FILE_CODE) {
        //   if (
        //     this.moneyDataList[i].TENDER_BAIL_CONFIRMATION_AMOUNT == 0 ||
        //     this.moneyDataList[i].TENDER_BAIL_CONFIRMATION_AMOUNT == ""
        //   ) {
        //     this.$message.error("已上传附件的供应商‘确认金额’不正确！");
        //     return false;
        //   }
        // }
        // if (
        //   this.moneyDataList[i].TENDER_BAIL_CONFIRMATION_AMOUNT &&
        //   this.moneyDataList[i].FILE_CODE
        // ) {
        //   params.push({
        //     fileCode: this.moneyDataList[i].FILE_CODE,
        //     operationStatus: type,
        //     tenderBailCode: this.moneyDataList[i].TENDER_BAIL_CODE,
        //     tenderBailConfirmationAmount: this.moneyDataList[i]
        //       .TENDER_BAIL_CONFIRMATION_AMOUNT,
        //     tenderBailConfirmationDescription: this.moneyDataList[i]
        //       .TENDER_BAIL_CONFIRMATION_DESCRIPTION,
        //     tenderBailMoney: this.moneyDataList[i].TENDER_BID_BOND,
        //     tenderCandidateCode: this.moneyDataList[i]
        //       .TENDER_CANDIDATE_LINE_CODE,
        //     tenderFileCode: this.moneyDataList[i].TENDER_FILE_CODE
        //   });
        // }
        params.push({
            fileCode: this.moneyDataList[i].FILE_CODE,
            operationStatus: type,
            tenderBailCode: this.moneyDataList[i].TENDER_BAIL_CODE,
            tenderBailConfirmationAmount: this.moneyDataList[i]
              .TENDER_BAIL_CONFIRMATION_AMOUNT,
            tenderBailConfirmationDescription: this.moneyDataList[i]
              .TENDER_BAIL_CONFIRMATION_DESCRIPTION,
            tenderBailMoney: this.moneyDataList[i].TENDER_BID_BOND,
            tenderCandidateCode: this.moneyDataList[i]
              .TENDER_CANDIDATE_LINE_CODE,
            tenderFileCode: this.moneyDataList[i].TENDER_FILE_CODE
          });
      }
      this.ifAlready = true;
      this.$api.modular
        .bailUpdateByObj(this.sso_sessionid, type, params)
        .then(res => {
          this.ifAlready = false;
          if (res) {
            if (res.status == 200 && res.data.returnCode == 0) {
              this.$message.success("提交成功");
              if (type == "submit") {
                setTimeout(() => {
                  window.location.href = "about:blank";
                  window.close();
                }, 1000);
              } else {
                this.ifAlready = false;
              }
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error("数据有误");
          }
        });
    },
    cancelFn() {
      // this.$router.push("/guaranteeAmount");
      window.location.href = "about:blank";
      window.close();
    },
    tableSearchFn(value) {
      this.selectionList = value;
    }
  }
});
</script>
<style>
.threeStyle .el-upload-list.el-upload-list--text {
  float: left;
  margin-right: 10px;
}
.threeStyle .el-upload-list__item:first-child {
  margin-top: 2px;
}
</style>
