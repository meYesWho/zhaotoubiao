<template>
  <div style="padding: 20px 15px;background: #fff;" class="process1" ref="process1">
    <div style="height: 40px;">
      <a class="linkLook" @click="toApprove1">查看执行单审定信息</a>
    </div>
    <div>
      <h3>招标项信息</h3>
      <div style="margin-left: 49px">
        <el-form
          ref="saveFileDataRefs1"
          label-position="right"
          :model="saveFileData"
          :validate-on-rule-change="false"
          :disabled="true"
          inline-message
          :rules="saveFileDataRules"
          label-width="120px"
        >
          <el-row class="base-form">
            <el-col :span="10">
              <el-form-item label="招标项：" prop="tenderProjectName">
                <el-input
                  size="mini"
                  v-model="saveFileData.tenderProjectName"
                  type="danger"
                  placeholder="招标项"
                  style="width: 66%"
                ></el-input>
                <!-- <el-button type="primary" size="mini" @click="choseTenderItem">选择</el-button> -->
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="招标项目名称：">
                <span>{{saveFileData.tenderName}}</span>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="招标编号：">
                <span>{{saveFileData.tenderNumber}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <h3>执行人分配</h3>

      <div style="margin-left: 49px">
        <el-form
          label-position="right"
          :model="saveFileData"
          :validate-on-rule-change="false"
          inline-message
          :rules="saveFileDataRules"
          ref="saveFileDataRefs2"
          :disabled="true"
          label-width="200px"
        >
          <el-row class="base-form">
            <el-col :span="12">
              <el-form-item label="专项采购组责任人：" prop="procurementPrincipalName">
                <el-input
                  size="mini"
                  placeholder="专项采购组责任人"
                  :readonly="true"
                  v-model="saveFileData.procurementPrincipalName"
                  style="width: 71%"
                ></el-input>

                <!-- <el-button size="mini" type="primary" @click="chosePeople('t1')">选择</el-button> -->
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="专项采购组执行人：" prop="procurementExecutveName">
                <el-input
                  size="mini"
                  :readonly="true"
                  v-model="saveFileData.procurementExecutveName"
                  placeholder="专项采购组执行人"
                  style="width: 71%"
                ></el-input>
                <!-- <el-button size="mini" type="primary" @click="chosePeople('t2')">选择</el-button> -->
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="技术组组长：" prop="technicalLeaderName">
                <el-input
                  style="width: 71%"
                  :readonly="true"
                  v-model="saveFileData.technicalLeaderName"
                  size="mini"
                  placeholder="技术组组长"
                ></el-input>
                <!-- <el-button size="mini" type="primary" @click="chosePeople('t3')">选择</el-button> -->
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="技术组成员：" prop="technicalMemberName">
                <el-input
                  style="width: 71%"
                  :readonly="true"
                  v-model="saveFileData.technicalMemberName"
                  size="mini"
                  placeholder="技术组成员"
                ></el-input>
                <!-- <el-button size="mini" type="primary" @click="chosePeople('t4')">选择</el-button> -->
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="经济组组长：" prop="economicLeaderName">
                <el-input
                  :readonly="true"
                  style="width: 71%"
                  v-model="saveFileData.economicLeaderName"
                  size="mini"
                  placeholder="经济组组长"
                ></el-input>
                <!-- <el-button size="mini" type="primary" @click="chosePeople('t5')">选择</el-button> -->
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="经济组成员：" prop="economicMemberName">
                <el-input
                  :readonly="true"
                  style="width: 71%"
                  v-model="saveFileData.economicMemberName"
                  size="mini"
                  placeholder="经济组成员"
                ></el-input>
                <!-- <el-button type="primary" size="mini" @click="chosePeople('t6')">选择</el-button> -->
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="执行部门：" prop="executiveDepartment">
                <el-input
                  style="width: 34%"
                  v-model="saveFileData.executiveDepartment"
                  size="mini"
                  placeholder="执行部门"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <h3>招标文件信息</h3>
      <div style="margin-left:49px">
        <el-form
          label-position="right"
          :disabled="true"
          label-width="200px"
          inline-message
          :rules="saveFileDataRules"
          :validate-on-rule-change="false"
          ref="saveFileDataRefs3"
          class="base-form"
          :model="saveFileData"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="招采方式：">
                <!-- <span>{{tenderType()}}</span> -->
                <span>{{saveFileData.tenderTypeName}}</span>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="承包方式：" prop="tenderContractType">
                <el-input
                  size="mini"
                  type="text"
                  style="width: 71%"
                  v-model="saveFileData.tenderContractType"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="项目地点：" prop="tenderProjectAddress">
                <el-input
                  type="textarea"
                  v-model="saveFileData.tenderProjectAddress"
                  style="margin: 10px 0;"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="招标范围：" prop="tenderFileRange">
                <el-input
                  type="textarea"
                  v-model="saveFileData.tenderFileRange"
                  style="margin: 10px 0;"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="项目概况：" prop="tenderFileContent">
                <el-input
                  type="textarea"
                  v-model="saveFileData.tenderFileContent"
                  style="margin: 10px 0;"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="计划开工日期：" prop="planBeginDate">
                <el-date-picker
                  style="width:71%"
                  size="mini"
                  max-length="0"
                  v-model="saveFileData.planBeginDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="计划竣工日期：" prop="planEndDate">
                <el-date-picker
                  style="width:71%"
                  size="mini"
                  format="yyyy-MM-dd"
                  max-length="0"
                  value-format="yyyy-MM-dd"
                  v-model="saveFileData.planEndDate"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-form-item label="投标人资质条件：" prop="tendererQualification">
            <el-input
              type="textarea"
              v-model="saveFileData.tendererQualification"
              style="margin: 10px 0;"
            ></el-input>
          </el-form-item> -->

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="投标人财务要求：" prop="tendererFinance">
                <el-input size="mini" v-model="saveFileData.tendererFinance" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="投标人业绩要求：" prop="tendererGrade">
                <el-input size="mini" v-model="saveFileData.tendererGrade" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="投标人其他要求：" prop="tendererOther">
                <el-input size="mini" v-model="saveFileData.tendererOther" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="质量要求：" prop="tenderFileQuality">
                <el-input size="mini" v-model="saveFileData.tenderFileQuality" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="踏勘现场联系人：" prop="prospectingBy">
                <el-input size="mini" v-model="saveFileData.prospectingBy" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="踏勘现场联系电话：" prop="prospectingPhone">
                <el-input
                  size="mini"
                  v-model.number="saveFileData.prospectingPhone"
                  style="width: 71%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="踏勘地点：" prop="prospectingAddress">
                <el-input size="mini" v-model="saveFileData.prospectingAddress" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="现场踏勘时间：" prop="yearDate">
                <el-date-picker
                  v-model="saveFileData.yearDate"
                  type="daterange"
                  size="mini"
                  unlink-panels
                  style="width: 71%"
                  max-length="0"
                  format="yyyy-MM-dd"
                  @change="pickerFn"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row> -->

          <el-row>
            <el-col :span="12">
              <el-form-item label="领取招标文件时间：" prop="receiveFileDate">
                <el-date-picker
                  style="width:71%"
                  size="mini"
                  v-model="saveFileData.receiveFileDate"
                  type="date"
                  max-length="0"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="领取招标文件时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="提交疑问的时间截止：" prop="submitQuestionEnd">
                <el-date-picker
                  style="width:71%"
                  size="mini"
                  v-model="saveFileData.submitQuestionEnd"
                  type="date"
                  max-length="0"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="提交疑问的时间截止"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="提交投标文件的时间截止：" prop="submitTenderDocumentEnd">
                <el-date-picker
                  style="width:71%"
                  size="mini"
                  v-model="saveFileData.submitTenderDocumentEnd"
                  type="date"
                  max-length="0"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="提交投标文件的时间截止"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="开标时间：" prop="tenderOpeningDate">
                <el-date-picker
                  style="width:71%"
                  size="mini"
                  v-model="saveFileData.tenderOpeningDate"
                  type="date"
                  max-length="0"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="开标时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="回标联系人：" prop="backMarkBy">
                <el-input size="mini" v-model="saveFileData.backMarkBy" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="回标电话：" prop="backMarkPhone">
                <el-input
                  size="mini"
                  v-model.number="saveFileData.backMarkPhone"
                  style="width: 71%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="回标地址：" prop="backMarkAddress">
                <el-input size="mini" v-model="saveFileData.backMarkAddress" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="开标地址：" prop="tenderOpeningAddress">
                <el-input
                  size="mini"
                  v-model="saveFileData.tenderOpeningAddress"
                  style="width: 71%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="投标有效期：" prop="tenderFileExpiryDate">
                <el-input
                  size="mini"
                  class="lineInput"
                  v-model.number="saveFileData.tenderFileExpiryDate"
                  style="width: 15%"
                ></el-input>天
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="业务单元：" prop="commName">
                <el-input
                  size="mini"
                  :readonly="true"
                  :disabled="true"
                  v-model="saveFileData.commName"
                  style="width: 71%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="投标保证金：" prop="tenderBidBond">
                <el-input size="mini" class="lineInput" v-model="saveFileData.tenderBidBond"></el-input>万元，工本费
                <el-input
                  size="mini"
                  class="lineInput"
                  ref="tenderFileCostAmount"
                  v-model="saveFileData.tenderFileCostAmount"
                ></el-input>元（不退）
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="投标保证金电汇帐号:" prop="bidBondAccountNumber">
                <el-input
                  size="mini"
                  v-model="saveFileData.bidBondAccountNumber"
                  style="width: 71%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="投标保证金账户：" prop="bidBondAccount">
                <el-input size="mini" v-model="saveFileData.bidBondAccount" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="投标保证金开户行：" prop="bidBondBank">
                <el-input size="mini" v-model="saveFileData.bidBondBank" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="投标文件份数：" prop="tenderMainNum">
                <span style="font-size: 12px;">
                  正本
                  <el-input
                    class="lineInput"
                    type="text"
                    v-model.number="saveFileData.tenderMainNum"
                  ></el-input>份，副本
                  <el-input
                    ref="tenderSecondNum"
                    class="lineInput"
                    type="text"
                    v-model.number="saveFileData.tenderSecondNum"
                  ></el-input>份
                  <span style="font-size: 12px;">(商务与技术标分开装订)</span>
                </span>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="是否退还投标文件：" prop="isReturn">
                <el-radio v-model="saveFileData.isReturn" label="1">否</el-radio>
                <el-radio v-model="saveFileData.isReturn" label="2">是</el-radio>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="招标人联系人：" prop="tenderFileTenderer">
                <el-input size="mini" v-model="saveFileData.tenderFileTenderer" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="招标人联系电话：" prop="tendereePhone">
                <el-input size="mini" v-model="saveFileData.tendereePhone" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="招标人邮箱：" prop="tendereeEmail">
                <el-input size="mini" v-model="saveFileData.tendereeEmail" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="招标人地址：" prop="tendereeAddress">
                <el-input size="mini" v-model="saveFileData.tendereeAddress" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="反舞弊举报受理电话：" prop="antiFraudPhone">
                <span style="font-size: 12px;">{{saveFileData.antiFraudPhone}}</span>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="反舞弊举报受理邮箱：" prop="antiFraudEmail">
                <span style="font-size: 12px;">{{saveFileData.antiFraudEmail}}</span>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="投标有效期：" prop="tenderFileExpiryDate">
                <el-input
                  size="mini"
                  class="lineInput"
                  v-model.number="saveFileData.tenderFileExpiryDate"
                  style="width: 15%"
                ></el-input>天
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="拖期罚款金额：" prop="tenderTardinessFine">
                <el-input size="mini" v-model="saveFileData.tenderTardinessFine" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>

            <el-col :span="12">
              <el-form-item label="保修金额：" prop="tenderWarrantyAmount">
                <el-input
                  size="mini"
                  v-model="saveFileData.tenderWarrantyAmount"
                  style="width: 71%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="保修期：" prop="tenderWarrantyDate">
                <el-input size="mini" v-model="saveFileData.tenderWarrantyDate" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="预付款：" prop="tenderFilePrepayments">
                <el-input
                  size="mini"
                  v-model="saveFileData.tenderFilePrepayments"
                  style="width: 71%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="担保金额：" prop="tenderFileGuarantee">
                <el-input size="mini" v-model="saveFileData.tenderFileGuarantee" style="width: 71%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="招标文件：" :rules="[{ required: true, trigger: 'submit' }]">
                <span
                  style="display:block;cursor: pointer;"
                  v-for="(item, index) in fileList"
                  :key="index"
                  @click="lookFile(item)"
                >{{item.name}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
import Vue from "vue";
import base from "@/api/base";
import axios from "@/utils/http"; // 导入http中创建的axios实例
export default Vue.component("process-one", {
  data() {
    return {
      relatedItems: {
        // 选择项目参数默认值
        isShow: false,
        currentKey: ""
      },
      tenderItemList: {
        isShow: false,
        type: "",
        selectArr: []
      },
      sso_sessionid: this.$store.state.sso_sessionid,
      actionUrl:
        base.defaultUrl +
        "/fileInfo/uploadFileReturnInfo?sso_sessionid=" +
        this.$store.state.sso_sessionid,
      uploadData: {
        fileType: "TenderFile",
        headCode: ""
      },
      chaShow: false,
      chaShow2: false,
      saveFileData: {},
      saveFileData2: {
        tenderFileCode: "",
        tenderCode: "",
        tenderProjectName: "",
        tenderProjectCode: "",
        tenderType: "",
        tenderName: "",
        tenderNumber: "",
        tenderContractType: "",
        tenderProjectAddress: "",
        tenderFileRange: "",
        tenderFileContent: "",
        planBeginDate: "",
        planEndDate: "",
        tendererQualification: "",
        tendererFinance: "",
        tendererGrade: "",
        tendererOther: "",
        tenderFileQuality: "",
        prospectingBy: "",
        prospectingPhone: "",
        prospectingAddress: "",
        prospectingBeginDate: "",
        yearDate: [],
        prospectingEndDate: "",
        receiveFileDate: "",
        submitQuestionEnd: "",
        submitTenderDocumentEnd: "",
        tenderOpeningDate: "",
        backMarkBy: "",
        backMarkPhone: "",
        backMarkAddress: "",
        returnDate: "",
        tenderOpeningAddress: "",
        tenderFileExpiryDate: "",
        commCode: "",
        commName: "",
        tenderBidBond: "",
        bidBondAccountNumber: "",
        bidBondAccount: "",
        bidBondBank: "",
        tenderMainNum: "",
        tenderSecondNum: "",
        tenderFileCostAmount: "",
        isReturn: "1",
        tenderFileTenderer: "",
        tendereePhone: "",
        tendereeEmail: "",
        tendereeAddress: "",
        antiFraudPhone: '',
        antiFraudEmail: "sunny@firstcare.com.cn",
        tenderFileStatus: "",
        approveStatus: "",
        procurementPrincipal: "",
        procurementExecutve: "",
        technicalLeader: "",
        technicalMember: "",
        economicLeader: "",
        economicMember: "",

        procurementPrincipalName: "",
        procurementExecutveName: "",
        technicalLeaderName: "",
        technicalMemberName: "",
        economicLeaderName: "",
        economicMemberName: "",

        executiveDepartment: "五个三工作中心",
        createdBy: "",
        createdDate: "",
        lastUpdatedBy: "",
        lastUpdatedDate: "",
        technicalFile: "",
        technicalFileName: "",
        businessFile: "",
        businessFileName: "",
        enderFilePrepayments: "",
        tenderWarrantyDate: "",
        tenderWarrantyAmount: "",
        tenderTardinessFine: "",
        tenderFileGuarantee: ""
      }, // 表单参数
      choseObj: {},
      memberListCopy: {
        // 选择职员参数
        isShow: false,
        type: "",
        selectArr: [],
        isleader: false,
        tenderProjectCode: ""
      },
      tenderTypeList: [
        {
          label: "战略直委",
          id: "1"
        },
        {
          label: "非战略直委",
          id: "2"
        },
        {
          label: "议标",
          id: "3"
        },
        {
          label: "邀请招标",
          id: "4"
        }
      ],
      projectInfo: {},
      active: 0,
      fileList: [],
      peopleList: [
        {
          name: "",
          company: "",
          party: ""
        }
      ],
      formInline: {
        region: ""
      },
      searchTJ: {
        name: "",
        company: "",
        party: ""
      },
      value1: "",
      value2: "",
      popupShow: false,
      dialogForPlanForm: {},
      dialogForPlanWidth: "80%",
      tenderObj: [],
      saveFileDataRules: {
        tenderProjectName: [
          { required: true, message: "必填", trigger: "blur, change" }
        ],
        procurementPrincipalName: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        procurementExecutveName: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        technicalMemberName: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        technicalLeaderName: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        economicLeaderName: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        economicMemberName: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        executiveDepartment: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        tenderType: [{ required: true, message: "必填", trigger: "blur" }],
        tenderContractType: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        tenderProjectAddress: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        tenderFileRange: [{ required: true, message: "必填", trigger: "blur" }],
        tenderFileContent: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        planBeginDate: [{ required: true, message: "必填", trigger: "blur" }],
        planEndDate: [{ required: true, message: "必填", trigger: "blur" }],
        yearDate: [{ required: true, message: "必填", trigger: "blur" }],
        tendererQualification: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        tendererGrade: [{ required: true, message: "必填", trigger: "blur" }],
        tendererOther: [{ required: true, message: "必填", trigger: "blur" }],
        tenderFileQuality: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        prospectingBy: [{ required: true, message: "必填", trigger: "blur" }],
        prospectingPhone: [{ required: true, trigger: "blur" }],
        tendererFinance: [{ required: true, message: "必填", trigger: "blur" }],
        prospectingAddress: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        receiveFileDate: [{ required: true, message: "必填", trigger: "blur" }],
        submitQuestionEnd: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        submitTenderDocumentEnd: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        tenderOpeningDate: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        backMarkBy: [{ required: true, message: "必填", trigger: "blur" }],
        backMarkPhone: [{ required: true, trigger: "blur" }],
        backMarkAddress: [{ required: true, message: "必填", trigger: "blur" }],
        returnDate: [{ required: true, message: "必填", trigger: "blur" }],
        tenderOpeningAddress: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        tenderFileExpiryDate: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        commName: [{ required: true, message: "必填", trigger: "blur" }],
        tenderBidBond: [{ required: true, trigger: "blur" }],
        bidBondAccountNumber: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        bidBondAccount: [{ required: true, message: "必填", trigger: "blur" }],
        bidBondBank: [{ required: true, message: "必填", trigger: "blur" }],
        tenderMainNum: [{ required: true, trigger: "blur" }], //投标文件份数（正）
        isReturn: [{ required: true, message: "必填", trigger: "blur" }],
        tenderFileTenderer: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        tendereePhone: [{ required: true, trigger: "blur" }],
        tendereeEmail: [
          { type: "email", message: "必填", required: true, trigger: "blur" }
        ],
        tendereeAddress: [{ required: true, message: "必填", trigger: "blur" }],
        antiFraudPhone: [{ required: true, message: "必填", trigger: "blur" }],
        antiFraudEmail: [
          { type: "email", message: "必填", required: true, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    var urlV = window.location.href;
    var pathS = urlV.indexOf("headCode=");
    if (pathS != -1) {
      var headCode = urlV.substring(pathS + 9, urlV.length);
    } else {
      // this.$message.error('数据有误，请核实后重新进入页面！');
      var headCode = "ce4e6022-24fb-4b84-99a4-a85fddc421cd";
    }
    this.getTenderFileListApprove(headCode);
  },
  beforeDestroy() {},
  methods: {
    toApprove1() {
      var url = base.approveUrl + this.saveFileData.tenderApproveCode;
      window.open(url);
    },
    lookFile(item) {
      window.open(item.filePrivew, "_blank");
    },
    // 查询赋值
    getTenderFileListApprove(headCode) {
      var params = {
        headCode: headCode
      };
      this.$api.modular.getTenderFileListApprove(params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            if (res.data.data.length > 0) {
              res.data.data[0].antiFraudPhone = '固话：4008086100/010-84407072；手机号：13051773949';
              this.saveFileData = res.data.data[0];
              this.fileList = [];
              if (this.saveFileData.releaseFileName) {
                this.fileList.push({
                  name: this.saveFileData.releaseFileName,
                  releaseFileUrl: this.saveFileData.releaseFileUrl,
                  filePrivew: this.saveFileData.filePrivew
                });
              }
              this.saveFileData.tenderOpeningDate = this.commonFn.formatDate(
                this.saveFileData.tenderOpeningDate
              );
              this.saveFileData.returnDate = this.commonFn.formatDate(
                this.saveFileData.returnDate
              );
              this.saveFileData.planBeginDate = this.commonFn.formatDate(
                this.saveFileData.planBeginDate
              );
              this.saveFileData.planEndDate = this.commonFn.formatDate(
                this.saveFileData.planEndDate
              );
              this.saveFileData.receiveFileDate = this.commonFn.formatDate(
                this.saveFileData.receiveFileDate
              );
              this.saveFileData.submitQuestionEnd = this.commonFn.formatDate(
                this.saveFileData.submitQuestionEnd
              );
              this.saveFileData.submitTenderDocumentEnd = this.commonFn.formatDate(
                this.saveFileData.submitTenderDocumentEnd
              );
              this.saveFileData.prospectingEndDate = this.commonFn.formatDate(
                this.saveFileData.prospectingEndDate
              );
              this.saveFileData.prospectingBeginDate = this.commonFn.formatDate(
                this.saveFileData.prospectingBeginDate
              );
              this.saveFileData.prospectingEndDate = this.commonFn.formatDate(
                this.saveFileData.prospectingEndDate
              );
              this.saveFileData.yearDate = [
                this.saveFileData.prospectingBeginDate,
                this.saveFileData.prospectingEndDate
              ];

              var procurementPrincipal = this.saveFileData.procurementPrincipal.split(
                ":"
              );
              this.saveFileData.procurementPrincipalName =
                procurementPrincipal[2];
              this.choseObj.procurementPrincipal = [
                {
                  groupCode: procurementPrincipal[0],
                  groupPersonBy: procurementPrincipal[1],
                  groupPersonName: procurementPrincipal[2]
                }
              ];

              var procurementExecutve = this.saveFileData.procurementExecutve.split(
                ":"
              );
              this.saveFileData.procurementExecutveName =
                procurementExecutve[2];
              this.choseObj.procurementExecutve = [
                {
                  groupCode: procurementExecutve[0],
                  groupPersonBy: procurementExecutve[1],
                  groupPersonName: procurementExecutve[2]
                }
              ];

              var technicalLeader = this.saveFileData.technicalLeader.split(
                ":"
              );
              this.saveFileData.technicalLeaderName = technicalLeader[2];
              this.choseObj.technicalLeader = [
                {
                  groupCode: technicalLeader[0],
                  groupPersonBy: technicalLeader[1],
                  groupPersonName: technicalLeader[2]
                }
              ];

              var technicalMemberArr = this.saveFileData.technicalMember.split(
                ","
              );
              this.choseObj.technicalMember = [];
              var nameArr_T = [];
              for (var t = 0; t < technicalMemberArr.length; t++) {
                this.choseObj.technicalMember.push({
                  groupCode: technicalMemberArr[t].split(":")[0],
                  groupPersonBy: technicalMemberArr[t].split(":")[1],
                  groupPersonName: technicalMemberArr[t].split(":")[2]
                });
                nameArr_T.push(technicalMemberArr[t].split(":")[2]);
              }
              this.saveFileData.technicalMemberName = nameArr_T.join(",");

              var economicLeader = this.saveFileData.economicLeader.split(":");
              this.saveFileData.economicLeaderName = economicLeader[2];
              this.choseObj.economicLeader = [
                {
                  groupCode: economicLeader[0],
                  groupPersonBy: economicLeader[1],
                  groupPersonName: economicLeader[2]
                }
              ];
              var economicMemberArr = this.saveFileData.economicMember.split(
                ","
              );
              this.choseObj.economicMember = [];
              var nameArr_A = [];
              for (var a = 0; a < economicMemberArr.length; a++) {
                this.choseObj.economicMember.push({
                  groupCode: economicMemberArr[a].split(":")[0],
                  groupPersonBy: economicMemberArr[a].split(":")[1],
                  groupPersonName: economicMemberArr[a].split(":")[2]
                });
                nameArr_A.push(economicMemberArr[a].split(":")[2]);
              }
              this.saveFileData.economicMemberName = nameArr_A.join(",");

              // this.technicalFileFn();
              // this.businessFileFn();
              // this.saveFileData.commName = this.tenderObj[0].commName;
              // this.saveFileData.tenderName = this.tenderObj[0].tenderName;
              // this.saveFileData.tenderNumber = this.tenderObj[0].tenderNumber;
              // this.saveFileData.tenderCode = this.tenderObj[0].tenderCode;
              // this.saveFileData.tenderType = this.tenderObj[0].tenderType;
              // this.saveFileData.tenderProjectCode = this.tenderObj[0].tenderProjectCode;
              this.saveFileData = Object.assign(
                this.saveFileData2,
                this.saveFileData
              );
            }
          } else {
            this.$message.error(res.data.message);
            return false;
          }
        }
      });
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

    // 勘探时间
    pickerFn(v) {
      this.saveFileData.prospectingBeginDate = this.saveFileData.yearDate[0];
      this.saveFileData.prospectingEndDate = this.saveFileData.yearDate[1];
    },
    previewFn(row) {
      if (row.name && row.filePrivew) {
        window.open(row.filePrivew);
      } else {
        this.$message.error("该文件暂不支持查看！");
      }
    }
  }
});
</script>
<style>
.process1 .el-form--inline .el-form-item__content {
  width: 60%;
}

.process1 .search-form-inline .el-form-item {
  width: 25%;
  margin: 0;
}
.process1 h3 {
  font-size: 14px;
  text-align: left;
  background-color: #ececec;
  padding: 10px 20px;
  margin: 14px 0;
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
.aDiv {
  width: 70%;
  margin-left: 26%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
}
.pointerC {
  cursor: pointer;
  position: absolute;
  right: 0;
}
</style>
<style scoped>

body {
  background: #fff;
}
.linkLook {
  float: right;
  border: 1px solid #1e88e5;
  background: none;
  font-size: 12px;
  padding: 3px 8px;
  margin-top: 8px;
  border-radius: 4px;
  margin-right: 8px;
  color: #1e88e5;
  text-decoration: none;
}
.linkLook:hover{
  cursor: pointer;
}
</style>