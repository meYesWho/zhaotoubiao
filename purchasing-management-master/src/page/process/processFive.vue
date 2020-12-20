<template>
  <div>
    <bidInfo-title :bidInfo="bidInfo"></bidInfo-title>
    <h3>答疑信息</h3>
    <el-button
      :disabled="!openSure"
      size="mini"
      style="float:left;margin-bottom:10px;"
      type="primary"
      @click="addItem"
    >添加</el-button>
    <el-table :data="answerFileList" size="mini" border style="width: 100%">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
      <el-table-column align="left" show-overflow-tooltip prop="file_code" label="上传附件">
        <!-- <el-input size="mini" type="file"></el-input> -->
        <template slot-scope="scope">
          <el-upload
            class="upload-demo"
            :disabled="!openSure"
            :action="actionUrl"
            :on-preview="(value)=> previewFn(value, scope.row)"
            :data="uploadData"
            :before-upload="beforeUploadFn"
            :before-remove="beforeRemove"
            :on-remove="(value)=> removeFn(value, scope.row, scope.$index)"
            :on-success="(res, file, fileList)=> uploadSuccess(res, file, fileList, scope.$index)"
            :on-exceed="exceedFn"
            :file-list="scope.row.fileList"
            :limit="1"
            :multiple="false"
          >
            <el-button :disabled="!openSure" size="mini" type="primary">点击上传</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <!-- <el-table-column
        align="center"
        show-overflow-tooltip
        prop="fileDescription"
        label="描述"
        width="180"
      ></el-table-column>-->
      <el-table-column align="center" show-overflow-tooltip prop="fileSize" label="大小" width="180"></el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="createdName"
        label="上传人"
        width="180"
      ></el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="createdDate"
        label="上传时间"
        width="180"
      >
        <template slot-scope="scope">{{formatFN(scope.row.createdDate)}}</template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="nodeName" label="操作" width="180">
        <template slot-scope="scope">
          <el-button :disabled="!openSure" type="text" @click="delFn(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div style="text-align: center">
      <el-button size="mini" :disabled="!openSure" type="primary" @click="loseBid">流标</el-button>
      <el-button size="mini" @click="cancelFn">关闭</el-button>
      <!-- <el-button @click="uploadFn">上传</el-button> -->
      <el-button size="mini" type="primary" :disabled="!openSure" @click="Submission">完成答疑</el-button>

    </div>
  </div>
</template>
<script type="text/babel">
import Vue from "vue";
import base from "@/api/base";
export default Vue.component("process-five", {
  data() {
    return {
      sso_sessionid: this.$store.state.sso_sessionid,
      answerFileList: [],
      tenderFileCode: "",
      actionUrl:
        base.defaultUrl + "/tenderFileAnswer/uploadAnswerFile?sso_sessionid=" + this.$store.state.sso_sessionid,
      uploadData: {
        fileType: "TenderAnswer",
        headCode: ""
      },
      openSure: true,
      bidInfo: {
        tenderName: "",
        tenderNumber: ""
      }
    };
  },
  mounted() {
    this.tenderFileCode = this.$route.query.tenderFileCode;
    if (this.$route.query.already == "tenderFileAnswer" || this.$route.query.already == "tenderLost") {
      this.openSure = false;
    } else {
      this.openSure = true;
    }
    if (this.$route.query.ifProcess) {
      this.openSure = false;
    }
    this.bidInfo.tenderNumber = this.$route.query.tenderNumber;
    this.bidInfo.tenderName = this.$route.query.tenderName;
    this.uploadData.headCode = this.tenderFileCode;
    this.getTenderFileAnswer();
  },
  beforeDestroy() {},
  methods: {
    beforeUploadFn(file) {
      if (!this.commonFn.beforeUpload(file, this)) return false;
    },
    beforeRemove() {
      if (!this.openSure) {
        this.$message.error("已完成答疑，不允许再次操作附件！");
        return this.openSure;
      }
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
        .tenderLoseByAnswer(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success('流标完成！');
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
    //   添加一条
    addItem() {
      this.answerFileList.push({
        fileSize: ""
      });
    },
    removeFn(value, row, index){
      var params = {
        fileCode: row.serviceFileCode
      };
      this.$api.modular
        .delByCodeAnswer(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              if (res.data.message == "答疑文件删除成功") {
                this.answerFileList.splice(index, 1);
                this.answerFileList.push({})
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
    // 删除
    delFn(row, index) {
      if(!row.serviceFileCode){
        this.answerFileList.splice(index, 1);
        return false;
      }
      var params = {
        fileCode: row.serviceFileCode
      };
      this.$api.modular
        .delByCodeAnswer(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              if (res.data.message == "答疑文件删除成功") {
                this.$message.success("答疑文件删除成功!");
                this.getTenderFileAnswer();
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
    formatFN(date) {
      return this.commonFn.formatDate(date);
    },
    // 上传
    uploadSuccess(res, file, fileList, index) {
      this.answerFileList[index].fileSize =
        (Number(file.size) / 1024).toFixed(2) + "KB";
      this.answerFileList[index].fileDescription = res.data[0].fileDescription;
      this.answerFileList[index].fileCode = res.data[0].fileCode;
      this.answerFileList[index].serviceFileCode = res.data[0].serviceFileCode;
      this.answerFileList[index].createdName = res.data[0].createdName;
      this.answerFileList[index].createdDate = res.data[0].createdDate;
    },
    exceedFn() {
      this.$message.error("最多上传一个附件");
    },
    previewFn(res, row) {
      if (row.fileCode && row.uploadUrl) {
        window.open(row.uploadUrl);
      } else {
        this.$message.error("该文件暂不支持下载！");
      }
    },
    // 获取列表
    getTenderFileAnswer() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular
        .getTenderFileAnswer(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.answerFileList = res.data.data;
              for (var i = 0; i < this.answerFileList.length; i++) {
                this.answerFileList[i].fileList = [];
                this.answerFileList[i].fileList.push(res.data.data[i]);
                this.answerFileList[i].name = res.data.data[i].fileName;
              }
            }
          }
        });
    },

    Submission() {
      if (this.answerFileList.length == 0) {
        this.$message.error("答疑信息不能为空！");
        return false;
      }
      for (var i = 0; i < this.answerFileList.length; i++) {
        if (!this.answerFileList[i].fileCode) {
          this.$message.error("答疑附件不能为空！");
          return false;
        }
      }
      this.openSure = false;
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular.overAnswer(this.sso_sessionid, params).then(res => {
      this.openSure = true;
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.$message.success("完成答疑！");
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
    cancelFn() {
      window.location.href = "about:blank";
      window.close();
    },
    // uploadFn() {
    //   this.$api.modular
    //     .uploadAnswerFile(this.sso_sessionid, params)
    //     .then(res => {
    //     });
    // },
    tableSearchFn(value) {
      this.selectionList = value;
    }
  }
});
</script>
<style>
</style>
