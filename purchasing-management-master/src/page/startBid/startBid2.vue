<template>
  <div class="rightArea">
    <h1 style="text-align:center;display:block;font-size: 16px;margin-bottom: 30px;">{{tenderName}}招标项目————投标</h1>
    <el-row>
      <!-- <el-col :span="3">
        <span></span>
      </el-col> -->
      <el-col :span="5">
        <span style="margin-left:28px;">商务标第一轮报价（含税 元）</span>
      </el-col>
      <el-col :span="4">
        <el-input
          type="text"
          :disabled="disabledLook"
          v-model="startBidData.tenderQuotation"
          size="mini"
        ></el-input>
      </el-col>
      <el-col :span="5">
        <span>商务标第一轮报价进项税（元）</span>
      </el-col>
      <el-col :span="4">
        <el-input
          type="text"
          :disabled="disabledLook"
          v-model="startBidData.quoteInputTax"
          size="mini"
        ></el-input>
      </el-col>
    </el-row>
    <!-- <el-row style="margin: 20px 0;line-height:20px;">
      <el-col :span="3">
        <span>投标人</span>
      </el-col>
      <el-col :span="10">
        <span type="text" size="mini" style="float:left;">{{tenderCandidateLineCode}}</span>
      </el-col>
    </el-row> -->
    <el-row style="margin-top: 19px;" class="fj">
      <el-col :span="3">
        <span style="margin-top: 12px;">商务标附件</span>
      </el-col>
      <el-col :span="8">
        <el-upload
          style="float: left;width:100%;text-align: left;"
          class="upload-demo"
          :action="actionUrl"
          :before-upload="beforeUploadFn"
          :disabled="disabledLook"
          name="file"
          :on-preview="(res) => previewFn(res, 'businessFileCode', startBidData)"
          :on-success="(res, file, fileList) => uploadSuccess(res, file, fileList, 'businessFileCode')"
          :on-exceed="exceedFn"
          :file-list="startBidData.businessFileList"
          :limit="1"
          :multiple="false"
        >
          <el-button size="mini" 
          :disabled="disabledLook" type="primary">上传</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-row style="margin-top: 12px;" class="fj">
      <el-col :span="3">
        <span style="margin-top: 12px;">技术标附件</span>
      </el-col>
      <el-col :span="8">
        <el-upload
          style="float: left;width:100%;text-align: left;"
          class="upload-demo"
          name="file"
          :disabled="disabledLook"
          :action="actionUrl"
          :before-upload="beforeUploadFn"
          :on-preview="(res) => previewFn(res, 'technologyFileCode', startBidData)"
          :file-list="startBidData.technologyFileList"
          :on-success="(res, file, fileList) => uploadSuccess(res, file, fileList, 'technologyFileCode')"
          :on-exceed="exceedFn"
          :limit="1"
          :multiple="false"
        >
          <el-button size="mini"
          :disabled="disabledLook" type="primary">上传</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <div style="margin-top:30px">
      <el-button size="mini" @click="goback">返回</el-button>
      <el-button size="mini" :disabled="disabledLook" type="primary" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import base from "@/api/base";
export default {
  data() {
    return {
      sso_sessionid: this.$store.state.sso_sessionid,
      startBidData: {
        quoteInputTax: "",
        tenderQuotation: "",
        technologyFileCode: "",
        technologyFileName: "",
        businessFileCode: "",
        businessFileName: "",
        tenderCandidateLineCode: "",
        tenderDate: "",
        tenderFileCode: "",
        technologyFileList: [],
        businessFileList: [],
        tenderSubmitCode: ""
      },
      tenderCandidateLineCode: '',
      tenderName: "",
      tenderFileCode: "",
      bidList: [{ s: "" }],
      actionUrl:
        base.defaultUrl + "/tenderSubmit/uploadFileReturnInfo",
      disabledLook: false
    };
  },
  mounted() {
    // var tenderFileCode = sessionStorage.getItem("startBid");
    // if (tenderFileCode && !this.$route.query.tenderFileCode) {
    //   this.startBidData.tenderFileCode = tenderFileCode;
    // } else {
    //   sessionStorage.setItem("startBid", this.$route.query.tenderFileCode);
    //   this.startBidData.tenderFileCode = this.$route.query.tenderFileCode;
    // }
    this.startBidData.tenderFileCode = this.$route.query.tenderFileCode;
    this.tenderCandidateLineCode = this.$route.query.tenderCandidateLineCode;
    this.startBidData.tenderCandidateLineCode = this.$route.query.tenderCandidateLineCode;
    this.tenderName = this.$route.query.tenderName;
    this.tenderFileCode = this.$route.query.tenderFileCode;
    if (this.$route.query.type == "l") {
      this.disabledLook = true;
    } else {
      this.disabledLook = false;
    }
    // debugger
    this.selSubmitByCode();
  },
  beforeDestroy() {
    sessionStorage.removeItem("startBid");
  },
  methods: {
    // 查询
    selSubmitByCode() {
      this.$api.modular
        .selSubmitByCode(this.sso_sessionid, this.startBidData)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              if (res.data.data.length == 0) {
                this.startBidData = {
                  quoteInputTax: "",
                  tenderQuotation: "",
                  technologyFileCode: "",
                  technologyFileName: "",
                  businessFileCode: "",
                  businessFileName: "",
                  tenderCandidateLineCode: "",
                  tenderDate: "",
                  tenderFileCode: "",
                  technologyFileList: [],
                  businessFileList: [],
                  tenderSubmitCode: ""
                };
                return false;
              }
              this.startBidData = res.data.data[0];
              res.data.data[0].technologyFileList = [];
              res.data.data[0].businessFileList = [];
              if (res.data.data[0].technologyFileCode) {
                res.data.data[0].technologyFileList.push({
                  name: res.data.data[0].technologyFileName
                });
              }
              if (res.data.data[0].businessFileCode) {
                res.data.data[0].businessFileList.push({
                  name: res.data.data[0].businessFileName
                });
              }
              if(res.data.data[0].tenderStatus == 'overReturn'){
                this.disabledLook = true;
              }
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error("添加失败！");
          }
        });
    },
    // 上传
    beforeUploadFn(file) {
      if (!this.commonFn.beforeUpload(file, this)) return false;
    },
    uploadSuccess(res, file, fileList, type) {
      this.startBidData.tenderDate = this.commonFn.formatDate(res.data[0].createdDate);
      if (type == "businessFileCode") {
        this.startBidData.businessFileCode = res.data[0].serviceFileCode;
        this.startBidData.businessFileList = fileList;
      } else {
        this.startBidData.technologyFileCode = res.data[0].serviceFileCode;
        this.startBidData.technologyFileList = fileList;
      }
    },
    previewFn(res, type, row) {
      if (type == "businessFileCode") {
        window.open(row.businessFileUrl);
      } else {
        window.open(row.technologyFileUrl);
      }
    },
    exceedFn() {
      this.$message.error("最多上传一个附件");
    },
    goback() {
      this.$router.go(-1);
      this.disabledLook = false;
    },
    // 保存
    onSubmit() {
      if(!this.startBidData.tenderQuotation){
        this.$message.error('请填写第一轮报价！');
        return false
      }
      if(!this.startBidData.quoteInputTax){
        this.$message.error('请填写第一轮报价进项税！');
        return false
      }
      if(!this.startBidData.businessFileList.length >0){
        this.$message.error('请上传商务标附件！');
        return false
      }
      if(!this.startBidData.technologyFileList.length>0){
        this.$message.error('请上传技术标附件！');
        return false
      }
      this.startBidData.tenderFileCode = this.tenderFileCode;
      this.startBidData.tenderCandidateLineCode = this.tenderCandidateLineCode;
      this.$api.modular
        .tenderSubmitSave(this.sso_sessionid, this.startBidData)
        .then(res => {
          // 执行某些操作
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success("提交成功！");
              // if (this.startBidData.groupHeadCode != "") {
              //   this.$message.success("修改成功！");
              // } else {
              //   this.$message.success("添加成功！");
              // }
              this.goback();
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error("添加失败！");
          }
        });
    }
  }
};
</script>
<style>
.fj .el-upload {
  /* float: left; */
  margin-right: 12px;
  margin-left: 10px;
}
.fj .el-upload-list {
  width: 70%;
  float: left;
  margin-top: -6px;
}
</style>
