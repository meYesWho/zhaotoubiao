<template>
  <div class="p10">
    <bidInfo-title :bidInfo="bidInfo"></bidInfo-title>
    <h3>评技术标信息</h3>
    <div>
      <el-table :data="evaluationTechnicalList" size="mini" border style="width: 100%">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column align="center" label="技术标评委" width="100">
          <template slot-scope="scope">
            <div v-if="type == 1">
              <span v-if="scope.$index == 0">{{scope.row.MEMBERNAME}}</span>
            </div>
            <div v-if="type != 1">
              <span v-if="pwShow(scope.row, scope.$index)">{{scope.row.TENDER_EVALUATION_NAME}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="ITEM_SCORE_NAME" label="评分维度"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="ITEM_SCORE_DETAIL" label="评分项目"></el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="ITEM_SCORE_STANDARD"
          label="得分标准"
        ></el-table-column>
        <el-table-column
          align="center"
          width="60"
          show-overflow-tooltip
          prop="ITEM_SCORE"
          label="分值"
        ></el-table-column>
        <el-table-column
          align="center"
          v-for="(item, index) in suppList"
          :key="index"
          min-width="150"
          show-overflow-toolti
          :label="item[0]"
        >
          <template slot-scope="scope">
            <el-form size="mini" :model="scope.row" label-width="10" class="demo-ruleForm">
              <el-form-item
                :rules="[
      { required: true, message: '请输入', trigger: 'blur' }]"
                :prop="'valueArr.' + index"
              >
                <el-input
                  size="mini"
                  :disabled="inputDis"
                  style="width: 60%;float:left;"
                  @input="cccc(scope.$index, index, scope.row.valueArr[index])"
                  v-model="scope.row.valueArr[index]"
                  type="text"
                ></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>

      <h3>疑问卷信息</h3>
      <el-table :data="fileListAsk" size="mini" border style="width: 100%">
        <el-table-column
          align="center"
          width="100px"
          prop="TENDER_EVALUATION_NAME"
          show-overflow-tooltip
          label="评委"
        ></el-table-column>
        <el-table-column
          align="center"
          width="200px"
          prop="SUPPLIER_NAME"
          show-overflow-tooltip
          label="供应商"
        ></el-table-column>
        <el-table-column align="center" width="200px" show-overflow-tooltip label="是否有疑问">
          <template slot-scope="scope">
            <el-radio :disabled="inputDis" v-model="scope.row.isAsk" label="1">是</el-radio>
            <el-radio :disabled="inputDis" v-model="scope.row.isAsk" label="2">否</el-radio>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="left" label="疑问卷上传">
          <template slot-scope="scope">
            <div class="ywj">
              <div v-if="scope.row.isAsk == '1'">
                <el-upload
                  style="float: left;text-align: left;"
                  class="upload-demo"
                  :disabled="inputDis"
                  :on-preview="(value)=> previewFn(value, scope.$index)"
                  :before-upload="beforeUploadFn"
                  :on-success="(res)=> uploadSuccess(res, scope.$index)"
                  :on-remove="(res)=> removeFn(res, scope.$index)"
                  :action="actionUrl"
                  :file-list="scope.row.fileList"
                  :multiple="true"
                >
                  <el-button :disabled="inputDis" size="mini" type="primary">点击上传</el-button>
                </el-upload>
              </div>
              <span v-else>确认无任何疑问，进行下一环节。</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="type != 1">
        <h3>技术标评委评分信息</h3>
        <el-table :data="allScore" size="mini" border style="width: 100%">
          <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
          <el-table-column align="center" label="技术标评委">
            <template slot-scope="scope">
              <span>{{returnNM(scope.row.NM)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            v-for="(item, index) in allScoreList"
            :key="index"
            show-overflow-toolti
            :label="item[0]"
          >
            <template slot-scope="scope">
              <span>{{scope.row.valueArr[index]}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="type == 2">
        <el-form
          ref="form"
          label-position="left"
          :disabled="ifProcess"
          :model="saveTenderEvaluationTechnicalData"
          label-width="280px"
          size="mini"
          class="needBottom"
        >
          <h3>技术标评标报告</h3>
          <el-form-item label="一、项目概述：（填写项目工程概况）" prop="desc">
            <el-input type="textarea" v-model="saveTenderEvaluationTechnicalData.tenderOverview"></el-input>
          </el-form-item>
          <el-form-item label="二、招投标工作过程简述:" prop="desc">
            <el-input
              type="textarea"
              v-model="saveTenderEvaluationTechnicalData.tenderWorkOverview"
            ></el-input>
          </el-form-item>
          <el-form-item label="三、参与投标单位的简介:" prop="desc">
            <div v-if="!haveValue">
              <span
                v-for="(item, index) in suppList"
                :key="index"
                style="float:left; width:100%;text-align:left;"
              >{{index+1}}.{{item[0]}}</span>
            </div>
            <div v-if="haveValue">
              <span
                v-for="(item, index) in saveTenderEvaluationTechnicalData.supplierIntroduceArr"
                :key="index"
                style="float:left; width:100%;text-align:left;"
              >{{index+1}}.{{item}}</span>
            </div>
          </el-form-item>
          <el-form-item label="四、技术标分析" prop="desc">
            <el-input
              type="textarea"
              v-model="saveTenderEvaluationTechnicalData.evaluationReportAnalysis"
            ></el-input>
          </el-form-item>
          <el-form-item label="五、 现场述标情况分析" prop="desc">
            <el-input
              type="textarea"
              v-model="saveTenderEvaluationTechnicalData.sceneOverviewAnalysis"
            ></el-input>
          </el-form-item>
          <el-form-item label="六、综合结论">
            <div class="radioGroup" v-if="!haveValue">
              <div class="everyradio" v-for="(item, index) in suppList" :key="index">
                <p>{{item[0]}}</p>
                <el-radio v-model="item[2].isHege" label="1">合格</el-radio>
                <el-radio v-model="item[2].isHege" label="0">不合格</el-radio>
              </div>
            </div>
            <div class="radioGroup" v-if="haveValue">
              <div
                class="everyradio"
                v-for="(item, index) in saveTenderEvaluationTechnicalData.evaluationReportYesArr"
                :key="index"
              >
                <p>{{item.name}}</p>
                <el-radio v-model="item.isHege" label="1">合格</el-radio>
                <el-radio v-model="item.isHege" label="0">不合格</el-radio>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <el-row v-if="type == 3">
        <el-col :span="24">
          <h3>技术标评标报告</h3>
        </el-col>
        <el-col
          :span="24"
          v-for="(item, index) in saveTenderEvaluationTechnicalData.evaluationReportYesArr"
          :key="index"
        >
          <div style="margin-left:110px;display:block;float:left;">
            <p style="float: left; margin: 6px;">{{item.name}}</p>
            <p style="float: left; margin: 6px; margin-left:10px;">技术标合格</p>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <div style="text-align: center">
        <el-button size="mini" type="primary" :disabled="ifAlready" @click="loseBid">流标</el-button>
        <el-button size="mini" @click="cancelFn">关闭</el-button>
        <el-button
          v-if="type == 1"
          size="mini"
          :disabled="ifAlready"
          type="primary"
          @click="saveEvaluationTechnical"
        >提交</el-button>
        <el-button
          v-if="type == 3"
          size="mini"
          type="primary"
          :disabled="ifAlready"
          @click="overBid"
        >完成评技术标</el-button>
        <el-button
          v-if="type == 2"
          size="mini"
          class="no-print"
          type="primary"
          :disabled="ifProcess"
          @click="savePort"
        >提交</el-button>
        <el-button v-if="type == 2" size="mini" @click="printMeShow = true" type="primary">打印技术标评标报告</el-button>
      </div>
    </div>
    <el-dialog title="打印报告" :visible.sync="printMeShow" append-to-body width="842px">
      <div id="printMe">
        <el-row class="Btitle">
          <el-col :span="6">
            <img src="static/images/elsLogo.png" />
          </el-col>
          <el-col :span="18" align="right">
            <p>
              流程与标准化编号：
              <span>FC5-WS-11</span>
            </p>
          </el-col>
        </el-row>
        <el-main class="mainTable">
          <el-row>
            <el-col :span="24" align="left">
              <p>
                流程与标准化名称：
                <span>第一资产技术综合评标报告</span>
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" align="left">
              <p>一、作业标准原则</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" align="left">
              <p>中心/业务单元：</p>
              <el-input size="mini" v-model="value1"></el-input>
            </el-col>
            <el-col :span="6" align="left">
              <p>填制人：</p>
              <el-input size="mini" v-model="value2"></el-input>
            </el-col>
            <el-col :span="6" align="left">
              <p>填表时间：</p>
              <el-input size="mini" v-model="value3"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" align="left">
              <p>二、作业标准范围</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" align="left">
              <p>三、作业标准职责</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" align="left">
              <p>执行人：</p>
              <el-input size="mini" v-model="value6"></el-input>
            </el-col>
            <el-col :span="6" align="left">
              <p>责任人：</p>
              <el-input size="mini" v-model="value7"></el-input>
            </el-col>
            <el-col :span="6" align="left">
              <p>核算人：</p>
              <el-input size="mini" v-model="value8"></el-input>
            </el-col>
            <el-col :span="6" align="left">
              <p>控制人：</p>
              <el-input size="mini" v-model="value9"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" align="left">
              <p>四、作业标准指引</p>
            </el-col>
          </el-row>
          <el-row style="height: 50px;">
            <el-col :span="4" align="left" style="border-right: 1px solid #ccc;height:100%;">
              <!-- <p>业务/专业</p> -->
              <p style="float: left; margin-top: 28px;line-height: 1;">业务</p>
              <div class="emLine"></div>
              <p style="float:right;line-height: 1;margin-right: 10px;margin-top: 10px">专业</p>
            </el-col>
            <el-col :span="20" align="center">
              <el-input style="float: left;margin-top: 7px;" size="mini" value="五个三专业"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" align="center">
              <p style="float: none;">{{bidInfo.tenderName}} 技术综合评标报告</p>
            </el-col>
          </el-row>
          <el-row class="genHeight">
            <el-col :span="24" align="left">
              <p>一、项目概述：（填写项目工程概况）</p>
            </el-col>
            <el-col :span="24" align="left">
              <span>{{saveTenderEvaluationTechnicalData.tenderOverview}}</span>
            </el-col>
          </el-row>
          <el-row class="genHeight">
            <el-col :span="24" align="left">
              <p>二、招投标工作过程简述;</p>
            </el-col>
            <el-col :span="24" align="left">
              <span>{{saveTenderEvaluationTechnicalData.tenderWorkOverview}}</span>
            </el-col>
          </el-row>
          <el-row class="genHeight">
            <el-col :span="24" align="left">
              <p>三、参与投标单位的简介:</p>
            </el-col>
            <el-col :span="24" align="left">
              <span
                v-for="(item, index) in saveTenderEvaluationTechnicalData.supplierIntroduceArr"
                :key="index"
              >{{index+1}}.{{item}}</span>
            </el-col>
          </el-row>
          <el-row class="genHeight">
            <el-col :span="24" align="left">
              <p>四、技术标分析:</p>
            </el-col>
            <el-col :span="24" align="left">
              <span>{{saveTenderEvaluationTechnicalData.evaluationReportAnalysis}}</span>
            </el-col>
          </el-row>
          <el-row class="genHeight">
            <el-col :span="24" align="left">
              <p>五、现场述标情况分析:</p>
            </el-col>
            <el-col :span="24" align="left">
              <span>{{saveTenderEvaluationTechnicalData.sceneOverviewAnalysis}}</span>
            </el-col>
          </el-row>
          <el-row class="genHeight">
            <el-col :span="24" align="left">
              <p>六、综合结论</p>
            </el-col>
            <el-col
              :span="24"
              v-for="(item, index) in saveTenderEvaluationTechnicalData.evaluationReportYesArr"
              :key="index"
            >
              <div style="margin-left:110px;display:block;float:left;">
                <p style="float: left; margin: 6px;">{{item.name}}</p>
                <p style="float: left; margin: 6px; margin-left:10px;">技术标合格</p>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="5" align="center" style="border-right: 1px solid #ccc;">
              <span>编制人</span>
            </el-col>
            <el-col :span="7" align="left" style="border-right: 1px solid #ccc;">
              <el-input size="mini" v-model="value4"></el-input>
            </el-col>
            <el-col :span="5" align="center" style="border-right: 1px solid #ccc;">
              <span>复核人</span>
            </el-col>
            <el-col :span="7" align="left">
              <el-input size="mini" v-model="value5"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" align="left">
              <p>五、作业标准图片</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" align="left">
              <p>六、作业标准文件：《第一资产招标采购作业标准》</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" align="left">
              <p>七、作业标准成本</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" align="left">
              <p>八、作业标准评估</p>
            </el-col>
          </el-row>
        </el-main>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="printMeShow = false">取 消</el-button>
        <el-button type="primary" v-print="'#printMe'">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/babel">
import Vue from "vue";
import base from "@/api/base";
export default Vue.component("process-eight", {
  data() {
    return {
      printMeShow: false,
      sso_sessionid: this.$store.state.sso_sessionid,
      evaluationTechnicalList: [],
      tenderFileCode: "",
      type: "1",
      actionUrl:
        base.uploadUrl + "?sso_sessionid=" + this.$store.state.sso_sessionid,
      ruleForm: {
        desc: "aaaa"
      },
      saveTenderEvaluationTechnicalData: {
        evaluationReportCode: '',
        evaluationReportAnalysis: "",
        sceneOverviewAnalysis: "",
        supplierIntroduce: "",
        tenderOverview: "",
        tenderWorkOverview: "",
        tenderFileCode: "",
        evaluationReportYes: "",
        linScoreS: "",
        evaluationReportYesArr: [],
        supplierIntroduceArr: []
      },
      suppList: [],
      fileListAsk: [],
      inputList: [],
      saveData: {
        tenderFileCode: "",
        fileCode: "",
        array: []
      },
      fileList: [],
      quanxian: true,
      bidInfo: {
        tenderName: "",
        tenderNumber: ""
      },
      fileObj: {},
      haveValue: false,
      ifAlready: false,
      ifProcess: false,
      listS: [],
      inputDis: false,
      allScore: [],
      allScoreList: [],
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      value7: "",
      value8: "",
      value9: ""
    };
  },
  mounted() {
    this.tenderFileCode = this.$route.query.tenderFileCode;
    this.type = this.$route.query.type;
    this.bidInfo.tenderNumber = this.$route.query.tenderNumber;
    this.bidInfo.tenderName = this.$route.query.tenderName;
    if (this.type != 1) {
      this.technicalReport();
    } else {
      this.evaluationTechnical();
    }
    if (
      this.$route.query.already == "completeEvaluationTechnical" ||
      this.$route.query.already == "tenderLost"
    ) {
      this.ifAlready = true;
      this.ifProcess = true;
    } else {
      this.ifAlready = false;
      this.ifProcess = false;
    }
    if (this.$route.query.ifProcess) {
      this.ifProcess = true;
      this.ifAlready = true;
    }
    if (
      this.ifAlready ||
      this.type == 2 ||
      this.$route.query.ifProcess ||
      this.type == 3
    ) {
      this.inputDis = true;
    }
  },
  methods: {
    returnNM(NM) {
      if (NM) {
        var arr = NM.split(":");
        return arr[2];
      } else {
        return "";
      }
    },
    cccc(index1, index2, value) {
      // if (value == 0 || value == "") {
      //   this.$message.error("请填写正确分数！");
      //   return false;
      // }
      // debugger
      var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if (!reg.test(Number(value))) {
        this.evaluationTechnicalList[index1].valueArr[index2] = "";
        value = "";
      }
      if (Number(value) > this.evaluationTechnicalList[index1].ITEM_SCORE) {
        this.$message.error("不能超过设定分值！");
        value = "";
        this.evaluationTechnicalList[index1].valueArr[index2] = "";
      }
      this.$forceUpdate();
      if (index1 == 0 && index2 == 0) {
        this.saveData.array[0].tenderEvaluationScore = value;
      } else {
        var i = Number(index1) * Number(this.suppList.length) + Number(index2);
        this.saveData.array[i].tenderEvaluationScore = value;
      }
    },
    pwShow(row, index) {
      if (this.listS.length > 0) {
        for (var i = 0; i < this.listS.length; i++) {
          if (i == this.listS.length - 1) {
            return false;
          }
          if (index == this.listS[i].length * (i + 1)) {
            return true;
          } else if (index == 0) {
            return true;
          }
        }
      }
    },
    // 数据处理
    dataChuli(data, type) {
      console.log(data[0])
      if(!data[0]) {
        return false;
      }
      var obj = data[0];
      var len = Number(data.length);
      if (len > 1) {
        if (data[len - 1].FILE_NAME) {
          len = len - 1;
          this.fileObj = data[len];
          this.fileObj.name = this.fileObj.FILE_NAME;
          this.fileList.push(this.fileObj);
        } else {
          if (data[len - 1].tenderEvaluationReport) {
            if (data[len - 1].tenderEvaluationReport.length > 0) {
              this.haveValue = true;
              if (data[len - 1].tenderEvaluationReport[0].evaluationReportYes) {
                var arr = data[
                  len - 1
                ].tenderEvaluationReport[0].evaluationReportYes.split(",");
              } else {
                var arr = [];
              }
              var arr2 = [];
              if (data[len - 1].tenderEvaluationReport[0].supplierIntroduce) {
                var arr3 = data[
                  len - 1
                ].tenderEvaluationReport[0].supplierIntroduce.split(",");
              } else {
                var arr3 = [];
              }

              for (var a = 0; a < arr.length; a++) {
                arr2.push({
                  name: arr[a],
                  isHege: "1"
                });
              }
              data[
                len - 1
              ].tenderEvaluationReport[0].evaluationReportYesArr = arr2;
              data[
                len - 1
              ].tenderEvaluationReport[0].supplierIntroduceArr = arr3;
              this.saveTenderEvaluationTechnicalData =
                data[len - 1].tenderEvaluationReport[0];
            }
          }
          if (data[len - 1].tenderFile) {
            if (data[len - 1].tenderEvaluationReport) {
              if (data[len - 1].tenderEvaluationReport[0].tenderOverview) {
                this.saveTenderEvaluationTechnicalData.tenderOverview =
                  data[len - 1].tenderEvaluationReport[0].tenderOverview;
              }
            } else {
              this.saveTenderEvaluationTechnicalData.tenderOverview =
                data[len - 1].tenderFile[0].tenderFileContent;
            }
            this.allScoreFn(data[len - 1].allScore);
            len = len - 1;
          } else {
            len = len;
          }
          this.fileObj = {};
          this.fileObj.name = "";
          this.fileList = [];
        }
      } else {
        len = len;
      }
      var arr = [];
      arr = Object.getOwnPropertyNames(obj);
      for (var e = 0; e < len; e++) {
        data[e].valueArr = [];
        var arr2 = [];
        arr2 = Object.values(data[e]);
        for (var i = arr.length - 1; i >= 0; i--) {
          if (
            arr[i] == "__ob__" ||
            arr[i] == "ITEM_SCORE_NAME" ||
            arr[i] == "ITEM_SCORE_CODE" ||
            arr[i] == "TENDER_FILE_CODE" ||
            arr[i] == "TFCODE" ||
            arr[i] == "MEMBER" ||
            arr[i] == "TENDER_EVALUATION_BY" ||
            arr[i] == "TENDER_EVALUATION_NAME" ||
            arr[i] == "TENDER_EVALUATION_SCORE_ITEM" ||
            arr[i] == "MEMBERNAME" ||
            arr[i] == "TECHNICAL_MEMBER" ||
            arr[i] == "ITEM_SCORE_STANDARD" ||
            arr[i] == "ITEM_SCORE_DETAIL" ||
            arr[i] == "ITEM_SCORE" ||
            arr[i] == "NM"
          ) {
            arr2.splice(i, 1);
          }
        }
        arr2.splice(arr2.length - 1, 1);
        for (var n = 0; n < arr2.length; n++) {
          if (Number(arr2[n]) != 0) {
            arr2[n] = Number(arr2[n]).toFixed(2);
          } else {
            arr2[n] = Number(arr2[n]);
          }
        }
        data[e].valueArr = arr2;
      }
      var dataNew = data;
      if (len == data.length) {
        dataNew = data;
      } else {
        dataNew.splice(len, 1);
      }
      for (var i = arr.length - 1; i >= 0; i--) {
        if (
          arr[i] == "__ob__" ||
          arr[i] == "ITEM_SCORE_NAME" ||
          arr[i] == "ITEM_SCORE_CODE" ||
          arr[i] == "TENDER_FILE_CODE" ||
          arr[i] == "TFCODE" ||
          arr[i] == "MEMBER" ||
          arr[i] == "TENDER_EVALUATION_BY" ||
          arr[i] == "TENDER_EVALUATION_NAME" ||
          arr[i] == "TENDER_EVALUATION_SCORE_ITEM" ||
          arr[i] == "MEMBERNAME" ||
          arr[i] == "TECHNICAL_MEMBER" ||
          arr[i] == "ITEM_SCORE_STANDARD" ||
          arr[i] == "ITEM_SCORE_DETAIL" ||
          arr[i] == "ITEM_SCORE" ||
          arr[i] == "NM"
        ) {
          arr.splice(i, 1);
        }
      }
      var reg = new RegExp("'", "g");
      for (var s = 0; s < arr.length; s++) {
        var liArr = arr[s].replace(reg, "").split("_");
        if ((type = "report")) {
          liArr.push({
            isHege: "1"
          });
        }
        this.suppList.push(liArr);
      }
      for (var index1 = 0; index1 < dataNew.length; index1++) {
        for (var index2 = 0; index2 < this.suppList.length; index2++) {
          this.saveData.array.push({
            tenderFileCode: dataNew[index1].TFCODE,
            tenderEvaluationBy: dataNew[index1].MEMBER,
            tenderEvaluationScoreItem: dataNew[index1].ITEM_SCORE_CODE,
            tenderCandidateLineCode: this.suppList[index2][1],
            tenderEvaluationScore: dataNew[index1].valueArr[index2]
          });
        }
      }
      var newR = [];
      newR.push([]);
      var s = 0;
      for (var w = 0; w < dataNew.length; w++) {
        if (w == dataNew.length - 1) {
          newR[s].push(dataNew[w]);
          break;
        }
        newR[s].push(dataNew[w]);
        if (
          dataNew[w].TENDER_EVALUATION_BY != dataNew[w + 1].TENDER_EVALUATION_BY
        ) {
          s++;
          newR.push([]);
        }
      }
      this.listS = newR;
      this.evaluationTechnicalList = dataNew;
    },
    allScoreFn(data) {
      // debugger
      var arrScroe = [];
      arrScroe = Object.getOwnPropertyNames(data[0]);
      for (var e = 0; e < data.length; e++) {
        data[e].valueArr = [];
        var arr2 = [];
        arr2 = Object.values(data[e]);
        for (var i = arrScroe.length - 1; i >= 0; i--) {
          if (
            arrScroe[i] == "__ob__" ||
            arrScroe[i] == "TENDER_EVALUATION_BY" ||
            arrScroe[i] == "TENDER_EVALUATION_NAME" ||
            arrScroe[i] == "NM"
          ) {
            arr2.splice(i, 1);
          }
        }
        arr2.splice(arr2.length - 1, 1);
        for (var n = 0; n < arr2.length; n++) {
          if (Number(arr2[n]) != 0) {
            arr2[n] = Number(arr2[n]).toFixed(2);
          } else {
            arr2[n] = "";
          }
        }
        data[e].valueArr = arr2;
      }
      for (var i = arrScroe.length - 1; i >= 0; i--) {
        if (
          arrScroe[i] == "__ob__" ||
          arrScroe[i] == "TENDER_EVALUATION_BY" ||
          arrScroe[i] == "TENDER_EVALUATION_NAME" ||
          arrScroe[i] == "NM"
        ) {
          arrScroe.splice(i, 1);
        }
      }
      var reg = new RegExp("'", "g");
      this.allScoreList = [];
      for (var s = 0; s < arrScroe.length; s++) {
        var liArr = arrScroe[s].replace(reg, "").split("_");
        this.allScoreList.push(liArr);
      }
      this.allScore = data;
    },
    fileDataChuLi(data) {
      if (data.length == 0) {
        return false;
      }
      var fileListAsk = [];
      var s = 0;
      var isAsk = "1";
      if (data[0].FILE_CODE == "无异议") {
        isAsk = "2";
      }
      fileListAsk.push({
        SUPPLIER_NAME: data[0].SUPPLIER_NAME,
        TENDER_EVALUATION_NAME: data[0].TENDER_EVALUATION_NAME,
        isAsk: isAsk,
        fileList: []
      });
      if (data[0].FILE_CODE != "无异议") {
        data[0].name = data[0].FILE_NAME;
        fileListAsk[s].fileList.push(data[0]);
      }
      for (var i = 0; i < data.length; i++) {
        if (i == data.length - 1) {
          break;
        }
        if (data[i].TENDER_EVALUATION_BY == data[i + 1].TENDER_EVALUATION_BY) {
          // data[i + 1].name = data[i + 1].FILE_NAME;
          if (data[i].SUPPLIER_NAME == data[i + 1].SUPPLIER_NAME) {
            // fileListAsk.push({
            //   SUPPLIER_NAME: data[i + 1].SUPPLIER_NAME,
            //   TENDER_EVALUATION_NAME: data[i + 1].TENDER_EVALUATION_NAME,
            //   isAsk: "1",
            //   fileList: []
            // });
            data[i + 1].name = data[i + 1].FILE_NAME;
            fileListAsk[s].fileList.push(data[i + 1]);
          } else {
            s++;
            var isAsk = "1";
            if (data[i + 1].FILE_CODE == "无异议") {
              isAsk = "2";
            }
            fileListAsk.push({
              SUPPLIER_NAME: data[i + 1].SUPPLIER_NAME,
              TENDER_EVALUATION_NAME: data[i + 1].TENDER_EVALUATION_NAME,
              isAsk: isAsk,
              fileList: []
            });
            if (isAsk == "1") {
              data[i + 1].name = data[i + 1].FILE_NAME;
              fileListAsk[s].fileList.push(data[i + 1]);
            }
          }
        } else {
          s++;
          var isAsk = "1";
          if (data[i + 1].FILE_CODE == "无异议") {
            isAsk = "2";
          }
          fileListAsk.push({
            SUPPLIER_NAME: data[i + 1].SUPPLIER_NAME,
            TENDER_EVALUATION_NAME: data[i + 1].TENDER_EVALUATION_NAME,
            isAsk: isAsk,
            fileList: []
          });
          if (data[i + 1].FILE_CODE != "无异议") {
            data[i + 1].name = data[i + 1].FILE_NAME;
            fileListAsk[s].fileList.push(data[i + 1]);
          }
        }
      }
      this.fileListAsk = fileListAsk;
    },
    // 获取列表
    evaluationTechnical() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular
        .evaluationTechnical(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.dataChuli(res.data.data.list);
              if (res.data.data.fileList && res.data.data.fileList.length > 0) {
                this.fileDataChuLi(res.data.data.fileList);
              } else {
                var arr = [];
                for (var i = 0; i < this.suppList.length; i++) {
                  arr.push({
                    TENDER_EVALUATION_NAME: res.data.data.list[0].MEMBERNAME,
                    SUPPLIER_NAME: this.suppList[i][0],
                    isAsk: "1",
                    fileList: []
                  });
                }
                this.fileListAsk = arr;
              }
            } else if (res.data.returnCode == -2) {
              this.$message.error("很抱歉，您暂无评标权限！");
              this.quanxian = false;
              this.ifAlready = true;
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    // 保存技术标评标信息
    saveEvaluationTechnical() {
      this.saveData.tenderFileCode = this.tenderFileCode;
      for (var i = 0; i < this.saveData.array.length; i++) {
        if (!this.saveData.array[i].fileCode) {
          // if (!this.saveData.array[i].tenderEvaluationScore) {
          //   this.$message.error("分值不能为0，请确认分值");
          //   return false;
          // }
          if (isNaN(this.saveData.array[i].tenderEvaluationScore)) {
            this.$message.error("分值必须为数字，请确认分值");
            return false;
          } else {
            this.saveData.array[i].tenderEvaluationScore = Number(
              this.saveData.array[i].tenderEvaluationScore
            ).toFixed(2);
          }
        }
      }
      var arr = [];
      for (var s = 0; s < this.fileListAsk.length; s++) {
        var tenderCandidateLineCode = "";
        for (var codeIndex = 0; codeIndex < this.suppList.length; codeIndex++) {
          if (
            this.fileListAsk[s].SUPPLIER_NAME == this.suppList[codeIndex][0]
          ) {
            tenderCandidateLineCode = this.suppList[codeIndex][1];
          }
        }
        if (this.fileListAsk[s].isAsk == "1") {
          var len = this.fileListAsk[s].fileList.length;
          if (len > 0) {
            for (var n = 0; n < len; n++) {
              if (this.fileListAsk[s].fileList[n].FILE_CODE) {
                arr.push({
                  tenderFileCode: this.saveData.tenderFileCode,
                  tenderEvaluationBy: this.saveData.array[0].tenderEvaluationBy,
                  tenderCandidateLineCode: tenderCandidateLineCode,
                  fileCode: this.fileListAsk[s].fileList[n].FILE_CODE
                });
              } else {
                arr.push({
                  tenderFileCode: this.saveData.tenderFileCode,
                  tenderEvaluationBy: this.saveData.array[0].tenderEvaluationBy,
                  tenderCandidateLineCode: tenderCandidateLineCode,
                  fileCode: this.fileListAsk[s].fileList[n].serviceFileCode
                });
              }
            }
          } else {
            this.$message.error("如确有疑问，请上传疑问卷！");
            return false;
          }
        } else {
          arr.push({
            tenderFileCode: this.saveData.tenderFileCode,
            tenderEvaluationBy: this.saveData.array[0].tenderEvaluationBy,
            tenderCandidateLineCode: tenderCandidateLineCode,
            fileCode: "无"
          });
        }
      }
      var newArr = this.saveData.array.concat(arr);
      this.saveData.array = newArr;
      this.ifAlready = true;
      this.$api.modular
        .saveEvaluationTechnical(this.sso_sessionid, this.saveData)
        .then(res => {
          this.ifAlready = false;
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success("保存成功！");
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
    // 报告查询
    technicalReport() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular
        .technicalReport(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              if (res.data.data.length > 1) {
                if (res.data.data[res.data.data.length - 1].fileList) {
                  this.fileDataChuLi(
                    res.data.data[res.data.data.length - 1].fileList
                  );
                }
                this.dataChuli(res.data.data);
              } else {
                this.$message.error("请先完成评分");
                return false;
              }
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    // 保存报告
    savePort() {
      console.log(this.saveTenderEvaluationTechnicalData)
      var len = Number(this.evaluationTechnicalList.length) - 1;
      var arr = [];
      var p = [];
      var s = [];
      for (var i = 0; i < this.suppList.length; i++) {
        arr.push(this.suppList[i][0]);
        s.push(
          this.suppList[i][1] +
            ":" +
            this.evaluationTechnicalList[len].valueArr[i]
        );
        if (this.suppList[i][2].isHege == "1") {
          p.push(this.suppList[i][0]);
        }
      }
      this.saveTenderEvaluationTechnicalData.supplierIntroduce = arr.join();
      this.saveTenderEvaluationTechnicalData.evaluationReportYes = p.join();
      this.saveTenderEvaluationTechnicalData.linScoreS = s.join();
      this.saveTenderEvaluationTechnicalData.tenderFileCode = this.tenderFileCode;
      this.$api.modular
        .saveTenderEvaluationTechnical(
          this.sso_sessionid,
          this.saveTenderEvaluationTechnicalData
        )
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              if(res.data.message != 'ok' && res.data.message != '已存在信息，请刷新后再保存' && res.data.message != 'error'){
                this.saveTenderEvaluationTechnicalData.evaluationReportCode = res.data.message;
                this.$message.success("保存成功！");
              } else if(res.data.message == 'ok'){
                this.$message.success("修改成功！");
              } else {
                this.$message.error(res.data.message);
              }
              // setTimeout(() => {
              //   window.open("about:blank", "_self").close();
              // }, 1000);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
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
      this.$api.modular.jsbLoseBid(this.sso_sessionid, params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.$message.success("完成流标！");
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
    // 完成
    overBid() {
      this.ifAlready = true;
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular.jsbOverBid(this.sso_sessionid, params).then(res => {
        this.ifAlready = false;
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.$message.success("完成评技术标！");
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
    tableSearchFn(value) {
      this.selectionList = value;
    },
    // 上传
    uploadSuccess(res, index) {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].name = res.data[i].fileName;
      }
      this.fileListAsk[index].fileList.push(res.data[0]);
      if (!this.suppList[index][2].fileList) {
        this.suppList[index][2].fileList = [];
      }
      this.suppList[index][2].fileList.push(res.data[0]);
    },
    removeFn(res, index) {
      this.$message.info("删除文件后，请进行保存，否则删除失效！");
      var fileList = this.suppList[index][2].fileList;
      for (var i = 0; i < fileList.length; i++) {
        if (fileList[i].fileCode == res.fileCode) {
          fileList.splice(i, 1);
        }
      }
      this.fileListAsk[index].fileList = fileList;
      this.suppList[index][2].fileList = fileList;
    },
    beforeUploadFn(file) {
      if (!this.commonFn.beforeUpload(file, this)) return false;
    },
    previewFn(value) {
      window.open(value.FILEPRIVEW);
    }
  }
});
</script>
<style scoped>
.radioGroup .everyradio {
  float: left;
  width: 100%;
}
.radioGroup .everyradio p {
  float: left;
  line-height: 28px;
  margin: 0;
}
.radioGroup .everyradio p {
  float: left;
  line-height: 28px;
  margin: 0;
  margin-right: 30px;
  margin-left: 2px;
  width: 320px;
  text-align: left;
}
.radioGroup .everyradio .el-radio {
  float: left;
  margin-top: 6px;
}
.p10 .el-upload-list {
  float: left;
  margin-right: 10px;
}
.p10 #printMe .el-form-item--mini.el-form-item {
  margin-bottom: 20px;
}
.p10 .el-form-item--mini.el-form-item {
  margin-bottom: 0;
}
.p10 .needBottom .el-form-item--mini.el-form-item {
  margin-bottom: 18px;
}
</style>
<style>
.p10 .el-form-item.is-error .el-form-item__content .el-form-item__error {
  float: left;
  width: 34%;
  position: static;
  margin-top: 8px;
  margin-left: 4px;
}
.ywj .el-upload-list {
  width: 240px;
  float: left;
  margin-right: 10px;
}
.ywj .el-upload-list__item:first-child {
  margin-top: 0;
}
.Btitle {
  width: 100%;
}
.Btitle img {
  display: block;
  float: left;
}
.Btitle p {
  font-size: 14px;
  color: #333;
  font-weight: bold;
}
.Btitle p span {
  color: #666;
  font-weight: 300;
}
.mainTable {
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
  padding: 0;
}
.mainTable .el-row {
  height: 36px;
  width: 100%;
  margin: 0;
  line-height: 36px;
  border-top: 1px solid #ccc;
}
.mainTable .el-row.genHeight {
  min-height: 70px;
  height: auto;
  overflow: auto;
}
.mainTable .el-row.genHeight span {
  font-size: 12px;
  color: #666;
  width: 90%;
  float: left;
  margin-left: 5%;
  line-height: 24px;
}
.mainTable .el-row:first-child {
  border-top: none;
}
.mainTable p {
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin: 0;
  margin-left: 10px;
  float: left;
}
.mainTable p span {
  color: #666;
  font-weight: 300;
}
.mainTable .el-input {
  float: left;
}
.el-col-8 .el-input {
  width: 120px;
}
.el-col-6 .el-input {
  width: 90px;
}
.el-col-20 .el-input {
  text-align: center;
}
.mainTable .el-input input {
  border: none;
  outline: none;
  color: #666;
}
.emLine {
  height: 1px;
  width: 165px;
  background: #ccc;
  transform: rotate(17deg);
  position: absolute;
  left: -3px;
  top: 24px;
}
</style>
