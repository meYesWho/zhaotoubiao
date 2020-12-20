<template>
  <div class="p12">
    <h3>综合评标报告</h3>
    <el-row style="margin-top: 20px">
      <el-col align="right" :span="3" style="color:#555;">推荐中标人</el-col>
      <el-col :span="12" style="margin-left: 15px;">
        <el-select
          style="width:80%;float:left;color:#555;"
          v-model="tenderCandidateLineCode"
          size="mini"
          :disabled="ifAlready"
          placeholder="请选择"
        >
          <el-option
            v-for="item in bidPeopleList"
            :key="item.tenderCandidateLineCode"
            :label="item.supplierName"
            :value="item.tenderCandidateLineCode"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col align="right" :span="3" style="margin-top: 3px;color:#555;">上传综合评标报告</el-col>

      <el-col :span="2" style="margin-left: 15px;">
        <el-button
          :disabled="ifAlready"
          @click="downLoadFn"
          style="float: left;"
          size="mini"
          type="primary"
        >下载模版</el-button>
      </el-col>

      <el-col :span="6" style="margin-left: 15px;">
        <el-upload
          style="float: left;width:100%;text-align: left;"
          class="upload-demo"
          :action="actionUrl"
          :disabled="ifAlready"
          :on-preview="previewFn"
          :data="fileData"
          :before-upload="beforeUploadFn"
          :on-success="uploadSuccess"
          :on-exceed="exceedFn"
          :on-remove="removeFn"
          :file-list="fileList"
          :limit="1"
          :multiple="false"
        >
          <el-button :disabled="ifAlready" size="mini" type="primary">上传</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <h3>综合评标相关信息</h3>
    <el-table :data="cmList" style="width: 100%" size="small">
      <el-table-column prop="SUPPLIER_NAME" label="投标供应商名称" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column label="商务评标得分(60%)" align="center">
        <el-table-column
          align="center"
          v-for="(item, index) in swName"
          :key="index"
          show-overflow-toolti
          :label="item"
        >
          <template slot-scope="scope">
            <span>{{scope.row.swPeople[index].value}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="技术评标得分(40%)" align="center">
        <el-table-column
          align="center"
          v-for="(item, index) in jsName"
          :key="index"
          show-overflow-toolti
          :label="item"
        >
          <template slot-scope="scope">
            <span>{{scope.row.jsPeople[index].value}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="加权平均分" align="center">
        <el-table-column align="center" label="商务">
          <template slot-scope="scope">
            <span>{{Number(scope.row.BUSINESS_SCORE_7).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="技术">
          <template slot-scope="scope">
            <span>{{Number(scope.row.TECHNICAL_SCORE_3).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="总分">
          <template slot-scope="scope">
            <span>{{Number(scope.row.ALLSCORE).toFixed(2)}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="province" align="center" label="排名" type="index" width="50"></el-table-column>
    </el-table>
    <el-table :data="businessList" size="small" border style="margin-top: 20px;width:100%;">
      <el-table-column prop="SUPPLIER_NAME" label="投标供应商名称" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="1" label="首次投标报价(万元)"></el-table-column>
      <el-table-column align="center" prop="2" label="二次投标报价(万元)"></el-table-column>
      <el-table-column align="center" prop="3" label="最终洽商报价(万元)"></el-table-column>
      <!-- <el-table-column
        align="center"
        prop="address"
        label="备注(付款方式)"
        width="360"
        show-overflow-tooltip
      ></el-table-column> -->
    </el-table>
    <el-divider></el-divider>
    <div style="text-align: center">
      <el-button size="mini" type="primary" :disabled="ifAlready" @click="loseBid">流标</el-button>
      <el-button size="mini" @click="cancelFn">关闭</el-button>
      <el-button size="mini" type="primary" :disabled="ifAlready" @click="submitReport">提交</el-button>
      <!-- <el-button size="mini" type="primary" @click="dayinReoport">打印综合评标报告</el-button> -->
    </div>
  </div>
</template>
<script type="text/babel">
import Vue from "vue";
import base from "@/api/base";
export default Vue.component("process-eleven", {
  data() {
    return {
      sso_sessionid: this.$store.state.sso_sessionid,
      ReturnList: [],
      tenderFileCode: "",
      tenderCandidateLineCode: "",
      bidPeopleList: [],
      fileData: {
        fileType: "tenderCompiledReport",
        headCode: ""
      },
      fileList: [],
      ifAlready: false,
      actionUrl:
        base.uploadUrl + "?sso_sessionid=" + this.$store.state.sso_sessionid,
      cmList: [],
      businessList: [],
      swName: [],
      jsName: [],
    };
  },
  mounted() {
    this.tenderFileCode = this.$route.query.tenderFileCode;
    this.fileData.headCode = this.$route.query.tenderFileCode;
    if (this.$route.query.already == "tenderCompiledReportSubmit" || this.$route.query.already == "tenderLost") {
      this.ifAlready = true;
    } else {
      this.ifAlready = false;
    }
    if (this.$route.query.ifProcess) {
      this.ifAlready = true;
    }
    this.binPeolpleListFn();
    this.getWinBider();
  },
  beforeDestroy() {
    sessionStorage.removeItem("openTechnical");
  },
  methods: {
    previewFn(row) {
      window.open(row.filePrivew);
    },
    downLoadFn() {
      var url =
        base.downLoadUrl +
        "?sso_sessionid=" +
        this.$store.state.sso_sessionid +
        "&tenderFileCode=" +
        this.tenderFileCode;
      window.open(url);
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
        .tenderLoseByOpenTechnical(this.sso_sessionid, params)
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
    // 上传
    uploadSuccess(res) {
      this.fileList = res.data;
      this.fileList[0].name = res.data[0].fileName;
    },
    removeFn(val) {
      this.fileList = [];
      var params = {
        serviceCode: ''
      }
      if(val.serviceFileCode){
        params.serviceCode = val.serviceFileCode;
      }
      this.$api.modular.delFileFn(this.sso_sessionid, params).then(res => {
        if (res.status == 200 && res.data.returnCode == 0) {

        } else {
          this.$message.error('删除有误！');
        }
      })
    },
    exceedFn() {
      this.$message.error("最多上传一个附件");
    },
    // 获取信息
    getWinBider() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular.getWinBider(this.sso_sessionid, params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            if (res.data.data.fileName) {
              this.fileList.push({
                name: res.data.data.fileName,
                fileUrl: res.data.data.fileUrl,
                serviceFileCode: res.data.data.serviceFileCode,
                filePrivew: res.data.data.filePrivew
              });
            } else {
              this.fileList = [];
            }
            this.tenderCandidateLineCode =
              res.data.data.linList[0].tenderCandidateLineCode;
            if (res.data.data.cmList.length > 0) {
              this.cmListFn(res.data.data.cmList);
              this.businessListFn(res.data.data.businessList);
            }
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },
    businessListFn(array){
      var key1 = 1;
      var key2 = 2;
      var key3 = 3;
      for(var i=0;i<array.length;i++){
        var len = (Object.getOwnPropertyNames(array[i]).length-1)/2;
        for(var l = 1; l<len+1; l++){
          if(array[i][l] == 0){
            var key = l + '_REMARK';
            array[i][l] = '— '+array[i][key];
          }
        }
        for(var s = len; s > 0; s--){
          if(array[i][s] != null){
            array[i][key3] = array[i][s];
            break;
          }
        }
      }
      this.businessList = array;
    },
    cmListFn(array) {
      for (var e = 0; e < array.length; e++) {
        // array[e].valueArr = [];
        var valueList = [];
        valueList = Object.values(array[e]);
        var nameList = [];
        nameList = Object.getOwnPropertyNames(array[e]);
        for (var i = nameList.length - 1; i >= 0; i--) {
          if (
            nameList[i] == "__ob__" ||
            nameList[i] == "SUPPLIER_NAME" ||
            nameList[i] == "SUPPLIER_NAME1" ||
            nameList[i] == "SUPPLIER_NAME2" ||
            nameList[i] == "TENDER_CANDIDATE_LINE_CODE1" ||
            nameList[i] == "TENDER_CANDIDATE_LINE_CODE2" ||
            nameList[i] == "TECHNICAL_SCORE_3" ||
            nameList[i] == "BUSINESS_SCORE_7" ||
            nameList[i] == "ALLSCORE"
          ) {
            valueList.splice(i, 1);
          }
        }
        // valueList.splice(valueList.length - 1, 1);
        for (var i2 = nameList.length - 1; i2 >= 0; i2--) {
          if (
            nameList[i2] == "__ob__" ||
            nameList[i2] == "SUPPLIER_NAME" ||
            nameList[i2] == "SUPPLIER_NAME1" ||
            nameList[i2] == "SUPPLIER_NAME2" ||
            nameList[i2] == "TENDER_CANDIDATE_LINE_CODE1" ||
            nameList[i2] == "TENDER_CANDIDATE_LINE_CODE2" ||
            nameList[i2] == "TECHNICAL_SCORE_3" ||
            nameList[i2] == "BUSINESS_SCORE_7" ||
            nameList[i2] == "ALLSCORE"
          ) {
            nameList.splice(i2, 1);
          }
        }
        for (var n = 0; n < valueList.length; n++) {
          valueList[n] = Number(valueList[n]).toFixed(2);
        }
        var jsPeople = [];
        var swPeople = [];
          this.swName = [];
          this.jsName = [];
        for (var s = 0; s < nameList.length; s++) {
          var name = nameList[s].substr(0, nameList[s].length - 1);
          var type = nameList[s].substr(nameList[s].length - 1, 1);
          if (type == "1") {
            jsPeople.push({
              value: valueList[s]
            });
            this.jsName.push(name);
          } else if (type == "2") {
            swPeople.push({
              value: valueList[s]
            });
            this.swName.push(name);
          }
        }
        array[e].jsPeople = [];
        array[e].swPeople = [];
        array[e].jsPeople = jsPeople;
        array[e].swPeople = swPeople;
        // array[e].valueArr = valueList;
      }

      // for(var index = 0; index<array.length;index++){
      //   array[index].jsPeople = [];
      //   array[index].swPeople = [];
      // }
      this.cmList = array;
      // this.allScore = data;
    },
    // 推荐中标人列表
    binPeolpleListFn() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular.getLineByScore(this.sso_sessionid, params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.bidPeopleList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },
    beforeUploadFn(file) {
      if (!this.commonFn.beforeUpload(file, this)) return false;
    },
    // 打印报告
    dayinReoport() {},
    cancelFn() {
      window.location.href = "about:blank";
      window.close();
    },
    // 完成
    submitReport() {
      if (this.fileList.length == 0) {
        this.$message.error("请先上传文件！");
        return false;
      }
      this.ifAlready = true;
      var params = {
        tenderFileCode: this.tenderFileCode,
        tenderCandidateLineCode: this.tenderCandidateLineCode
      };
      this.$api.modular
        .subCompiledReport(this.sso_sessionid, params)
        .then(res => {
          this.ifAlready = false;
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success("提交成功！");
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
<style scope>
.el-upload-list {
  width: 63%;
}
.p12 .el-upload {
  float: left;
}
.p12 .el-upload-list {
  float: left;
  margin-top: -4px;
  margin-left: 6px;
}
.cell{
  color: #555;
}
</style>
