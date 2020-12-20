<template>
  <div class="addSheet" v-if="addSheetObj.isShow">
    <related-items ref="related_items" :relatedItems="relatedItems" @setItemName="setItemName"></related-items>
    <subject-json
      ref="related_items"
      :subjectJsonData="subjectJsonData"
      @subjectJsonFn="subjectJsonFn"
    ></subject-json>
    <levelCode-name :levelCodeName="levelCodeName" @levelCodeNameFn="levelCodeNameFn"></levelCode-name>
    <el-dialog
      :title="sheetName"
      :visible.sync="addSheetObj.isShow"
      width="1100px"
      top="2vh"
      :close-on-click-modal="false"
      append-to-body
      @close="cancelFn"
      show-close
    >
      <div class="addSheetMain">
        <el-form
          :model="planCodeData"
          ref="planCodeDatas"
          v-if="addSheetObj.isShow"
          :disabled="ifLook"
          :rules="addSheetRules"
          :inline-message="true"
          label-width="170px"
        >
          <el-row class="base-form">
            <el-col :span="8">
              <el-form-item label="关联项目：" prop="tenderProjectName">
                <el-input
                  class="xl el-input--mini"
                  maxlength="0"
                  @focus="showTree"
                  :disabled="nanTest(this.itemInfo.projectCode)"
                  readonly
                  :title="planCodeData.tenderProjectName"
                  placeholder="请点选"
                  v-model="planCodeData.tenderProjectName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="招标名称：" prop="tenderName">
                <el-input
                  size="mini"
                  maxlength="50"
                  class="widthseven"
                  placeholder="请输入招标名称"
                  :title="planCodeData.tenderName"
                  v-model="planCodeData.tenderName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="招采方式：" prop="tenderType">
                <el-select
                  clearable
                  size="mini"
                  placeholder="请选择"
                  v-model="planCodeData.tenderType"
                  class="widthseven"
                >
                  <el-option
                    v-for="item in tenderTypeList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="一级分项：" id="myPanel2" class="noMarginBottom" prop="levelOneName">
                <el-input
                  class="xl el-input--mini"
                  @focus="showLevelShow"
                  clearable
                  :readonly="true"
                  v-model="planCodeData.levelOneName"
                  placeholder="请点选"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="二级分项：" class="noMarginBottom" prop="levelTwoName">
                <el-input
                  size="mini"
                  class="widthseven"
                  :readonly="true"
                  v-model="planCodeData.levelTwoName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="三级分项：" class="noMarginBottom">
                <div>
                  <el-input
                    size="mini"
                    class="widthseven"
                    :readonly="true"
                    v-model="planCodeData.levelThreeName"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="采购预算月份：" prop="budgetMonthArr">
                <div
                  class="selDiv"
                  v-on:mouseenter="mothHover"
                  v-on:mouseleave="mothLeave"
                  style="position: relative;width: 78%;float:left"
                >
                  <div
                    class="showDiv"
                    :style="{width: ifHoverWidth}"
                    v-if="ifHover"
                  >{{budgetMonthArrFn()}}</div>
                  <el-select
                    size="mini"
                    clearable
                    multiple
                    collapse-tags
                    style="width:100%!important"
                    @change="choseMonth"
                    v-model="planCodeData.budgetMonthArr"
                    placeholder="请选择"
                    class="widthseven"
                  >
                    <el-option
                      v-for="item in monthsList"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预算额：" prop="budgetAmount">
                <el-input
                  size="small"
                  clearable
                  maxlength="20"
                  class="widthseven"
                  placeholder="预算额"
                  v-model="planCodeData.budgetAmount"
                ></el-input>
                <!-- <span>{{moneyUnit}}</span> -->
                <span>元</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预算科目：" prop="subjectCode">
                <el-input
                  class="xl el-input--mini"
                  maxlength="0"
                  @focus="showTreeSub"
                  readonly
                  placeholder="请点选"
                  v-model="planCodeData.subjectName"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="采购启动时间：" class="noMarginBottom">
                <el-date-picker
                  v-model="planCodeData.procurementDate"
                  class="widthseven"
                  size="mini"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="技术要求提供时间：" class="noMarginBottom" prop="technicalDate">
                <el-date-picker
                  v-model="planCodeData.technicalDate"
                  class="widthseven"
                  size="mini"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计划定标时间：" class="noMarginBottom" prop="planTargetDate">
                <el-date-picker
                  v-model="planCodeData.planTargetDate"
                  class="widthseven"
                  size="mini"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="要求进场时间：" class="noMarginBottom">
                <el-date-picker
                  v-model="planCodeData.arrivalDate"
                  class="widthseven"
                  size="mini"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设计图纸提供时间：" class="noMarginBottom" prop="designDrawingsDate">
                <el-date-picker
                  v-model="planCodeData.designDrawingsDate"
                  class="widthseven"
                  size="mini"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预计合同签订：" class="noMarginBottom" prop="signContractDate">
                <el-date-picker
                  v-model="planCodeData.signContractDate"
                  class="widthseven"
                  size="mini"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="招标类别：" prop="itemScoreCode">
                <el-select
                  clearable
                  size="mini"
                  placeholder="请选择"
                  v-model="planCodeData.itemScoreCode"
                  class="widthseven"
                >
                  <el-option
                    v-for="item in pfItem"
                    :key="item.itemScoreCode"
                    :label="item.itemScoreName"
                    :value="item.itemScoreCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="预算年份：" prop="yearDate">
                <el-date-picker
                  v-model="yearDate"
                  type="daterange"
                  size="mini"
                  :clearable="false"
                  unlink-panels
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @blur="pickerFn"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="合同范围及经济需求：" style="position: relative;" class="noMarginBottom" prop="contractDemand">
                <el-input
                  type="textarea"
                  style="margin: 10px 0;"
                  @input="descInput(1)"
                  class="width-half"
                  v-model="planCodeData.contractDemand"
                ></el-input>
                <!-- <span class="numberV">{{contractDemandLength}}</span> -->
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="技术需求和管理需求：" style="position: relative;" class="noMarginBottom" prop="manageDemand">
                <el-input
                  type="textarea"
                  style="margin: 10px 0;"
                  @input="descInput(2)"
                  class="width-half"
                  v-model="planCodeData.manageDemand"
                ></el-input>
                <!-- <span class="numberV">{{manageDemandLength}}/500</span> -->
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="备注：" style="position: relative;" class="noMarginBottom">
                <el-input
                  type="textarea"
                  style="margin: 10px 0;"
                  clearable
                  @input="descInput(3)"
                  maxlength="200"
                  v-model="planCodeData.tenderRemark"
                ></el-input>
                <span class="numberV2">{{tenderRemarkLength}}/200</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="合约形式：">
                <el-select
                  clearable
                  style="width:300px!important;"
                  size="mini"
                  placeholder="请选择"
                  v-model="planCodeData.contractType"
                >
                  <el-option
                    v-for="item in contractType"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelFn">取 消</el-button>
        <el-button size="mini" :disabled="ifLook" type="primary" @click="sureFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import Vue from "vue";
export default Vue.component("add-sheet", {
  props: {
    addSheetObj: {
      type: Object,
      default: {
        isShow: false,
        type: ""
      }
    },
    itemInfo: {
      type: Object,
      default: {}
    },
    tenderCode: {
      type: Object,
      default: {}
    }
  },
  watch: {
    addSheetObj: {
      handler(newVal, oldVal) {
        if (newVal.isShow) {
          this.moneyUnit = newVal.moneyUnit;
          this.SprojectCode = this.itemInfo.projectCode;
          if (newVal.type == "add") {
            this.ifLook = false;
            this.getItemScore();
            this.planCodeData = this.planCodeDataDef;
            this.planCodeData.planCode = this.itemInfo.planCode;
            this.planCodeData.tenderProjectCode = this.itemInfo.projectCode;
            this.planCodeData.tenderProjectName = this.itemInfo.projectName;
            this.relatedItems.costCenterCode = this.itemInfo.projectCode;
            var nowDate = new Date();
            var nowYear = Number(nowDate.getFullYear());
            this.yearDate = [
              nowYear + 1 + "-01-01",
              nowYear + 1 + "-12-31"
            ];
            this.planCodeData.budgetYear =
              this.yearDate[0] +
              "~" +
              this.yearDate[1];
              
          } else if (newVal.type == "change") {
            this.getItemScore();
            this.ifLook = false;
            this.sheetName = "修改招标项";
            this.planCodeDataDef.tenderProjectName = this.tenderCode.tenderProjectName;
            this.planCodeDataDef.levelOneName = this.tenderCode.levelOneName;
            this.planCodeDataDef.levelTwoName = this.tenderCode.levelTwoName;
            this.planCodeDataDef.levelThreeName = this.tenderCode.levelThreeName;
            this.searchChangeInfo(
              this.sso_sessionid,
              this.tenderCode.tenderCode
            );
          } else if (newVal.type == "look") {
            this.getItemScoreLook();
            this.sheetName = "查看招标项信息";
            this.ifLook = true;
            // this.planCodeDataDef.tenderProjectName = this.tenderCode.tenderProjectName;
            // this.planCodeDataDef.levelOneName = this.tenderCode.levelOneName;
            // this.planCodeDataDef.levelTwoName = this.tenderCode.levelTwoName;
            // this.planCodeDataDef.levelThreeName = this.tenderCode.levelThreeName;
            var code = this.tenderCode.tenderCode;
            this.searchChangeInfoOut(code);
          }
        }
      },
      deep: true
    }
  },
  data() {
    var requiredFn = (rule, value, callback) => {
      if (!value) {
        this.$message.error("不能为空！");
        return callback(new Error());
        return false;
      }
    };
    var moneyRule = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("必填"));
      } else {
        if (isNaN(Number(value))) {
          return callback(new Error("数字"));
        } else {
          var str = value.toString();
          var index = str.indexOf(".");
          if (index != -1) {
            var v = str.substring(index + 1, str.length);
            if (v.length > 2) {
              return callback(new Error("数字"));
            } else {
              callback();
            }
          } else {
            callback();
          }
        }
      }
    };
    return {
      contractDemandLength: 0,
      manageDemandLength: 0,
      tenderRemarkLength: 0,
      SprojectCode: "",
      ifLook: false,
      pfItem: [],
      moneyUnit: "",
      yearDate: [],
      planCodeData: {},
      planCodeDataDef: {
        planCode: "", // 招标计划申请表
        tenderProjectCode: "900108", //招标项目
        tenderProjectName: "", //招标项目
        moneyUnit: "", //货币单位
        tenderType: "", //招标方式
        levelOne: "", //1级分项
        levelOneName: "",
        tenderName: "", //招标名称
        subjectCode: "", //预算科目
        subjectName: "",
        levelTwo: "", //2级分项
        levelTwoName: "",
        levelThree: "", //三级分项
        levelThreeName: "",
        budgetMonth: "", //预算月份
        budgetMonthArr: [],
        budgetAmount: "", //预算额
        budgetYear: "", //预算年份
        arrivalDate: "", //要求进场时间
        technicalDate: "", //技术要求提供时间
        planTargetDate: "", //计划定标时间
        procurementDate: "", //采购启动时间
        designDrawingsDate: "", //设计图纸提供时间
        signContractDate: "", //预算合同签订时间
        contractDemand: "", //合同范围及经纪需求
        manageDemand: "", //技术需求及管理需求
        tenderRemark: "", //备注
        contractType: "", //合约形式
      },
      ifHover: false,
      ifHoverWidth: 0,
      relatedItems: {
        isShow: false,
        currentKey: "",
        costCenterCode: "",
        type: "only"
      },
      subjectJsonData: {
        isShow: false,
        projectCode: ""
      },
      projectInfo: {},
      levelCodeName: {
        isShow: false
      },
      monthsList: [
        {
          label: "1月",
          id: "1"
        },
        {
          label: "2月",
          id: "2"
        },
        {
          label: "3月",
          id: "3"
        },
        {
          label: "4月",
          id: "4"
        },
        {
          label: "5月",
          id: "5"
        },
        {
          label: "6月",
          id: "6"
        },
        {
          label: "7月",
          id: "7"
        },
        {
          label: "8月",
          id: "8"
        },
        {
          label: "9月",
          id: "9"
        },
        {
          label: "10月",
          id: "10"
        },
        {
          label: "11月",
          id: "11"
        },
        {
          label: "12月",
          id: "12"
        }
      ],
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
      contractType: [
        {
          label: "总价包干",
          id: "1"
        },
        {
          label: "固定单价",
          id: "2"
        }
      ],
      sheetName: "添加招标项",
      sso_sessionid: this.$store.state.sso_sessionid,

      addSheetRules: {
        tenderProjectName: [
          { required: true, message: "必填", trigger: "change" }
        ],
        tenderName: [
          { required: true, message: "必填", trigger: "blur" },
          { min: 1, max: 50 }
        ],
        tenderType: [{ required: true, message: "必填", trigger: "change" }],
        levelOneName: [{ required: true, message: "必填", trigger: "change" }],
        levelTwoName: [{ required: true, message: "必填", trigger: "change" }],
        budgetMonthArr: [
          { required: true, message: "必填", trigger: "change" }
        ],
        budgetAmount: [
          { required: true, validator: moneyRule, trigger: "change" }
        ],
        subjectCode: [{ required: true, message: "必填", trigger: "change" }],
        technicalDate: [{ required: true, message: "必填", trigger: "change" }],
        planTargetDate: [
          { required: true, message: "必填", trigger: "change" }
        ],
        designDrawingsDate: [
          { required: true, message: "必填", trigger: "change" }
        ],
        signContractDate: [
          { required: true, message: "必填", trigger: "change" }
        ],
        contractDemand: [
          { required: true, message: "必填", trigger: "change" }
        ],
        manageDemand: [{ required: true, message: "必填", trigger: "change" }],
        // yearDate: [{ required: true, message: "必填", trigger: "change" }],
        itemScoreCode: [{ required: true, message: "必填", trigger: "change" }]
      }
    };
  },
  methods: {
    descInput(type){
      if(type == 1){
        this.contractDemandLength = this.planCodeData.contractDemand.length;
      } else if(type == 2){
        this.manageDemandLength = this.planCodeData.manageDemand.length;
      } else if(type == 3){
        this.tenderRemarkLength = this.planCodeData.tenderRemark.length;
      }
    },
    cancelFn() {
      this.planCodeData = {};
      this.yearDate = [];
      this.planCodeDataDef = {
        planCode: "", // 招标计划申请表
        tenderProjectCode: "", //招标项目
        tenderProjectName: "", //招标项目
        pfItem: [], //评分项类表
        itemScoreCode: "", // 评分项
        moneyUnit: "", //货币单位
        tenderType: "", //招标方式
        levelOne: "", //1级分项
        levelOneName: "",
        tenderName: "", //招标名称
        subjectCode: "", //预算科目
        subjectName: "",
        levelTwo: "", //2级分项
        levelTwoName: "",
        levelThree: "", //三级分项
        levelThreeName: "",
        budgetMonth: "", //预算月份
        budgetMonthArr: [],
        budgetAmount: "", //预算额
        budgetYear: "", //预算年份
        arrivalDate: "", //要求进场时间
        technicalDate: "", //技术要求提供时间
        planTargetDate: "", //计划定标时间
        procurementDate: "", //采购启动时间
        designDrawingsDate: "", //设计图纸提供时间
        signContractDate: "", //预算合同签订时间
        contractDemand: "", //合同范围及经纪需求
        manageDemand: "", //技术需求及管理需求
        tenderRemark: "", //备注
        contractType: "", //合约形式
      };
      this.addSheetObj.isShow = false;
    },
    sureFn() {
      this.$refs["planCodeDatas"].validate(valid => {
        if (valid) {
          this.ifLook = true;
          this.$api.modular
            .tenderSave(this.sso_sessionid, this.planCodeData)
            .then(res => {
              if (res.status == 200) {
                if(res.data.returnCode == 0){
                  this.$emit("saveOk");
                  this.$message.success("保存成功");
                  this.ifLook = false;
                  this.planCodeData = {};
                  this.planCodeDataDef = {
                    planCode: "", // 招标计划申请表
                    tenderProjectCode: "", //招标项目
                    tenderProjectName: "", //招标项目
                    pfItem: [], //评分项类表
                    itemScoreCode: "", // 评分项
                    moneyUnit: "", //货币单位
                    tenderType: "", //招标方式
                    levelOne: "", //1级分项
                    levelOneName: "",
                    tenderName: "", //招标名称
                    subjectCode: "", //预算科目
                    subjectName: "", //预算科目
                    levelTwo: "", //2级分项
                    levelTwoName: "",
                    levelThree: "", //三级分项
                    levelThreeName: "",
                    budgetMonth: "", //预算月份
                    budgetMonthArr: [],
                    budgetAmount: "", //预算额
                    budgetYear: "", //预算年份
                    arrivalDate: "", //要求进场时间
                    technicalDate: "", //技术要求提供时间
                    planTargetDate: "", //计划定标时间
                    procurementDate: "", //采购启动时间
                    designDrawingsDate: "", //设计图纸提供时间
                    signContractDate: "", //预算合同签订时间
                    contractDemand: "", //合同范围及经纪需求
                    manageDemand: "", //技术需求及管理需求
                    tenderRemark: "", //备注
                    contractType: "", //合约形式
                    yearDate: []
                  };
                  this.addSheetObj.isShow = false;
                } else {
                  this.$message.error(res.data.message);
                  this.ifLook = false;
                }
                
              } else {
                this.$message.error(res.message);
              }
            }).catch(err => {
                this.ifLook = false;
            });
        } else {
          return false;
        }
      });
    },
    pickerFn(v) {
      // this.planCodeData.yearDate = this.planCodeData.budgetYear.split("~");;
      this.planCodeData.budgetYear =
        this.yearDate[0] + "~" + this.yearDate[1];
    },
    // 查询修改
    searchChangeInfo(sso_sessionid, tenderCode) {
      var _this = this;
      tenderCode = { tenderCode: tenderCode };
      this.$api.modular.getTenderByCode(sso_sessionid, tenderCode).then(res => {
        if (res.status == 200 && res.data.returnCode == 0) {
          var tenderData = res.data.data[0];
          tenderData.budgetMonthArr = tenderData.budgetMonth.split(",");
          tenderData.budgetAmount = Number(tenderData.budgetAmount);
          var nobj = {
            tenderProjectName: _this.planCodeDataDef.tenderProjectName,
            levelOneName: _this.planCodeDataDef.levelOneName,
            levelTwoName: _this.planCodeDataDef.levelTwoName,
            levelThreeName: _this.planCodeDataDef.levelThreeName
          };
          _this.planCodeData = Object.assign(tenderData, nobj);
          _this.relatedItems.costCenterCode = tenderData.tenderProjectCode;
          _this.yearDate = _this.planCodeData.budgetYear.split("~");
          _this.planCodeData.designDrawingsDate = _this.commonFn.formatDate(
            _this.planCodeData.designDrawingsDate
          );
          _this.planCodeData.technicalDate = _this.commonFn.formatDate(
            _this.planCodeData.technicalDate
          );
          _this.planCodeData.planTargetDate = _this.commonFn.formatDate(
            _this.planCodeData.planTargetDate
          );
          _this.planCodeData.procurementDate = _this.commonFn.formatDate(
            _this.planCodeData.procurementDate
          );
          _this.planCodeData.signContractDate = _this.commonFn.formatDate(
            _this.planCodeData.signContractDate
          );
          _this.planCodeData.arrivalDate = _this.commonFn.formatDate(
            _this.planCodeData.arrivalDate
          );
          _this.contractDemandLength = _this.planCodeData.contractDemand.length;
          _this.manageDemandLength = _this.planCodeData.manageDemand.length;
          _this.tenderRemarkLength = _this.planCodeData.tenderRemark.length;
        }
      });
    },
    // 查询修改
    searchChangeInfoOut(tenderCode) {
      var tenderCodeP = { tenderCode: tenderCode };
      this.$api.modular.getTenderByCodeOut(tenderCodeP).then(res => {
        if (res.status == 200 && res.data.returnCode == 0) {
          var tenderData = res.data.data[0];
          tenderData.budgetMonthArr = tenderData.budgetMonth.split(",");
          tenderData.budgetAmount = Number(tenderData.budgetAmount);
          var nobj = {
            // tenderProjectName: this.planCodeDataDef.tenderProjectName,
            // levelOneName: this.planCodeDataDef.levelOneName,
            // levelTwoName: this.planCodeDataDef.levelTwoName,
            // levelThreeName: this.planCodeDataDef.levelThreeName
          };
          this.planCodeData = Object.assign(tenderData, nobj);
          this.relatedItems.costCenterCode = tenderData.tenderProjectCode;
          this.yearDate = this.planCodeData.budgetYear.split("~");
          this.planCodeData.designDrawingsDate = this.commonFn.formatDate(
            this.planCodeData.designDrawingsDate
          );
          this.planCodeData.technicalDate = this.commonFn.formatDate(
            this.planCodeData.technicalDate
          );
          this.planCodeData.planTargetDate = this.commonFn.formatDate(
            this.planCodeData.planTargetDate
          );
          this.planCodeData.procurementDate = this.commonFn.formatDate(
            this.planCodeData.procurementDate
          );
          this.planCodeData.signContractDate = this.commonFn.formatDate(
            this.planCodeData.signContractDate
          );
          this.planCodeData.arrivalDate = this.commonFn.formatDate(
            this.planCodeData.arrivalDate
          );
          this.contractDemandLength = this.planCodeData.contractDemand.length;
          this.manageDemandLength = this.planCodeData.manageDemand.length;
          this.tenderRemarkLength = this.planCodeData.tenderRemark.length;
        }
      });
    },
    choseMonth(v) {
      this.planCodeData.budgetMonth = v.toString();
    },
    // 弹窗 start
    showTree() {
      this.relatedItems.isShow = true;
      var that = this;
      that.$nextTick(() => {
        that.$refs.related_items.choseNode(that.projectInfo);
      });
    },
    nanTest(str){
      if(!str) return false;
      var len = str.length;
      var lastStr = str.substr(len-1, 1);
      if (isNaN(Number(lastStr))) {
        return false;
      } else {
        return true;
      }
    },
    // 科目弹窗
    showTreeSub() {
      var len = this.SprojectCode.length;
      var lastStr = this.SprojectCode.substr(len-1, 1);
      if (isNaN(Number(lastStr))) {
        this.$message.error("请选择具体项目!");
        return false;
      }
      this.subjectJsonData.isShow = true;
      this.subjectJsonData.projectCode = this.SprojectCode;
      // var that = this;
      // that.$nextTick(() => {
      //   that.$refs.related_items.choseNode(that.projectInfo);
      // });
    },
    subjectJsonFn(obj) {
      this.planCodeData.subjectName = obj.subjectName;
      this.planCodeData.subjectCode = obj.subjectCode;
    },
    mothHover() {
      this.ifHover = true;
    },
    mothLeave() {
      this.ifHover = false;
    },
    budgetMonthArrFn() {
      var array = [];
      var str = "";
      if (this.planCodeData.budgetMonthArr.length > 0) {
        this.planCodeData.budgetMonthArr.forEach((currentValue, index, arr) => {
          array.push(currentValue + "月");
        });
        str = array.join(",");
        this.ifHoverWidth =
          Number(this.planCodeData.budgetMonthArr.length) * 24 + "px";
      }
      return str;
    },
    setItemName(value) {
      this.planCodeData.tenderProjectCode = value.costCenterCode;
      this.planCodeData.tenderProjectName = value.costCenterName;
      this.relatedItems.currentKey = value.costCenterCode;
      this.projectInfo = value;
      this.SprojectCode = value.costCenterCode;
    },
    levelCodeNameFn(value) {
      this.planCodeData.levelOne = value.levelCode;
      this.planCodeData.levelOneName = value.levelName;
      if (value.levelTwo) {
        this.planCodeData.levelTwo = value.levelTwo.levelCode;
        this.planCodeData.levelTwoName = value.levelTwo.levelName;
      } else if (value.levelTwo.levelThree) {
        this.planCodeData.levelThree = value.levelTwo.levelThree.levelCode;
        this.planCodeData.levelThreeName = value.levelTwo.levelThree.levelName;
      }
    },
    showLevelShow() {
      this.levelCodeName.isShow = true;
    },
    // 弹窗 end
    getItemScoreLook() {
      this.$api.modular.getItemScoreLook('').then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.pfItem = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error("error!");
        }
      });
    },
    // 评分项
    getItemScore() {
      this.$api.modular.getItemScore(this.sso_sessionid).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            this.pfItem = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error("error!");
        }
      });
    }
  }
});
</script>
<style scoped>
</style>
<style>
.el-dialog__body{
  padding: 10px 20px;
}
.addSheetMain .el-input {
  width: 78%;
}
.addSheetMain .el-input__inner {
  padding-right: 0;
  padding-left: 8px;
}
.addSheetMain .el-date-editor--date .el-input__inner {
  padding-left: 28px;
}
.addSheetMain .el-select {
  display: inline-block;
  width: 78% !important;
}
.addSheetMain .el-select .el-input {
  width: 100% !important;
}
.addSheetMain .el-date-editor.el-input {
  width: 78%;
}
.addSheetMain .el-textarea {
  width: 95%;
}
.addSheetMain .el-input__icon {
  width: 18px;
  line-height: 20px;
}

.addSheetMain .el-col-8 {
  height: 41px;
}
.selDiv .el-select__tags {
  max-width: 100px !important;
}
.showDiv {
  position: absolute;
  top: -18px;
  left: 0;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: #666;
  box-shadow: 0 0 3px 0 #666;
  background: #fff;
  border-radius: 4px;
  padding: 0 8px;
}
.numberV{
    position: absolute;
    right: 64px;
    top: 32px;
    font-size: 12px;
    color: #555;
}
.numberV2{
    position: absolute;
    right: 64px;
    top: 28px;
    font-size: 12px;
    color: #555;
}
</style>
