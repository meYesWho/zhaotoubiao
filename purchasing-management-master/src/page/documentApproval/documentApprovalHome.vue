<template>
  <div class="rightArea">
    <h1>招标文件审定</h1>
    <search-form ref="searchForms" @searchFormFn="searchFormFn"></search-form>
    <div class="groupBtn">
      <el-button v-if="hasQx('aph2_tender_ZBWJSD-QX-C19')" size="mini" type="primary" @click="searchFileList">查询</el-button>
      <el-button v-if="hasQx('aph2_tender_ZBWJSD-QX-C19')" size="mini" type="primary" @click="resetFn">重置</el-button>
      <el-button v-if="hasQx('aph2_tender_ZBWJSD-QX-C11')" size="mini" type="primary" @click="addTenderFile">编制招标文件</el-button>
      <el-button v-if="hasQx('aph2_tender_ZBWJSD-QX-C14')" size="mini" type="primary" @click="changeTenderFile">修改</el-button>
      <el-button v-if="hasQx('aph2_tender_ZBWJSD-QX-C12')" size="mini" type="primary" @click="delBtn">删除</el-button>
      <el-button v-if="hasQx('aph2_tender_ZBWJSD-QX-C23')" size="mini" type="primary" @click="faqiFn('', 'sd')">招标文件审定</el-button>
      <el-button v-if="hasQx('aph2_tender_ZBWJSD-QX-C47')" size="mini" type="primary" @click="gongGao">发布招标公告</el-button>
      <el-button v-if="hasQx('aph2_tender_ZBWJSD-QX-C71')" size="mini" type="primary" @click="cheXiao">取消招标公告</el-button>
      <!-- <el-button size="mini" type="primary" @click="tenderFileChangeByCode">招标文件变更</el-button> -->
    </div>
      <div class="sqlist">
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="fileListData"
      border
      :cell-class-name="hoverClassFn"
      size="mini"
      tooltip-effect="dark"
      style="width: 98%; margin: 0 auto; overflow: inherit;"
      @selection-change="tableSearchFn"
    >
      <el-table-column align="center" :selectable="selectInit" type="selection" width="50px"></el-table-column>
      <el-table-column label="序号" width="60" type="index" align="center"></el-table-column>
      <el-table-column prop="commName" show-overflow-tooltip label="业务单元"></el-table-column>
      <el-table-column label="审定状态" align="center" width="100px">
        <template slot-scope="scope">
          <el-button type="default" size="mini" v-if="!scope.row.statusDesc">未起件</el-button>

            <button
              class="btnClass btnClass_bjz"
              type="default"
              size="mini"
              v-if="scope.row.statusDesc == '编制中'"
              slot="reference"
            >{{scope.row.statusDesc}}</button>
            <button
              class="btnClass btnClass_yzz"
              type="default"
              size="mini"
              v-if="scope.row.statusDesc == '已终止'"
              slot="reference"
            >{{scope.row.statusDesc}}</button>
            <button
              class="btnClass btnClass_ytg"
              type="success"
              size="mini"
              v-if="scope.row.statusDesc == '已通过'"
              slot="reference"
            >{{scope.row.statusDesc}}</button>
              <button
                class="btnClass btnClass_yqh"
                type="default"
                size="mini"
                v-if="scope.row.statusDesc == '已取回'"
                slot="reference"
              >{{scope.row.statusDesc}}</button>
            <button
              class="btnClass btnClass_yth"
              type="success"
              size="mini"
              v-if="scope.row.statusDesc == '已退回'"
              slot="reference"
            >{{scope.row.statusDesc}}</button>
            <button
              class="btnClass btnClass_spz"
              type="success"
              size="mini"
              v-if="scope.row.statusDesc == '审批中'"
              slot="reference"
            >{{scope.row.statusDesc}}</button>
            <div class="el_Popver">
          <div class="popoverClass">
                <div class="jtCss"></div>
              <div class="clickClass">
                <span style="float:left;">审定：</span>
                <p
                  style="margin-left: 40px; margin-top: -19px;" @click="numberClick(scope.row, 'sd')"
                >{{scope.row.approveNumber}}</p>
              </div>
              <span>加急：{{scope.row.approveUrgent == "Y" ? '是' : '否'}}</span>
              <span>状态：【{{scope.row.statusDesc}}】</span>
              <div class="lineDiv"></div>
              <span class="h">当前审批人：{{scope.row.assigneeName}}</span>
              <span class="h">下一审批环节：{{scope.row.nextTaskName}}</span>
            </div></div>
        </template>
      </el-table-column>
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
      <el-table-column prop="confirmStatus" label="招标状态" width="200">
        <template slot-scope="scope">
            <div v-if="scope.row.tenderFileStatus == 'lost'">
              <span v-if="scope.row.tenderScheduleStatus == 'tenderLost'">流标</span>
              <span v-if="!scope.row.tenderScheduleStatus">招标文件暂存(流标)</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderFileSaveTemporary'">招标文件暂存(流标)</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderFileApproveSTOP'">招标文件已终止(流标)</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderFileApproveSubmit'">招标文件审定中(流标)</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderFileApproveBACK'">招标文件退回(流标)</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderFileApprovePASS'">招标文件审定完成(流标)</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderBulletinRelease'">招标公告已发布(流标)</span>
            </div>
            <div v-if="scope.row.tenderFileStatus != 'lost'">
              <span v-if="scope.row.tenderScheduleStatus == 'tenderLost'">流标</span>
              <span v-if="!scope.row.tenderScheduleStatus">招标文件暂存</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderFileSaveTemporary'">招标文件暂存</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderFileApproveSTOP'">招标文件已终止</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderFileApproveSubmit'">招标文件审定中</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderFileApproveBACK'">招标文件退回</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderFileApprovePASS'">招标文件审定完成</span>
              <span v-if="scope.row.tenderScheduleStatus == 'tenderBulletinRelease'">招标公告已发布</span>
            </div>
          
        </template>
      </el-table-column>
    </el-table>
      </div>
    <pagination-z :total="total" :fromWhere="fromWhere" @fatherMethod="fatherMethod"></pagination-z>
    <el-dialog title="发布公告" :visible.sync="gongGaoShow" width="1000px">
      <div class="bidissuing">
        <el-row class="hang">
          <el-col :span="4">
            <div class="lie lieTitle">关联招标项</div>
          </el-col>
          <el-col :span="8">
            <!-- <el-tooltip class="item" effect="dark" :content="bidIssuing.tenderProjectName" placement="top">
               <el-button type="text" class="lie">{{bidIssuing.tenderProjectName}}</el-button>
            </el-tooltip>-->
            <div class="lie">{{bidIssuing.tenderProjectName}}</div>
          </el-col>
          <el-col :span="4">
            <div class="lie lieTitle">项目位置</div>
          </el-col>
          <el-col :span="8">
            <div class="lie">{{bidIssuing.tenderProjectAddress}}</div>
          </el-col>
        </el-row>
        <el-row class="hang">
          <el-col :span="4">
            <div class="lie lieTitle">招标内容</div>
          </el-col>
          <el-col :span="8">
            <div class="lie" :title="bidIssuing.tenderFileRange">{{bidIssuing.tenderFileRange}}</div>
          </el-col>
          <el-col :span="4">
            <div class="lie lieTitle">领取招标文件时间</div>
          </el-col>
          <el-col :span="8">
            <div class="lie">{{formatDate(bidIssuing.receiveFileDate)}}</div>
          </el-col>
        </el-row>
        <el-row class="hang">
          <el-col :span="4">
            <div class="lie lieTitle">提交疑问的时间截止</div>
          </el-col>
          <el-col :span="8">
            <div class="lie">{{formatDate(bidIssuing.submitQuestionEnd)}}</div>
          </el-col>
          <el-col :span="4">
            <div class="lie lieTitle">投标截止时间</div>
          </el-col>
          <el-col :span="8">
            <div class="lie">{{formatDate(bidIssuing.submitTenderDocumentEnd)}}</div>
          </el-col>
        </el-row>
        <!-- <el-row class="hang">
          <el-col :span="4">
            <div class="lie lieTitle">招标联系人</div>
          </el-col>
          <el-col :span="8">
            <div class="lie">{{bidIssuing.tenderFileTenderer}}</div>
          </el-col>
          <el-col :span="4">
            <div class="lie lieTitle">招标联系电话</div>
          </el-col>
          <el-col :span="8">
            <div class="lie">{{bidIssuing.tendereePhone}}</div>
          </el-col>
        </el-row>
        <el-row class="hang">
          <el-col :span="4">
            <div class="lie lieTitle">电子邮箱</div>
          </el-col>
          <el-col :span="8">
            <div class="lie">{{bidIssuing.tendereeEmail}}</div>
          </el-col>
          <el-col :span="4">
            <div class="lie lieTitle">中标监督电话</div>
          </el-col>
          <el-col :span="8">
            <div class="lie" style="font-size: 12px;" :title="bidIssuing.antiFraudPhone">{{bidIssuing.antiFraudPhone}}</div>
          </el-col>
        </el-row> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeGongGao">取 消</el-button>
        <el-button :disabled="ifAlready" size="mini" type="primary" @click="faqiFn('', 'gg')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import base from "@/api/base";
export default {
  data() {
    return {
      fileSearchData: {
        planCode: "", // 招标计划申请表
        projectCode: "", // 招标项目
        projectName: "", // 招标项目
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commName: "", // 业务单元
        commCode: "", // 业务单元
        page: 1,
        size: 10
      },
      fileListData: [],
      fromWhere: "documentApprovalHome",
      sso_sessionid: this.$store.state.sso_sessionid,
      total: 0,
      selectList: [],
      gongGaoShow: false,
      gridData: {},
      bidIssuing: {},
      ifAlready: false,
      mbData: {
        fileType: "TenderFile",
        headCode: ""
      },
      fileList: [],
      actionUrl:
        base.uploadUrl + "?sso_sessionid=" + this.$store.state.sso_sessionid
    };
  },

  mounted() {
    var that = this;
    Object.assign(this.fileSearchData, this.searchDataCp);
    this.getTenderFileByInfo(this.fileSearchData);
  },
  methods: {
    hoverClassFn(row){
      if(row.columnIndex == 3){
        return 'hoverClass'
      } else {
        return '';
      }
   },
    hasQx(value){
      return this.commonFn.hasQx(value, this);
    },
    searchFormFn(obj) {
      Object.assign(this.fileSearchData, obj);
    },
    //  表格勾选事件
    tableSearchFn(arr) {
      console.log(arr);
      this.selectList = arr;
    },
    selectInit(row, index) {
      return true;
      // if (row.statusDesc) {
      //   return false;
      // } else {
      //   return true;
      // }
    },
    // 分页回调函数
    fatherMethod(page, size) {
      this.fileSearchData.page = page;
      this.fileSearchData.size = size;
      this.getTenderFileByInfo(this.fileSearchData);
    },
    // 查询按钮
    searchFileList() {
      this.fileSearchData.page = 1;
      this.getTenderFileByInfo(this.fileSearchData);
    },
    resetFn() {
      this.fileSearchData = {
        planCode: "", // 招标计划申请表
        projectCode: "", // 招标项目
        projectName: "", // 招标项目
        tenderNumber: "", // 招标编号
        tenderName: "", // 招标名称
        tenderType: "", // 招标方式
        commName: "", // 业务单元
        commCode: "",
        page: 1,
        size: 10
      };
      this.$refs.searchForms.resetFn();
      this.getTenderFileByInfo(this.fileSearchData);
    },
    // 修改 发标 审定 前 判断是否单选
    ifOnly(type) {
      var len = this.selectList.length;
      if (len == 0) {
        return false;
      } else {
        if (type == 2) {
          if (len > 1) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
    },
    // 查询
    getTenderFileByInfo(params) {
      this.$api.modular
        .getTenderFileByInfo(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200 && res.data.returnCode == 0) {
            this.fileListData = res.data.data;
            this.total = Number(res.data.count);
          } else {
            this.$message.error("暂无数据");
          }
        })
        .catch(() => {});
    },
    formatDate(date) {
      return this.commonFn.formatDate(date);
    },
    closeGongGao() {
      this.gongGaoShow = false;
      this.bidIssuing = {};
      this.fileList = [];
    },
    async cheXiao(){
      if (!this.ifOnly(2)) {
        this.$message.error("请选择且只选择一个招标文件！");
        return false;
      }
      if(this.selectList[0].tenderFileStatus == 'lost'){
          this.$message({
            type: "error",
            message: "流标状态不可进行任何操作！"
          });
          return false;
        }
      if (
        this.selectList[0].tenderScheduleStatus != "tenderBulletinRelease"
      ) {
        this.$message({
          type: "error",
          message: "需发布公告后方可进行取消！"
        });
        return false;
      }
      this.$confirm("是否确认取消发布?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            await this.chexiao2();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      
    },
    chexiao2(){
var params = {
        tenderFileCode: this.selectList[0].tenderFileCode
      };
      this.$api.modular
        .returnTenderFile(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success('取消成功！');
              this.resetFn();
            } else {
              this.$message.error(res.data.message);
              return false;
            }
          }
        });
    },
    gongGao() {
      if (!this.ifOnly(2)) {
        this.$message.error("请选择且只选择一个招标文件！");
        return false;
      }
      if (
        this.selectList[0].tenderScheduleStatus != "tenderBulletinRelease" &&
        this.selectList[0].tenderScheduleStatus != "tenderFileApprovePASS"
      ) {
        this.$message({
          type: "error",
          message: "需审定完成方可发布公告！"
        });
        return false;
      }
      this.mbData.headCode = this.selectList[0].tenderFileCode;
      this.gongGaoShow = true;
      var params = {
        tenderFileCode: this.selectList[0].tenderFileCode
      };
      this.$api.modular
        .getReleaseByCode(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              if (res.data.data.length > 0) {
                this.fileList = [];
                if (res.data.data[0].releaseFileName) {
                  this.fileList.push({
                    name: res.data.data[0].releaseFileName,
                    fileUrl: res.data.data[0].releaseFileUrl
                  });
                }
                this.bidIssuing = res.data.data[0];
                if (
                  this.selectList[0].tenderScheduleStatus ==
                  "tenderBulletinRelease"
                ) {
                  this.ifAlready = true;
                } else {
                  this.ifAlready = false;
                }
              }
            } else {
              this.$message.error(res.data.message);
              return false;
            }
          }
        });
    },
    numberClick(row, type) {
      var url = base.approveUrl + row.approveCode;
      window.open(url);
    },
    //发起
    async faqiFn(rowVal, type) {
      var row = {};
      var textVal = "";
      if (type == "sd") {
        textVal = "发起审定";
      } else if (type == "gg") {
        textVal = "发布公告";
      }
      if (!rowVal) {
        if (!this.ifOnly(2)) {
          this.$message.error("请选择且只选择一个招标文件！");
          return false;
        }
        row = this.selectList[0];
        
        if(this.selectList[0].tenderFileStatus == 'lost'){
          this.$message({
            type: "error",
            message: "流标状态不可进行任何操作！"
          });
          return false;
        }
        if (type == "sd") {
          if (this.selectList[0].approveStatus && this.selectList[0].approveStatus != 'STOP') {
            this.$message({
              type: "error",
              message: "该文件不可发起审定！"
            });
            return false;
          }
          if(!this.selectList[0].serviceFileCode){
            this.$message({
              type: "error",
              message: "请先下载模板校对并上传之后再发起审定！"
            });
            return false;
          }
        } else if(type == 'gg'){
        }
        this.$confirm("是否确认" + textVal + "?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            await this.zhongjie(type, row);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else {
        row = rowVal;
        await this.examinationFn(row);
      }
    },
    zhongjie(type, row) {
      if (type == "sd") {
        this.examinationFn(row);
      } else if (type == "gg") {
        this.tenderFileReleaseFn();
      }
    },
    // 招标文件审定按钮
    examinationFn(row) {
      var params = {};
      params = {
        approveHeadCode: row.tenderFileCode,
        approveRequestCode: "50013C",
        approveTitle: "关于" + row.tenderName + "招标的招标文件审定",
        approveContent:
          "依据" +
          row.budgetYear +
          "年《成本预算和集中/专项采购执行单》招标计划，现申请对" +
          row.tenderName +
          row.itemScoreName +
          "招标进行招标文件审定"
      };
      this.$api.modular
        .tenderFileApproveByCode(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            window.open(res.data);
          }
        });
    },
    // 发布招标公告
    tenderFileReleaseFn() {
      if (this.ifOnly(2)) {
        var params = {};
        params = {
          tenderFileCode: this.selectList[0].tenderFileCode
        };

        this.$api.modular
          .tenderFileRelease(this.sso_sessionid, params)
          .then(res => {
            if (res.status == 200) {
              // this.ifshenhezhong = true;
              // this.sheetStatus = '招标项审核中'
              // window.open(res.data);
              if (res.data.returnCode == 0) {
                this.$message.success("发布成功！");
                this.getTenderFileByInfo(this.fileSearchData);
                this.gongGaoShow = false;
              } else {
                this.$message.error(res.data.message);
              }
            }
          });
      } else {
        this.$message.error("请选择且只选择一个招标文件！");
      }
    },
    // 招标文件变更
    tenderFileChangeByCode() {
    },
    // 删除
    async delBtn() {
      if (this.selectList.length == 0) {
        this.$message({
          type: "error",
          message: "请至少选择一个招标文件！"
        });
        return false;
      }
      for (var s = 0; s < this.selectList.length; s++) {
        if (this.selectList[s].approveStatus && this.selectList[s].approveStatus != 'STOP') {
          this.$message({
            type: "error",
            message: "该文件不可删除！"
          });
          return false;
        }
      }
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.delBtnFn();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    delBtnFn() {
      var tenderFileCode = "";
      var arr = [];
      for (var i = 0; i < this.selectList.length; i++) {
        arr.push(this.selectList[i].tenderFileCode);
        tenderFileCode = arr.toString();
      }
      this.$api.modular
        .tenderFileDelByCode(this.sso_sessionid, {
          tenderFileCode: tenderFileCode
        })
        .then(res => {
          if (res.data.returnCode == 0 && res.status == 200) {
            if(this.fileListData.length == arr.length){
              if(this.fileSearchData.page>1){
                this.fileSearchData.page = this.fileSearchData.page-1;
              }
            }
            this.getTenderFileByInfo(this.fileSearchData);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "错误！"
          });
        });
    },
    // 编制招标文件
    addTenderFile() {
      const { href } = this.$router.resolve({
        path: "process",
        query: {
          active: 0
        }
      });
      var winObj = window.open(href, "_blank");
      var loop = setInterval(() => {
        if (winObj.closed) {
          clearInterval(loop);
          // this.resetFn();
          this.getTenderFileByInfo(this.fileSearchData);
        }
      }, 1000);
    },
    changeTenderFile() {
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
              if(this.selectList[0].tenderType == '1' || this.selectList[0].tenderType == '2'){
                var href = this.commonFn.zwRouterProcess(
                  this.selectList,
                  0,
                  this,
                  "",
                  "",
                  "",
                  num,
                  status
                );
              } else {
                var href = this.commonFn.routerProcess(
                  this.selectList,
                  0,
                  this,
                  "",
                  "",
                  "",
                  num,
                  status
                );
              }
              
              var winObj = window.open(href, "_blank");
              var loop = setInterval(() => {
                if (winObj.closed) {
                  clearInterval(loop);
                  // this.resetFn();
                  this.getTenderFileByInfo(this.fileSearchData);
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
    }
  }
};
</script>

<style scoped>
.groupBtn {
  text-align: right;
  padding-right: 1%;
  margin-bottom: 20px;
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
  margin: 6px 0;
  background: #999;
}
/* #90A4AE  未起件 */

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
  width:220px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.bidissuing {
  border: 1px solid #e9e9e9;
  margin-bottom: 20px;
}
.bidissuing .hang {
  border-top: 1px solid #e9e9e9;
  height: 40px;
  line-height: 40px;
}
.bidissuing .hang:first-child {
  border-top: none;
}
.bidissuing .hang .lie {
  border-left: 1px solid #e9e9e9;
  text-align: left;
  padding-left: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.bidissuing .hang .el-col:first-child .lie {
  border-left: none;
}
.bidissuing .hang .lieTitle {
  text-align: right;
  padding-right: 12px;
}
.el-upload-list {
  float: left;
}
</style>
<style>
.sqlist .el-table .hoverClass .cell{
  position: relative;
  overflow: inherit;
}
.el_Popver{
    min-width: 240px;
    position: absolute;
    top: -50px;
    left: 92%;
    z-index: 2007;
    background: #FFF;
    border: 1px solid #EBEEF5;
    padding: 10px;
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 14px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
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
.sqlist .clickClass p:hover{
  cursor: pointer;
}
.sqlist .clickClass p {
  margin: 0;
  padding: 0;
  width:auto;
  overflow: hidden;
  white-space: nowrap;
  line-height: 20px;
  text-overflow: ellipsis;
  color: #1e88e5;
  float: left;
}
.sqlist .hoverClass button:hover{
  cursor: pointer;
}
.sqlist .hoverClass .cell:hover .btnClass+.el_Popver{
  display: block;
}
.sqlist .el-table__body-wrapper{
  overflow: inherit;
}
.jtCss{
  margin-left: -23px;
  margin-top: 44px;
  float: left;
  width: 0 !important; 
  height: 0!important;
  border-width: 6px;
  border-style: solid;
  border-color: transparent #fff transparent transparent;
  background: none;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>