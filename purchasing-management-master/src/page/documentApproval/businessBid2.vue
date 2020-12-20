<template>
  <div class="rightArea">
    <div class="mengceng" v-if="mengcengShow" @click="resetListBtn"></div>
    <h1>评商务标</h1>
    <search-form ref="searchForms" @searchFormFn="searchFormFn"></search-form>
    <div class="groupBtn">
      <el-button
        v-if="hasQx('aph2_tender_PSWB-QX-C19')"
        size="mini"
        type="primary"
        @click="searchListBtn"
      >查询</el-button>
      <el-button
        v-if="hasQx('aph2_tender_PSWB-QX-C19')"
        size="mini"
        type="primary"
        @click="resetListBtn"
      >重置</el-button>
      <el-button
        v-if="hasQx('aph2_tender_PSWB-QX-C72')"
        size="mini"
        type="primary"
        @click="toTp"
      >商务谈判</el-button>
      <el-button
        v-if="hasQx('aph2_tender_PSWB-QX-C17')"
        size="mini"
        type="primary"
        @click="openEvaluationBusiness"
      >启动商务标评标</el-button>
      <el-button
        v-if="hasQx('aph2_tender_PSWB-QX-C11')"
        size="mini"
        type="primary"
        @click="kai(1)"
      >评商务标</el-button>
      <el-button
        v-if="hasQx('aph2_tender_PSWB-QX-C30')"
        size="mini"
        type="primary"
        @click="kai(2)"
      >完成商务标评标</el-button>
    </div>
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="businessBidList"
      border
      size="mini"
      tooltip-effect="dark"
      style="width: 98%; margin: 0 auto;"
      @selection-change="tableSearchFn"
    >
      <el-table-column align="center" type="selection" width="50"></el-table-column>
      <el-table-column label="序号" width="50" type="index" align="center"></el-table-column>
      <el-table-column prop="commName" label="业务单元" show-overflow-tooltip></el-table-column>
      <el-table-column prop="tenderName" label="招标项目名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="tenderNumber" label="招标编号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="contractDemand" label="招标范围" width="100">
        <template slot-scope="scope">
          <p v-if="scope.row.contractDemand.length<6">{{scope.row.contractDemand}}</p>
          <el-popover
           v-if="scope.row.contractDemand.length>5"
            placement="top"
            popper-class="fw"
            trigger="hover"
            :content="scope.row.contractDemand">
            <p style="width:100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
              slot="reference"
            >{{scope.row.contractDemand}}</p>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="招标状态">
        <template slot-scope="scope">
          <div v-if="scope.row.tenderFileStatus == 'lost'">
            <span v-if="scope.row.tenderScheduleStatus == 'tenderLost'">流标</span>
            <span v-if="scope.row.tenderScheduleStatus == 'tenderCompleteOpenBusiness'">完成开商务标(流标)</span>
            <span
              v-if="scope.row.tenderScheduleStatus == 'completeEvaluationTechnical'"
            >完成评技术标评标报告(流标)</span>
            <span
              v-if="scope.row.tenderScheduleStatus == 'completeTenderBusinessNegotiation'"
            >完成商务谈判(流标)</span>
            <span v-if="scope.row.tenderScheduleStatus == 'openEvaluationBusiness'">启动评商务标(流标)</span>
            <span v-if="scope.row.tenderScheduleStatus == 'completeEvaluationBusiness'">完成评商务标(流标)</span>
          </div>
          <div v-if="scope.row.tenderFileStatus != 'lost'">
            <span v-if="scope.row.tenderScheduleStatus == 'tenderLost'">流标</span>
            <span v-if="scope.row.tenderScheduleStatus == 'tenderCompleteOpenBusiness'">完成开商务标</span>
            <span v-if="scope.row.tenderScheduleStatus == 'completeEvaluationTechnical'">完成评技术标评标报告</span>
            <span
              v-if="scope.row.tenderScheduleStatus == 'completeTenderBusinessNegotiation'"
            >完成商务谈判</span>
            <span v-if="scope.row.tenderScheduleStatus == 'openEvaluationBusiness'">启动评商务标</span>
            <span v-if="scope.row.tenderScheduleStatus == 'completeEvaluationBusiness'">完成评商务标</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="商务谈判" :visible.sync="dialogFormVisible" @close="cancelTp">
      <el-row style="margin-bottom: 20px;">
        <el-col align="right" :span="6">招标项目名称：</el-col>
        <el-col align="left" :span="8">{{tenderInfo.tenderName}}</el-col>
        <el-col align="right" :span="4">招标编号：</el-col>
        <el-col align="left" :span="6">{{tenderInfo.tenderNumber}}</el-col>
      </el-row>
      <el-row class="companyInfo" v-for="(item, index) in talkList" :key="index">
        <el-col :span="24" class="title" align="left">{{item[0].supplierName}}</el-col>
        <div class="baojiaInfo" v-for="(newItem, newIndex) in item" :key="newIndex">
          <el-button
            class="delBtn"
            @click="delBuss(index, newIndex)"
            size="mini"
            type="text"
            style="float: left;"
            v-if="newItem.newAdd"
          >删除</el-button>
          <span>第{{newIndex+1}}轮报价</span>
          <el-input
            style="width:100px;"
            size="mini"
            :disabled="newIndex == 0"
            v-model="newItem.tenderBusinessQuotation"
            placeholder="请填写报价"
          ></el-input>
          <el-input
            style="width:110px;"
            size="mini"
            :disabled="newIndex == 0"
            v-model="newItem.tenderBusinessQuotationRemark"
            placeholder="请填写备注"
          ></el-input>
          <el-upload
            show-overflow-tooltip
            style="float: left;width:220px;text-align: left; margin-left: 12px;"
            :action="actionUrl"
            :disabled="tenderInfo.tenderScheduleStatus != 'tenderCompleteOpenBusiness'"
            :on-preview="(value)=> previewFn(value, newItem)"
            :before-upload="beforeUploadFn"
            :on-remove="(value)=> removeFn(value, index, newIndex)"
            :on-success="(res, file, fileList)=> uploadSuccess(res, file, fileList, index, newIndex)"
            :on-exceed="exceedFn"
            :file-list="newItem.fileList"
            :limit="1"
            :multiple="false"
          >
            <el-button
              :disabled="tenderInfo.tenderScheduleStatus != 'tenderCompleteOpenBusiness'"
              size="mini"
              type="primary"
            >上传附件</el-button>
          </el-upload>
        </div>
        <el-button
          style="float:left;margin-left: 36px;margin-top: 10px;"
          size="mini"
          type="primary"
          :disabled="tenderInfo.tenderScheduleStatus != 'tenderCompleteOpenBusiness'"
          @click="addNewLun(index)"
        >添加新一轮报价</el-button>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelTp">取消</el-button>
        <el-button
          :disabled="tenderInfo.tenderScheduleStatus != 'tenderCompleteOpenBusiness'"
          size="mini"
          type="primary"
          @click="saveZan1('zan')"
        >暂存</el-button>
        <el-button
          :disabled="tenderInfo.tenderScheduleStatus != 'tenderCompleteOpenBusiness'"
          size="mini"
          type="primary"
          @click="saveZan1('over')"
        >完成商务谈判</el-button>
      </div>
    </el-dialog>
    <pagination-z :total="total" :fromWhere="fromWhere" @fatherMethod="fatherMethod"></pagination-z>
  </div>
</template>

<script>
import base from "@/api/base";
export default {
  data() {
    return {
      actionUrl:
        base.uploadUrl + "?sso_sessionid=" + this.$store.state.sso_sessionid,
      businessBidData: {
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commCode: "", // 业务单元
        page: 1,
        size: 10
      },
      tenderInfo: {
        tenderNumber: "",
        tenderName: "",
        tenderScheduleStatus: ""
      },
      businessBidList: [],
      fromWhere: "businessBid",
      sso_sessionid: this.$store.state.sso_sessionid,
      total: 0,
      selectList: [],
      dialogFormVisible: false,
      talkList: [],
      nullObj: {},
      mengcengShow: false
    };
  },
  mounted() {
    this.getTenderEvaluationBusiness(this.businessBidData);
  },
  methods: {
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    delBuss(index, newIndex) {
      for (var i = 0; i < this.talkList[index].length; i++) {
        if (i > newIndex) {
          this.talkList[index][i].quotationNum =
            this.talkList[index][i].quotationNum - 1;
        }
      }
      this.talkList[index].splice(newIndex, 1);
    },
    addNewLun(index) {
      var len = this.talkList[index].length;
      if (!this.talkList[index][len - 1].tenderBusinessQuotation) {
        this.talkList[index][len - 1].tenderBusinessQuotation = 0;
      }
      if (
        !this.talkList[index][len - 1].fileList ||
        !this.talkList[index][len - 1].tenderBusinessQuotation
      ) {
        this.$message.error("请完善本条信息后在进行添加");
        return false;
      }
      var flieLen = this.talkList[index][len - 1].fileList.length;
      if (flieLen == 0) {
        this.$message.error("请完善本条信息后在进行添加");
        return false;
      }
      // this.nullObj = this.talkList[index][0];
      this.nullObj = {
        quotationNum:
          Number(
            this.talkList[index][this.talkList[index].length - 1].quotationNum
          ) + 1,
        tenderBusinessQuotation: null,
        tenderBusinessQuotationRemark: "",
        supplierName: this.talkList[index][0].supplierName,
        tenderCandidateLineCode: this.talkList[index][0]
          .tenderCandidateLineCode,
        tenderCode: this.talkList[index][0].tenderCode,
        tenderFileCode: this.talkList[index][0].tenderFileCode,
        tenderId: this.talkList[index][0].tenderId,
        fileList: [],
        newAdd: "1"
      };
      // this.nullObj = this.talkList[index][0];
      // this.nullObj.quotationNum = index + 1;
      // this.nullObj.tenderBusinessQuotation = 0;
      // this.nullObj.fileList = [];
      // this.nullObj.fileCode = "";
      // this.nullObj.name = "";
      this.talkList[index].push(this.nullObj);
    },
    beforeUploadFn(file) {
      if (!this.commonFn.beforeUpload(file, this)) return false;
    },
    removeFn(value, index, newIndex) {
      // if(value.response){
      //   var code = value.response.data[0].serviceFileCode;
      // } else if(value.fileCode){
      //   var code = value.fileCode;
      // }
      // var list = this.talkList[index][newIndex].fileList;
      // var len = list.length;
      // for(var i = 0; i<len;i++){
      //   if(code == list[i].fileCode){
      //     lis.splice(i, 1);
      //   }
      // }

      this.$message.info("删除文件后，请进行保存，否则删除失效！");
      this.talkList[index][newIndex].fileList = [];
      this.talkList[index][newIndex].fileCode = "";
    },
    // 搜索表单回调
    searchFormFn(obj) {
      Object.assign(this.businessBidData, obj);
    },
    //  表格勾选事件
    tableSearchFn(arr) {
      this.selectList = arr;
    },
    // 分页回调函数
    fatherMethod(page, size) {
      this.businessBidData.page = page;
      this.businessBidData.size = size;
      this.getTenderEvaluationBusiness(this.businessBidData);
    },
    // 查询按钮
    searchListBtn() {
      this.businessBidData.page = 1;
      this.getTenderEvaluationBusiness(this.businessBidData);
    },
    //  重置
    resetListBtn() {
      this.businessBidData = {
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commCode: "", // 业务单元
        page: 1,
        size: 10
      };
      this.$refs.searchForms.resetFn();
      this.mengcengShow = false;
      this.getTenderEvaluationBusiness(this.businessBidData);
    },
    // 查询
    getTenderEvaluationBusiness(params) {
      this.$api.modular
        .getTenderEvaluationBusiness(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.businessBidList = res.data.data;
              this.total = Number(res.data.count);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {});
    },
    // 启动
    openEvaluationBusiness() {
      if (this.selectList.length != 1) {
        this.$message.error("请选择且只能选择一个项目！");
        return false;
      }

      if (
        this.selectList[0].tenderScheduleStatus !=
        "completeTenderBusinessNegotiation"
      ) {
        this.$message.error("只能在完成商务谈判后进行启动！");
        return false;
      }

      var params = {
        tenderFileCode: this.selectList[0].tenderFileCode
      };
      this.$api.modular
        .openEvaluationBusiness(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success("启动成功！");
              this.resetListBtn();
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    // 打开谈判
    toTp() {
      if (this.selectList.length != 1) {
        this.$message.error("请选择且只能选择一个项目！");
        return false;
      }
      this.dialogFormVisible = true;
      var params = {
        tenderFileCode: this.selectList[0].tenderFileCode
      };
      this.$api.modular
        .getTenderBusinessList(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.tenderInfo.tenderName = res.data.data[0].tenderName;
              this.tenderInfo.tenderNumber = res.data.data[0].tenderNumber;
              this.tenderInfo.tenderScheduleStatus = this.selectList[0].tenderScheduleStatus;
              if (res.data.data.length > 0) {
                for (var r = 0; r < res.data.data.length; r++) {
                  if (res.data.data[r].tenderBusinessQuotation == 0) {
                    res.data.data[r].tenderBusinessQuotation = "—";
                  }
                }
                this.talkList.push([]);
                this.talkList[0].push(res.data.data[0]);
                // this.talkList = res.data.data;
                if (res.data.data.length > 0) {
                  var t = 0;
                  // this.talkList[0].push(res.data.data[0]);
                  for (var i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].fileList = [];
                    if (res.data.data[i].fileCode) {
                      res.data.data[i].fileList.push({
                        name: res.data.data[i].fileName,
                        fileCode: res.data.data[i].fileCode,
                        fileUrl: res.data.data[i].fileUrl
                      });
                    }
                    if (i < res.data.data.length - 1) {
                      if (
                        res.data.data[i].supplierName !=
                        res.data.data[i + 1].supplierName
                      ) {
                        t++;
                        this.talkList.push([]);
                      }
                      this.talkList[t].push(res.data.data[i + 1]);
                    }
                  }
                } else {
                }
              } else {
                this.talkList = [];
              }
              // this.$message.success(res.data.message);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    async saveZan1(type) {
      var a = 0;
      for (var i = 0; i < this.talkList.length; i++) {
        for (var l = 0; l < this.talkList[i].length; l++) {
          if (this.talkList[i][l].fileList.length == 0) {
            this.$message.error("请完善本条信息后在进行保存");
            return false;
          }
          if (
            !this.talkList[i][l].tenderBusinessQuotation ||
            this.talkList[i][l].tenderBusinessQuotation == "—"
          ) {
            this.talkList[i][l].tenderBusinessQuotation = 0;
          } else if (isNaN(this.talkList[i][l].tenderBusinessQuotation)) {
            this.$message.error("请填写正确报价！");
            return false;
          }
          if (
            this.talkList[i][l].tenderBusinessQuotation == 0 &&
            !this.talkList[i][l].tenderBusinessQuotationRemark
          ) {
            a++;
          }
        }
      }
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
            if (type == "zan") {
              await this.saveZan();
            } else {
              await this.overTalk();
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else {
        if (type == "zan") {
          await this.saveZan();
        } else {
          await this.overTalk();
        }
      }
    },
    saveZan() {
      var params = this.talkList.reduce(function(a, b) {
        return a.concat(b);
      });
      this.$api.modular
        .saveTenderBusiness(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              // this.dialogFormVisible = false;
              this.$message.success("暂存成功！");
              // this.talkList = [];
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    cancelTp() {
      this.talkList = [];
      this.dialogFormVisible = false;
    },
    overTalk() {
      var params1 = this.talkList.reduce(function(a, b) {
        return a.concat(b);
      });
      this.$api.modular
        .saveTenderBusiness(this.sso_sessionid, params1)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.overTalk2();
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    overTalk2() {
      var params = {
        tenderFileCode: this.selectList[0].tenderFileCode
      };
      this.$api.modular
        .completeTenderBusiness(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.dialogFormVisible = false;
              // this.$message.success(res.data.message);
              this.getTenderEvaluationBusiness(this.businessBidData);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },

    // 上传
    uploadSuccess(res, file, fileList, index, newIndex) {
      if (!this.talkList[index][newIndex].fileList) {
        this.talkList[index][newIndex].fileList = [];
      }
      this.talkList[index][newIndex].fileList.push({
        name: res.data[0].fileName,
        fileCode: res.data[0].serviceFileCode,
        fileUrl: res.data[0].fileUrl
      });
      this.talkList[index][newIndex].fileCode = res.data[0].serviceFileCode;
    },
    exceedFn() {
      this.$message.error("最多上传一个附件");
    },
    previewFn(res, row) {
      if (res.fileCode) {
        window.open(res.fileUrl);
      }
    },
    // 开商务标
    kai(type) {
      // this.$router.push({
      //   path: "/process",
      //   query: {
      //     active: 9,
      //     type: type
      //   }
      // });

      if (this.selectList.length != 1) {
        this.$message.error("请选择且只能选择一个项目！");
        return false;
      }
      if (
        this.selectList[0].tenderScheduleStatus == "tenderCompleteOpenBusiness"
      ) {
        this.$message.error("请先完成商务谈判！");
        return false;
      }
      if (
        this.selectList[0].tenderScheduleStatus ==
        "completeTenderBusinessNegotiation"
      ) {
        this.$message.error("请先启动评商务标！");
        return false;
      }
      if (this.selectList.length != 1) {
        this.$message.error("请选择单个项目");
        return false;
      }
      var params = {
        tenderFileCode: this.selectList[0].tenderFileCode
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
              var href = this.commonFn.routerProcess(
                this.selectList,
                9,
                this,
                type,
                "",
                "",
                num,
                status
              );
              var winObj = window.open(href, "_blank");
              var loop = setInterval(() => {
                if (winObj.closed) {
                  clearInterval(loop);
                  // this.resetListBtn();
                  this.getTenderEvaluationBusiness(this.businessBidData);
                }
              }, 1000);
            } else {
              this.$message.error(res.data.message);
              return false;
            }
          } else {
            this.$message.error(res.data.message);
            return false;
          }
        } else {
          this.$message.error(res.message);
          return false;
        }
      });
      // this.commonFn.routerProcess(this.selectList, 9, this, type);
    }
  }
};
</script>

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
.groupBtn {
  text-align: right;
  padding-right: 1%;
  margin-bottom: 20px;
}
.baojiaInfo {
  width: 100%;
  line-height: 30px;
  padding-left: 36px;
  float: left;
  position: relative;
}
.delBtn {
  position: absolute;
  left: 6px;
  top: 2px;
}
.companyInfo .title {
  color: #333;
  margin: 0 20px;
  line-height: 30px;
}
.baojiaInfo span {
  float: left;
}
.baojiaInfo .el-input {
  float: left;
  margin-left: 10px;
}
</style>
