<template>
  <div
    style="padding: 10px 15px;background: #fff;padding-bottom:30px;"
    class="process1 p12"
    ref="process1"
  >
    <div style="height: 40px;">
      <a v-if="!ifZhan" class="linkLook" @click="toApprove3">查看投标候选人审定信息</a>
      <a class="linkLook" @click="toApprove2">查看招标文件审定信息</a>
      <a class="linkLook" @click="toApprove1">查看执行单审定信息</a>
    </div>
    <div class="flowArea">
      <div class="flowTitle" @click="toggleArea('1')">
        <span>1</span>
        <p>招标文件</p>
        <i v-if="showListIndex != 1" class="el-icon-arrow-right"></i>
        <i v-if="showListIndex == 1" class="el-icon-arrow-down"></i>
      </div>
      <div class="flowMain" v-if="showListIndex == 1">
        <div>
          <h4 align="left" style="font-size: 13px;margin-left: 12px;line-height:42px;">招标项信息</h4>
          <div style="margin-left: 49px">
            <el-form
              ref="saveFileDataRefs1"
              label-position="right"
              :model="saveFileData"
              :validate-on-rule-change="false"
              :disabled="true"
              inline-message
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

          <h4 align="left" style="font-size: 13px;margin-left: 12px;line-height:42px;">执行人分配</h4>

          <div style="margin-left: 49px">
            <el-form
              label-position="right"
              :model="saveFileData"
              :validate-on-rule-change="false"
              inline-message
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

          <h4 align="left" style="font-size: 13px;margin-left: 12px;line-height:42px;">招标文件信息</h4>
          <div style="margin-left:49px">
            <el-form
              label-position="right"
              :disabled="true"
              label-width="200px"
              inline-message
              :validate-on-rule-change="false"
              ref="saveFileDataRefs3"
              class="base-form"
              :model="saveFileData"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="招采方式：">
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
              </el-form-item>

              <el-row>
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
                    <el-input
                      size="mini"
                      v-model="saveFileData.tenderFileQuality"
                      style="width: 71%"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row> -->

              <!-- <el-row>
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
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="踏勘地点：" prop="prospectingAddress">
                    <el-input
                      size="mini"
                      v-model="saveFileData.prospectingAddress"
                      style="width: 71%"
                    ></el-input>
                  </el-form-item>
                </el-col> -->

                <!-- <el-col :span="12">
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
              </el-row>

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
              </el-row> -->

              <!-- <el-row>
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
              </el-row> -->

              <!-- <el-row>
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
              </el-row> -->

              <!-- <el-row>
                <el-col :span="12">
                  <el-form-item label="招标人联系人：" prop="tenderFileTenderer">
                    <el-input
                      size="mini"
                      v-model="saveFileData.tenderFileTenderer"
                      style="width: 71%"
                    ></el-input>
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
                    <el-input
                      size="mini"
                      :disabled="true"
                      v-model.number="saveFileData.antiFraudPhone"
                      style="width: 71%"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="反舞弊举报受理邮箱：" prop="antiFraudEmail">
                    <el-input
                      size="mini"
                      :disabled="true"
                      v-model="saveFileData.antiFraudEmail"
                      style="width: 71%"
                    ></el-input>
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
                    <el-input
                      size="mini"
                      v-model="saveFileData.tenderTardinessFine"
                      style="width: 71%"
                    ></el-input>
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
                    <el-input
                      size="mini"
                      v-model="saveFileData.tenderWarrantyDate"
                      style="width: 71%"
                    ></el-input>
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
                    <el-input
                      size="mini"
                      v-model="saveFileData.tenderFileGuarantee"
                      style="width: 71%"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="招标文件：" :rules="[{ required: true, trigger: 'submit' }]">
                    <span
                      style="display:block;cursor: pointer;color: blue"
                      v-for="(item, index) in zbwjfileList"
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
    </div>
    <div v-if="!ifZhan">
      <div class="flowArea">
        <div class="flowTitle" @click="toggleArea('2')">
          <span>2</span>
          <p>投标候选人审定</p>
          <i v-if="showListIndex != 2" class="el-icon-arrow-right"></i>
          <i v-if="showListIndex == 2" class="el-icon-arrow-down"></i>
        </div>
        <div class="flowMain" v-if="showListIndex == 2">
          <div class="processTwo2">
            <h4 align="left" style="font-size: 13px;margin-left: 12px;line-height:42px;">投标候选人信息</h4>
            <el-table :data="candidateList" size="mini" border style="width: 100%">
              <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
              <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="supplierName"
                label="投标单位名称"
              ></el-table-column>
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="contactPerson"
                label="联系人"
              ></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="telephone" label="联系人方式"></el-table-column>
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="companyRankName"
                label="供应商星级"
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="flowArea">
        <div class="flowTitle" @click="toggleArea('3')">
          <span>3</span>
          <p>投标保证金缴纳</p>
          <i v-if="showListIndex != 3" class="el-icon-arrow-right"></i>
          <i v-if="showListIndex == 3" class="el-icon-arrow-down"></i>
        </div>
        <div class="flowMain" v-if="showListIndex == 3">
          <el-table :data="moneyDataList" size="mini" border style="width: 100%;margin-top: 12px;">
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
                  :disabled="true"
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
                  :disabled="true"
                  v-model="scope.row.TENDER_BAIL_CONFIRMATION_DESCRIPTION"
                  type="text"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="left" show-overflow-tooltip prop="file_code" label="附件信息">
              <template slot-scope="scope">
                <div v-for="(item, index) in scope.row.fileList" :key="index">
                  <a :href="item.FILEPRIVEW" target="_blank">{{item.name}}</a>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="true" align="center" label="保证金退回" width="140">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="backBail(scope.row)">退回信息</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
            <el-input
              :disabled="true"
              style="width: 170px;"
              v-model="backBailData.TENDER_BAIL_CONFIRMATION_AMOUNT"
            ></el-input>
          </el-form-item>
          <el-form-item label="退款时间" label-width="100px" style="float:left;width:50%;">
            <el-date-picker
              :disabled="true"
              v-model="backBailData.TENDER_BAIL_BACK_DATE"
              type="date"
              style="width: 170px;"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="相关附件" label-width="100px" style="float:left;">
            <div v-for="(item, index) in backBailData.BackFileList" :key="index">
              <a :href="item.FILEPRIVEW" target="_blank">{{item.name}}</a>
            </div>
          </el-form-item>
          <div style="clear:both"></div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="cancelBackBail">关闭</el-button>
        </div>
      </el-dialog>
      <div class="flowArea">
        <div class="flowTitle" @click="toggleArea('4')">
          <span>4</span>
          <p>招标文件答疑</p>
          <i v-if="showListIndex != 4" class="el-icon-arrow-right"></i>
          <i v-if="showListIndex == 4" class="el-icon-arrow-down"></i>
        </div>
        <div class="flowMain" v-if="showListIndex == 4">
          <el-table :data="answerFileList" size="mini" border style="width: 100%;margin-top: 12px;">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
            <el-table-column align="left" show-overflow-tooltip prop="file_code" label="附件名称">
              <!-- <el-input size="mini" type="file"></el-input> -->
              <template slot-scope="scope">
                <a :href="scope.row.uploadUrl" target="_blank">{{scope.row.fileName}}</a>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="fileSize"
              label="大小"
              width="180"
            ></el-table-column>
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
              <template slot-scope="scope">{{formatDate(scope.row.createdDate)}}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="flowArea">
        <div class="flowTitle" @click="toggleArea('5')">
          <span>5</span>
          <p>回标</p>
          <i v-if="showListIndex != 5" class="el-icon-arrow-right"></i>
          <i v-if="showListIndex == 5" class="el-icon-arrow-down"></i>
        </div>
        <div class="flowMain" v-if="showListIndex == 5">
          <el-table :data="ReturnList" size="mini" border style="width: 100%;margin-top: 12px;">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
            <el-table-column align="left" show-overflow-tooltip prop="supplierName" label="供方名称"></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="isSubmit"
              label="是否回标"
              width="180"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="tenderDate"
              label="回标时间"
              width="180"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="tenderSubmitIp"
              label="回标IP"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="technologyScore"
              label="技术标附件"
              width="180"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.technologyFileCode">已上传</span>
                <span v-if="!scope.row.technologyFileCode">暂无附件</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="businessScore"
              label="商务标附件"
              width="180"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.businessFileCode">已上传</span>
                <span v-if="!scope.row.businessFileCode">暂无附件</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="flowArea">
        <div class="flowTitle" @click="toggleArea('6')">
          <span>6</span>
          <p>开技术标</p>
          <i v-if="showListIndex != 6" class="el-icon-arrow-right"></i>
          <i v-if="showListIndex == 6" class="el-icon-arrow-down"></i>
        </div>
        <div class="flowMain" v-if="showListIndex == 6">
          <el-table :data="openJSList" size="mini" border style="width: 100%;margin-top: 12px;">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
            <el-table-column align="left" show-overflow-tooltip prop="supplierName" label="供方名称"></el-table-column>
            <el-table-column align="center" label="技术标附件">
              <template slot-scope="scope">
                <div v-if="scope.row.technologyFileCode">
                  <a :href="scope.row.technologyFileUrl" target="_blank">下载附件</a>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商务标附件">
              <template slot-scope="scope">
                <span v-if="scope.row.businessFileCode">已上传</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="createdDate" label="开标时间">
              <template slot-scope="scope">
                <span>{{formatDate(scope.row.createdDate)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="tenderStatus" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.tenderScheduleStatus == 'openEvaluationTechnical'">启动评技术标</span>
                <span v-if="scope.row.tenderScheduleStatus == 'tenderCompleteOpenTechnical'">完成开技术标</span>
                <span v-if="scope.row.tenderScheduleStatus == 'tenderOpenTechnical'">开技术标</span>
                <span v-if="scope.row.tenderScheduleStatus == 'tenderOverReturn'">完成回标</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="flowArea">
        <div class="flowTitle" @click="toggleArea('7')">
          <span>7</span>
          <p>评技术标</p>
          <i v-if="showListIndex != 7" class="el-icon-arrow-right"></i>
          <i v-if="showListIndex == 7" class="el-icon-arrow-down"></i>
        </div>
        <div class="flowMain" v-if="showListIndex == 7">
          <el-table
            :data="evaluationTechnicalList"
            size="mini"
            border
            style="width: 100%;margin-top: 12px;"
          >
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
            <el-table-column align="center" label="技术标评委" width="100">
              <template slot-scope="scope">
                <div>
                  <span v-if="pwShow(scope.row, scope.$index)">{{scope.row.TENDER_EVALUATION_NAME}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="ITEM_SCORE_NAME"
              label="评分维度"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="ITEM_SCORE_DETAIL"
              label="评分项目"
            ></el-table-column>
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
                      :disabled="true"
                      style="width: 60%;float:left;"
                      v-model="scope.row.valueArr[index]"
                      type="text"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
          </el-table>

          <h4 align="left" style="font-size: 13px;margin-left: 12px;line-height:42px;">疑问卷信息</h4>
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
                <el-radio :disabled="true" v-model="scope.row.isAsk" label="1">是</el-radio>
                <el-radio :disabled="true" v-model="scope.row.isAsk" label="2">否</el-radio>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="left" label="疑问卷上传">
              <template slot-scope="scope">
                <div class="ywj">
                  <div v-if="scope.row.isAsk == '1'">
                    <div v-for="(item, index) in scope.row.fileList" :key="index">
                      <a :href="item.FILEPRIVEW" target="_blank">{{item.FILE_NAME}}</a>
                    </div>
                  </div>
                  <span v-else>确认无任何疑问，进行下一环节。</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div>
            <h4 align="left" style="font-size: 13px;margin-left: 12px;line-height:42px;">技术标评委评分信息</h4>
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
          <el-row>
            <el-col :span="24">
              <h4 align="left" style="font-size: 13px;margin-left: 12px;line-height:42px;">技术标评标报告</h4>
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
        </div>
      </div>
      <div class="flowArea">
        <div class="flowTitle" @click="toggleArea('8')">
          <span>8</span>
          <p>开商务标</p>
          <i v-if="showListIndex != 8" class="el-icon-arrow-right"></i>
          <i v-if="showListIndex == 8" class="el-icon-arrow-down"></i>
        </div>
        <div class="flowMain" v-if="showListIndex == 8">
          <el-table :data="businessList" size="mini" border style="width: 100%;margin-top: 12px;">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="supplierName"
              label="供方名称"
              width="180"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="tenderQuotation"
              label="商务报价（含税 元）"
              width="180"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.tenderQuotation != 0">
                  <span v-if="!scope.row.ifHuiVal">****</span>
                  <span
                    :title="scope.row.tenderQuotationRemark"
                    v-if="scope.row.ifHuiVal"
                  >{{scope.row.tenderQuotation}}</span>
                </div>
                <div v-if="scope.row.tenderQuotation == 0">
                  <span>— {{scope.row.tenderQuotationRemark}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="quoteInputTax"
              label="商务报价进项税（元）"
              width="180"
            >
              <template slot-scope="scope">
                <span v-if="!scope.row.ifHuiVal">****</span>
                <span v-if="scope.row.ifHuiVal">{{scope.row.quoteInputTax}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip label="商务标附件" width="180">
              <template slot-scope="scope">
                <div v-if="!scope.row.ifHuiVal">
                  <span v-if="scope.row.businessFileCode">已上传</span>
                  <span v-if="!scope.row.businessFileCode">未上传附件</span>
                </div>
                <a v-if="scope.row.ifHuiVal" target="_blank" :href="scope.row.businessFileUrl">下载附件</a>
              </template>
            </el-table-column>

            <el-table-column align="center" show-overflow-tooltip prop="nodeName" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  :disabled="scope.row.ifHuiVal"
                  size="mini"
                  @click="openBuss(scope.row, scope.$index)"
                >开商务标</el-button>
              </template>
            </el-table-column>

            <el-table-column align="center" show-overflow-tooltip prop="nodeName" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  :disabled="!scope.row.ifHuiVal"
                  size="mini"
                  @click="showOut(scope.row, scope.$index)"
                >隐藏</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="flowArea">
        <div class="flowTitle" @click="toggleArea('9')">
          <span>9</span>
          <p>评商务标</p>
          <i v-if="showListIndex != 9" class="el-icon-arrow-right"></i>
          <i v-if="showListIndex == 9" class="el-icon-arrow-down"></i>
        </div>
        <div class="flowMain" v-if="showListIndex == 9">
          <div>
            <el-table
              :data="businessTableList"
              :row-key="getRowKeys"
              :expand-row-keys="expands"
              size="mini"
              border
              style="width: 100%;margin-top: 12px;"
            >
              <el-table-column type="expand" width="100" label="关闭或打开">
                <template slot-scope="scope">
                  <div v-if="suppListBj[scope.$index].length>1">
                    <el-row
                      style="line-height:32px;border: 1px solid #ebebeb; background: #f9f9f9;"
                    >
                      <el-col
                        style="border-right: 1px solid #ebebeb;text-align: right; padding-right:14px;"
                        :span="3"
                      >商务标报价轮次</el-col>
                      <el-col
                        style="border-right: 1px solid #ebebeb;padding-left:14px;"
                        :span="3"
                      >商务标报价</el-col>
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
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="SUPPLIER_NAME"
                label="投标候选人"
              ></el-table-column>
              <!-- <el-table-column align="center" show-overflow-tooltip prop="nodeName" label="是否废标"></el-table-column> -->
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="TECHNOLOGY_SCORE"
                label="技术标分数"
              ></el-table-column>
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
              <el-table-column align="center" label="商务报价进项税（元）">
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
            <h4 align="left" style="font-size: 13px;margin-left: 12px;line-height:42px;">评商务标信息</h4>
            <el-table :data="BusinessDataList" size="mini" border style="width: 100%">
              <!-- <el-table-column type="selection" width="55"></el-table-column> -->
              <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
              <el-table-column align="center" label="商务标评委" width="85">
                <template slot-scope="scope">
                  <div v-if="scope.row.TENDER_EVALUATION_NAME">
                    <span
                      v-if="pwShow(scope.row, scope.$index)"
                    >{{scope.row.TENDER_EVALUATION_NAME}}</span>
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
                show-overflow-tooltip
                min-width="150"
                :label="item[0]"
              >
                <template slot-scope="scope">
                  <el-form size="mini" :model="scope.row" label-width="10" class="demo-ruleForm">
                    <el-form-item
                      :rules="[
      { required: true, message: '请输入分值', trigger: 'blur' }]"
                      :prop="'valueArr.' + index"
                    >
                      <el-input
                        size="mini"
                        :disabled="true"
                        style="width: 60%;float:left;"
                        v-model="scope.row.valueArr[index]"
                        type="text"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
            </el-table>
            <h4 align="left" style="font-size: 13px;margin-left: 12px;line-height:42px;">疑问卷信息</h4>
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
                  <el-radio :disabled="true" v-model="scope.row.isAsk" label="1">是</el-radio>
                  <el-radio :disabled="true" v-model="scope.row.isAsk" label="2">否</el-radio>
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip align="left" label="疑问卷上传">
                <template slot-scope="scope">
                  <div class="ywj">
                    <div v-if="scope.row.isAsk == '1'">
                      <div v-for="(item, index) in scope.row.fileList" :key="index">
                        <a :href="item.FILEPRIVEW" target="_blank">{{item.FILE_NAME}}</a>
                      </div>
                    </div>
                    <span v-else>确认无任何疑问，进行下一环节。</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div>
              <h4 align="left" style="font-size: 13px;margin-left: 12px;line-height:42px;">商务标评委评分信息</h4>
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
          </div>
        </div>
      </div>
      <div class="flowArea">
        <div class="flowTitle" @click="toggleArea('10')">
          <span>10</span>
          <p>综合评标报告</p>
          <i v-if="showListIndex != 10" class="el-icon-arrow-right"></i>
          <i v-if="showListIndex == 10" class="el-icon-arrow-down"></i>
        </div>
        <div class="flowMain" v-if="showListIndex == 10">
          <el-row style="margin-top: 20px">
            <el-col align="right" :span="3" style="font-size:13px;">推荐中标人</el-col>
            <el-col :span="6" style="margin-left: 15px;">
              <el-select
                style="width:80%;float:left"
                v-model="tenderCandidateLineCode"
                size="mini"
                :disabled="true"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in lineList"
                  :key="item.tenderCandidateLineCode"
                  :label="item.supplierName"
                  :value="item.tenderCandidateLineCode"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px">
            <el-col align="right" :span="3" style="margin-top: 5px;font-size: 13px;">综合评标报告</el-col>
            <el-col :span="12" style="margin-left: 15px;margin-top: 4px;" align="left">
              <a :href="filePrivewShow(fileListReport[0])" target="_blank">{{fileNameShow(fileListReport[0])}}</a>
            </el-col>
          </el-row>
          <!-- <h4 align="left" style="font-size: 13px;margin-left: 12px">综合评标相关信息</h4> -->
          <el-table :data="cmList" style="width: 100%;margin-top: 12px;" size="small">
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
          <el-table :data="businessListReport" size="small" border style="margin-top: 20px;width:100%;">
            <el-table-column prop="SUPPLIER_NAME" label="投标供应商名称" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="1" label="首次投标报价(万元)"></el-table-column>
            <el-table-column align="center" prop="2" label="二次投标报价(万元)"></el-table-column>
            <el-table-column align="center" prop="3" label="最终洽商报价(万元)"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="flowArea">
        <div class="flowTitle" @click="toggleArea('11')">
          <span>11</span>
          <p>中标审定</p>
          <i v-if="showListIndex != 11" class="el-icon-arrow-right"></i>
          <i v-if="showListIndex == 11" class="el-icon-arrow-down"></i>
        </div>
        <div class="flowMain" v-if="showListIndex == 11">
          <div style="margin:15px 0;">
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
                  :disabled="true"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="拟竣工时间：" prop="age" style="width: 34%;margin:0;">
                <el-date-picker
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :disabled="true"
                  v-model="saveFileData.tenderWinEndDate"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="预计合同签订时间：" prop="age" style="width: 34%;margin:15px 0;">
                <el-date-picker
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :disabled="true"
                  v-model="saveFileData.contractSignDate"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item v-if="!ifZhan" style="width: 60%;margin:0;"></el-form-item>
              <el-form-item v-if="!ifZhan" label="推荐中标人：" style="width: 34%;margin:0;">
                <span>{{tjSupplierName}}</span>
              </el-form-item>
              <el-form-item v-if="!ifZhan" label="综合评标报告：" prop="age" style="width: 56%;margin:0;">
                <a
                  style="color:blue;"
                  :href="tenderCompiledReportPrivewUrl"
                  target="_blank"
                >{{tenderCompiledReportName}}</a>
              </el-form-item>
            </el-form>
          </div>
          <el-table v-if="ifZhan" :data="supplierData" size="mini" border style="width: 100%">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
            <el-table-column align="center" prop="supplierName" show-overflow-tooltip label="单位名称"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="nodeName" label="资质等级/品牌"></el-table-column>
            <el-table-column
              align="center"
              prop="tenderTargetAmount"
              show-overflow-tooltip
              label="中标金额(元)"
            >
            <template slot-scope="scope">
            <span
            :title="scope.row.tenderTargetAmountRemark"
              v-if="scope.row.tenderTargetAmount != 0"
            >{{scope.row.tenderTargetAmount}}</span>
            <span
              v-if="scope.row.tenderTargetAmount == 0"
            >— {{scope.row.tenderTargetAmountRemark}}</span>
          </template>
            </el-table-column>
          </el-table>
          <el-table v-if="!ifZhan" :data="supplierData" size="mini" border style="width: 100%">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="supplierName" label="单位名称"></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="nodeName"
              label="资质等级/品牌"
              width="180"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              prop="tenderBusinessQuotation"
              label="投标总金额（元）"
            >
            <template slot-scope="scope">
            <span
            :title="scope.row.tenderBusinessQuotationRemark"
              v-if="scope.row.tenderBusinessQuotation != 0 && scope.row.tenderBusinessQuotation"
            >{{scope.row.tenderBusinessQuotation}}</span>
            <span
              v-if="scope.row.tenderBusinessQuotation == 0 || !scope.row.tenderBusinessQuotation"
            >— {{scope.row.tenderBusinessQuotationRemark}}</span>
          </template>
            </el-table-column>
            <el-table-column
              width="80PX"
              show-overflow-tooltip
              prop="compiledReportScore"
              label="评标得分"
            >
            <template slot-scope="scope">
              {{Number(scope.row.compiledReportScore).toFixed(2)}}
            </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="tenderTargetAmount"
              show-overflow-tooltip
              label="中标金额(元)"
            >
            <template slot-scope="scope">
            <span
            :title="scope.row.tenderTargetAmountRemark"
              v-if="scope.row.tenderTargetAmount != 0"
            >{{scope.row.tenderTargetAmount}}</span>
            <span
              v-if="scope.row.tenderTargetAmount == 0"
            >— {{scope.row.tenderTargetAmountRemark}}</span>
          </template>
          </el-table-column>
            <el-table-column
              align="center"
              prop="tenderTargetRem"
              show-overflow-tooltip
              label="综合排名"
            ></el-table-column>
          </el-table>
          <el-row style="margin-top:15px;"></el-row>
          <el-row style="margin-top: 12px;" class="fj" v-if="ifZhan">
            <el-col :span="2" align="left">
              <span style="margin-top: 12px;font-size:14px;">战略协议</span>
            </el-col>
            <el-col :span="8" align="left">
              <a
                style="color:blue;font-size:14px;"
                :href="supplierData[0].strategicAgreementFileUrl"
                target="_blank"
              >{{supplierData[0].strategicAgreementFileName}}</a>
            </el-col>
          </el-row>
          <el-row style="margin-top: 12px;" class="fj">
            <el-col :span="2" align="left">
              <span style="margin-top: 12px;font-size:14px;">中标通知书</span>
            </el-col>
            <el-col :span="8" align="left">
              <a
                style="color:blue;font-size:14px;"
                :href="tenderWinFileUrl"
                target="_blank"
              >{{tenderWinFileName}}</a>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div class="flowArea" v-if="ifZhan">
      <div class="flowTitle" @click="toggleArea('11')">
        <span>2</span>
        <p>中标审定</p>
        <i v-if="showListIndex != 11" class="el-icon-arrow-right"></i>
        <i v-if="showListIndex == 11" class="el-icon-arrow-down"></i>
      </div>
      <div class="flowMain" v-if="showListIndex == 11">
        <div style="margin:15px 0;">
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
                :disabled="true"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="拟竣工时间：" prop="age" style="width: 34%;margin:0;">
              <el-date-picker
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="true"
                v-model="saveFileData.tenderWinEndDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="预计合同签订时间：" prop="age" style="width: 34%;margin:15px 0;">
              <el-date-picker
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="true"
                v-model="saveFileData.contractSignDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item v-if="!ifZhan" style="width: 60%;margin:0;"></el-form-item>
            <el-form-item v-if="!ifZhan" label="推荐中标人：" style="width: 34%;margin:0;">
              <span>{{tjSupplierName}}</span>
            </el-form-item>
            <el-form-item v-if="!ifZhan" label="综合评标报告：" prop="age" style="width: 56%;margin:0;">
              <a
                style="color:blue;"
                :href="tenderCompiledReportPrivewUrl"
                target="_blank"
              >{{tenderCompiledReportName}}</a>
            </el-form-item>
          </el-form>
        </div>
        <el-table v-if="ifZhan" :data="supplierData" size="mini" border style="width: 100%">
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
          <el-table-column align="center" prop="supplierName" show-overflow-tooltip label="单位名称"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="nodeName" label="资质等级/品牌"></el-table-column>
          <el-table-column
            align="center"
            prop="tenderTargetAmount"
            show-overflow-tooltip
            label="中标金额(元)"
          >
            <template slot-scope="scope">
            <span
            :title="scope.row.tenderTargetAmountRemark"
              v-if="scope.row.tenderTargetAmount != 0"
            >{{scope.row.tenderTargetAmount}}</span>
            <span
              v-if="scope.row.tenderTargetAmount == 0"
            >— {{scope.row.tenderTargetAmountRemark}}</span>
          </template>
          </el-table-column>
        </el-table>
        <el-table v-if="!ifZhan" :data="supplierData" size="mini" border style="width: 100%">
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="supplierName" label="单位名称"></el-table-column>
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="nodeName"
            label="资质等级/品牌"
            width="180"
          ></el-table-column>
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="tenderBusinessQuotation"
            label="投标总金额（元）"
          >
            <template slot-scope="scope">
            <span
            :title="scope.row.tenderBusinessQuotationRemark"
              v-if="scope.row.tenderBusinessQuotation != 0 && scope.row.tenderBusinessQuotation"
            >{{scope.row.tenderBusinessQuotation}}</span>
            <span
              v-if="scope.row.tenderBusinessQuotation == 0 || !scope.row.tenderBusinessQuotation"
            >— {{scope.row.tenderBusinessQuotationRemark}}</span>
          </template>
          </el-table-column>
          <el-table-column
            width="80PX"
            show-overflow-tooltip
            prop="compiledReportScore"
            label="评标得分"
          >
            <template slot-scope="scope">
              {{Number(scope.row.compiledReportScore).toFixed(2)}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="tenderTargetAmount"
            show-overflow-tooltip
            label="中标金额(元)"
          ></el-table-column>
          <el-table-column align="center" prop="tenderTargetRem" show-overflow-tooltip label="综合排名"></el-table-column>
        </el-table>
        <el-row style="margin-top:15px;"></el-row>
        <el-row style="margin-top: 12px;" class="fj" v-if="ifZhan">
          <el-col :span="2" align="left">
            <span style="margin-top: 12px;font-size:14px;">战略协议</span>
          </el-col>
          <el-col :span="8" align="left">
            <a
              style="color:blue;font-size:14px;"
              :href="supplierData[0].strategicAgreementFileUrl"
              target="_blank"
            >{{supplierData[0].strategicAgreementFileName}}</a>
          </el-col>
        </el-row>
        <el-row style="margin-top: 12px;" class="fj">
          <el-col :span="2" align="left">
            <span style="margin-top: 12px;font-size:14px;">中标通知书</span>
          </el-col>
          <el-col :span="8" align="left">
            <a
              style="color:blue;font-size:14px;"
              :href="tenderWinFileUrl"
              target="_blank"
            >{{tenderWinFileName}}</a>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
import Vue from "vue";
import base from "@/api/base";
export default {
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
        supplierCode: "",
        enderFilePrepayments: "",
        tenderWarrantyDate: "",
        tenderWarrantyAmount: "",
        tenderTardinessFine: "",
        tenderFileGuarantee: ""
      },
      zbwjfileList: [],
      supplierData: [],
      tjSupplierName: "",
      tenderCompiledReportPrivewUrl: "",
      tenderCompiledReportName: "",
      tenderWinFileUrl: "",
      tenderWinFileName: "",
      bidInfo: {
        tenderName: "",
        tenderNumber: ""
      },
      tenderWinCode: "",
      bidWinPeople: "",
      ifZhan: false,
      headCode: "",
      request1: 0,
      showListIndex: 11,

      saveTenderEvaluationTechnicalData: {
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

      candidateList: [], // 显示出来的
      processTwoInfo: {},

      // 保证金
      backBailShow: false,
      backBailData: {
        TENDER_BAIL_CONFIRMATION_AMOUNT: "",
        TENDER_BAIL_BACK_DATE: ""
      },
      moneyDataList: [],

      // 发标
      bidIssuing: {},
      // 答疑
      answerFileList: [],
      // 回标
      ReturnList: [],
      // 开技术标
      openJSList: [],
      // 评技术标
      listS: [],
      evaluationTechnicalList: [],
      suppList: [],
      allScore: [],
      allScoreList: [],
      fileListAsk: [],
      // 开商务标
      businessList: [],
      // 评商务标
      businessTableList: [],
      getRowKeys(row) {
        return row.TENDER_CANDIDATE_LINE_CODE;
      },
      BusinessDataList: [],
      expands: [],
      // 综合评标报告
      cmList: [],
      tenderCandidateLineCode: "",
      businessListReport: [],
      swName: [],
      jsName: [],
      bidPeopleList: [],
      lineList: [],
      fileListReport: [],

      // 审定code
      tenderApproveCode: "",
      tenderFileApproveCode: "",
      tenderCandidateApproveCode: ""
    };
  },
  mounted() {
    var urlV = window.location.href;
    var pathS = urlV.indexOf("headCode=");
    if (pathS != -1) {
      this.headCode = urlV.substring(pathS + 9, urlV.length);
    } else {
      this.$message.error('数据有误，请核实后重新进入页面！');
      this.headCode = "7eb1beac-cd9b-48a8-962b-6e147baa6a34";
      // return false;
    }
    this.getWinByCode(this.headCode);
  },
  methods: {
    filePrivewShow(row){
      if(row){
        return row.filePrivew;
      } else {
        return '';
      }
    },
    fileNameShow(row){
      if(row){
        return row.name;
      } else {
        return '';
      }
    },
    toApprove1() {
      var url = base.approveUrl + this.tenderApproveCode;
      window.open(url);
    },
    toApprove2() {
      var url = base.approveUrl + this.tenderFileApproveCode;
      window.open(url);
    },
    toApprove3() {
      var url = base.approveUrl + this.tenderCandidateApproveCode;
      window.open(url);
    },
    // 保证金退回相关信息
    cancelBackBail() {
      this.backBailShow = false;
      this.backBailData = {
        TENDER_BAIL_CONFIRMATION_AMOUNT: "",
        TENDER_BAIL_BACK_DATE: "",
        BackFileList: []
      };
    },
    // 保证金退回
    backBail(row) {
      this.backBailShow = true;
      this.backBailData.SUPPLIER_NAME = row.SUPPLIER_NAME;
      this.saveFileData.headCode = row.TENDER_BAIL_CODE;
      var params = {
        tenderBailCode: row.TENDER_BAIL_CODE
      };
      this.$api.modular.getWinByTenderBailBack(params).then(res => {
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
    returnNM(NM) {
      var arr = NM.split(":");
      return arr[2];
    },
    // 日期换算
    formatDate(date) {
      return this.commonFn.formatDate(date);
    },
    toggleArea(from) {
      if (from != this.showListIndex) {
        this.showListIndex = from;
      } else {
        this.showListIndex = 0;
      }
      if (from == "1") {
        this.getWinByTenderFile(this.headCode);
      }
      if (from == "2") {
        this.getWinByCandidate(this.headCode);
      }
      if (from == "3") {
        this.getWinByBail();
      }
      if (from == "4") {
        this.getWinByAnswer();
      }
      if (from == "5") {
        this.getWinByReturn();
      }
      if (from == "6") {
        this.getWinByOpenTechnical();
      }
      if (from == "7") {
        this.getWinByEvaluationTechnical();
      }
      if (from == "8") {
        this.getWinByOpenBusiness();
      }
      if (from == "9") {
        this.getWinByEvaluationBusiness();
      }
      if (from == "10") {
        this.getWinByCompiledReport();
      }
      if (from == "11") {
        this.getWinByCode(this.headCode);
      }
    },
    lookFile(item) {
      window.open(item.filePrivew, "_blank");
    },
    // 查询赋值
    getWinByTenderFile(headCode) {
      var params = {
        headCode: headCode
      };
      this.$api.modular.getWinByTenderFile(params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            if (res.data.data.length > 0) {
              this.saveFileData = res.data.data[0];
              this.zbwjfileList = [];
              if (this.saveFileData.releaseFileName) {
                this.zbwjfileList.push({
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

              var procurementExecutve = this.saveFileData.procurementExecutve.split(
                ":"
              );
              this.saveFileData.procurementExecutveName =
                procurementExecutve[2];

              var technicalLeader = this.saveFileData.technicalLeader.split(
                ":"
              );
              this.saveFileData.technicalLeaderName = technicalLeader[2];

              var technicalMemberArr = this.saveFileData.technicalMember.split(
                ","
              );
              var nameArr_T = [];
              for (var t = 0; t < technicalMemberArr.length; t++) {
                nameArr_T.push(technicalMemberArr[t].split(":")[2]);
              }
              this.saveFileData.technicalMemberName = nameArr_T.join(",");

              var economicLeader = this.saveFileData.economicLeader.split(":");
              this.saveFileData.economicLeaderName = economicLeader[2];
              var economicMemberArr = this.saveFileData.economicMember.split(
                ","
              );
              var nameArr_A = [];
              for (var a = 0; a < economicMemberArr.length; a++) {
                nameArr_A.push(economicMemberArr[a].split(":")[2]);
              }
              this.saveFileData.economicMemberName = nameArr_A.join(",");
            }
          } else {
            this.$message.error(res.data.message);
            return false;
          }
        }
      });
    },
    getWinByCandidate(headCode) {
      var params = {
        headCode: headCode
      };
      this.$api.modular.getWinByCandidate(params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.candidateList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
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
    // 保证金获取列表
    getWinByBail() {
      var that = this;
      var params = {
        headCode: this.headCode
      };
      this.$api.modular.getWinByBail(params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            if (res.data.data.length > 0) {
              that.moneyDataList.push(res.data.data[0]);
              if (res.data.data[0].FILE_CODE) {
                that.moneyDataList[0].fileList = [];
                if (that.moneyDataList[0].FILE_CODE) {
                  let arr0 = that.moneyDataList[0].FILE_CODE.split(",");
                  that.moneyDataList[0].fileList.push({
                    name: res.data.data[0].FILE_NAME,
                    FILE_CODE: arr0[0],
                    FILEPRIVEW: res.data.data[0].FILEPRIVEW
                  });
                }
              }
            }
            var s = 0;
            var codeIndex = 0;
            for (var i = 0; i < res.data.data.length; i++) {
              if (i == res.data.data.length - 1) {
                return false;
              }
              if (
                res.data.data[i].SUPPLIER_CODE !=
                res.data.data[i + 1].SUPPLIER_CODE
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
          } else {
            this.$message.error(res.data.message);
            return false;
          }
        }
      });
    },
    // 答疑获取列表
    getWinByAnswer() {
      var params = {
        headCode: this.headCode
      };
      this.$api.modular.getWinByAnswer(params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.answerFileList = res.data.data;
            for (var i = 0; i < this.answerFileList.length; i++) {
              this.answerFileList[i].fileList = [];
              this.answerFileList[i].fileList.push(res.data.data[i]);
              this.answerFileList[i].name = res.data.data[i].fileName;
            }
          } else {
            this.$message.error(res.data.message);
            return false;
          }
        }
      });
    },
    // 回标获取列表
    getWinByReturn() {
      var params = {
        headCode: this.headCode
      };
      this.$api.modular.getWinByReturn(params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            if (res.data.data.length > 0) {
              for (var i = 0; i < res.data.data.length; i++) {
                res.data.data[i].tenderDate = this.commonFn.formatDate(
                  res.data.data[i].tenderDate
                );
              }
            }
            this.ReturnList = res.data.data;
          } else {
            this.$message.error(res.data.message);
            return false;
          }
        }
      });
    },
    // 开技术标获取列表
    getWinByOpenTechnical() {
      var params = {
        headCode: this.headCode
      };
      this.$api.modular.getWinByOpenTechnical(params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.openJSList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 评技术标信息
    getWinByEvaluationTechnical() {
      var params = {
        headCode: this.headCode
      };
      this.$api.modular.getWinByEvaluationTechnical(params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            if (res.data.data.length > 1) {
              if (res.data.data[res.data.data.length - 1].fileList) {
                this.fileDataChuLi(
                  res.data.data[res.data.data.length - 1].fileList
                );
              }
              this.dataChuli(res.data.data);
            }
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 数据处理
    dataChuli(data) {
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
              var arr = data[
                len - 1
              ].tenderEvaluationReport[0].evaluationReportYes.split(",");
              var arr2 = [];
              var arr3 = data[
                len - 1
              ].tenderEvaluationReport[0].supplierIntroduce.split(",");
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
            this.saveTenderEvaluationTechnicalData.tenderOverview =
              data[len - 1].tenderFile[0].tenderFileContent;
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
      this.suppList = [];
      for (var s = 0; s < arr.length; s++) {
        var liArr = arr[s].replace(reg, "").split("_");
        this.suppList.push(liArr);
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
    // 商务标数据处理
    fileDataChuLiSW(data) {
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
    allScoreFnSW(data) {
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
    dataChuliSW(data) {
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
      this.suppList = [];
      for (var s = 0; s < arr.length; s++) {
        var liArr = arr[s].replace(reg, "").split("_");
        // if ((type = "report")) {
        //   liArr.push({
        //     isHege: "1",
        //     isAsk: "1",
        //     fileList: []
        //   });
        // }
        this.suppList.push(liArr);
      }
      var dataNew = data;
      if (len == data.length) {
        dataNew = data;
      } else {
        dataNew.splice(len, 1);
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
    
    showTitle(item, type) {
      if (item.length > 2) {
        if (item[type][2]) {
          return item[type][2];
        } else {
          return "";
        }
      } else {
        return '';
      }
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
        for(var i in this.suppListBj){
          var sp = 0;
          for(var i2 in this.suppListBj[i]){
            if(this.suppListBj[i][i2][0][2] == '' && this.suppListBj[i][i2][2][2] == ''){
              sp++;
            }
          }
          if(sp>0){
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
    // 开商务标列表
    getWinByOpenBusiness() {
      var params = {
        headCode: this.headCode
      };
      this.$api.modular.getWinByOpenBusiness(params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            if (res.data.data.length > 0) {
              for (var i = 0; i < res.data.data.length; i++) {
                res.data.data[i].ifHuiVal = false;
              }
              this.businessList = res.data.data;
            } else {
              this.businessList = [];
            }
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 评商务标
    getWinByEvaluationBusiness() {
      var params = {
        headCode: this.headCode
      };
      // return false
      this.$api.modular.getWinByEvaluationBusiness(params).then(res => {
        if (res.status == 200) {
          if (!res.data.returnCode) {
            if (res.data.data.BusinessData.length > 0) {
              this.dataChuliSW(res.data.data.BusinessData);
            }
            if (res.data.data.EvaluationData.length > 0) {
              this.dataHandle(res.data.data.EvaluationData);
            }
            if (res.data.data.allScore.length > 0) {
              this.allScoreFnSW(res.data.data.allScore);
            }
            if (res.data.data.fileList.length > 0) {
              this.fileDataChuLiSW(res.data.data.fileList);
            }
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 综合评标报告
    getWinByCompiledReport() {
      var params = {
        headCode: this.headCode
      };
      this.$api.modular.getWinByCompiledReport(params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.lineList = res.data.data.linList;
            if (res.data.data.fileName) {
              this.fileListReport.push({
                name: res.data.data.fileName,
                fileUrl: res.data.data.fileUrl,
                serviceFileCode: res.data.data.serviceFileCode,
                filePrivew: res.data.data.filePrivew
              });
            } else {
              this.fileListReport = [];
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

    businessListFn(array) {
      var key1 = 1;
      var key2 = 2;
      var key3 = 3;
      for (var i = 0; i < array.length; i++) {
        var len = Object.getOwnPropertyNames(array[i]).length - 1;
        for (var l = 1; l < len + 1; l++) {
          if (array[i][l] == 0) {
            var key = l + "_REMARK";
            array[i][l] = "— " + array[i][key];
          }
        }
        for(var s = len; s > 0; s--){
          if(array[i][s] != null){
            array[i][key3] = array[i][s];
            break;
          }
        }
      }
      this.businessListReport = array;
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
    // 勘探时间
    pickerFn(v) {
      this.saveFileData.prospectingBeginDate = this.saveFileData.yearDate[0];
      this.saveFileData.prospectingEndDate = this.saveFileData.yearDate[1];
    },
    getWinByCode(headCode) {
      var params = {
        headCode: headCode
      };
      this.$api.modular.getWinByCode(params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.tjSupplierName = res.data.data.list[0].tjSupplierName;
            this.tenderCompiledReportPrivewUrl =
              res.data.data.list[0].tenderCompiledReportPrivewUrl;
            this.tenderCompiledReportName =
              res.data.data.list[0].tenderCompiledReportName;
            this.tenderWinFileUrl = res.data.data.list[0].tenderWinFileUrl;
            this.tenderWinFileName = res.data.data.list[0].tenderWinFileName;

            if (
              res.data.data.list[0].tenderType == "1" ||
              res.data.data.list[0].tenderType == "2"
            ) {
              this.ifZhan = true;
            } else {
              this.ifZhan = false;
            }
            if (res.data.data.list[0].tenderWinStartDate) {
              this.saveFileData.tenderWinStartDate = this.commonFn.formatDate(
                res.data.data.list[0].tenderWinStartDate
              );
            }
            if (res.data.data.list[0].tenderWinEndDate) {
              this.saveFileData.tenderWinEndDate = this.commonFn.formatDate(
                res.data.data.list[0].tenderWinEndDate
              );
            }
            if (res.data.data.list[0].contractSignDate) {
              this.saveFileData.contractSignDate = this.commonFn.formatDate(
                res.data.data.list[0].contractSignDate
              );
            }
            this.supplierData = res.data.data.list;
            this.tenderApproveCode = res.data.data.tenderApproveCode;
            this.tenderFileApproveCode = res.data.data.tenderFileApproveCode;
            this.tenderCandidateApproveCode =
              res.data.data.tenderCandidateApproveCode;
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // previewFn(value) {
    //   window.open(value.FILEURL);
    // },

    previewFn(value) {
      window.open(value.fileUrl);
    },

    openBuss(row, index) {
      this.businessList[index].ifHuiVal = true;
    },
    showOut(row, index) {
      this.businessList[index].ifHuiVal = false;
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
    zuzhimp(e) {
      e.stopPropagation();
    }
  }
};
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
.process1 h3 {
  font-size: 14px;
  text-align: left;
  background-color: #ececec;
  padding: 10px 20px;
  margin: 14px 0;
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

<style>
.flowArea {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}
.flowTitle {
  width: 100%;
  height: 40px;
  background: rgba(0, 0, 0, 0.03);
}
.flowTitle span {
  font-size: 12px;
  color: #67c23a;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  line-height: 20px;
  border: 1px solid #67c23a;
  float: left;
  margin-top: 8px;
  margin-left: 10px;
}
.flowTitle p {
  font-size: 14px;
  color: #666;
  margin: 0;
  float: left;
  line-height: 40px;
  margin-left: 6px;
}
.flowTitle i {
  float: right;
  color: #666;
  line-height: 40px;
  margin-right: 10px;
}
.flowMain {
  width: 100%;
}
.flowTitle:hover {
  cursor: pointer;
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
.linkLook:hover {
  cursor: pointer;
}
</style>
