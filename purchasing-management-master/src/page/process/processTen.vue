<template>
  <div class="p10">
    <bidInfo-title :bidInfo="bidInfo"></bidInfo-title>
    <h3>评商务标候选人信息</h3>
    <div>
      <el-table
        :data="businessTableList"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        size="mini"
        border
        style="width: 100%"
      >
        <el-table-column type="expand" width="100" label="关闭或打开">
          <template slot-scope="scope">
            <div v-if="suppListBj[scope.$index].length>1">
              <el-row style="line-height:32px;border: 1px solid #ebebeb; background: #f9f9f9;">
                <el-col
                  style="border-right: 1px solid #ebebeb;text-align: right; padding-right:14px;"
                  :span="3"
                >商务标报价轮次</el-col>
                <el-col style="border-right: 1px solid #ebebeb;padding-left:14px;" :span="3">商务标报价</el-col>
                <el-col
                  style="border-right: 1px solid #ebebeb;text-align: right; padding-right:14px;"
                  :span="3"
                >商务标附件轮次</el-col>
                <el-col :span="3" style="padding-left:14px;">
                  <span>商务标附件</span>
                </el-col>
              </el-row>
              <div v-for="(item, index) in suppListBj[scope.$index]" :key="index">
                <el-row
                  v-if="index != 0"
                  style="line-height:32px;width: 100%;border: 1px solid #ebebeb; border-top: none;"
                >
                  <el-col
                    style="border-right: 1px solid #ebebeb;text-align: right; padding-right:14px;"
                    :span="3"
                  >第{{index+1}}轮报价</el-col>
                  <el-col
                    style="border-right: 1px solid #ebebeb;padding-left:14px;"
                    :span="3"
                    :title="showTitle(item, 2)"
                    v-if="item[0][2] != 0"
                  >{{showTitle(item, 0)}}</el-col>
                  <el-col
                    style="border-right: 1px solid #ebebeb;padding-left:14px;"
                    :span="3"
                    v-if="item[0][2] == 0"
                  >— {{item[2][2]}}</el-col>
                  <el-col
                    style="border-right: 1px solid #ebebeb;text-align: right; padding-right:14px;"
                    :span="3"
                  >第{{index+1}}轮商务标附件</el-col>
                  <el-col :span="3" style="padding-left:14px;">
                    <a target="_blank" v-if="!item[1]">暂无附件</a>
                    <a target="_blank" v-if="item[1]" :href="item[1][3]">下载查看</a>
                  </el-col>
                </el-row>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="SUPPLIER_NAME" label="投标候选人"></el-table-column>
        <!-- <el-table-column align="center" show-overflow-tooltip prop="nodeName" label="是否废标"></el-table-column> -->
        <el-table-column align="center" show-overflow-tooltip prop="TECHNOLOGY_SCORE" label="技术标分数"></el-table-column>
        <!-- <el-table-column align="center" show-overflow-tooltip prop="nodeName" label="合格情况"></el-table-column> -->
        <el-table-column align="center" label="商务报价（含税 元）">
          <template slot-scope="scope">
            <span
              :title="showTitle(suppListBj[scope.$index][0], 2)"
              v-if="suppListBj[scope.$index][0][0][2] != 0"
            >{{showTitle(suppListBj[scope.$index][0], 0)}}</span>
            <span
              v-if="suppListBj[scope.$index][0][0][2] == 0"
            >— {{showTitle(suppListBj[scope.$index][0], 2)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="QUOTE_INPUT_TAX" label="商务报价进项税（元）">
          <template slot-scope="scope">
            <span
              v-if="scope.row.QUOTE_INPUT_TAX != 0"
              :title="scope.row.QUOTE_INPUT_TAX_REMARK"
            >{{scope.row.QUOTE_INPUT_TAX}}</span>
            <span v-if="scope.row.QUOTE_INPUT_TAX == 0">— {{scope.row.QUOTE_INPUT_TAX_REMARK}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="商务标附件">
          <template slot-scope="scope">
            <a target="_blank" :href="suppListBj[scope.$index][0][1][3]">下载查看</a>
          </template>
        </el-table-column>
      </el-table>
      <h3>评商务标信息</h3>
      <el-table :data="BusinessDataList" size="mini" border style="width: 100%">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column align="center" label="商务标评委" width="85">
          <template slot-scope="scope">
            <div v-if="scope.row.TENDER_EVALUATION_NAME">
              <span v-if="pwShow(scope.row, scope.$index)">{{scope.row.TENDER_EVALUATION_NAME}}</span>
            </div>
            <div v-if="!scope.row.TENDER_EVALUATION_NAME">
              <span v-if="pwShow(scope.row, scope.$index)">{{scope.row.MEMBERNAME}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="140"
          align="center"
          show-overflow-tooltip
          prop="ITEM_SCORE_NAME"
          label="评分维度"
        ></el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="ITEM_SCORE_DETAIL"
          width="200"
          label="评分项目"
        ></el-table-column>
        <el-table-column
          align="center"
          width="180"
          show-overflow-tooltip
          prop="ITEM_SCORE_STANDARD"
          label="得分标准"
        ></el-table-column>
        <el-table-column
          width="80"
          align="center"
          show-overflow-tooltip
          prop="ITEM_SCORE"
          label="分值"
        ></el-table-column>
        <el-table-column
          align="center"
          v-for="(item, index) in suppList"
          :key="index"
          min-width="150"
          show-overflow-tooltip
          :label="item[0]"
        >
        <!-- 
          :render-header="labelFunction"
           -->
          <template slot-scope="scope">
            <el-form size="mini" :model="scope.row" label-width="10" class="demo-ruleForm">
              <el-form-item
                :rules="[
      { required: true, message: '请输入分值', trigger: 'blur' }]"
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
      <!-- <el-table :data="suppList" size="mini" border style="width: 100%">
        <el-table-column align="center" width="200px" show-overflow-tooltip label="供应商">
          <template slot-scope="scope">{{scope.row[0]}}</template>
        </el-table-column>
        <el-table-column align="center" width="200px" show-overflow-tooltip label="是否上传疑问卷">
          <template slot-scope="scope">
            <el-radio :disabled="ifAlready" v-model="scope.row[2].isAsk" label="1">是</el-radio>
            <el-radio :disabled="ifAlready" v-model="scope.row[2].isAsk" label="2">否</el-radio>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="left" label="疑问卷上传">
          <template slot-scope="scope">
            <div class="ywj">
              <div v-if="scope.row[2].isAsk == '1'">
              <el-upload
                style="float: left;text-align: left;"
                class="upload-demo"
                :disabled="ifAlready"
                :on-preview="(value)=> previewFn(value, scope.$index)"
                :before-upload="beforeUploadFn"
                :on-success="(res)=> uploadSuccess(res, scope.$index)"
                :on-remove="(res)=> removeFn(res, scope.$index)"
                :action="actionUrl"
                :file-list="scope.row[2].fileList"
                :multiple="true"
              >
                <el-button :disabled="ifAlready" size="mini" type="primary">点击上传</el-button>
              </el-upload>
              </div>
              <span v-else>确认无任何疑问，进行下一环节。</span>
            </div>
            
          </template>
        </el-table-column>
      </el-table>-->
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
        <h3>商务标评委评分信息</h3>
        <el-table :data="allScore" size="mini" border style="width: 100%">
          <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
          <el-table-column align="center" label="商务标评委">
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
      <!-- <div style="margin-top: 20px" v-if="type == 1">
        <span style="float: left; margin-top: 18px;">疑问卷上传</span>
        <el-upload
          :disabled="ifAlready"
          style="float: left;text-align: left; margin-left: 12px;margin-top: 12px;"
          class="upload-demo"
          :on-preview="(value)=> previewFn(value)"
          :on-success="uploadSuccess"
          :before-upload="beforeUploadFn"
          :action="actionUrl"
          :on-exceed="exceedFn"
          :file-list="fileList"
          :limit="1"
          :multiple="false"
        >
          <el-button :disabled="ifAlready" size="mini" type="primary">点击上传</el-button>
        </el-upload>
        <div style="clear: both"></div>
      </div>-->
      <el-divider></el-divider>
      <div style="text-align: center">
        <el-button size="mini" :disabled="ifAlready" type="primary" @click="loseBid">流标</el-button>
        <el-button size="mini" @click="cancelFn">关闭</el-button>
        <el-button
          size="mini"
          v-if="type == 1"
          :disabled="ifAlready"
          type="primary"
          @click="submitFn"
        >提交</el-button>
        <el-button
          size="mini"
          v-if="type == 2"
          type="primary"
          :disabled="ifAlready"
          @click="swbOverBid"
        >完成评商务标</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import base from "@/api/base";
export default Vue.component("process-ten", {
  data() {
    return {
      sso_sessionid: this.$store.state.sso_sessionid,
      evaluationBusinessList: [],
      businessTableList: [],
      tenderFileCode: "",
      type: "1",
      actionUrl:
        base.uploadUrl + "?sso_sessionid=" + this.$store.state.sso_sessionid,
      suppList: [],
      BusinessDataList: [],
      saveData: {
        tenderFileCode: "",
        fileCode: "",
        array: []
      },
      fileList: [],
      suppListBj: [
        [
          [1, 2, 3],
          [1, 2, 3],
          [1, 2, 3]
        ]
      ],
      ifAlready: false,
      listS: [],
      inputDis: false,
      allScore: [],
      allScoreList: [],
      bidInfo: {
        tenderName: "",
        tenderNumber: ""
      },
      fileListAsk: [],
      getRowKeys(row) {
        return row.TENDER_CANDIDATE_LINE_CODE;
      },
      expands: []
    };
  },
  mounted() {
    this.tenderFileCode = this.$route.query.tenderFileCode;
    this.type = this.$route.query.type;
    this.bidInfo.tenderNumber = this.$route.query.tenderNumber;
    this.bidInfo.tenderName = this.$route.query.tenderName;
    if (
      this.$route.query.already == "completeEvaluationBusiness" ||
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
      this.ifAlready ||
      this.type == 2 ||
      this.$route.query.ifProcess ||
      this.type == 3
    ) {
      this.inputDis = true;
    }
    if (this.type == "1") {
      this.evaluationBusinessFn();
    } else {
      this.evaluationBusinessFn2();
    }
  },
  methods: {
    showTitle(item, type) {
      if (item.length > 2) {
        if (item[type][2]) {
          return item[type][2];
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    pwShow(row, index) {
      if (this.listS.length > 0) {
        for (var i = 0; i < this.listS[0].length; i++) {
          if (i == this.listS[0].length - 1) {
            return false;
          }
          if (index == this.listS[0].length * (i + 1)) {
            return true;
          } else if (index == 0) {
            return true;
          }
        }
      }
    },
    returnNM(NM) {
      var arr = NM.split(":");
      return arr[2];
    },
    labelFunction(h, { column, $index }, index) {
      let f = 14;
      if (typeof fontSize != "undefined" && fontSize != null) {
        f = fontSize;
      }
      //列头的实际宽度
      let width = column.realWidth;
      //14：字体大小 32 是el表格的左右 padding 的合
      let maxFontCount = Math.floor((width + 16) / f) - 1;
      let chars = column.label.split("");
      var label = "";
      if (maxFontCount < chars.length) {
        for (let i = 0; i < maxFontCount; i++) {
          label += chars[i];
        }
        label += "..";
      } else {
        label = column.label;
      }
      return label;
    },
    beforeUploadFn(file) {
      if (!this.commonFn.beforeUpload(file, this)) return false;
    },
    cccc(index1, index2, value) {
      var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if (!reg.test(Number(value))) {
        this.BusinessDataList[index1].valueArr[index2] = "";
        value = "";
      }
      if (Number(value) > this.BusinessDataList[index1].ITEM_SCORE) {
        this.$message.error("不能超过设定分值！");
        value = "";
        this.BusinessDataList[index1].valueArr[index2] = "";
      }
      this.$forceUpdate();
      if (index1 == 0 && index2 == 0) {
        this.saveData.array[0].tenderEvaluationScore = value;
      } else {
        var i = Number(index1) * Number(this.suppList.length) + Number(index2);
        this.saveData.array[i].tenderEvaluationScore = value;
      }
    },

    // 数据处理

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
    allScoreFn(data) {
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
    dataChuli(data, type) {
      var obj = data[0];
      var len = Number(data.length);
      if (len > 1) {
        if (data[len - 1].FILE_NAME) {
          len = len - 1;
          this.fileObj = data[len];
          this.fileObj.name = this.fileObj.FILE_NAME;
          this.fileList.push(this.fileObj);
        } else {
          len = len;
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
            arr[i] == "ITEM_SCORE"
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
          arr[i] == "ITEM_SCORE"
        ) {
          arr.splice(i, 1);
        }
      }
      var reg = new RegExp("'", "g");
      for (var s = 0; s < arr.length; s++) {
        var liArr = arr[s].replace(reg, "").split("_");
        if ((type = "report")) {
          liArr.push({
            isHege: "1",
            isAsk: "1",
            fileList: []
          });
        }
        this.suppList.push(liArr);
      }
      var dataNew = data;
      if (len == data.length) {
        dataNew = data;
      } else {
        dataNew.splice(len, 1);
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
      this.BusinessDataList = dataNew;
    },
    dataHandle(data) {
      if (data.length > 0) {
        var obj = data[0];
        var arr = [];
        this.suppListBj = [];
        for (var a = 0; a < data.length; a++) {
          var f = 0;
          arr = Object.getOwnPropertyNames(obj);
          // data[a].valueArr = [];
          var arr2 = [];
          arr2 = Object.values(data[a]);
          for (var i = arr.length - 1; i >= 0; i--) {
            if (
              arr[i] == "__ob__" ||
              arr[i] == "QUOTE_INPUT_TAX" ||
              arr[i] == "TENDER_QUALIFIED" ||
              arr[i] == "TECHNOLOGY_SCORE" ||
              arr[i] == "TENDER_CANDIDATE_LINE_CODE" ||
              arr[i] == "SUPPLIER_NAME" ||
              arr[i] == "BUSINESS_FILE_CODE" ||
              arr[i] == "QUOTE_INPUT_TAX_REMARK"
            ) {
              arr2.splice(i, 1);
              arr.splice(i, 1);
            }
          }
          arr2.splice(arr2.length - 1, 1);
          var hang = [];
          for (var b = 0; b < arr.length; b++) {
            var sarr = arr[b].split("_");
            if (arr2[b]) {
              var str = arr2[b].toString();
              if (str.indexOf("fileCode=") != -1) {
                if (
                  str.substr(
                    arr2[b].indexOf("fileCode=") + 9,
                    str.indexOf("fileCode=") + 19
                  )
                ) {
                  sarr.push(arr2[b]);
                } else {
                }
              } else {
                sarr.push(arr2[b]);
              }
            } else {
              sarr.push("");
            }
            hang.push(sarr);
          }
          // hang.splice(hang.length-1, 1);
          // 2019-12-10 因为当前数据不需要删除最后一个  后期出现相关数据 重新写
          this.suppListBj[a] = [];
          this.suppListBj[a].push([]);
          this.suppListBj[a][f].push(hang[0]);
          for (var c = 0; c < hang.length; c++) {
            // this.suppListBj[d].push(hang[c]);
            if (c == hang.length - 1) {
            } else {
              if (hang[c][0] != hang[c + 1][0]) {
                f++;
                this.suppListBj[a].push([]);
                this.suppListBj[a][f].push(hang[c + 1]);
              } else {
                this.suppListBj[a][f].push(hang[c + 1]);
              }
            }
          }
        }
        for (var g = 0; g < data.length; g++) {
          data[g].suppListBj = this.suppListBj[g];
        }
        this.businessTableList = data;
        for (var i in this.suppListBj) {
          var sp = 0;
          for (var i2 in this.suppListBj[i]) {
            if (
              this.suppListBj[i][i2][0][2] == "" &&
              this.suppListBj[i][i2][2][2] == ""
            ) {
              sp++;
            }
          }
          if (sp > 0) {
            var qs = this.suppListBj[i].length - sp;
            this.suppListBj[i].splice(qs, sp);
          }
        }
        for (var p = 0; p < data.length; p++) {
          this.expands.push(
            this.businessTableList[p].TENDER_CANDIDATE_LINE_CODE
          );
        }
      }
    },
    // 获取列表
    evaluationBusinessFn() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      // return false
      this.$api.modular
        .evaluationBusiness(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (!res.data.returnCode) {
              // this.businessTableList = res.data.EvaluationData;
              if (res.data.data.EvaluationData.length > 0) {
                this.dataHandle(res.data.data.EvaluationData);
              }
              if (res.data.data.BusinessData.length > 0) {
                this.dataChuli(res.data.data.BusinessData);
              }
              if (res.data.data.fileList && res.data.data.fileList.length > 0) {
                this.fileDataChuLi(res.data.data.fileList);
              } else {
                var arr = [];
                for (var i = 0; i < res.data.data.EvaluationData.length; i++) {
                  arr.push({
                    TENDER_EVALUATION_NAME:
                      res.data.data.BusinessData[0].MEMBERNAME,
                    SUPPLIER_NAME:
                      res.data.data.EvaluationData[i].SUPPLIER_NAME,
                    isAsk: "1",
                    fileList: []
                  });
                }
                this.fileListAsk = arr;
              }
              // this.fileDataChuLi(res.data.data.fileList);
              // this.dataHandle(res.data.EvaluationData);
              // this.dataChuli(res.data.BusinessData);
            } else if (res.data.returnCode == -2) {
              this.$message.error("很抱歉，您暂无评标权限！");
              this.ifAlready = true;
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    // 获取列表
    evaluationBusinessFn2() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      // return false
      this.$api.modular
        .getEvaluationBusiness(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (!res.data.returnCode) {
              // this.businessTableList = ;
              if (res.data.BusinessData.length > 0) {
                this.dataChuli(res.data.BusinessData);
              }
              if (res.data.EvaluationData.length > 0) {
                this.dataHandle(res.data.EvaluationData);
              }
              if (res.data.allScore.length > 0) {
                this.allScoreFn(res.data.allScore);
              }
              if (res.data.fileList.length > 0) {
                this.fileDataChuLi(res.data.fileList);
              }
            } else if (res.data.returnCode == -2) {
              this.$message.error("很抱歉，您暂无评标权限！");
              this.ifAlready = false;
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    // 提交
    submitFn() {
      this.saveData.tenderFileCode = this.tenderFileCode;
      for (var i = 0; i < this.saveData.array.length; i++) {
        // if (!this.saveData.array[i].tenderEvaluationScore) {
        //   this.$message.error("分值不能为0，请确认分值");
        //   return false;
        // } else {
        //   }
        this.saveData.array[i].tenderEvaluationScore = Number(
          this.saveData.array[i].tenderEvaluationScore
        ).toFixed(2);
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
      this.$api.modular
        .saveEvaluationBusiness(this.sso_sessionid, this.saveData)
        .then(res => {
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
      this.$api.modular.swbLoseBid(this.sso_sessionid, params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.$message.success("流标完成");
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
    // 完成
    swbOverBid() {
      var arr = [];
      for (var i = 0; i < this.suppList.length; i++) {
        arr.push(
          this.suppList[i][1] +
            ":" +
            this.BusinessDataList[this.BusinessDataList.length - 1].valueArr[i]
        );
      }
      this.ifAlready = true;
      var params = {
        tenderFileCode: this.tenderFileCode,
        linCodeScoreS: arr.join(",")
      };
      this.$api.modular.swbOverBid(this.sso_sessionid, params).then(res => {
        this.ifAlready = false;
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.$message.success("完成评商务标！");
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
    tableSearchFn(value) {
      this.selectionList = value;
    },
    // 上传
    uploadSuccess(res, index) {
      // this.saveData.fileCode = res.data[0].serviceFileCode;
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].name = res.data[i].fileName;
      }
      this.fileListAsk[index].fileList.push(res.data[0]);
      // if(!this.suppList[index][2].fileList){
      //   this.suppList[index][2].fileList = [];
      // }
      // this.suppList[index][2].fileList.push(res.data[0]);
    },
    removeFn(res, index) {
      this.$message.info("删除文件后，请进行保存，否则删除失效！");
      var fileList = this.fileListAsk[index].fileList;
      for (var i = 0; i < fileList.length; i++) {
        if (res.FILE_CODE) {
          if (fileList[i].FILE_CODE == res.FILE_CODE) {
            fileList.splice(i, 1);
          }
        } else if (res.fileCode) {
          if (fileList[i].fileCode == res.fileCode) {
            fileList.splice(i, 1);
          }
        }
      }
      this.fileListAsk[index].fileList = fileList;
      // this.suppList[index][2].fileList = fileList;
    },
    previewFn(value) {
      window.open(value.FILEPRIVEW);
    }
  }
});
</script>
<style>
.p10 .el-upload-list {
  float: left;
  margin-right: 10px;
}
.p10 .el-form-item--mini.el-form-item {
  margin-bottom: 0;
}
.p10 .el-form-item__error {
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
</style>
