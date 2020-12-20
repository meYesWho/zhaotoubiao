<template>
  <div class="executionSheetHome rightArea">
    <h1>成本预算和集中/专项采购执行单参数设置</h1>
    <el-form
      inline
      label-position="left"
      label-width="100"
      size="mini"
      v-if="hasQx('aph2_tender_CGZXDZD-QX-C19')"
    >
      <el-form-item label="选择项目">
        <el-input maxlength="10" readonly v-model="sheetSearchData.projectName" placeholder="选择项目"></el-input>
        <el-button type="primary" @click="chosePro('s')">选择</el-button>
      </el-form-item>
      <el-form-item label="年份">
        <el-date-picker
          v-model="sheetSearchData.budgetYear"
          type="year"
          value-format="yyyy"
          placeholder="选择年"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="货币单位：">
        <el-radio-group v-model="sheetSearchData.unit">
          <el-radio label="1">元</el-radio>
          <!-- <el-radio label="2">千元</el-radio>
          <el-radio label="3">万元</el-radio>
          <el-radio label="4">百万元</el-radio>-->
        </el-radio-group>
      </el-form-item>
      <div style="clear:both"></div>
    </el-form>
    <div class="toMake">
      <el-button
        v-if="hasQx('aph2_tender_CGZXDZD-QX-C73')"
        type="primary"
        @click="toDefendSheet"
        size="mini"
        text-glign="left"
      >制定成本预算和集中/专项采购执行单</el-button>
    </div>
    <div class="tableArea">
      <div class="searchForm" style="width: 100%;float:left;">
        <el-form
          :inline="true"
          size="mini"
          :model="formInline"
          class="demo-form-inline"
          v-if="hasQx('aph2_tender_CGZXDZD-QX-C19')"
        >
          <el-form-item label="选择项目">
            <el-input
              maxlength="10"
              @focus="chosePro('fct')"
              readonly
              v-model="formInline.projectName"
              placeholder="选择项目"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="状态">
            <el-select
              clearable
              filterable
              size="mini"
              placeholder="请选择"
              v-model="formInline.status"
              class="widthseven"
            >
              <el-option label="有效" value="Y"></el-option>
              <el-option label="作废" value="N"></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="版本号">
            <el-input v-model="formInline.planVision" placeholder="版本号"></el-input>
          </el-form-item>
          <el-form-item label="年份">
            <el-date-picker
              v-model="formInline.budgetYear"
              value-format="yyyy"
              type="year"
              placeholder="选择年"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="btn">
            <el-button style="float:left;" type="primary" @click="searchFn">查询</el-button>
            <el-button style="float:left;" type="primary" @click="resetFn">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <p style="text-align: left">采购计划申请列表</p>
      <div class="sqlist">
        <el-table
          border
          :cell-class-name="hoverClassFn"
          size="mini"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          :data="getPlanList"
          style="width: 100%;margin-top: 20px; overflow: inherit;"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="statusName" align="center" label="状态" width="88">
            <template slot-scope="scope">
              <el-button
                v-if="!scope.row.firstStatusDesc"
                @click="toDefendSheet(scope.row, 'fromStatus')"
                size="mini"
                type="text"
              >未起件</el-button>
              <el-button
                v-if="scope.row.firstStatusDesc"
                @click="toDefendSheet(scope.row, 'fromStatus')"
                size="mini"
                type="text"
              >{{scope.row.firstStatusDesc}}</el-button>
            </template>
          </el-table-column>

          <el-table-column label="审定状态" align="center" width="100" style="position: relative;">
            <template slot-scope="scope">
              <el-button type="default" size="mini" v-if="!scope.row.firstStatusDesc">未起件</el-button>
              <button
                class="btnClass btnClass_bjz"
                type="default"
                size="mini"
                v-if="scope.row.firstStatusDesc == '编制中'"
                slot="reference"
              >{{scope.row.firstStatusDesc}}</button>
              <button
                class="btnClass btnClass_yzz"
                type="default"
                size="mini"
                v-if="scope.row.firstStatusDesc == '已终止'"
                slot="reference"
              >{{scope.row.firstStatusDesc}}</button>
              <button
                class="btnClass btnClass_yth"
                size="mini"
                v-if="scope.row.firstStatusDesc == '已退回'"
                slot="reference"
                type="default"
              >{{scope.row.firstStatusDesc}}</button>
              <button
                class="btnClass btnClass_spz"
                type="default"
                size="mini"
                v-if="scope.row.firstStatusDesc == '审批中'"
                slot="reference"
              >{{scope.row.firstStatusDesc}}</button>
              <button
                class="btnClass btnClass_yqh"
                type="default"
                size="mini"
                v-if="scope.row.firstStatusDesc == '已取回'"
                slot="reference"
              >{{scope.row.firstStatusDesc}}</button>
              <button
                class="btnClass btnClass_ytg"
                type="success"
                size="mini"
                v-if="scope.row.firstStatusDesc == '已通过'"
                slot="reference"
              >{{scope.row.firstStatusDesc}}</button>
              <div class="el_Popver">
                <div class="popoverClass">
                  <div class="jtCss"></div>
                  <div class="clickClass">
                    <span style="float:left;">审定：</span>
                    <p
                      style="margin-left: 40px; margin-top: -19px;"
                      @click="toApproval('first', scope.row)"
                    >{{scope.row.firstApproveNumber}}</p>
                  </div>
                  <span>加急：{{scope.row.firstUrgent == "Y" ? '是' : '否'}}</span>
                  <span>状态：【{{scope.row.firstStatusDesc}}】</span>
                  <div class="lineDiv"></div>
                  <span class="h">当前审批人：{{scope.row.firstAssigneeName}}</span>
                  <span class="h">下一审批环节：{{scope.row.firstNextTaskName}}</span>
                </div>
                <div class="popperArrow"></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="staffName" label="创建人" align="center" width="80"></el-table-column>
          <el-table-column label="公司名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                style="color: #1E88E5"
                @click="toDefendSheet(scope.row, 'fromName')"
                size="mini"
                type="text"
              >{{ifCompanyName(scope.row)}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="projectCode" show-overflow-tooltip label="项目编号" width="80"></el-table-column>
          <el-table-column prop="projectName" show-overflow-tooltip label="项目名称"></el-table-column>
          <el-table-column prop="budgetYear" align="center" label="年份" width="60"></el-table-column>
          <el-table-column prop="planVision" align="center" label="版本号" width="60"></el-table-column>
          <el-table-column prop label="创建日期" width="90" align="center">
            <template slot-scope="scope">{{createDateStr(scope.row.createdDate)}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="120px">
            <template slot-scope="scope">
              <el-button type="text" @click="toVoid(scope.row)" size="mini">删除</el-button>
              <el-button
                v-if="hasQx('aph2_tender_CGZXDLB-QX-CS14')"
                type="text"
                @click="toDefendSheet(scope.row, 'have666')"
                size="mini"
              >S编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination-z :total="total" :fromWhere="fromWhere" @fatherMethod="fatherMethod"></pagination-z>
    </div>
    <related-items ref="related_items" :relatedItems="relatedItems" @setItemName="setItemName"></related-items>
  </div>
</template>
<script type="text/javascript">
import base from "@/api/base";
export default {
  data() {
    return {
      relatedItems: {
        // 选择项目参数默认值
        isShow: false,
        currentKey: "",
        filterText: "",
        type: "two",
        execution: ""
      },
      sheetSearchData: {
        // 执行单维护页跳转所需参数
        unit: "1",
        projectName: "",
        projectCode: "",
        budgetYear: ""
      },
      formInline: {
        // 分页默认值
        page: 1,
        size: 10,
        projectName: "",
        projectCode: "",
        companyCode: "",
        status: "",
        planVision: "",
        budgetYear: ""
      },
      projectInfo: {},
      total: 0,
      fromWhere: "ExecutionSheetHome", // 分页也许会用到 来自哪个页面的标识
      sso_sessionid: this.$store.state.sso_sessionid,
      getPlanList: [] //未提交采购计划表申请列表
      // itemsList: [],
      // itemData: {}
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    hoverClassFn(row) {
      if (row.columnIndex == 2 || row.columnIndex == 3) {
        return "hoverClass";
      } else {
        return "";
      }
    },
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    searchFn() {
      this.formInline.page = 1;
      this.getlist();
    },
    resetFn() {
      this.formInline = {
        // 分页默认值
        page: 1,
        size: 10,
        projectName: "",
        projectCode: "",
        companyCode: "",
        status: "",
        planVision: "",
        budgetYear: ""
      };
      this.getlist();
    },
    createDateStr(date) {
      return this.commonFn.formatDate(date);
    },
    ifCompanyName(row) {
      if (isNaN(Number(row.projectCode))) {
        return row.projectName;
      } else {
        return row.companyName;
      }
    },
    // 未提交采购计划表申请列表
    getlist() {
      var that = this;
      this.$api.modular
        .getPlanListByPage(that.sso_sessionid, that.formInline)
        .then(res => {
          // 执行某些操作
          if (res.status == 200 && res.data.returnCode == 0) {
            this.getPlanList = res.data.data;
            if (isNaN(Number(res.data.count))) {
              this.total = 0;
            } else {
              this.total = Number(res.data.count);
            }
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 点击选择项目按钮
    chosePro(execution) {
      this.relatedItems.isShow = true;
      this.relatedItems.filterText = this.sheetSearchData.projectName;
      this.relatedItems.type = "two";
      this.relatedItems.execution = execution;
      var that = this;
      that.$nextTick(() => {
        that.$refs.related_items.choseNode(that.projectInfo);
      });
    },
    // 组件调用父元素方法--选择项目成功回调
    setItemName(value) {
      this.projectInfo = value;
      if (value.execution == "fct") {
        this.formInline.projectName = value.costCenterName;
        if (!isNaN(Number(value.costCenterCode))) {
          this.formInline.companyCode = "";
          this.formInline.projectCode = value.costCenterCode;
        } else {
          this.formInline.projectCode = "";
          this.formInline.companyCode = value.segment;
        }
      } else {
        this.sheetSearchData.projectName = value.costCenterName;
        this.sheetSearchData.projectCode = value.costCenterCode;
        var len = value.costCenterCode.length;
        var lastStr = value.costCenterCode.substr(len - 1, 1);
        if (!isNaN(Number(lastStr))) {
          var code = value.segment.substring(
            0,
            value.segment.indexOf("_" + value.costCenterCode)
          );
          this.sheetSearchData.companyCode = code;
        } else {
          this.sheetSearchData.companyCode = value.segment;
        }
        this.relatedItems.currentKey = value.costCenterCode;
      }
    },
    // 组件调用父元素方法--分页回调
    fatherMethod(page, size) {
      this.formInline.page = page;
      this.formInline.size = size;
      this.getlist();
    },
    // 作废功能 start
    async toVoid(row) {
      this.$confirm("确认删除该项目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.voidFn(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    voidFn(row) {
      this.$api.modular
        .updateOrDelPlanByCode(this.sso_sessionid, row.planCode)
        .then(res => {
          if (res.status == 200 && res.data.returnCode == 0) {
            if (this.getPlanList.length == 1) {
              if (this.formInline.page > 1) {
                this.formInline.page = this.formInline.page - 1;
              }
            }
            this.getlist();
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "错误！"
          });
        });
    },
    // 作废 end

    // 跳转审定页面
    toApproval(type, row) {
      var params = {};
      if (type == "first") {
        params = {
          approveCode: row.firstApproveCode
        };
      } else if (type == "last") {
        params = {
          approveCode: row.lastApproveCode
        };
      }
      var url = base.approveUrl + params.approveCode;
      window.open(url);
    },

    // 点击按钮 跳转到执行单维护页
    toDefendSheet(v, type) {
      var paramsData = {};
      if(type == 'have666'){
        if(v.planCode){
          paramsData = v;
          paramsData.whereType = type;
          var str = JSON.stringify(paramsData);
          this.$router.push({
            path: "/defendSheet",
            query: {
              itemInfo: str
            }
          });
        } else {
          this.$message.error('获取招标计划有误!');
          return false;
        }
      }
      if (v.projectCode) {
        paramsData = v;
        paramsData.whereType = type;
        var str = JSON.stringify(paramsData);
        this.$router.push({
          path: "/defendSheet",
          query: {
            itemInfo: str
          }
        });
      } else {
        if (this.sheetSearchData.projectCode == "") {
          this.$message.error("请选择项目");
          return false;
        } else if (this.sheetSearchData.budgetYear == "") {
          this.$message.error("请选择年份");
          return false;
        } else {
          var companyCode = "";
          if (this.sheetSearchData.companyCode) {
            companyCode = this.sheetSearchData.companyCode;
          } else {
            companyCode = "";
          }
          paramsData = {
            companyCode: companyCode,
            createdBy: "",
            createdDate: "",
            firstApproveStatus: "",
            lastApproveStatus: "",
            lastUpdatedBy: "",
            lastUpdatedDate: "",
            moneyType: "",
            moneyUnit: this.sheetSearchData.unit,
            budgetYear: this.sheetSearchData.budgetYear,
            planCode: "",
            planId: "",
            planVision: "",
            projectCode: this.sheetSearchData.projectCode,
            projectName: "",
            status: ""
          };
          this.$api.modular
            .planAdd(this.sso_sessionid, paramsData)
            .then(res => {
              // 执行某些操作
              if (res.status == 200) {
                var len = res.data.data.length - 1;
                if (res.data.returnCode == 0 && len > -1) {
                  this.$router.push({
                    path: "/defendSheet",
                    query: {
                      itemInfo: JSON.stringify(res.data.data[0])
                    }
                  });
                } else {
                  this.$message.error("数据有误！");
                }
              } else {
                this.$message.error("数据有误！");
              }
            });
        }
      }
    }
  }
};
</script>

<style scoped>
.executionSheetHome {
  width: 98% !important;
  margin: 0 auto !important;
  background-color: #fff !important;
  padding-bottom: 20px;
}
.executionSheetHome .el-form-item {
  width: 30%;
  text-align: left;
  margin-left: 10px;
  float: left;
  margin-top: 10px;
}
.searchForm {
  margin-top: 15px;
  margin-bottom: 20px;
}
.executionSheetHome .searchForm .el-form-item {
  width: 25%;
  text-align: left;
  margin: 0;
  /* margin-left: 10px; */
  float: left;
  margin-top: 10px;
}
.executionSheetHome .searchForm .el-input {
  width: 100%;
}
.executionSheetHome .el-input {
  width: 72%;
}
.toMake {
  text-align: left;
  margin-left: 10px;
  margin-bottom: 20px;
}
.tableArea {
  width: auto;
  margin: 0 10px;
  border-top: 1px solid #f1f1f1;
}
.popoverClass {
  width: auto;
}
.popoverClass span {
  font-size: 12px;
  color: #666;
  line-height: 20px;
  display: block;
}
.popoverClass span.h {
  color: #999;
}
.popoverClass div.lineDiv {
  width: 100%;
  height: 1px;
  background: #999;
  margin: 6px 0;
}
.popoverClass .clickClass {
  height: 20px;
  background: none;
  line-height: 1;
  margin: 0;
}
.clickClass span {
  display: inline-block;
}
.clickClass .el-button--text {
  margin: 0;
  padding: 0;
  width: 190px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* .btnClass:hover{
  color: #cb1235;
  border-color: #fdcdcd;
  background-color: #fff0f0;
} */
</style>
<style>
.executionSheetHome .searchForm .el-form-item__content {
  width: 100px;
}
.executionSheetHome .searchForm .btn .el-form-item__content {
  width: 100%;
}
.sqlist .el-table .hoverClass .cell {
  position: relative;
  overflow: inherit;
}
.el_Popver {
  min-width: 240px;
  position: absolute;
  top: -50px;
  left: 92%;
  z-index: 2007;
  background: #fff;
  border: 1px solid #ebeef5;
  padding: 10px;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  word-break: break-all;
  display: none;
}
.sqlist .popoverClass .clickClass {
  height: 20px;
  background: none;
  line-height: 1;
  margin: 0;
}
.sqlist .clickClass span {
  display: inline-block;
}
.sqlist .clickClass p:hover {
  cursor: pointer;
}
.sqlist .clickClass p {
  float: left;
  margin-right: 0;
  margin-bottom: 0;
  padding: 0;
  width: auto;
  white-space: nowrap;
  line-height: 20px;
  word-break: break-all;
  color: #1e88e5;
}
.sqlist .hoverClass button:hover {
  cursor: pointer;
}
.sqlist .hoverClass .cell:hover .btnClass + .el_Popver {
  display: block;
}
.sqlist .el-table__body-wrapper {
  overflow: inherit;
}
.jtCss {
  margin-left: -23px;
  margin-top: 44px;
  float: left;
  width: 0 !important;
  height: 0 !important;
  border-width: 6px;
  border-style: solid;
  border-color: transparent #fff transparent transparent;
  background: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
